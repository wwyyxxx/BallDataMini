// pages/detail/detail.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
import http from "../../utils/httpUtil"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    game: {},
    userList:[],
    isJoin:0, //0:未报名，1:已报名，2:停止报名
    blueScore:0,
    redScore:0,
    isUpload:false,
    userId:null,
    userUrl:null,
    hasUpload:false,
    userGameId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log("onLoad",options)
    if(!options.id) {
      let data = JSON.parse(options.item)
      that.initData(data)
    } else {
      wx.getStorage({
        key:'userInfo',
        complete(res){
          console.log("complete",res)
          if(res.data){
              app.globalData.userInfo = res.data
              that.data.userId = res.data.id
              that.data.userUrl = res.data.avatar
              that.getUserGame(options.id)
          } else {
            that.login()
          }
        }
      })
    }
  },
  login:function(){
    wx.showModal({
      title: '提示',
      content: '请先注册',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  initData:function(data) {
    console.log("initData",data)
    if(data.rows) data = data.rows[0]
    let templist = []
    let tempJoin = 0;
    let tempUpload = false;
    if(data.userGameList.length == data.peopleNumner){
      tempJoin = 2
    }
    data.userGameList.forEach(user => {
      templist.push(user.wxUsers[0])
      if(user.wxUsers[0].id == app.globalData.userInfo.id) {
        tempJoin = 1
        this.data.userGameId = user.id
        if(user.status === 1) {
          tempUpload = 1
        }
      }
    });
    this.setData({
      game:data,
      userList :templist,
      isJoin: tempJoin,
      userId:app.globalData.userInfo.id?app.globalData.userInfo.id:this.data.userId,
      hasUpload:tempUpload
    })
  },
  joinIn:function(){
    if(this.data.game.status===1) return
    let data ={
      gId: this.data.game.id,
      uId: app.globalData.userInfo.id ? app.globalData.userInfo.id:this.data.userId
    }
    http.postReq('/wx/participate/add',data,this.addGameUser)
  },

  addGameUser:function(res){
    console.log("addGameUser",res)
    let temp = this.data.userList
    let temp1 = 'game.count'
    if(!app.globalData.userInfo.id||!app.globalData.userInfo.avatar){
      app.globalData.userInfo.id = this.data.userId
      app.globalData.userInfo.avatar = this.data.userUrl
    }
    temp.push(app.globalData.userInfo)
    this.setData({
      [temp1]: res.count,
      userList : temp,
      isJoin:1
    })
  },

  deleteGame:function(){
    http.postReq('/wx/game/remove?ids='+this.data.game.id,null,this.back)
  },
  back:function(){
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    wx.navigateBack({
      success: function () {
        beforePage.getGameList(); // 执行前一个页面的onLoad方法
      }
    });
  },
  updataUploadStatus:function(){
    this.setData({
      isUpload:true
    })
  },
  getUserGame:function(res){
    console.log("getUserGame",res)
    http.postReq('/wx/game/list',{id:res},this.initData)
  },
  updateData:function(res){
    this.setData({
      game:res
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onBlueChange:function(value){
    console.log("onBlueChange",value)
    this.updateScore(value.detail,true)
    let temp = this.data.game
    temp.scoreMine = value.detail
    this.setData({
      game:temp
    })
  },
  onRedChange:function(value){
    console.log("onRedChange",value.detail)
    this.updateScore(value.detail,false)
    let temp = this.data.game
    temp.scoreOther = value.detail
    this.setData({
      game:temp
    })
  },

  updateScore:function(score,isMy){
    let data = {id:this.data.game.id}
    if(isMy){
      data.scoreMine = score
    } else{
      data.scoreOther = score
    }
    http.postReq('/wx/game/edit',data,null)
  },
  toUploadVideo:function(){
    wx.navigateTo({
      url: '../video/upload/upload?game='+JSON.stringify(this.data.game)+'&id='+this.data.userGameId
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log("onShareAppMessage",res)
    let id = this.data.game.id
    return {
      path:"pages/detail/detail?id="+id
    }
  }
})
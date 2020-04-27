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
    isJoin:false,
    blueScore:0,
    redScore:0,
    isUpload:false,
    userId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad",JSON.parse(options.item))
    let data = JSON.parse(options.item)
    let templist = []
    let tempJoin = false;
    data.userGameList.forEach(user => {
      templist.push(user.wxUsers[0])
      if(user.wxUsers[0].id == app.globalData.userInfo.id) {
        tempJoin = true
      }
    });
    this.setData({
      game:data,
      userList :templist,
      isJoin: tempJoin,
      userId:app.globalData.userInfo.id
    })
  },
  joinIn:function(){
    let data ={
      gId: this.data.game.id,
      uId: app.globalData.userInfo.id
    }
    http.postReq('/wx/participate/add',data,this.addGameUser)
  },

  addGameUser:function(){
    let temp = this.data.userList
    temp.push(app.globalData.userInfo)
    this.setData({
      userList : temp,
      isJoin:true
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
      url: '../video/upload/upload?game='+JSON.stringify(this.data.game)
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
  onShareAppMessage: function () {

  }
})
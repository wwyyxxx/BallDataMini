// pages/MyGame/myGame.js
const app = getApp()
import http from "../../utils/httpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGameList()
  },
  getGameList:function(){
    http.postReq('/wx/game/list',{uId:app.globalData.userInfo.id},this.updateGameList)
  },
  updateGameList:function(e) {
    console.log("updateGameList",e)
    this.setData({
      historyArr:e.rows
    })
  },
  toDetailBox:function(event) {
    console.log("toDetailBox",event)
    wx.navigateTo({
      url: '../detail/detail?item='+JSON.stringify(event.detail)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
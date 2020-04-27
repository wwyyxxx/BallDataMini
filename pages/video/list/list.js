// pages/video/list/list.js
const app = getApp()
import http from "../../../utils/httpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoList()
  },
  getVideoList:function(){
    let data = {
      status:1
    }
    http.postReq('/wx/video/list',data,this.updateList)
  },
  updateList:function(res) {
    console.log("updateList",res)
    this.setData({
      videoList:res.rows
    })
  },
  toDetatile:function(res){
    console.log("toDetatile",res)
    wx.navigateTo({
      url: '../detail/detail?video='+JSON.stringify(res.currentTarget.dataset.item)
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
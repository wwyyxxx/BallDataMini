// pages/feedback/feedback.js
const app = getApp()
import http from "../../utils/httpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:["参与者","组局着"],
    roleIndex:0,
    content:"",
    contact:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindRoleChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      roleIndex: e.detail.value
    })
  },
  addFeedBack:function() {
    let data = {
      name:app.globalData.userInfo.nickName,
      contact:this.data.contact,
      content:this.data.content,
      role:this.data.role[this.data.roleIndex]
    }
    http.postReq('/wx/feedback/add',data,this.back)
  },
  onContactChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.data.contact = event.detail
  },
  onfeedBackChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.data.content = event.detail
  },
  back:function(){
    wx.navigateBack({
    });
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
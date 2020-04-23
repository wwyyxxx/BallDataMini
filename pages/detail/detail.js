// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyArr: [
      {
        des: "比赛说明1",
        date: util.formatStartTime(new Date()),
        address: "测试地址1",
        number: 10,
        type: "测试球类1",
        scope: "测试分数1",
        needpay: 1111,
        alredyDone: false  // 报名中为false, 已结束为true
      },
      {
        des: "比赛说明2",
        date: util.formatStartTime(new Date()),
        address: "测试地址2",
        number: 3,
        type: "测试球类2",
        scope: "测试分数2",
        needpay: 222,
        alredyDone: false  // 报名中为false, 已结束为true
      },
      {
        des: "比赛说明3",
        date: util.formatStartTime(new Date()),
        address: "测试地址3",
        number: 19,
        type: "测试球类3",
        scope: "测试分数3",
        needpay: 33,
        alredyDone: false  // 报名中为false, 已结束为true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
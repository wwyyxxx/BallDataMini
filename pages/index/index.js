//index.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    haveHistory: true,
    active: 0,
    active0HeaderText: "您最近没有报名比赛，是否要发起一场比赛",
    active1Form: {
      des: "比赛说明",
      date: util.formatStartTime(new Date()),
      address: "地址",
      number: 0,
      type: "球类",
      scope: "分数",
      needpay: 0
    },
    stratDate: util.formatStartTime(new Date()),
    endDate: util.formatEndTime(new Date()),
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChangeTab(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  onChangeDate(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let date = 'active1Form.date'
    this.setData({
      [date]: e.detail.value
    })
  },
  onChangeSlider(e) {
    console.log(e.detail.value)
    let peopleNum = 'active1Form.number'
    this.setData({
      [peopleNum]: e.detail.value
    })
  },
  onClickJoined(e) {
    console.log(e)
    wx.navigateTo({
      url: 'detail'
    })
  },
  onClickCreated(e) {
    console.log(e)
  },
  onInputAddress(e) {
    console.log(e.detail.value)
    let address = 'active1Form.address'
    this.setData({
      [address]: e.detail.value
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

//index.js
const util = require('../../utils/util.js')
import http from "../../utils/httpUtil"
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    haveHistory: false,
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
      }
    ],
    typeIndex:0,
    ballType:["羽毛球","篮球","足球"],
    game:{
      cost:0.00
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startPlayGame:function(){
    let data = { detail:0 }
    data.detail  = 1
    this.onChangeTab(data)
  },
  onChangeTab(event) {
    // event.detail 的值为当前选中项的索引
    console.log("onChangeTab", event)
    if(event.detail == 0){
      this.getGameList()
    }
    if(event.detail == 1) {
      this.getBallType()
    }
    this.setData({ active: event.detail });
  },
  toDetailBox:function(event) {
    console.log("toDetailBox",event)
    wx.navigateTo({
      url: '../detail/detail?item='+JSON.stringify(event.detail)
    })
  },
  getGameList:function(){
    http.postReq('/wx/game/list',null,this.updateGameList)
  },
  getBallType:function(){
    http.postReq('/wx/type/list',null,this.updateTypeList)
  },
  updateGameList:function(e) {
    console.log("updateGameList",e)
    this.setData({
      historyArr:e.rows,
      haveHistory:true
    })
  },
  updateTypeList:function(e) {
    console.log("updateTypeList",e)
    let temp = []
    e.rows.forEach(obj => {
      console.log("forEach",obj)
      temp.push(obj.name)
    });
    if(temp && temp.length>0) {
      this.setData({
        ballType:temp,
        haveHistory : true
      })
    }
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
    wx.navigateTo({
      url: 'detail'
    })
  },
  onVideoList(e) {
    wx.navigateTo({
      url: '../video/list/list'
    })
  },
  onFeedBack(e) {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  onInputAddress(e) {
    console.log(e.detail.value)
    let address = 'active1Form.address'
    this.setData({
      [address]: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  submitGame:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value
    data.type = this.data.ballType[this.data.typeIndex]
    let detail = {}
    detail.detail = 0
    http.postReq('/wx/game/add', data, this.submit())
  },
  submit:function(){
    wx.showModal({
      // title: '',
      content: '提交成功',
      showCancel: false
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.loginAndGetOpenid(app.globalData.userInfo);
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.loginAndGetOpenid(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setUserInfoAndSave(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      this.loginAndGetOpenid(res.userInfo);
    }
    this.getGameList()
  },
  getUserInfo: function(e) {
    console.log(e)
    this.setUserInfoAndSave(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.loginAndGetOpenid(e.detail.userInfo);
  },
  loginAndGetOpenid:function(data){
    console.log('do login and get openid',data);
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var params = {
            code: res.code,
            nickName: data.nickName,
            avatar: data.avatarUrl,
            sex: data.gender
          }
          http.postReq("/wx/user/add",params,that.saveUserInfo)
        }
      }
    })
  },
  saveUserInfo: function(data) {
    console.log("saveUserInfo",data)
    this.setUserInfoAndSave(data.data)
  },
  setUserInfoAndSave:function(data) {
    app.globalData.userInfo = data
    wx.setStorageSync('userInfo', data);
  }
})

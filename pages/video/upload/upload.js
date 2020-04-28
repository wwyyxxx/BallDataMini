// pages/video/upload/load.js
const app = getApp()
import http from "../../../utils/httpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:null,
    fileList: [],
    title:"",
    summary:"",
    isNull:false,
    userGameId:null
  },

  afterRead(event) {
    console.log("afterRead",event)
    const { file } = event.detail;
    let tempData = [{
      url:file.thumbTempFilePath,
      name:file.path
    }]
    this.setData({
      fileList:tempData
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    
  },
  delete(event) {
    console.log("delete",event)
    const { index, name } = event.detail;
    const fileList = this.data.fileList;
    fileList.splice(0, 1);
    this.setData({ fileList: fileList });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad",options)
    if(options) {
      let data = JSON.parse(options.game)
      this.data.userGameId = options.id
      this.setData({
        game:data
      })
    }
  },
  onTitleChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.data.title = event.detail
  },
  onSummaryChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.data.summary = event.detai
  },
  upload:function(){
    let that = this
    if(!that.data.title) {
      that.setData({
        isNull:true
      })
      return
    }
    wx.uploadFile({
      url: 'http://127.0.0.1/common/upload', // 仅为示例，非真实的接口地址
      filePath: this.data.fileList[0].name,
      name: 'file',
      // formData: { file: 'file' },
      success(res) {
        // 上传完成需要更新 fileList
        console.log("uploadFile",res.data)
        let result = JSON.parse(res.data)//fileName url
        that.addVideo(result)
        // const { fileList = [] } = this.data;
        // fileList.push({ ...file, url: res.data });
        // this.setData({ fileList });
      }
    });
  },
  addVideo:function(res) {
    let data = {
      uId:app.globalData.userInfo.id,
      title:this.data.title,
      summary:this.data.summary,
      type:this.data.game.type,
      url:res.fileName
    }
    http.postReq('/wx/video/add',data,this.updateUserGameVideo)
  },
  // updateUserGameVideo:function(){
    
  //   let data = {
  //     uId:app.globalData.userInfo.id,
  //     title:this.data.title,
  //     summary:this.data.summary,
  //     type:this.data.game.type,
  //     url:res.fileName
  //   }
  //   http.postReq('/wx/video/add',data,this.updateUserGameVideo)
  // },
  back:function(){
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    wx.navigateBack({
      success: function () {
        beforePage.updataUploadStatus();
      }
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
var baserUrl = 'http://localhost/';
var header = {
  'Accept': 'application/json',
}
function getReq(url, success, fail) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: baserUrl + url,
    method: 'get',
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof success == "function" && success(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof fail == "function" && fail(false)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  console.log("data:",data)
    wx.request({
      url: baserUrl + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}
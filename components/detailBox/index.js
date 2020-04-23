const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: { //组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段，
    paramsForm: {
      type: Object,
      value: {
        des: "默认",
        date: util.formatStartTime(new Date()),
        address: "默认",
        number: 0,
        type: "默认",
        scope: "默认",
        needpay: 0,
        alredyDone: false
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: { //组件的内部数据，和 properties 一同用于组件的模版渲染

  },
  /**
   * 组件的方法列表
   */
  methods: { //组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
    tap() {
      this.setData({
        condition: false
      })
    }
  }
})
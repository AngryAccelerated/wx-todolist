//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //var postsData = require('data.js');
    //this.globalData.taskList = postsData.taskList;
    //var checkData = require('checkdata.js');
    //this.globalData.checkList = checkData.checkList;

    var taskData = wx.getStorageSync('tasks')
    var checkData = wx.getStorageSync('checks')
    this.globalData.checkList = checkData.checkList;
    this.globalData.taskList = taskData.taskList
    

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  syncAllData: function()
  {
    wx.setStorageSync('tasks', this.globalData.taskList)
    wx.setStorageSync('checks', this.globalData.checkList)
  },
  globalData: {
    userInfo: null,
    currentID: null,
    taskList: {
      "list": [{
        "time": "2020-01-01",
        "content": "试着开始添加你的第一个待办事项吧",
        "caption": "Task1",
        "status": false,
        "listID": 123456
      }]},
    checkList: {
      "list": [{
        "name": "试着添加你的第一项打卡吧",
        "id": 10001,
        "time": []
      }]},
    currentCheck: null
  }
})
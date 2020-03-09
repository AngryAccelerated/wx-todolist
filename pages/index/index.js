//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: "待办"
    })
    var temp = app.globalData.taskList.list
    temp.sort(function (a, b) {
      var keyA = new Date(a["time"]),
        keyB = new Date(b["time"]);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    this.setData({
      listData: temp
    });
  },
  handleAddition: function () {
    console.log("add new task!!!");
    wx.navigateTo({
      url: "/pages/singletask/singletask?id=&caption=&content=&checkStatus=&createDate=&action=2",
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})

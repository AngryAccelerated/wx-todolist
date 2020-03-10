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
    let temp = undefined;
    try {
      temp = app.globalData.taskList.list
    }
    catch (error) {
      console.warn("task list is empty");
    }
    if (temp != undefined) {
      temp.sort(function (a, b) {
        var keyA = new Date(a["time"]),
          keyB = new Date(b["time"]);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
    }
    else {
      app.globalData.taskList = {
        list: [{
          "time": "2020-01-01",
          "content": "试着开始添加你的第一个待办事项吧",
          "caption": "第一个任务",
          "status": false,
          "listID": 123456
        }, {
          "time": "2020-01-01",
          "content": "左滑可以删除当前的待办事项/打卡项目",
          "caption": "第二个任务",
          "status": false,
          "listID": 123457
        }, {
          "time": "2020-01-01",
          "content": "第二个Tabbar可以跳转到月历",
          "caption": "第三个任务",
          "status": false,
          "listID": 123458
        }, {
          "time": "2020-01-01",
          "content": "在日历下方上滑可以将月历变为周历",
          "caption": "第四个任务",
          "status": false,
          "listID": 123459
        }, {
          "time": "2020-01-01",
          "content": "第三个Tabbar将统计你七日内的任务完成度",
          "caption": "第五个任务",
          "status": false,
          "listID": 123460
        }, {
          "time": "2020-01-01",
          "content": "使用愉快！",
          "caption": "最后",
          "status": false,
          "listID": 123461
        }]
      }
    }
    console.log(temp);
    this.setData({
      listData: app.globalData.taskList.list
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

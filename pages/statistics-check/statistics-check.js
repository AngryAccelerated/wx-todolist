// pages/statistics-check/statistics-check.js
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 10001,
    calendarConfig: {
      multi: true,
      theme: 'elegant',
      inverse: false,
      week: true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "打卡统计"
    })
    this.setData({
      id: options.id
    })
    console.log("option.id:" + this.data.id);

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var temp = app.globalData.checkList.list;
    let num = 0;
    var id = app.globalData.currentCheck;
    var today = new Date();
    for (var val in temp) {
      if (temp[val]["id"] == id) {
        for (var i = 6; i >= 0; i--) {
          var newDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
          var month = newDate.getMonth() + 1;
          var day = newDate.getDate();
          if (month < 10)
            month = '0' + month;
          if (day < 10)
            day = '0' + day;
          var time = newDate.getFullYear() + '-' + month + '-' + day
          for (var val2 in temp[val]["time"])
            if (temp[val]["time"][val2] == time)
              num++;
        }
        break;
      }
    }

    pieChart = new wxCharts({
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '完成',
        data: num,
      }, {
        name: '未完成',
        data: 7 - num,
      }],
      width: windowWidth,
      height: 275,
      dataLabel: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  afterCalendarRender: function()
  {
    var toSet = [];

    var temp = app.globalData.checkList.list;
    for(var val in temp)
    {
      if(temp[val]["id"] == this.data.id)
      {
        for(var val2 in temp[val]["time"])
        {
          var date = temp[val]["time"][val2].split('-');
          toSet.push({
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            day: parseInt(date[2])
          })
        }
      }
    }
    this.calendar.setSelectedDays(toSet);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  handleTapDay: function(e)
  {
    console.log("show detail checks");
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
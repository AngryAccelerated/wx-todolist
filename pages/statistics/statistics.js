// pages/statistics/statistics.js
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  onLoad: function(options)
  {
  },
  refreshStatistics: function()
  {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var temp = app.globalData.taskList.list;
    var today = new Date();
    let times = [];
    let categories = [];
    let complete = 0;
    let allTasks = 0;
    for (var val in temp) {
      allTasks++;
      if (temp[val]["status"]) {
          complete++;
      }
    }
    for (var i = 6; i >= 0; i--) {
      var newDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      var time = this.transfomDateToString(newDate);
      var num = 0;

      for (var val in temp) {
        if (temp[val]["time"] == time && temp[val]["status"]) {
          num++;
        }
      }
      times.push(num);
      categories.push(time);
    }

    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: categories,
      animation: false,
      series: [{
        name: "完成数",
        data: times
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        disableGrid: true,
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataPointShape: true
    });

    pieChart = new wxCharts({
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '完成',
        data: complete,
      }, {
        name: '未完成',
        data: allTasks - complete,
      }],
      width: windowWidth,
      height: 275,
      dataLabel: true
    });
  }
  ,
  transfomDateToString: function (date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10)
      month = '0' + month;
    if (day < 10)
      day = '0' + day;
    return date.getFullYear() + '-' + month + '-' + day
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
    wx.setNavigationBarTitle({
      title: "统计"
    })
    this.refreshStatistics();
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
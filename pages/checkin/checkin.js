// pages/checkin/checkin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      multi: false,
      theme: 'elegant',
      inverse: true,
      week: true,
      highlightToday: true
    },
    currentDate: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "打卡"
    })
    console.log("load");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  afterCalendarRender2: function (e) {
    this.calendar.jump("#calendar2");
    this.calendar.switchView('week', "#calendar2").then(() => { });
    this.setData({
      currentDate: this.transformDateToString(this.calendar.getSelectedDay("#calendar2")[0])
    });
  },
  refreshCheckData: function (e) {
    this.setData({
      currentDate: this.transformDateToString(e.detail)
    });
    console.log("date changed: " + this.transformDateToString(e.detail));

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  transformDateToString: function (obj) {
    var year = obj.year;
    var month = obj.month;
    var day = obj.day;
    if (month < 10)
      month = "0" + month;
    if (day < 10)
      day = "0" + day;
    var date = year + "-" + month + "-" + day;
    return date;
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  handleDataChanged: function () {
    console.log("compulsively refresh data.");
    this.setData({
      checkData: app.globalData.checkList.list
    });
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
  onShow: function () {
    let temp = undefined;
    try {
      temp = app.globalData.checkList.list
    } catch (error) {
      console.warn("check list is empty");
    }
    if (temp == undefined)
      app.globalData.checkList = {
        list: [{
          "name": "试着添加你的第一项打卡项目吧",
          "id": 10001,
          "time": []
        }, {
          "name": "切换上方日期可以跳转到指定日期补卡",
          "id": 10001,
          "time": []
        }, {
          "name": "点击打卡进入详细页面",
          "id": 10001,
          "time": []
        }, {
          "name": "打卡详细页面除了打卡与重命名，还会统计你的打卡数据",
          "id": 10001,
          "time": []
        }]
      }
    this.setData({
      checkData: app.globalData.checkList.list
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleAddition: function () {
    console.log("add new check item");
    wx.navigateTo({
      url: '/pages/addcheck/addcheck',
    })
  }
})
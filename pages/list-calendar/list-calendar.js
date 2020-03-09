// pages/list-calendar/list-calendar.js

const app = getApp()
let touchDotX = 0;
let touchDotY = 0;
let interval;
let time = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      multi: false,
      theme: 'elegant', 
      showLunar: true, 
      inverse: true,
      week: true
    },
    listData: null
  },
  refreshList: function(date){

    let mainlist = app.globalData.taskList.list.concat();

    var list = [];
    for (var val in mainlist) 
      if (mainlist[val]["time"] == date) 
        list.push(mainlist[val]);

    this.setData({
      listData: list
    }); 
  },
  handleTapDay: function(e)
  {
    this.refreshList(this.transformDateToString(e.detail));
    
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "日历"
    })
    let list = app.globalData.taskList.list.concat();

    this.setData({
      listData: list
    });
  },
  barTouchStart: function(e)
  {
    console.log("touchStart");
    touchDotX = e.touches[0].pageX;
    touchDotY = e.touches[0].pageY;
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  barTouchEnd: function (e) {
    console.log("touchEnd");
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    if (time < 10) {
      let absX = Math.abs(tmX);
      let absY = Math.abs(tmY);
      if (tmY < 0) {
        console.log("slide up")
        this.calendar.switchView('week', '#calendar1').then(() => { });
      }else if(tmY > 0){
        console.log("slide down")
        this.calendar.switchView('month', '#calendar1').then(() => { });
      }
    }
    clearInterval(interval);
    time = 0;
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
  updateCalendarDots: function (obj, date)
  {
    
  },
  handleAddAction: function()
  {
    wx.navigateTo({
      url: '/pages/singletask/singletask?id=' + this.data.taskId
        + "&caption="
        + "&content="
        + "&checkStatus="
        + "&createDate=" + this.transformDateToString(this.calendar.getSelectedDay()[0])
        + "&action=2",
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  afterCalendarRender: function (e) {
    this.calendar.jump();
    this.refreshList(this.transformDateToString(this.calendar.getSelectedDay()[0]));
    
  },
  transformDateToString: function(obj){
    console.log(obj);
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onDataChanged: function(e)
  {
    this.refreshList(this.transformDateToString(this.calendar.getSelectedDay()[0]));
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
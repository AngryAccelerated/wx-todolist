// pages/singletask/singletask.js
const app = getApp()

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: null,
    caption: null,
    content: null,
    checkStatus: false,
    createDate: null,
    action: 1,
    send: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = options.checkStatus;
    if (status == 'false')
      status = false;
    else if (status == 'true')
      status = true;
    this.setData({
      taskId: options.id,
      caption: options.caption,
      content: options.content,
      checkStatus: status,
      createDate: options.createDate,
      action: options.action,
    });
    //action == 1 -> modify existed task
    //action == 2 -> add new task
    if (this.data.action == 1) {

    } else {
      //action == 2 add new task
      if (this.data.createDate == null) //time parameter existed
      {
        console.log("today!");
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        this.setData({
          createDate: Y + "-" + M + "-" + D
        })
      }
      else
      {
        console.log("the user choose on " + options.createDate);
      }
    }
  },
  dateChange: function(e) {
    this.setData({
      createDate: e.detail.value
    });
    console.log("date change event: " + this.data.createDate);

  },
  statusTap: function(e) {
    var check = this.data.checkStatus
    this.data.checkStatus = !check
    this.setData({
      checkStatus: !check,
    });
    console.log("status turns into: " + this.data.checkStatus)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  sendTask: function()
  {
    console.log("send = true");
    this.setData({
      send: true
    })
    wx.navigateBack({
      
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '任务内容',
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("remember to save when close"); 
    if (this.data.action == 1) //save existed task
    {
      for (var val in app.globalData.taskList.list) {
        if (app.globalData.taskList.list[val]["listID"] == parseInt(this.data.taskId)) {
          app.globalData.taskList.list[val]["caption"] = this.data.caption;
          app.globalData.taskList.list[val]["content"] = this.data.content;
          app.globalData.taskList.list[val]["status"] = this.data.checkStatus;
          app.globalData.taskList.list[val]["time"] = this.data.createDate;
          break;
        }
      }
    } else //create new task
    {
      console.log("send is: " + this.data.caption.length);
      if (this.data.caption.length != 0 && this.data.send == true)
      {
        var id = Date.parse(new Date());
        console.log("add start-------");
        console.log("id:" + id);
        console.log("caption:" + this.data.caption);
        console.log("content:" + this.data.content);
        console.log("status:" + this.data.checkStatus);
        console.log("time:" + this.data.taskId);
        var newtask = {
          "listID": id,
          "time": this.data.createDate,
          "caption": this.data.caption,
          "content": this.data.content,
          "status": this.data.checkStatus,
        };
        app.globalData.taskList.list.push(newtask);
        console.log("save end-------");
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      }
      else
      {
        console.log("task will not save");
      }
    }
    app.syncAllData();
  },
  onContentChanged: function(e) {
    this.setData({
      content: e.detail.detail.value
    });
  },
  onCaptionChanged: function(e) {
    this.setData({
      caption: e.detail.detail.value
    });
    console.log("caption: " + e.detail.detail.value)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
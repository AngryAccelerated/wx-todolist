// pages/checkinpage/checkinpage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    date: "",
    name: "",
    checkStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      date: options.date,
      name: options.name
    });
    wx.setNavigationBarTitle({
      title: options.name,
    })
    var temp = app.globalData.checkList.list;
    for (var val in temp) {
      if (temp[val]["id"] == this.data.id) {
        for (var val2 in temp[val]["time"])
        {
          if (temp[val]["time"][val2] == options.date)
          {
            this.setData({
              checkStatus: true
            });
            return;
          }
        }
      }
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var checkList = app.globalData.checkList.list;
    //if date existed , change status according to the radio box
    //if date isn't exist and the radio box is checked, add the date and change status
    let index;
    for (var val in checkList)
    {
      if (checkList[val]["id"] == this.data.id)
      {
        index = val;
        break;
      }
    }
    console.log(checkList[index]);
    if (app.globalData.checkList.list[index]["time"].indexOf(this.data.date) > -1)
    {
      console.log("change check status");
      var tindex = checkList[index]["time"].indexOf(this.data.date);
      if (!this.data.checkStatus) {
        console.log("delete checkin record on" + this.data.date);
        app.globalData.checkList.list[index]["time"].splice(tindex,1);
      }
    }
    else{
      if(this.data.checkStatus)
      {
        console.log("add check record on " + this.data.date);
        app.globalData.checkList.list[index]["time"].push(this.data.date);
      }
      else{
        console.log("no check record action");
      }
    }


    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('closePage', {});
    app.syncAllData();
  },
  statusTap: function (e) {
    var check = this.data.checkStatus
    this.data.checkStatus = !check
    this.setData({
      checkStatus: !check,
    });
    console.log("status turns into: " + this.data.checkStatus)
    app.syncAllData();
  }
  ,
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
  gotoCheckStatistics: function()
  {
    wx.navigateTo({
      url: '/pages/statistics-check/statistics-check?id=' + this.data.id 
    })
    app.globalData.currentCheck = this.data.id;
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
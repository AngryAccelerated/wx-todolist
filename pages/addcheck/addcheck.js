// pages/addcheck/addcheck.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caption: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "添加打卡"
    })
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
    if(this.data.caption != "")
    {
      console.log("save a new checkin item"); 
      var id = Date.parse(new Date());
      var newcheck = {
        "id": id,
        "name": this.data.caption,
        "time": []
      };
      app.globalData.checkList.list.push(newcheck);
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }
    app.syncAllData();
  },
  onCaptionChanged: function(e)
  {
    this.setData({
      caption: e.detail.detail.value
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
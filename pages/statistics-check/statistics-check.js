// pages/statistics-check/statistics-check.js
const app = getApp()
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
    },
    onCheckChart(F2, config) {
      var temp = app.globalData.checkList.list;
      let num = 0;
      var id = app.globalData.currentCheck;
      var today = new Date();
      for (var val in temp){
        if(temp[val]["id"] == id)
        {
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

      const map = {
        完成: (num / 7 * 100).toFixed(2) + '%',
        未完成: ((7 - num) / 7 * 100).toFixed(2) + '%'
      };
      const data = [{
        name: '完成',
        percent: num / 7,
        a: '1'
      }, {
        name: '未完成',
        percent: (7 - num) / 7,
        a: '1'
      }];
      const chart = new F2.Chart(config);
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter(val) {
          return val + '  ' + map[val];
        }
      });
      chart.tooltip(false);
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 600,
            easing: 'cubicOut'
          }
        });

      chart.render();
      return chart;
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
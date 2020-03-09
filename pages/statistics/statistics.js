// pages/statistics/statistics.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onLineChart(F2, config) {
      const chart = new F2.Chart(config);
      var data = [];
      var today = new Date();
      
      var temp = app.globalData.taskList.list;

      for (var i = 6; i >= 0; i--) {
        var newDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        var num = 0;
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        if(month < 10)
          month = '0' + month;
        if (day < 10)
          day = '0' + day;
        var time = newDate.getFullYear() + '-' + month + '-' + day
        console.log(time);
        for (var val in temp){
          if (temp[val]["time"] == time && temp[val]["status"] == true)
            num++;
        }
        data.push({
          date: newDate,
          value: num
        });
      }
      console.log(data);
      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      });
      chart.axis('date', {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.line().position('date*value');
      chart.point().position('date*value').style({
        stroke: '#fff',
        lineWidth: 1
      });
      chart.render();
      return chart;
  },
    onPieChart(F2, config) {

      var temp = app.globalData.taskList.list;
      let completed = 0;
      let uncompleted = 0;
      
      for(var val in temp)
        temp[val]["status"] ? completed++ : uncompleted++;
      
      let count = completed + uncompleted;

      const map = {
        完成: (completed / count * 100).toFixed(2)+ '%',
        未完成: (uncompleted / count * 100).toFixed(2) + '%'
      };
      const data = [{
        name: '完成',
        percent: completed / (completed + uncompleted),
        a: '1'
      }, {
        name: '未完成',
          percent: uncompleted / (completed + uncompleted),
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
onLoad: function(options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {
  wx.setNavigationBarTitle({
    title: "统计"
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
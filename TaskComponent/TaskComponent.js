// TaskComponent/TaskComponent.js
const app = getApp()
var startX = 0;
var endX = 0;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    caption: {
      type: String,
      value: "Caption"
    },
    content: {
      type: String,
      value: "Content"
    },
    isCheck: {
      type: Boolean,
      value: false
    },
    createDate: {
      type: Date,
      value: "2020-02-29"
    },
    taskId: {
      type: Number,
      value: 20001111
    },
    offsetX: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    handleSlideDelete: function(e) {
      console.log("delete task id: " + this.data.taskId);
      for (var val in app.globalData.taskList.list) {
        if (app.globalData.taskList.list[val]["listID"] == parseInt(this.data.taskId)) {
          app.globalData.taskList.list.splice(val, 1);
          break;
        }
      }

      this.triggerEvent('listDataChanged', {});
      console.log("close");
      this.setData({
        offsetX: 0
      })
      app.syncAllData();
    },
    statusTap: function(e) {
      var check = this.data.isCheck;

      this.setData({
        isCheck: !check,
      });

      for (var val in app.globalData.taskList.list) {
        if (app.globalData.taskList.list[val]["listID"] == parseInt(this.data.taskId)) {
          app.globalData.taskList.list[val]["status"] = this.data.isCheck;
          break;
        }
      }

      console.log("task id: " + this.data.taskId + " status turns into: " + this.data.isCheck);

      this.triggerEvent('listDataChanged', {});
      app.syncAllData();
    },

    onClicked: function(e) {
      console.log("task id: " + this.data.taskId + " will turn to detail page");
      wx.navigateTo({
        url: '/pages/singletask/singletask?id=' + this.data.taskId +
          "&caption=" + this.data.caption +
          "&content=" + this.data.content +
          "&checkStatus=" + this.data.isCheck +
          "&createDate=" + this.data.createDate +
          "&action=1",
      })

    },
    handleTouchStart: function(e) {
      console.log(e);
      startX = e.touches[0].pageX;
    },
    handleTouchEnd: function(e) {
      console.log(e);
      endX = e.changedTouches[0].pageX;
      if ((endX - startX) < -30) {
        this.setData({
          offsetX: -180
        })
      } else {

        this.setData({
          offsetX: 0
        })
      }
    },
    handleMovableChange: function(e) {}
  }
})
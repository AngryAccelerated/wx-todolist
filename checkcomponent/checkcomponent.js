// checkcomponent/checkcomponent.js
const app = getApp()
var startX = 0;
var endX = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: "check1"
    },
    checkId: {
      type: Number,
      value: 123
    },
    days: {
      type: Number,
      value: 0
    },
    currentDate: {
      type: Date,
      value: ""
    },
    isCheck: {
      type: Boolean,
      value: false
    },
    offsetX: {
      type: Number,
      value: 0
    }
  },
  observers: {
    'currentDate': function() {
      console.log("observed date changed signal")
      this.updateCheckItem();
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function() {
    console.log("load");
    this.updateCheckItem();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClicked: function(e) {
      let that = this;
      console.log("check id: " + this.data.checkId + " will turn to detail page");
      wx.navigateTo({
        url: '/pages/checkinpage/checkinpage?id=' + this.data.checkId +
          "&name=" + this.data.name +
          "&date=" + this.data.currentDate,
        events:{
          closePage: function(data)
          {
            that.updateCheckItem();
          }
        }
      })

    },
    updateCheckItem: function() {
      console.log("check item, current date:" + this.data.currentDate);
      let mainlist = app.globalData.checkList.list.concat();
      this.setData({
        isCheck: false
      });
      var list = [];
      for (var val in mainlist) {
        if (mainlist[val]["id"] == this.data.checkId) {
          for (var val2 in mainlist[val]["time"]) {
            if (mainlist[val]["time"][val2] == this.data.currentDate) {
              this.setData({
                isCheck: true
              });
              break;
            }
          }
          this.setData({
            days: mainlist[val]["time"].length
          });
          break;
        }
      }
      app.syncAllData();
    },
    handleTouchStart: function (e) {
      console.log(e);
      startX = e.touches[0].pageX;
    },
    handleTouchEnd: function (e) {
      console.log(e);
      endX = e.changedTouches[0].pageX;
      if ((endX - startX) < -30) {
        this.setData({
          offsetX: -500
        })
      } else {

        this.setData({
          offsetX: 0
        })
      }
    },
    handleSlideDelete: function() {
      let id = this.data.checkId
      let isDelete = false;
      let that = this;
      wx.showModal({
        title: '提示',
        content: '删除此项打卡时，将清楚所有打卡数据，是否继续？',
        success(res) {
          if (res.confirm) {
            console.log("delete check id: " + id);
            for (var val in app.globalData.checkList.list) {
              if (app.globalData.checkList.list[val]["id"] == parseInt(id)) {
                app.globalData.checkList.list.splice(val, 1);
                break;
              }
            }
            isDelete = true;
          } else if (res.cancel) {
            return;
          }
        },
        complete: (res) => {
          console.log("isDelete status:" + isDelete);
          if (isDelete) {
            that.setData({
              offsetX: 0
            })
            that.triggerEvent("checkDataChanged", {});
            app.syncAllData();
          }
        }
      })
    }
  }
})
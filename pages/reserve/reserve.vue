<template>
  <view class="container">
    <view class="card-box">
      <view class="card-list" v-for="(item,index) in reserveData" :key="index">
        <view class="info">
          <view class="u-font-32 u-bold">{{ item.storeName }}</view>
          <view class="u-font-26 data">{{ item.roomName }}/{{ item.seatName }}</view>
          <view class="u-font-26 time data">
            <text>{{ item.startDate }}至{{ item.endDate }}</text>
            <text class="u-font-28">{{ item.orderStatus == 4 ? '消费中' : item.orderStatus == 1 ? '未消费' : '' }}</text>
          </view>
        </view>
        <view class="list-botton">
          <view class="u-font-28" v-if="item.orderStatus==4">开大门</view>
          <view class="u-font-28" v-if="item.orderStatus==1">开房间门</view>
          <view class="u-font-28 consumption" v-if="item.orderStatus==1" @click="startConsume(item.id)">开始消费</view>
          <view class="u-font-28 consumption" @click="presaleorderRenew(item.id)" v-if="item.orderStatus==4">续费</view>
          <view class="u-font-28 over" @click="over(item.id)" v-if="item.orderStatus==4">结束消费</view>
        </view>
      </view>

      <!--      <view class="card-list">-->
      <!--        <view class="info">-->
      <!--          <view class="u-font-32 u-bold">天庆店春深读书堂自习馆</view>-->
      <!--          <view class="u-font-26 data">自习室一/1</view>-->
      <!--          <view class="u-font-26 time data">-->
      <!--            <text>2021-09-24 21:00-23:00</text>-->
      <!--            <text class="u-font-28">未消费</text>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        <view class="list-botton">-->
      <!--          <view class="u-font-28">开大门</view>-->
      <!--          <view class="u-font-28">开房间门</view>-->
      <!--          <view class="u-font-28 consumption">续费</view>-->
      <!--          <view class="u-font-28 over" @click="over('2')">结束消费</view>-->
      <!--        </view>-->
      <!--      </view>-->
      <!--      <view class="card-list">-->
      <!--        <view class="info">-->
      <!--          <view class="u-font-32 u-bold">天庆店春深读书堂自习馆</view>-->
      <!--          <view class="u-font-26 data">自习室一/1</view>-->
      <!--          <view class="u-font-26 time data">-->
      <!--            <text>2021-09-24 21:00-23:00</text>-->
      <!--            <text class="u-font-28">未消费</text>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        <view class="list-botton">-->
      <!--          <view class="u-font-28">开大门</view>-->
      <!--          <view class="u-font-28 consumption">开门消费</view>-->
      <!--        </view>-->
      <!--      </view>-->
    </view>

    <view>
    <view v-show="noData">
      <u-empty text="预定列表为空" mode="list"></u-empty>
    </view>
      <u-modal v-model="popupTipStatus" @confirm="confirm" show-cancel-button content="确定要结束消费吗?"></u-modal>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  name: "reserve",
  data() {
    return {
      current: 0,
      popupTipStatus: false,
      winHeight: app.globalData.winHeight,
      tenantId: '',
      reserveData: [],
      preOrderId:'',
      noData:false,
    }
  },
  onShow(){
    if(!uni.getStorageSync('openId')){
      uni.navigateTo({
        url:`../login/login`
      })
      return false;
    }
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.getList();
  },
  methods: {
    getList() {
      let data = {
        openId: this.$u.func.getOpenId(),
        tenantId: this.tenantId,
      }
      this.$u.api.myPresaleorderList(data).then((res) => {
        console.log(res.data);
        this.reserveData = res.data;
        this.noData = this.reserveData.length <= 0;
        uni.stopPullDownRefresh()
      })
    },
    change(index) {
      this.current = index;
    },
    over(id) {
      this.popupTipStatus = true;
      this.preOrderId=id;
    },
    confirm() {
      this.finishConsume()
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.getList()
    },
    presaleorderRenew(id) {
      this.$u.api.presaleorderRenew({openId: this.$u.func.getOpenId(), id: id}).then((res) => {
        if (res.code == 200) {
          let data = res.data;
          uni.navigateTo({
            url:`../seat/seat?seatId=${data.seatId}&roomId=${data.roomId}&chargeSetId=${data.chargeSetId}`
          })
        } else {
          this.$u.toast(res.msg)
        }
      })
    },
    // 开始消费
    startConsume(id) {
      let data = {
        openId: this.$u.func.getOpenId(),
        preOrderId: id
      }
      this.$u.api.startSpending(data).then((res) => {
        if (res.code == 200) {
          this.$u.toast('操作成功');
          this.getList()
        } else {
          this.$u.toast(res.msg)
        }
      })
    },
    finishConsume(){
      let data = {
        openId: this.$u.func.getOpenId(),
        preOrderId: this.preOrderId
      }
      this.$u.api.finishConsume(data).then((res) => {
        if (res.code == 200) {
          this.popupTipStatus = false;
          this.getList();
        } else {
          this.$u.toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
page{
  background-color: #F5F5F5;
}

.card-box {
  padding: 26rpx 30rpx;
  box-sizing: border-box;

  .card-list {
    padding: 20rpx 30rpx;
    background-color: #FFFFFF;
    border-radius: 19rpx;
    margin-bottom: 25rpx;

    .tag {
      display: inline-block;
      background: #2487FF;
      border-radius: 6rpx;
      color: #FFFFFF;
      height: 31rpx;
      line-height: 31rpx;
      padding: 0 12rpx;
    }

    .info {
      border-bottom: 2rpx dashed #EEEFF1;
      padding: 22rpx 0;

      .data {
        color: #999999;
        margin-top: 20rpx;
      }

      .time {
        display: flex;
        justify-content: space-between;

        > text:last-child {
          color: #2487FF;
        }
      }
    }

    .list-botton {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #666666;
      padding-top: 10rpx;

      view {
        margin-left: 23rpx;
        width: 144rpx;
        height: 54rpx;
        line-height: 52rpx;
        background: #FFFFFF;
        border: 2rpx solid #EEEFF1;
        border-radius: 27rpx;
        text-align: center;
        color: #010101;
      }

      view.over {
        background-color: #D04D52;
        color: #FFFFFF;
        border-color: #D04D52;
      }

      view.consumption {
        background-color: #2487FF;
        color: #FFFFFF;
        border-color: #2487FF;
      }
    }
  }
}
</style>

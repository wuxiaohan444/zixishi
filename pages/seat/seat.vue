<template>
  <view class="container">
    <u-image height="334rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg" :lazy-load="true"></u-image>
    <view class="room-name u-font-32 u-bold u-black-color">天庆大厦店自习室</view>
    <view class="chooseDate u-flex u-row-around">
      <view class="chooseDate-item" v-for="(item,index) in timeData" :key="index">
        <view>{{item.week}}</view>
        <view>{{item.date}}</view>
      </view>
    </view>
    <!--    通知-->
    <u-notice-bar mode="horizontal" :list="content"></u-notice-bar>
    <view class="seat-time-box u-flex u-flex-wrap">
      <view class="seat-time-item">09:00-10:00</view>
      <view class="seat-time-item active">09:00-10:00</view>
      <view class="seat-time-item">09:00-10:00</view>
      <view class="seat-time-item">09:00-10:00</view>
      <view class="seat-time-item">09:00-10:00</view>
    </view>
    <view class="operation-btn u-flex u-row-between">
      <view class="u-font-24">合计 ：
        <text class="u-red-color u-font-34">¥5</text>
      </view>
      <view class="operation-right u-flex">
        <view :class="payIndex===1?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(1)">美团券</view>
        <view :class="payIndex===0?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(0)">去结算</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getWeek, behindDate} from '../../utils/timeFunc'

export default {
  name: "seat",
  data() {
    return {
      content: ['请与12:11前抵达自习室扫描入座'],
      payIndex: 0,
      timeData: [
        {
          date: behindDate(0),
          week: getWeek(behindDate(0))
        },
        {
          date: behindDate(1),
          week: getWeek(behindDate(1))
        },
        {
          date: behindDate(2),
          week: getWeek(behindDate(2))
        }
      ]
    }
  },
  onLoad() {
    console.log(this.timeData);
  },
  methods: {
    choosePay(index) {
      this.payIndex = index;
    }
  }
}
</script>


<style scoped lang="scss">
.container {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 101rpx); // 核心代码
  padding-bottom: calc(env(safe-area-inset-bottom) + 101rpx); // 核心代码
}

.room-name {
  height: 90rpx;
  line-height: 90rpx;
  padding-left: 30rpx;
}

.chooseDate {
  height: 114rpx;
  background: #F5F5F5;

  .chooseDate-item {
    text-align: center;
    font-size: 28rpx;
    color: #010101;
  }
}

.seat-time-box {
  padding-top: 32rpx;
  padding-left: 31rpx;

  .seat-time-item {
    width: 208rpx;
    height: 94rpx;
    background: #FFFFFF;
    border: 1rpx solid #B2B2B2;
    border-radius: 6rpx;
    font-size: 28rpx;
    color: #010101;
    text-align: center;
    line-height: 94rpx;
    margin-right: 32rpx;
    margin-bottom: 20rpx;
  }

  .seat-time-item.active {
    color: #FFFFFF;
    background: #2487FF;
    border: 1rpx solid #2487FF;
  }
}

.operation-btn {
  width: 750rpx;
  background: #FFFFFF;
  border-top: 1px solid #B2B2B2;
  padding: 0 30rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 12rpx;
  padding-bottom: constant(safe-area-inset-bottom); // 核心代码
  padding-bottom: env(safe-area-inset-bottom); // 核心代码
  .operation-right {
    width: 321rpx;
    height: 77rpx;
    overflow: hidden;
    margin-bottom: 12rpx;
    border-radius: 38rpx;
    border: 1px solid #D69B4B;

    .operation-btn-pay {
      text-align: center;
      line-height: 77rpx;
      color: #D69B4B;
      flex: 1;
      font-size: 29rpx;
    }

    .operation-btn-pay.active {
      background: #2487FF;
      color: #FFFFFF;
      box-sizing: border-box;
    }
  }
}
</style>

<template>
  <view class="container">
    <view class="card-header u-flex">
      <view class="card-header-time u-flex u-col-center u-row-center">
        <view>
          <text class="one">17</text>
          <text class="two">h</text>
        </view>
      </view>
      <view class="card-header-name u-ellipsis">读书日卡（天庆大厦店）</view>
    </view>
    <view class="info-box">
      <view class="card-name u-font-32 u-bold u-black-color">17小时读书日卡（门店名）</view>
      <view class="info-item u-flex u-row-between">
        <view class="u-flex">
          <view class="item-label">销售价格：</view>
          <view class="item-text">15.0元</view>
        </view>
        <view class="u-flex">
          <view class="item-label">天数：</view>
          <view class="item-text">1天</view>
        </view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">使用日期：</view>
        <view class="item-text">无限制</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">封顶小时：</view>
        <view class="item-text">17小时</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">适用门店：</view>
        <view class="item-text">门店名</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">有 效 期：</view>
        <view class="item-text">2021-09-08至2021-10-21</view>
      </view>
      <view class="line"></view>
    </view>
    <u-button shape="circle" :custom-style="customStyle" @click="payShow">1.5元</u-button>
    <pay-type :show="payModalShow" @close="payModalShow=false"></pay-type>
  </view>
</template>

<script>
import payType from "../../components/pay/payType";

export default {
  name: "timeCard",
  components: {payType},
  data() {
    return {
      customStyle: {
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontSize: '31rpx',
        marginTop: '92rpx'
      },
      payModalShow: false
    }
  },
  methods: {
    payShow() {
      this.payModalShow = true;
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 26rpx 31rpx;

  .card-header {
    width: 100%;
    height: 179rpx;
    background-image: linear-gradient(90deg, #6C52F1, #8E65F4);
    border-radius: 10rpx;
    padding: 50rpx;
    box-sizing: border-box;

    .card-header-time {
      width: 100rpx;
      height: 100rpx;
      background: #FFFFFF;
      border-radius: 50%;
      color: #6E55F3;

      .one {
        font-size: 36rpx;
        font-weight: bold;
      }

      .two {
        font-size: 26rpx;
      }
    }

    .card-header-name {
      color: #FFFFFF;
      font-size: 28rpx;
      font-weight: bold;
      margin-left: 20rpx;
    }
  }

  .info-box {
    .card-name {
      padding: 38rpx 0;
    }

    .info-item {
      font-size: 28rpx;
      padding-bottom: 40rpx;

      .item-label {
        color: #8D8D8D;
      }

      .item-text {
        color: #010101;
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      background: #B2B2B2;
    }
  }
}
</style>

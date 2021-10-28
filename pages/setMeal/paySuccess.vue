<template>
  <view class="container">
    <view class="pay-header">
      <view class="pay-success-icon">
        <u-icon name="checkmark" color="#ffffff" size="56"></u-icon>
      </view>
      <view class="text">支付成功</view>
    </view>
    <view class="pay-type">
      <text class="u-font-31">余额支付:</text>
      <text class="u-font-64">￥15</text>
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
    <view class="operation u-flex u-row-between">
      <u-button shape="circle" :custom-style="customStyle1">再来一单</u-button>
      <u-button shape="circle" :custom-style="customStyle2" @click="usage">前去使用</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "payStatus",
  data(){
    return{
      customStyle1:{
        width: '319rpx',
        height: '92rpx',
        background: '#FFFFFF',
        color: '#2487FF',
        fontSize:'31rpx'
      },
      customStyle2:{
        width: '319rpx',
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontSize:'31rpx'
      }
    }
  },
  methods:{
    usage(){
      uni.switchTab({
        url: '../reserve/reserve'
      });
    }
  }
}
</script>

<style scoped lang="scss">
.pay-header {
  text-align: center;
  margin: 50rpx auto;

  .pay-success-icon {
    width: 105rpx;
    height: 105rpx;
    background: #2487FF;
    border-radius: 50%;
    padding-top: 28rpx;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .text {
    font-size: 32rpx;
    color: #2487FF;
    padding-top: 15rpx;
  }
}

.pay-type {
  text-align: center;
  padding-bottom: 60rpx;
  .u-font-64 {
    font-size: 64rpx;
  }
}

.operation{
  margin: 85rpx 31rpx 0 31rpx;
}
.info-box {
  padding: 0 30rpx;
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
    background: #EEEFF1;
  }
}
</style>

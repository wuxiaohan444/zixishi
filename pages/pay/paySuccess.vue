<template>
  <view class="container">
    <view class="pay-header">
      <view class="pay-success-icon">
        <u-icon name="checkmark" color="#ffffff" size="56"></u-icon>
      </view>
      <view class="text">支付成功</view>
    </view>
    <view class="pay-type" v-if="orderInfo.payType===7">
      <text class="u-font-31">余额支付:</text>
      <text class="u-font-64">￥{{orderInfo.actualPayment}}</text>
    </view>
    <view class="pay-type" v-if="orderInfo.payType===2">
      <text class="u-font-31">微信支付:</text>
      <text class="u-font-64">￥{{orderInfo.actualPayment}}</text>
    </view>
    <view class="line"></view>
    <view class="reserve-item u-flex u-row-between">
      <text class="left">预订位置:</text>
      <text class="right">{{orderInfo.roomName?orderInfo.roomName:''}}-{{orderInfo.seatName?orderInfo.seatName:''}}</text>
    </view>
    <view class="line"></view>
    <view class="reserve-item u-flex u-row-between">
      <text class="left">预订时间:</text>
      <text class="right">{{orderInfo.startDate?orderInfo.startDate:''}}至{{orderInfo.endDate?orderInfo.endDate:''}}</text>
    </view>
    <view class="line"></view>
    <view class="operation u-flex u-row-between">
      <u-button shape="circle" :custom-style="customStyle1" @click="skip('../home/homePage')">再来一单</u-button>
      <u-button shape="circle" :custom-style="customStyle2"  @click="skip('../reserve/reserve')">前去使用</u-button>
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
      },
      orderId:'',
      orderInfo:{},
      tenantId:''
    }
  },
  onLoad(options){
    this.orderId = options.orderId;
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.getDetail()
  },
  methods:{
    getDetail(){
      let data = {
        openId: this.$u.func.getOpenId(),
        tenantId: this.tenantId,
        id:this.orderId
      }
      this.$u.api.orderList(data).then((res) => {
        this.orderInfo = res.data[0]
      });
    },
    skip(url){
      uni.switchTab({
        url: url
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
  padding-bottom: 100rpx;
  .u-font-64 {
    font-size: 64rpx;
  }
}
.line{
  width: 688rpx;
  height: 1rpx;
  background: #DEDEDE;
  margin: 0 auto;
}
.reserve-item {
  margin: 0 31rpx;
  height: 100rpx;
  .left {
    font-size: 28rpx;
    font-weight: 500;
    color: #8D8D8D;
  }
  .right{
    font-size: 28rpx;
    font-weight: 500;
    color: #010101;
  }
}
.operation{
  margin: 85rpx 31rpx 0 31rpx;
}
</style>

<template>
  <view class="container">
    <view class="card-header u-flex">
      <view class="card-header-name u-ellipsis">{{info.name}}（{{info.storeName}}）</view>
    </view>
    <view class="info-box">
      <view class="card-name u-font-32 u-bold u-black-color">1{{info.name}}（{{info.storeName}}）</view>
      <view class="info-item u-flex u-row-between">
        <view class="u-flex">
          <view class="item-label">销售价格：</view>
          <view class="item-text">{{info.price}}元</view>
        </view>
        <view class="u-flex">
          <view class="item-label">天数：</view>
          <view class="item-text">{{info.days}}天</view>
        </view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">使用日期：</view>
        <view class="item-text">{{info.startDate}}至{{info.endDate}}</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">适用门店：</view>
        <view class="item-text">{{info.storeName}}</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">使用时间：</view>
        <view class="item-text">{{info.startTime}} - {{info.endTime}}</view>
      </view>
      <view class="info-item u-flex u-row-right">
        <u-button shape="circle" :custom-style="customStyle2" @click="details">座位详情</u-button>
      </view>
      <view class="line"></view>
    </view>
    <u-button shape="circle" :custom-style="customStyle" @click="payShow">支付：{{info.price}}元</u-button>
  </view>
</template>

<script>
export default {
  name: "timeCard",
  data() {
    return {
      customStyle: {
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontSize: '31rpx',
        marginTop: '92rpx'
      },
      customStyle2:{
        width: '168rpx',
        height: '60rpx',
        color: '#2487FF',
        fontSize: '28rpx'
      },
      payModalShow: false,
      info:''
    }
  },
  onLoad(options){
    console.log(JSON.parse(options.info));
    this.info = JSON.parse(options.info);
  },
  methods: {
    payShow() {
      let data = {
        openId: this.$u.func.getOpenId(),
        id:this.info.id,
      }
      this.$u.api.seatCardBuy(data).then((res)=>{
        uni.navigateTo({
          url: 'paySuccess'
        });
      })
    },
    details(){
      let date= this.info.startDate +','+this.info.endDate
      uni.navigateTo({
        url: 'reservationCardDetails?info='+ JSON.stringify(this.info)
      });
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
    background-image: linear-gradient(90deg, #FFB019, #FED141);
    border-radius: 10rpx;
    padding: 50rpx;
    box-sizing: border-box;

    .card-header-name {
      color: #FFFFFF;
      font-size: 28rpx;
      font-weight: bold;
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
      background: #EEEFF1;
    }
  }
}
</style>

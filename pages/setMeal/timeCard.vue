<template>
  <view class="container">
    <view class="card-header u-flex">
      <view class="card-header-time u-flex u-col-center u-row-center">
        <view>
          <text class="one">{{time}}</text>
          <text class="two">h</text>
        </view>
      </view>
      <view class="card-header-name u-ellipsis">{{info.name}}（{{info.storeName}}）</view>
    </view>
    <view class="info-box">
      <view class="card-name u-font-32 u-bold u-black-color">{{info.name}}（{{info.storeName}}）</view>
      <view class="info-item u-flex u-row-between">
        <view class="u-flex">
          <view class="item-label">销售价格：</view>
          <view class="item-text">{{info.price}}元</view>
        </view>
        <view class="u-flex" v-if="info.expireType ===0">
          <view class="item-label">天数：</view>
          <view class="item-text">{{info.expiryDate}}天</view>
        </view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">使用限制：</view>
        <view v-if="info.restrictionType ===2">
          <view class="item-text" v-for="(item,index) in astrictText" :key="index">{{item}}</view>
        </view>
        <view class="item-text" v-else>{{astrictText}}</view>
      </view>
      <view class="info-item u-flex" v-if="info.expireType ===1">
        <view class="item-label">使用日期：</view>
        <view class="item-text">{{info.expiryDateText}}</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">封顶小时：</view>
        <view class="item-text">{{time}}小时</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">适用门店：</view>
        <view class="item-text">{{info.storeName}}</view>
      </view>
      <view class="info-item u-flex">
        <view class="item-label">使用时间：</view>
        <view class="item-text">{{info.timeLimitStart}} - {{info.timeLimitEnd}}</view>
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
      info:'',
      astrictText:'',
      weekData: [
        {
          label: '周一',
          value: '1'
        },
        {
          label: '周二',
          value: '2'
        },
        {
          label: '周三',
          value: '3'
        },
        {
          label: '周四',
          value: '4'
        },
        {
          label: '周五',
          value: '5'
        },
        {
          label: '周六',
          value: '6'
        },
        {
          label: '周日',
          value: '7'
        }
      ],
      time:'',
    }
  },
  onLoad(options){
    this.info = JSON.parse(options.info);
    this.time = this.formatTime(this.info.cappingHours)
    console.log(this.time);
    if(this.info.restrictionType ===0){
      this.astrictText= '无限制'
    }else if(this.info.restrictionType ===1){
      let text=[];
      this.weekData.map((item)=>{
        if(this.info.availableTime.indexOf(item.value)>-1){
          text.push(item.label)
        }
      })
      this.astrictText = text.join('、')
    }else if(this.info.restrictionType ===2){
      this.astrictText = this.info.availableTime.split(',');
    }
    if(this.info.expireType ===1){
      let data=this.info.expiryDate.split(';');
      this.info.expiryDateText = data[0]+' 至 '+data[1]
    }
    if(!uni.getStorageSync('openId')){
      uni.navigateTo({
        url:`../login/login`
      })
      return false;
    }
  },
  methods: {
    payShow() {
      let data = {
        openId: this.$u.func.getOpenId(),
        id:this.info.id,
        storeId:this.info.storeId,
        storeName:this.info.storeName,
      }
      this.$u.api.timeCardBuy(data).then((res)=>{

      })
      // uni.navigateTo({
      //   url: 'paySuccess'
      // });
    },
    formatTime(time){
      console.log(time);
      return time / 60
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
      background: #EEEFF1;
    }
  }
}
</style>

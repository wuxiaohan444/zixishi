<template>
  <view class="container">
    <u-image height="334rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg" :lazy-load="true"></u-image>
    <view class="room-name u-font-32 u-bold u-black-color">天庆大厦店自习室</view>
    <view class="chooseDate u-flex u-row-around">
      <view :class="timeIndex===index?'chooseDate-item active':'chooseDate-item'" v-for="(item,index) in timeData" :key="index" @click="chooseTime(index)">
        <view>{{ item.week }}</view>
        <view>{{ item.date }}</view>
      </view>
    </view>
    <!--    通知-->
    <u-notice-bar mode="horizontal" :list="content" bg-color="#FCF8E3"></u-notice-bar>
    <view class="seat-time-box u-flex u-flex-wrap">
      <view class="seat-time-item" v-for="(item,index) in allData" :key="index">{{item}}</view>
    </view>
    <!--    底部按钮-->
    <view class="operation-btn u-flex u-row-between">
      <view class="u-font-24">合计 ：
        <text class="u-red-color u-font-34">¥5</text>
      </view>
      <view class="operation-right u-flex">
        <view :class="payIndex===1?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(1)">美团券</view>
        <view :class="payIndex===0?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(0)">去结算</view>
      </view>
    </view>
    <!--    美团-->
    <u-popup v-model="oneShow" mode="bottom" height="526" border-radius="19" :closeable="true">
      <view class="meituan-box">
        <view class="meituan-icon">
          <image src="../../static/images/meituan/meituan.png"></image>
        </view>
        <view class="demalCode-box u-flex u-row-between">
          <u-input v-model="demalCode" placeholder="请输入美团券码" style="width: 90%"/>
          <u-icon name="scan" size="36" @click="scanCode"></u-icon>
        </view>
        <u-button @click="submitCode" shape="circle" :custom-style="customStyle">提交</u-button>
      </view>
    </u-popup>
    <!--    审核券-->
    <u-popup v-model="twoShow" mode="bottom" height="582" border-radius="19" :closeable="true">
      <view class="ticket-box">
        <view class="ticket-item u-flex">
          <view class="ticket-item_left">【天庆店】</view>
          <view class="ticket-item_middle">
            <text class="u-bold u-black-color">3小时读书体验卡</text>
            <text class="number">（1张券）</text>
          </view>
          <view class="ticket-item_right">
            立即体验
          </view>
        </view>
        <view class="u-flex u-row-between">
          <view class="u-black-color u-font-28">验券数量</view>
          <u-number-box v-model="ticketNumber" @change="valChange"></u-number-box>
        </view>
        <view class="u-flex u-row-between">
          <view class="my-btn">取消</view>
          <view class="my-btn active">确认验券</view>
        </view>
      </view>
    </u-popup>
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
      ],
      oneShow: false,
      twoShow: false,
      demalCode: '',
      customStyle: {
        width: '688rpx',
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontsize: '31rpx',
        marginTop: '42rpx'
      },
      ticketNumber: 1,
      timeIndex:0,
      today:[],//今天
      tomorrow:[],//明天
      acquired:[],//后天
      businessHours:['08:00','18:00'],//营业时间
      intervalType:0,//0代表30分钟 1代表60分钟
      allData:[],
    }
  },
  onLoad() {
    for (let i=0;i<24;i++){
      if(this.intervalType===1){
        this.allData.push(this.addZero(i) + ':00' + '-' +this.addZero(i + 1) +':00')
      }
      if(this.intervalType===0){
        this.allData.push(this.addZero(i) + ':30' + '-' +this.addZero(i+1) +':00')
        if(i!==23){
          this.allData.push(this.addZero(i+1) + ':00' + '-' +this.addZero(i+1) +':30')
        }
      }
    }
    this.allData.map((item)=>{
      if(item==businessHours[0]){

      }
    })
  },
  methods: {
    choosePay(index) {
      this.payIndex = index;
      if (index === 1) {
        this.oneShow = true;
      }
    },
    // 提交券码
    submitCode() {
      this.oneShow = false;
      this.twoShow = true;
    },
    valChange() {

    },
    scanCode() {
      let that = this;
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function (res) {
          let result = res.result;
          console.log(result);
          that.submitCode()
        }
      });
    },
    chooseTime(index){
      this.timeIndex = index;
    },
    addZero(item){
      if(item>9){
        if(item==24){
          return '00'
        }else{
          return item
        }
      }else{
        return '0'+item
      }
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
  .chooseDate-item.active{
    color: #2487FF;
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
  .seat-time-item.disabled{
    background: #EEEEEF;
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

.meituan-box {
  padding-top: 65rpx;

  .meituan-icon {
    text-align: center;
    margin-bottom: 50rpx;

    image {
      width: 108rpx;
      height: 108rpx;
    }
  }

  .demalCode-box {
    border: 1px solid #B2B2B2;
    border-radius: 6rpx;
    margin: 0 30rpx;
    padding: 0 20rpx;
  }
}

.ticket-box {
  width: 750rpx;
  height: 582rpx;
  background: #F3F5F7;
  padding-top: 74rpx;
  padding-left: 31rpx;
  padding-right: 31rpx;
  box-sizing: border-box;

  .ticket-item {
    width: 688rpx;
    height: 217rpx;
    background: #FFFFFF;
    border-radius: 6rpx;
    margin-bottom: 22rpx;
    overflow: hidden;
    position: relative;

    .ticket-item_left {
      width: 197rpx;
      height: 217rpx;
      background: linear-gradient(-52deg, #FBD48B, #D49848);
      color: #FFFFFF;
      font-size: 31rpx;
      text-align: center;
      line-height: 217rpx;
    }

    .ticket-item_middle {
      width: 408rpx;
      height: 217rpx;
      border-right: 1px solid #E0E0E0;
      line-height: 217rpx;
      padding-left: 30rpx;
      box-sizing: border-box;

      .number {
        color: #999999;
      }
    }

    .ticket-item_right {
      width: 83rpx;
      font-size: 28rpx;
      color: #D69B4B;
      text-align: center;
      padding: 0 22rpx;
    }
  }

  .ticket-item::after, .ticket-item::before {
    content: '';
    position: absolute;
    background: #F3F5F7;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  .ticket-item::after {
    left: -20rpx;
  }

  .ticket-item::before {
    right: -20rpx;
  }

  .my-btn {
    width: 319rpx;
    height: 92rpx;
    background: #FFFFFF;
    border: 1px solid #C5C5C6;
    border-radius: 46rpx;
    font-size: 31rpx;
    font-weight: 500;
    color: #999999;
    text-align: center;
    line-height: 92rpx;
    margin-top: 46rpx;
  }

  .my-btn.active {
    background: #2487FF;
    border: 1px solid #2487FF;
    color: #FFFFFF;
  }
}
</style>

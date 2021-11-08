<template>
  <view class="container">
    <u-image height="334rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg" :lazy-load="true"></u-image>
    <view class="room-name u-font-32 u-bold u-black-color">{{ storeInfo.fullName }}</view>
    <view class="chooseDate u-flex u-row-around">
      <view :class="timeIndex===index?'chooseDate-item active':'chooseDate-item'" v-for="(item,index) in timeData"
            :key="index" @click="chooseTime(index)">
        <view>{{ item.week }}</view>
        <view>{{ item.date }}</view>
      </view>
    </view>
    <!--    通知-->
<!--    <u-notice-bar mode="horizontal" :list="content" bg-color="#FCF8E3"></u-notice-bar>-->
    <!--    时间-->
    <view class="seat-time-box u-flex u-flex-wrap" v-show="timeIndex===0">
      <view :class="[item.choose?'seat-time-item active':'seat-time-item',item.status===0?'disabled':'']" v-for="(item,index) in today" :key="index"
            @click="chooseTimeQuantum(index,item)">{{ format(item.startTime) }}-{{ format(item.endTime) }}
      </view>
      <view class="loading-box u-flex u-row-center u-col-center" v-show="loadingShow">
        <view>
          <u-loading mode="circle"></u-loading>
        </view>
      </view>
    </view>
    <view class="seat-time-box u-flex u-flex-wrap" v-show="timeIndex===1">
      <view :class="[item.choose?'seat-time-item active':'seat-time-item',item.status===0?'disabled':'']" v-for="(item,index) in tomorrow" :key="index"
            @click="chooseTimeQuantum(index,item)">{{ format(item.startTime) }}-{{ format(item.endTime) }}
      </view>
    </view>
    <view class="seat-time-box u-flex u-flex-wrap" v-show="timeIndex===2">
      <view :class="[item.choose?'seat-time-item active':'seat-time-item',item.status===0?'disabled':'']" v-for="(item,index) in acquired" :key="index"
            @click="chooseTimeQuantum(index,item)">{{ format(item.startTime) }}-{{ format(item.endTime) }}
      </view>
    </view>
    <!--    底部按钮-->
    <view class="operation-btn u-flex u-row-between">
      <view class="u-font-24">合计 ：
        <text class="u-red-color u-font-34">¥{{totalMoney}}</text>
      </view>
      <view class="operation-right u-flex">
        <view :class="payIndex===1?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(1)">美团券</view>
        <view :class="payIndex===0?'operation-btn-pay active':'operation-btn-pay'" @click="choosePay(0,'123123')">去结算
        </view>
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
          <view class="ticket-item_left">时长卡</view>
          <view class="ticket-item_middle">
            <text class="u-bold u-black-color">{{meiTuanForm.deal_title}}</text>
            <text class="number">（{{meiTuanForm.count}}张券）</text>
          </view>
          <view class="ticket-item_right">
            立即体验
          </view>
        </view>
        <view class="u-flex u-row-between">
          <view class="u-black-color u-font-28">验券数量</view>
          <u-number-box v-model="ticketNumber" @change="valChange" :min="minNumber" :max="maxNumber"></u-number-box>
        </view>
        <view class="u-flex u-row-between">
          <view class="my-btn">取消</view>
          <view class="my-btn active" @click="affirmCoupons">确认验券</view>
        </view>
      </view>
    </u-popup>
   <!--    支付-->
    <pay-type :show="payModalShow" :storeInfo="storeInfo" :user="user" :timeRanges="timeRanges" @close="payModalShow=false" :payInfo="payInfo" @pay="pay"></pay-type>
  </view>
</template>

<script>
import {getWeek, behindDate, getBusiness} from '../../utils/timeFunc'
import payType from "../../components/pay/payType";
import {accMul, Subtr} from "../../utils/calculate";

export default {
  name: "seat",
  components: {payType},
  data() {
    return {
      payModalShow:false,
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
      timeIndex: 0,
      today: [],//今天
      tomorrow: [],//明天
      acquired: [],//后天
      seatId: '',
      roomId: '',
      createDept: '',
      chargeSetId: '',
      storeInfo: '',
      loadingShow: true,
      totalMoney:0,
      user:'',
      timeRanges:'',
      payInfo:'',
      seatInfo:'',
      maxNumber:1,
      minNumber:1,
      meiTuanForm:{},
      roomInfo:{}
    }
  },
  onLoad(options) {
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.storeInfo = data;
      this.createDept = data.id;
    }
    if (uni.getStorageSync('roomInfo')) {
      let data = uni.getStorageSync('roomInfo');
      this.roomInfo = data;
    }
    this.user = uni.getStorageSync('userInfo');
    this.seatInfo = uni.getStorageSync('seatInfo');
    this.seatId = options.seatId;
    this.roomId = options.roomId;
    this.chargeSetId = options.chargeSetId;
    this.seatTimeList();
  },
  methods: {
    choosePay(index, orderId) {
      this.payIndex = index;
      if (index === 1) {
        this.oneShow = true;
        return false;
      }
      let today=[],tomorrow=[],acquired=[];
      this.today.map((item)=>{
        if(item.choose){
          today.push(item)
        }
      });
      this.tomorrow.map((item)=>{
        if(item.choose){
          tomorrow.push(item)
        }
      });
      this.acquired.map((item)=>{
        if(item.choose){
          acquired.push(item)
        }
      });
      let sumData = [];
      sumData= sumData.concat(today).concat(tomorrow).concat(acquired);
      let beginning =[sumData[0],sumData[sumData.length-1]];
      let startDate = beginning[0].bookDate+' '+beginning[0].startTime;
      let endDate = beginning[1].bookDate+' '+beginning[1].endTime;
      uni.setStorageSync('timeRanges',sumData);
      let couponMoney = accMul(this.user.seatDiscount,this.totalMoney);
      let cumulativeMinimumConsumption = this.seatInfo.cumulativeMinimumConsumption;
      if(couponMoney<=cumulativeMinimumConsumption){
        couponMoney = cumulativeMinimumConsumption
      }
      let timeRanges = []
      sumData.map((item,index)=>{
        timeRanges.push({
          startTime:item.startTime,
          endTime:item.endTime,
          unitPrice:item.unitPrice,
          totalPrice:item.totalPrice,
          status:item.status,
          bookDate:item.bookDate,
          startDate:item.startDate,
          endDate:item.endDate,
          index:index+1
        })
      })
      this.timeRanges = timeRanges;
      this.payInfo={
        startDate,
        endDate,
        couponMoney,
        roomId:this.roomId,
        seatId:this.seatId,
        totalMoney:this.totalMoney
      }
      this.payModalShow = true;
      // uni.navigateTo({
      //   url: `/pages/order/pay/pay?startDate=${startDate}&endDate=${endDate}&totalMoney=${this.totalMoney}`
      // })
    },
    // 提交券码
    submitCode() {
      let data = {
        storeId:this.storeInfo.id,
        receiptCode:this.demalCode,
      }
      this.$u.api.prepareMeituan(data).then((res)=>{
        console.log(res);
        if(res.code===200){
          this.meiTuanForm = res.data;
          this.oneShow = false;
          this.twoShow = true;
        }else{
          this.$u.toast(res.msg)
        }
      }).catch((res)=>{
        console.log(res);
        if(res.data.code==200){
          this.meiTuanForm = res.data.data;
          this.maxNumber = this.meiTuanForm.count
          this.oneShow = false;
          this.twoShow = true;
        }else{
          this.$u.toast(res.data.msg)
        }
      })
    },
    // 确认验券
    affirmCoupons(){
      let data = {
        storeId:this.storeInfo.id,
        receiptCode:this.demalCode,
        count:this.ticketNumber,
        phone:this.user.phone
      }
      this.$u.api.MeituanConsume(data).then((res)=>{
        if(res.code===200){
          console.log(res.data);
        }else{
          this.$u.toast(res.msg)
        }
      }).catch((res)=>{
        console.log(res);
        if(res.data.code==200){
          this.oneShow = false;
          this.twoShow = false;
          this.$u.toast('兑换时长卡成功')
        }else{
          this.$u.toast(res.data.msg)
        }
      })
    },
    valChange() {

    },
    scanCode() {
      let that = this;
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function (res) {
          that.demalCode = res.result;
          that.submitCode()
        }
      });
    },
    chooseTime(index) {
      this.timeIndex = index;
    },
    // 选择时间段
    chooseTimeQuantum: function (index, item) {
      if(item.status===0){
        return false
      }
      if (this.timeIndex === 0) {
        this.today[index].choose = !this.today[index].choose;
      } else if (this.timeIndex === 1) {
        this.tomorrow[index].choose = !this.tomorrow[index].choose;
      } else if (this.timeIndex === 2) {
        this.acquired[index].choose = !this.acquired[index].choose;
      }
      this.$forceUpdate();
      let todayArr = [], tomorrowArr = [], acquiredArr = [];
      this.today.map((item) => {
        if (item.choose) {
          todayArr.push(item.no)
        }
      });
      this.tomorrow.map((item) => {
        if (item.choose) {
          tomorrowArr.push(item.no)
        }
      })
      this.acquired.map((item) => {
        if (item.choose) {
          acquiredArr.push(item.no)
        }
      });
      if (todayArr.length > 0 && tomorrowArr.length > 0) {
        if (this.tomorrow[0].choose && todayArr.length > 0) {
          if (!this.today[this.today.length - 1].choose) {
            this.$u.toast('请选择连续的时间段')
            return false;
          }
        }else{
          this.$u.toast('请选择连续的时间段')
          return false;
        }
        if (this.today[this.today.length - 1].choose && tomorrowArr.length > 0) {
          if (!this.tomorrow[0].choose) {
            this.$u.toast('请选择连续的时间段')
            return false;
          }
        }else{
          this.$u.toast('请选择连续的时间段')
          return false;
        }
      }
      if (tomorrowArr.length > 0 && acquiredArr.length > 0) {
        if (this.acquired[0].choose && tomorrowArr.length > 0) {
          if (!this.tomorrow[this.tomorrow.length - 1].choose) {
            this.$u.toast('请选择连续的时间段')
            return false;
          }
        }else{
          this.$u.toast('请选择连续的时间段')
          return false;
        }
        if (this.tomorrow[this.tomorrow.length - 1].choose && acquiredArr.length > 0) {
          if (!this.acquired[0].choose) {
            this.$u.toast('请选择连续的时间段')
            return false;
          }
        }else{
          this.$u.toast('请选择连续的时间段')
          return false;
        }
      }
      let continuousToday = this.isContinuityNum(todayArr);//今天是否连续
      let continuousTomorrow = this.isContinuityNum(tomorrowArr);//明天是否连续
      let continuousAcquired = this.isContinuityNum(acquiredArr);//明天是否连续
      if (!continuousToday || !continuousTomorrow || !continuousAcquired) {
        this.$u.toast('请选择连续的时间段')
        return false;
      }
      if (todayArr.length > 0 && acquiredArr.length > 0&&tomorrowArr.length===0) {
        this.$u.toast('请选择连续的时间段')
        return false;
      }
      this.getPayment()
    },
    getPayment(){
      let arr=[];
      this.today.map((item) => {
        if (item.choose) {
          arr.push(item)
        }
      });
      this.tomorrow.map((item) => {
        if (item.choose) {
          arr.push(item)
        }
      })
      this.acquired.map((item) => {
        if (item.choose) {
          arr.push(item)
        }
      })
      let data = {
        roomId:this.roomId,
        seatId:this.seatId,
        seatTimeRanges:arr
      };
      this.$u.api.getPayment(data).then((res)=>{
        this.totalMoney = res.data;
      })
    },
    // 判断是否是连续时间端
    isContinuityNum(num) {
      let array = [];
      if (num instanceof Array) {
        array = [...num];
      } else {
        array = Array.from(num.toString())//转换为数组
      }

      var i = array[0];
      var isContinuation = true;
      for (var e in array) {
        if (array[e] != i) {
          isContinuation = false;
          break;
        }
        i++;
      }
      return isContinuation;
    },
    seatTimeList() {
      let data1 = {
        id: this.seatId,//座位id
        roomId: this.roomId,//房间Id
        createDept: this.createDept,
        defaultChargeSetId: this.chargeSetId,//计费规则
        bookDate: this.timeData[0].date,
      }
      this.loadingShow = true;
      this.$u.api.seatTimeList(data1).then((res) => {
        this.today = res.data;
        this.today.map((item) => {
          item.choose = false;
        })
        this.loadingShow = false;
      });
      let data2 = {
        id: this.seatId,//座位id
        roomId: this.roomId,//房间Id
        createDept: this.createDept,
        defaultChargeSetId: this.chargeSetId,//计费规则
        bookDate: this.timeData[1].date,
      }
      this.$u.api.seatTimeList(data2).then((res) => {
        this.tomorrow = res.data;
        this.tomorrow.map((item) => {
          item.choose = false;
        })
      })
      let data3 = {
        id: this.seatId,//座位id
        roomId: this.roomId,//房间Id
        createDept: this.createDept,
        defaultChargeSetId: this.chargeSetId,//计费规则
        bookDate: this.timeData[2].date,
      }
      this.$u.api.seatTimeList(data3).then((res) => {
        this.acquired = res.data;
        this.acquired.map((item) => {
          item.choose = false;
        })
      })
    },
    pay(){
      this.payModalShow = false;
    },
    format(str) {
      return str.substr(0, 5)
    },
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

  .chooseDate-item.active {
    color: #2487FF;
  }
}

.seat-time-box {
  padding-top: 32rpx;
  padding-left: 31rpx;

  .loading-box {
    width: 100%;
  }

  .seat-time-item {
    width: 208rpx;
    height: 94rpx;
    background: #FFFFFF;
    border: 1rpx solid #EEEFF1;
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

  .seat-time-item.disabled {
    background: #EEEEEF;
    color: #333333;
  }
}

.operation-btn {
  width: 750rpx;
  background: #FFFFFF;
  border-top: 1px solid #EEEFF1;
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
    border: 1px solid #EEEFF1;
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

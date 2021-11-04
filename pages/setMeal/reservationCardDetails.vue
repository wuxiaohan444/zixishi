<template>
  <view class="container card-details">
    <view class="my-table">
      <u-table font-size="23" border-color="#EEEFF1">
        <u-tr>
          <u-th background="#E1E4EB">日期</u-th>
          <u-th background="#E1E4EB">座位号</u-th>
          <u-th background="#E1E4EB">订座时间</u-th>
          <u-th background="#E1E4EB">时长</u-th>
        </u-tr>
        <u-tr v-for="(item,index) in tableData" :key="index">
          <u-td :background="index%2===0?'':'#F4F3F5'">{{ item.date }}</u-td>
          <u-td :background="index%2===0?'':'#F4F3F5'">{{ item.seat }}</u-td>
          <u-td :background="index%2===0?'':'#F4F3F5'">{{ item.time }}</u-td>
          <u-td :background="index%2===0?'':'#F4F3F5'">{{ item.duration }}</u-td>
        </u-tr>
      </u-table>
    </view>
    <view class="money-box">
      <view class="money-box-item u-flex u-row-between">
        <view class="money-box-item_label">合计时长：</view>
        <view class="money-box-item_content">{{durationTime}}小时</view>
      </view>
      <view class="money-box-item u-flex u-row-between">
        <view class="money-box-item_label">合计金额：</view>
        <view class="money-box-item_content">{{info.price}}元</view>
      </view>
      <view class="last-item u-flex u-row-right">
        <view class="label">售价：</view>
        <view class="price">{{info.price}}元</view>
      </view>
    </view>
    <u-button shape="circle" :custom-style="customStyle" @click="payShow">确认支付</u-button>
    <view class="loading-box u-flex u-row-center u-col-center" v-show="loadingShow">
      <view>
        <u-loading mode="circle"></u-loading>
      </view>
    </view>
  </view>
</template>

<script>
import {getAllDate} from '../../utils/timeFunc'
export default {
  name: "reservationCardDetails",
  data() {
    return {
      customStyle: {
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontSize: '31rpx',
        marginTop: '92rpx'
      },
      payModalShow: false,
      tableData: [],
      info:'',
      durationTime:'',
      loadingShow:true
    }
  },
  onLoad(options){
    console.log(JSON.parse(options.info));
    this.info = JSON.parse(options.info);
    let data = getAllDate(this.info.startDate, this.info.endDate);
    let duration = this.differ(this.info.startTime, this.info.endTime);
    this.durationTime = duration * data.length;
    let price = this.info.price / duration
    data.map((item)=>{
      this.tableData.push({
        date:item,
        seat: '1'+'号座位',
        time: this.info.startTime+' - '+this.info.endTime,
        duration: duration+'小时',
        price: price+'元'
      })
    });
    setTimeout(()=>{
      this.loadingShow = false
    },500)
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
    differ(start, end) {
      var d1 = new Date("1111/1/1 " + start);
      var d2 = new Date("1111/1/1 " + end);
      var gap = Math.abs(d1 - d2) / 1000 / 60 / 60;
      return gap
    },
  }

}
</script>

<style lang="scss">
page {
  background: #F6F6F6;
}
.loading-box{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  top: 0;
  left: 0;
  z-index: 9999;
}
.card-details {
  padding: 22rpx 30rpx;

  .my-table {
    background: #FFFFFF;
    border-radius: 6rpx;
    padding-bottom: 20rpx;
    overflow: hidden;
  }

  .money-box {
    width: 688rpx;
    height: 221rpx;
    background: #FFFFFF;
    border-radius: 6rpx;
    margin-top: 23rpx;
    padding: 0 15rpx;
    box-sizing: border-box;

    .money-box-item {
      border-bottom: 2rpx solid #EEEFF1;
      height: 71rpx;

      &_label {
        font-size: 28rpx;
        color: #8D8D8D;
      }

      &_content {
        font-size: 28rpx;
        color: #010101;
      }
    }

    .last-item {
      height: 71rpx;

      .label {
        font-size: 28rpx;
        color: #8D8D8D;
      }

      .price {
        font-size: 28rpx;
        color: #FC1716;
      }
    }
  }
}
</style>

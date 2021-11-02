<template>
  <view class="container" :style="{'height':winHeight+'rpx'}">
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF"
            :bar-style="barStyle"></u-tabs>
    <view class="card-box" v-show="current==0">
      <view class="card-list" @click="toDetails('2')" v-for="(item,index) in customerData" :key="index">
        <text class="tag u-font-23">{{item.storeName}}</text>
        <view class="info">
          <view class="u-font-32 u-bold">{{item.seatCardName}}</view>
          <view class="u-font-24 data">{{item.expDate}}到期</view>
        </view>
        <view class="times">
          <view class="u-font-24"></view>
          <view class="use u-font-23">去使用</view>
        </view>
      </view>
      <u-loadmore :status="status"/>
    </view>
    <view class="card-box" v-show="current==1">
      <view class="card-list" v-for="(item,index) in timeCardData" :key="index" @click="toDetails(item)">
        <text class="tag u-font-23">{{item.storeName}}</text>
        <view class="info">
          <view class="u-font-32 u-bold">{{item.durationCardName}}</view>
          <view class="u-font-24 data">{{item.expDate}}到期</view>
        </view>
        <view class="times">
          <view class="u-font-24">剩余：{{toHourMinute(item.surplusHours)}}</view>
          <view class="use u-font-23">去使用</view>
        </view>
      </view>
      <u-loadmore :status="status"/>
    </view>
  </view>
</template>

<script>
import {toHourMinute} from '../../utils/timeFunc'
const app = getApp();
export default {
  data() {
    return {
      winHeight: app.globalData.winHeight,
      current: 0,
      list: [
        {
          name: '订座套餐卡'
        }, {
          name: '预订时长卡'
        }
      ],
      page: 1,
      size: 10,
      isMore: false,
      status: '',
      tenantId: '',
      timeCardData: [],
      customerData:[],
    }
  },
  onLoad() {
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.myCardCustomerList()
  },
  methods: {
    change(index) {
      this.current = index;
      this.resetData()
      if(this.current===1){
        this.myCardTimeList()
      }else{
        this.myCardCustomerList();
      }
    },
    toDetails(item) {
      let info = JSON.stringify(item)
      uni.navigateTo({
        url: `/pages/my_card/detail/detail?info=${info}`
      })
    },
    myCardTimeList() {
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        current: this.page,
        size: this.size,
        tenantId: this.tenantId
      }
      this.$u.api.myCardTimeList(data).then((res) => {
        if (this.page > 1) {
          this.timeCardData = this.timeCardData.concat(res.data.records);
        } else {
          this.timeCardData = res.data.records;
        }
        this.isMore = this.timeCardData.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh();
      })
    },
    myCardCustomerList(){
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        current: this.page,
        size: this.size,
        tenantId: this.tenantId
      }
      this.$u.api.myCardCustomerList(data).then((res) => {
        if (this.page > 1) {
          this.customerData = this.customerData.concat(res.data.records);
        } else {
          this.customerData = res.data.records;
        }
        this.isMore = this.customerData.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh();
      })
    },
    resetData(){
      this.page = 1;
      this.size = 10;
      this.isMore = false;
      this.status = '';
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.resetData()
      if(this.current===1){
        this.myCardTimeList()
      }else{
        this.myCardCustomerList()
      }
    },
    //上拉加载
    onReachBottom() {
      if (!this.isMore) {
        return false;
      }
      this.page = this.page + 1;
      if(this.current===1){
        this.myCardTimeList()
      }else{
        this.myCardCustomerList()
      }
    },
    toHourMinute(minutes){
      return toHourMinute(minutes)
    }
  }
}
</script>

<style scoped lang="scss">
.container,
.card-box {
  background-color: #F5F5F5;
}

.card-box {
  padding: 26rpx 30rpx;

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
      border-bottom: 2rpx dashed #8B8B8B;
      padding: 22rpx 0;

      .data {
        color: #666666;
        margin-top: 20rpx;
      }
    }

    .times {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666666;
      padding-top: 10rpx;

      .use {
        width: 122rpx;
        height: 51rpx;
        background: #EB5940;
        border-radius: 26rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 51rpx;
      }
    }
  }
}

</style>

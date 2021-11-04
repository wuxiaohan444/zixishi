<template>
  <view class="container">
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF"
            :bar-style="barStyle"></u-tabs>
    <view class="setMeal-box">
      <view class="setMeal-box_item" v-for="(item,index) in timeCardList" :key="index" @click="skip(item)">
        <image src="https://cdn.uviewui.com/uview/swiper/2.jpg" class="item-img" :lazy-load="true" mode="aspectFill"></image>
        <view class="item-top u-flex">
          <view class="store-name">{{ item.storeName }}</view>
          <view class="card-name">{{ item.name }}</view>
        </view>
        <view class="item-bottom u-flex u-row-right">
          <view class="old-price">¥{{ item.originalPrice }}</view>
          <view class="new-price u-red-color">¥{{ item.price }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "setMeal",
  data() {
    return {
      list: [
        {
          name: '预订时长卡'
        }, {
          name: '套餐订座卡'
        }
      ],
      current: 0,
      barStyle: {
        width: '46rpx',
        height: '8rpx',
        background: '#2487FF',
        borderRadius: '4rpx'
      },
      timeCardList: [],
      page: 1,
      size: 10,
      isMore: false,
      status: '',
    }
  },
  onLoad(){
    this.getTimeCardList()
  },
  methods: {
    change(index) {
      this.current = index;
      this.resetData();
      if(this.current===1){
        this.GetContractSeatList()
      }else{
        this.getTimeCardList()
      }
    },
    // 获取时长卡
    getTimeCardList(){
      let params = {
        current: this.page,
        size: this.size
      };
      this.$u.api.timeCardList(params).then((res)=>{
        if(this.page>1){
          this.timeCardList = this.timeCardList.concat(res.data.records);
        }else{
          this.timeCardList = res.data.records;
        }
        this.isMore = this.timeCardList.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh();
      })
    },
    // 获取定座卡
    GetContractSeatList(){
      let params = {
        current: this.page,
        size: this.size
      };
      this.$u.api.contractSeatList(params).then((res)=>{
        if(this.page>1){
          this.timeCardList = this.timeCardList.concat(res.data.records);
        }else{
          this.timeCardList = res.data.records;
        }
        this.isMore = this.timeCardList.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh();
      })
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.resetData()
      if(this.current===1){
        this.GetContractSeatList()
      }else{
        this.getTimeCardList()
      }
    },
    //上拉加载
    onReachBottom() {
      if (!this.isMore) {
        return false;
      }
      this.page = this.page + 1;
      if(this.current===1){
        this.GetContractSeatList()
      }else{
        this.getTimeCardList()
      }
    },
    skip(item){
      if(this.current===1){
        uni.navigateTo({
          url: 'reservationCard?info='+JSON.stringify(item)
        });
      }else{
        uni.navigateTo({
          url: 'timeCard?info='+JSON.stringify(item)
        });
      }
    },
    resetData(){
      this.page = 1;
      this.size = 10;
      this.isMore = false;
      this.status = '';
    },
  }
}
</script>

<style lang="scss">
page {
  background: #F5F5F5;
}

.setMeal-box {
  padding: 30rpx 30rpx 0 30rpx;

  &_item {
    width: 690rpx;
    border-radius: 13rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    background: #FFFFFF;

    .item-img {
      width: 100%;
      height: 219rpx;
    }

    .item-top {
      padding: 5rpx 20rpx;

      .store-name {
        height: 37rpx;
        background: #2487FF;
        border-radius: 5rpx;
        color: #FFFFFF;
        font-size: 24rpx;
        line-height: 37rpx;
        padding: 0 15rpx;
      }

      .card-name {
        font-size: 31rpx;
        font-weight: 500;
        color: #010101;
        margin-left: 22rpx;
      }
    }

    .item-bottom {
      padding-right: 30rpx;
      padding-bottom: 10rpx;

      .old-price {
        font-size: 31rpx;
        font-weight: 500;
        text-decoration: line-through;
        color: #D2D2D2;
        margin-right: 22rpx;
      }

      .new-price {
        font-size: 34rpx;
        font-weight: 500;
      }
    }
  }
}
</style>

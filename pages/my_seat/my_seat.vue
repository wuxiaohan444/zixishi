<template>
  <view class="container" :style="{'height':winHeight+'rpx'}">
    <view class="seat-box">
      <view class="seat-list" v-for="(item,index) in cardData" :key="index">
        <view class="card-header u-flex">
          <view class="card-header-name u-ellipsis">{{item.durationCardName}}（{{item.storeName}}）</view>
        </view>
        <view class="content">
          <view class="title u-font-32">{{item.durationCardName}}（{{item.storeName}}）</view>
          <view class="doc-i">
            <view>
              <text>销售价格：</text>
              <text>{{item.salePirce}}元</text>
            </view>
            <view>
              <text>天数：</text>
              <text>{{item.durationDays}}天</text>
            </view>
          </view>
          <view class="doc">
            <view>使用时间段：</view>
            <view>{{item.contractSeat.startTime}}-{{item.contractSeat.endTime}}</view>
          </view>
          <view class="doc">
            <view>封顶小时：</view>
            <view>{{item.maxHours}}小时</view>
          </view>
          <view class="doc">
            <view>适用门店：</view>
            <view>{{item.storeName}}</view>
          </view>
          <view class="doc">
            <view>有 效 期：</view>
            <view>{{formatting(item.effectiveDate)}}至{{formatting(item.expDate)}}</view>
          </view>
        </view>
        <view class="details" @click="toDetails(item)">
          <view>座位详情</view>
        </view>
      </view>
      <u-loadmore :status="status"/>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      winHeight: app.globalData.winHeight,
      status: '',
      tenantId: '',
      cardData: []
    }
  },
  onLoad() {
    if (uni.getStorageSync('storeInfo')) {
      console.log();
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.mySeatList();
  },
  methods: {
    mySeatList() {
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        tenantId: this.tenantId,
        cardType: 1
      }
      this.$u.api.mySeatList(data).then((res) => {
        this.cardData = res.data;
        this.status = 'nomore'
        uni.stopPullDownRefresh();
      })
    },
    toDetails(item) {
      let info = JSON.stringify(item)
      uni.navigateTo({
        url: `/pages/my_seat/detail/detail?info=${info}`
      })
    },
    formatting(date){
      return date.substr(0,10)
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.mySeatList()
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  background-color: #F5F5F5;
}

.seat-box {
  background-color: #F5F5F5;
  padding: 30rpx;
}

.seat-list {
  padding: 15rpx;
  background-color: #FFFFFF;
  border-radius: 19rpx;
  clear: both;
  margin-bottom: 33rpx;

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

  .content {
    padding: 35rpx 0;
    color: #010101;

    .doc,
    .doc-i,
    .doc-i view {
      display: flex;
      margin-top: 40rpx;
    }

    .doc-i {
      view {
        margin-top: 0;
      }

      view:last-child {
        margin-left: 160rpx;
      }

      view > text:first-child {
        color: #8D8D8D;
      }
    }

    .doc {

      > view:first-child {
        color: #8D8D8D;
      }
    }
  }

  .details {
    display: flex;
    justify-content: flex-end;
    padding-top: 19rpx;
    border-top: 2rpx solid #E5E5E5;

    view {
      width: 168rpx;
      height: 60rpx;
      background: #FFFFFF;
      border: 2rpx solid #2487FF;
      border-radius: 30rpx;
      text-align: center;
      line-height: 60rpx;
      color: #2487FF;
    }
  }
}
</style>

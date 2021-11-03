<template>
  <view class="container">
    <view>
      <u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange"
                     :is-scroll="false"></u-tabs-swiper>
    </view>
    <view class="my-swiper">
      <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
              :style="{'height':winHeight+'rpx'}">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
            <view class="order-list" v-for="(item,index) in orderList" :key="index">
              <view class="list-item" @click="toDetailes(item)">
                <view class="top">
                  <view class="store">
                    <text class="u-font-31 u-bold">{{item.storeName}}</text>
                    <image src="/static/images/arrow.png"></image>
                  </view>
                  <view class="right u-font-26" v-if="item.orderStatus==0">待支付</view>
                  <view class="right u-font-26" v-if="item.orderStatus==1">支付成功</view>
                  <view class="right u-font-26" v-if="item.orderStatus==2">交易成功</view>
                  <view class="right u-font-26" v-if="item.orderStatus==3">已取消</view>
                </view>
                <view class="center">
                  <image src="https://cdn.uviewui.com/uview/swiper/3.jpg"></image>
                  <view class="info">
                    <view class="title u-font-26 u-black-color">{{item.roomName}}/{{item.seatName}}</view>
                    <view class="">下单时间:{{item.orderTime}}</view>
                    <view>预订时间段:</view>
                    <view class="time">{{item.startDate}}至{{item.endDate}}</view>
<!--                    <view class="password">开大门密码:123456</view>-->
                  </view>
                </view>
                <view class="price u-font-31">总计:
                  <text>¥3.0</text>
                </view>
                <view class="list-botton">
                  <view class="u-font-28" @tap.stop="cancel($event,'21323')" v-if="item.orderStatus==1">取消订单</view>
                  <view class="u-font-28 consumption" @tap.stop="toPay($event,'21323')" v-if="item.orderStatus==0">立即支付</view>
                </view>
              </view>
            </view>
            <view style="padding-top: 30rpx">
              <u-loadmore :status="status"/>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      list: [{
        name: '全部订单'
      },
        {
          name: '待付款'
        },
        {
          name: '支付成功',
        },
        {
          name: '已使用',
        },
        {
          name: '已取消',
        }
      ],
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      winHeight: app.globalData.winHeight,
      tenantId: '',
      page: 1,
      size: 10,
      isMore: false,
      status: '',
      orderList: [],
      orderStatus:''
    }
  },
  onLoad() {
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.getList()
  },
  methods: {
    getList() {
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        tenantId: this.tenantId,
        orderStatus: this.orderStatus
      }
      this.$u.api.orderList(data).then((res) => {
        this.orderList = res.data
        this.status = 'nomore'
        uni.stopPullDownRefresh();
      })
    },
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
      this.switchStatus(current)
    },
    // scroll-view到底部加载更多
    onreachBottom() {
      console.log(2)
    },
    toDetailes(item) {
      let info = JSON.stringify(item)
      uni.navigateTo({
        url: `/pages/order/detail/detail?info=${info}`
      })
    },
    cancel(e) {
      e.preventDefault();
      console.log('取消订单')
    },
    toPay(e, orderId) {
      e.preventDefault();
      uni.navigateTo({
        url: `/pages/order/pay/pay?orderId=${orderId}`
      })
    },
    switchStatus(index) {
      this.resetData()
      switch (index) {
        case 0:
          this.orderStatus = '';
          break;
        case 1:
          this.orderStatus = 0;
          break;
        case 2:
          this.orderStatus = 1;
          break;
        case 3:
          this.orderStatus = 2;
          break;
        case 4:
          this.orderStatus = 3;
      }
      this.getList();
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
      this.getList();
    },
    // //上拉加载
    // onReachBottom() {
    //   if (!this.isMore) {
    //     return false;
    //   }
    //   this.page = this.page + 1;
    //   this.getList();
    // },
  }
}
</script>

<style scoped lang="scss">
.my-swiper {
  background-color: #F5F5F5;
}

.order-list {
  padding: 30rpx 30rpx 0 30rpx;

  .list-item {
    padding: 35rpx 26rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx;

    .top {
      display: flex;
      justify-content: space-between;

      .store image {
        width: 12rpx;
        height: 21rpx;
        margin-left: 20rpx;
      }

      .right {
        color: #999999;
      }
    }

    .center {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 26rpx 0;
      border-bottom: 2rpx solid #CECECE;

      image {
        width: 130rpx;
        height: 130rpx;
        border-radius: 6rpx;
        margin-right: 27rpx;
      }

      .info {
        line-height: 40rpx;
        color: #666666;
        font-size: 24rpx;
      }
    }

    .price {
      text-align: right;
      margin-top: 22rpx;

      text {
        color: #FC1716;
      }
    }

    .list-botton {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #666666;
      padding-top: 10rpx;

      view {
        margin-left: 23rpx;
        width: 144rpx;
        height: 54rpx;
        line-height: 52rpx;
        background: #FFFFFF;
        border: 2rpx solid #EEEFF1;
        border-radius: 27rpx;
        text-align: center;
        color: #010101;
      }

      view.over {
        background-color: #D04D52;
        color: #FFFFFF;
        border-color: #D04D52;
      }

      view.consumption {
        background-color: #2487FF;
        color: #FFFFFF;
        border-color: #2487FF;
      }
    }
  }
}
</style>

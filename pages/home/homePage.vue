<template>
  <view class="container" :style="{'padding-top':customBarH+'px'}">
    <!--    自定义头部-->
    <view class="my-navigation" :style="{'height': customBarH+'px'}">
      <view>
        <view class="store-change u-black-color u-flex" :style="{'padding-top':marginTop+'px'}" @click="changeStore">
          <text class="u-font-31" @click>门店切换</text>
          <image src="../../static/images/home/change.png" class="change-icon"></image>
        </view>
        <view class="navigation-text u-black-color u-font-31 u-bold" :style="{'top':marginTop+'px'}">春深读书堂</view>
      </view>
    </view>
    <!--    门店信息-->
    <view class="room-header">
      <view class="room-header_top u-flex u-row-between">
        <view class="room-header_top_left u-flex">
          <text class="u-font-32 u-black-color u-bold">天庆店自习室</text>
          <text class="room-label">全天</text>
        </view>
        <view class="room-header_top_right">
          <image src="../../static/images/home/phone_icon.png" class="phone_icon"></image>
          <image src="../../static/images/home/address_icon.png" class="address_icon"></image>
        </view>
      </view>
      <view class="room-header_bottom u-flex u-row-between">
        <view class="room-header_bottom_left u-font-26 u-black-color">合肥市庐阳区天庆大厦309</view>
        <view class="room-header_bottom_right u-font-26">4.3Km</view>
      </view>
    </view>
    <!--    轮播图-->
    <view class="carousels">
      <u-swiper :list="list" height="314"></u-swiper>
    </view>
    <!--    切换房间-->
    <view class="room-change">
      <u-tabs :list="roomList" :is-scroll="false" :current="current" @change="change" :bar-style="barStyle"
              active-color="#2487FF"></u-tabs>
    </view>
    <!--    座位详情-->
    <view class="seat">
      <view class="seat-top u-flex u-row-between">
        <view class="u-flex">
          <image src="../../static/images/home/seatExamples_no_icon.png" class="seat_icon"></image>
          <text class="u-font-28 u-black-color">不可选</text>
          <image src="../../static/images/home/seatExamples_yes_icon.png" class="seat_icon"></image>
          <text class="u-font-28 u-black-color">可选</text>
        </view>
        <view class="seat-top_right u-font-28">查看平面图</view>
      </view>
      <view class="seat-box u-flex u-flex-wrap">
        <view class="seat-box_item" v-for="(item,index) in 12" @click="chooseSeat">
          <image src="../../static/images/home/seat_yes_icon.png" class="seat_icon"></image>
          <view class="u-font-28 u-black-color">{{index+1}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      customBarH: '',
      marginTop: '',
      list: [{
        image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
      },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
      current: 0,
      roomList: [
        {
          name: '自习室一'
        },
        {
          name: '自习室二'
        },
        {
          name: '自习室三'
        }
      ],
      barStyle: {
        width: '46rpx',
        height: '8rpx',
        background: '#2487FF',
        borderRadius: '4rpx'
      }
    }
  },
  onLoad() {
    this.getNavigationHeight()
  },
  methods: {
    // 获取自定义
    getNavigationHeight() {
      uni.getSystemInfo({
        success: (systemInfo) => {
          let custom = wx.getMenuButtonBoundingClientRect();
          let gap;
          if (systemInfo.platform === 'android') {
            gap = 8;
          } else if (systemInfo.platform === 'devtools') {
            if (systemInfo.platform === 'ios') {
              gap = 5.5; //开发工具中ios手机
            } else {
              gap = 7.5; //开发工具中android和其他手机
            }
          } else {
            gap = 4;
          }
          this.customBarH = custom.bottom + custom.top - systemInfo.statusBarHeight;
          this.marginTop = custom.top + gap;
        }
      })
    },
    change(index) {
      this.current = index;
    },
    changeStore(){
      uni.navigateTo({
        url: '../store/storeChange'
      });
    },
    chooseSeat(){
      uni.navigateTo({
        url: '../seat/seat'
      });
    }
  }
}
</script>

<style scoped lang="scss">
.my-navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .store-change {
    padding-left: 31rpx;

    .change-icon {
      width: 21rpx;
      height: 19rpx;
      margin-left: 14rpx;
    }
  }

  .navigation-text {
    position: absolute;
    left: 0;
    text-align: center;
    width: 100%;
    z-index: -1;
  }
}

.room-header {
  width: 750rpx;
  height: 120rpx;
  background: #F5F5F5;
  padding: 0 30rpx;
  box-sizing: border-box;

  &_top {
    padding-top: 16rpx;

    &_left {
      .room-label {
        font-size: 23rpx;
        color: #262626;
        margin-left: 15rpx;
        background: #E6E6E6;
        border-radius: 6rpx;
        padding: 5rpx 8rpx;
      }
    }

    &_right {
      .phone_icon {
        width: 29rpx;
        height: 32rpx;
      }

      .address_icon {
        width: 31rpx;
        height: 35rpx;
        margin-left: 52rpx;
      }
    }
  }

  &_bottom {
    padding-top: 10rpx;

    &_right {
      color: #262626;
    }
  }
}

.carousels {
  width: 690rpx;
  margin: 20rpx 30rpx;
}

.room-change {
  border-top: 1rpx solid #CECECE;
  border-bottom: 1rpx solid #CECECE;
}

.seat{
  padding: 20rpx 0;
  .seat-top{
    padding: 0 30rpx;
    .seat_icon{
      width: 32rpx;
      height: 31rpx;
      margin-right: 14rpx;
    }
    text{
      padding-right: 43rpx;
    }
    &_right{
      color: #F07100;
    }
  }
  .seat-box{
    padding-left: 14rpx;
    &_item{
      text-align: center;
      margin-top: 40rpx;
      width: 16%;
      .seat_icon{
        width: 60rpx;
        height: 58rpx;
      }
    }
  }
}
</style>

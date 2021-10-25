<template>
  <view class="container">
    <view class="my-navigation" :style="{'height': customBarH+'px'}">
      <view>
        <view class="store-change u-black-color u-flex" :style="{'margin-top':marginTop+4+'px'}">
          <text class="u-font-31">门店切换</text>
          <image src="../../static/images/home/change.png" class="change-icon"></image>
        </view>
        <view class="navigation-text u-black-color u-font-31 u-bold" :style="{'top':marginTop+4+'px'}">春深读书堂</view>
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
      marginTop:''
    }
  },
  onLoad() {
    this.getNavigationHeight()
  },
  methods: {
    getNavigationHeight() {
      uni.getSystemInfo({
        success:  (e)=> {
          this.customBarH = e.statusBarHeight
          // #ifndef MP
          if (e.platform == 'android') {
            this.customBarH = e.statusBarHeight + 50
          } else {
            this.customBarH = e.statusBarHeight + 45
          }
          // #endif
          // #ifdef MP-WEIXIN
          let custom = wx.getMenuButtonBoundingClientRect()
          console.log(custom)
          this.customBarH = custom.bottom + custom.top - e.statusBarHeight;
          this.marginTop = custom.top;
          // #endif
          // #ifdef MP-ALIPAY
          this.customBarH = e.statusBarHeight + e.titleBarHeight
          // #endif
        }
      })
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
  }
}
</style>

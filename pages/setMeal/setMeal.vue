<template>
  <view class="container">
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF" :bar-style="barStyle"></u-tabs>
    <view class="setMeal-box">
      <view class="setMeal-box_item">
        <image src="https://cdn.uviewui.com/uview/swiper/2.jpg" class="item-img" :lazy-load="true" mode="aspectFill"></image>
        <view class="item-top">
          <view class="store-name">大摩店</view>
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
      }
    }
  },
  methods: {
    change(index) {
      this.current = index;
    },
    // 下拉刷新
    onPullDownRefresh(){
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    //上拉加载
    onReachBottom(){

    }
  }
}
</script>

<style scoped lang="scss">
.setMeal-box{
  padding: 30rpx 30rpx 0 30rpx;
  &_item{
    width: 690rpx;
    height: 314rpx;
    border-radius: 13rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    .item-img{
      width: 100%;
      height: 219rpx;
    }
    .item-top{
      padding: 5rpx 20rpx;
      .store-name{
        height: 37rpx;
        background: #2487FF;
        border-radius: 5rpx;
        color: #FFFFFF;
        font-size: 24rpx;
        line-height: 37rpx;
      }
    }
  }
}
</style>

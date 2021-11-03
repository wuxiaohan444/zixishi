<template>
  <view class="container">
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF"
            :bar-style="barStyle"></u-tabs>
    <view class="setMeal-box">
      <view class="setMeal-box_item" v-for="(item,index) in timeCardList" :key="index" @click="skip">
        <image :src="item.img" class="item-img" :lazy-load="true" mode="aspectFill"></image>
        <view class="item-top u-flex">
          <view class="store-name">{{ item.storeName }}</view>
          <view class="card-name">{{ item.cardName }}</view>
        </view>
        <view class="item-bottom u-flex u-row-right">
          <view class="old-price">¥{{ item.oldPrice }}</view>
          <view class="new-price u-red-color">¥{{ item.newPrice }}</view>
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
      timeCardList: [
        {
          img: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          storeName: '大摩店',
          cardName: '17小时读书日卡(56小时)',
          oldPrice: '20',
          newPrice: '5'
        },
        {
          img: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          storeName: '大摩店',
          cardName: '17小时读书日卡(56小时)',
          oldPrice: '20',
          newPrice: '5'
        },  {
          img: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          storeName: '大摩店',
          cardName: '17小时读书日卡(56小时)',
          oldPrice: '20',
          newPrice: '5'
        },  {
          img: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          storeName: '大摩店',
          cardName: '17小时读书日卡(56小时)',
          oldPrice: '20',
          newPrice: '5'
        }
      ]
    }
  },
  methods: {
    change(index) {
      this.current = index;
    },
    timeCardList(){
      let params = {
        current: this.page,
        size: this.size
      };
      this.$u.api.timeCardList(params).then((res)=>{

      })
    },
    // 下拉刷新
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    //上拉加载
    onReachBottom() {
     this.timeCardList.push({
       img: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
       storeName: '大摩店',
       cardName: '17小时读书日卡(56小时)',
       oldPrice: '20',
       newPrice: '5'
     })
    },
    skip(){
      uni.navigateTo({
        url: 'reservationCard'
      });
    }
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

<template>
  <view class="container" :style="{'height':winHeight+'rpx'}">
    <view class="infos">
      <view>充值金额</view>
      <view class="price">
        <u-icon class="icon" name="rmb" :size="24"></u-icon>
        <input type="number" v-model="rechargeAmount" @input="inputMoney">
        <view>赠送¥{{ giveAmount }}</view>
      </view>
    </view>
    <view class="doc">
      <view class="current-price u-font-24">当前余额：¥{{balance}}</view>
      <u-button :custom-style="customStyle" shape="circle" type="primary" @click="rechargeMoney">去支付</u-button>
      <view class="activity-doc">
        <view>充值活动：</view>
        <view>赠送比例{{ giveProportion }}%</view>
      </view>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      winHeight: app.globalData.winHeight,
      customStyle: {
        marginTop: '62rpx'
      },
      storeId: '',
      storeName: '',
      rechargeAmount: '',
      giveAmount: 0,
      giveProportion: '',
      balance:'',
    }
  },
  onLoad() {
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.storeId = data.id;
      this.storeName = data.fullName
    }
    this.rechargeRule();
    this.balance = uni.getStorageSync('userInfo').balance;
  },
  methods: {
    // 开始支付
    rechargeMoney() {
      let data = {
        rechargeAmount: this.rechargeAmount,
        giveAmount: this.giveAmount,
        openId: this.$u.func.getOpenId(),
        storeId: this.storeId,
        storeName: this.storeName,
      }
      this.$u.api.rechargeMoney(data).then((res) => {
        if(res.code==200){
          this.payMent()
        }else {
          this.$u.toast(res.msg)
        }
      })
    },
    inputMoney() {
      this.giveAmount = this.rechargeAmount * this.giveProportion / 100
    },
    rechargeRule() {
      this.$u.api.rechargeRule().then((res) => {
        this.giveProportion = res.data.records[0].giveProportion
      })
    },
    getUserInfo() {
      let data={
        openId: this.$u.func.getOpenId()
      };
      this.$u.api.userInfo(data).then((res) => {
        console.log(res.data);
        this.info = res.data;
        uni.setStorageSync('userInfo', this.info);
        this.balance = uni.getStorageSync('userInfo').balance;
      })
    },
    payMent(){
      let that=this;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: String(Date.now()),
        nonceStr: 'A1B2C3D4E5',
        package: 'prepay_id=wx20180101abcdefg',
        signType: 'MD5',
        paySign: '',
        success: function (res) {
          that.getUserInfo();
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err));
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  background-color: #F5F5F5;
  color: #010101;
}

.infos {
  background-color: #FFFFFF;
  padding: 112rpx 30rpx 55rpx 30rpx;

  .price {
    height: 94rpx;
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-top: 19rpx;

    .icon {
      position: absolute;
      bottom: 20rpx;
      left: 23rpx;
    }

    input {
      width: 208rpx;
      height: 94rpx;
      background: #FFFFFF;
      border: 2rpx solid #EEEFF1;
      border-radius: 6rpx;
      padding-left: 56rpx;
      font-size: 71rpx;
      font-weight: bold;
    }

    view {
      margin-left: 19rpx;
      font-size: 31rpx;
      color: #2487FF;
    }
  }
}

.doc {
  padding: 19rpx 30rpx;

  .activity-doc {
    padding: 48rpx 78rpx;
    color: #B9B9B9;
    font-size: 27rpx;
    line-height: 50rpx;
  }
}

</style>

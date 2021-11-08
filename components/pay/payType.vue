<template>
  <view class="payType">
    <u-mask :show="show"  @click="close">
      <view class="warp">
        <view class="rect" @click.stop>
          <image src="../../static/images/pay/close.png" class="close-icon" @click="close"></image>
          <view class="price">¥{{payInfo.couponMoney}}</view>
          <view class="pay-type">
            <view class="pay-type-item u-flex u-row-between" @click="chooseType(0)">
              <view class="item-left u-flex">
                <view class="pay-icon u-flex u-col-center u-row-center">
                  <image src="../../static/images/pay/card.png"></image>
                </view>
                <text class="type-name">时长卡支付:</text>
              </view>
              <view class="item-right u-flex">
                <image v-if="payIndex===0" src="../../static/images/pay/choose.png" class="choose-icon"></image>
                <view class="no-choose" v-else></view>
              </view>
            </view>
            <view class="pay-type-item u-flex u-row-between" @click="chooseType(1)">
              <view class="item-left u-flex">
                <view class="pay-icon u-flex u-col-center u-row-center">
                  <image src="../../static/images/pay/banlce.png"></image>
                </view>
                <text class="type-name">余额支付:</text>
              </view>
              <view class="item-right u-flex">
                <text class="u-font-28 u-black-color">￥{{user.balance}}</text>
                <image v-if="payIndex===1" src="../../static/images/pay/choose.png" class="choose-icon"></image>
                <view class="no-choose" v-else></view>
              </view>
            </view>
            <view class="pay-type-item u-flex u-row-between" @click="chooseType(2)">
              <view class="item-left u-flex">
                <view class="pay-icon u-flex u-col-center u-row-center">
                  <image src="../../static/images/pay/wx.png"></image>
                </view>
                <text class="type-name">微信支付:</text>
              </view>
              <view class="item-right u-flex">
                <image v-if="payIndex===2" src="../../static/images/pay/choose.png" class="choose-icon"></image>
                <view class="no-choose" v-else></view>
              </view>
            </view>
          </view>
          <view class="my-button"  @click="pay">确认支付</view>
        </view>
      </view>
    </u-mask>
  </view>
</template>

<script>
export default {
  name: "payType",
  props:['show','user','storeInfo','timeRanges','totalMoney','couponMoney','payInfo'],
  data(){
    return{
      payIndex:0,
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    chooseType(number){
     this.payIndex = number
    },
    pay(){
      uni.showLoading({
        title: '加载中'
      });
      let type='';
      if(this.payIndex==0){
        type = 6
      }
      if(this.payIndex==1){
        type = 7
      }
      if(this.payIndex==2){
        type = 2
      }
      this.payModalShow = false;
      let data = {
        tenantId:this.storeInfo.tenantId,
        userName:this.user.memberName,
        mobilePhone:this.user.phone,
        memberId:this.user.id,
        memberLevel:this.user.memberLevelId,
        storeId:this.storeInfo.id,
        roomId:this.payInfo.roomId,
        seatId:this.payInfo.seatId,
        startDate:this.timeFormat(this.payInfo.startDate),
        endDate:this.timeFormat(this.payInfo.endDate),
        amount:this.payInfo.totalMoney,
        actualPayment:this.payInfo.couponMoney,
        payType:type,
        cardType:0,
        timeRanges:JSON.stringify(this.timeRanges),
        seatDiscount:this.user.seatDiscount?this.user.seatDiscount:0
      };
      this.$u.api.generateOrder(data).then((res)=>{
        this.confirmOrderPay(res.data.id)
      }).catch((res)=>{
        uni.hideLoading()
      })
    },
    confirmOrderPay(id){
      let data = {
        id:id,
        openId: this.$u.func.getOpenId()
      }
      this.$u.api.confirmOrderPay(data).then((res)=>{
       this.close()
        uni.hideLoading()
        if(res.code===200){
          if(this.payIndex==2){
            this.payMent()
          }else{
            uni.navigateTo({
              url:'/pages/pay/paySuccess?orderId='+id
            })
          }
        }else{
          this.$u.toast(res.msg)
        }
      })
    },
    close(){
      this.$emit('pay');
    },
    timeFormat(str) {
      return str.substr(0, 16)
    },
    payMent(){
      let that = this;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: String(Date.now()),
        nonceStr: 'A1B2C3D4E5',
        package: 'prepay_id=wx20180101abcdefg',
        signType: 'MD5',
        paySign: '',
        success: function (res) {
          uni.navigateTo({
            url:'/pages/pay/paySuccess?orderId='+id
          })
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
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .rect {
    width: 588rpx;
    height: 660rpx;
    background: #FFFFFF;
    border-radius: 13rpx;
    .close-icon{
      width: 36rpx;
      height: 36rpx;
      margin-top: 13rpx;
      margin-left: 19rpx;
    }
    .price{
      font-size: 64rpx;
      color: #000000;
      text-align: center;
      padding-top: 30rpx;
      padding-bottom: 50rpx;
    }
    .pay-type{
      margin: 0 30rpx;
      border-top: 1px solid #DEDEDE;
      .pay-type-item{
        height: 96rpx;
        border-bottom: 1px solid #DEDEDE;
        .item-left{
          .pay-icon{
            width: 71rpx;
            height: 71rpx;
            background: #FFFFFF;
            border: 1px solid #DEDEDE;
            border-radius: 50%;
            margin-right: 14rpx;
            image{
              width: 46rpx;
              height: 46rpx;
            }
          }
          .type-name{
            font-size: 28rpx;
            color: #8D8D8D;
          }
        }
        .item-right{
          .no-choose{
            width: 37rpx;
            height: 37rpx;
            background: #FFFFFF;
            border: 1px solid #B2B2B2;
            border-radius: 50%;
            margin-left: 45rpx;
            box-sizing: border-box;
          }
          .choose-icon{
            width: 37rpx;
            height: 37rpx;
            margin-left: 45rpx;
          }
        }
      }
    }
    .my-button{
      width: 319rpx;
      height: 92rpx;
      background: #2487FF;
      border-radius: 46rpx;
      color: #FFFFFF;
      font-size: 31rpx;
      text-align: center;
      line-height: 92rpx;
      margin: 40rpx auto;
    }
  }
}
</style>

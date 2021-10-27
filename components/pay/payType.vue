<template>
  <view class="payType">
    <u-mask :show="show"  @click="close">
      <view class="warp">
        <view class="rect" @click.stop>
          <image src="../../static/images/pay/close.png" class="close-icon"></image>
          <view class="price">¥15.0</view>
          <view class="pay-type">
            <view class="pay-type-item u-flex u-row-between" @click="chooseType(0)">
              <view class="item-left u-flex">
                <view class="pay-icon u-flex u-col-center u-row-center">
                  <image src="../../static/images/pay/banlce.png"></image>
                </view>
                <text class="type-name">余额支付:</text>
              </view>
              <view class="item-right u-flex">
                <text class="u-font-28 u-black-color">￥25</text>
                <view class="no-choose" v-if="!balanceChoose"></view>
                <image v-if="balanceChoose" src="../../static/images/pay/choose.png" class="choose-icon"></image>
              </view>
            </view>
            <view class="pay-type-item u-flex u-row-between" @click="chooseType(1)">
              <view class="item-left u-flex">
                <view class="pay-icon u-flex u-col-center u-row-center">
                  <image src="../../static/images/pay/wx.png"></image>
                </view>
                <text class="type-name">微信支付:</text>
              </view>
              <view class="item-right u-flex">
                <view class="no-choose" v-if="!wxChoose"></view>
                <image v-if="wxChoose" src="../../static/images/pay/choose.png" class="choose-icon"></image>
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
  props:['show'],
  data(){
    return{
      balanceChoose:false,
      wxChoose:false,
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    chooseType(number){
      if(number===0){
        this.balanceChoose=!this.balanceChoose;
      }
      if(number===1){
        this.wxChoose=!this.wxChoose;
      }
    },
    pay(){
      console.log(1);
      this.$emit('pay')
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
    height: 597rpx;
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

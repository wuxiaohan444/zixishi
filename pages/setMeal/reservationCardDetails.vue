<template>
<view class="container card-details">
  <view class="my-table">
    <u-table font-size="23" border-color="#EEEFF1">
      <u-tr>
        <u-th width="178rpx" background="#E1E4EB">日期</u-th>
        <u-th background="#E1E4EB">座位号</u-th>
        <u-th width="160rpx" background="#E1E4EB">订座时间</u-th>
        <u-th width="122rpx" background="#E1E4EB">时长</u-th>
        <u-th width="127rpx" background="#E1E4EB">价格</u-th>
      </u-tr>
      <u-tr v-for="(item,index) in tableData" :key="index">
        <u-td width="178rpx" :background="index%2===0?'':'#F4F3F5'">{{item.date}}</u-td>
        <u-td :background="index%2===0?'':'#F4F3F5'">{{item.seat}}</u-td>
        <u-td width="160rpx" :background="index%2===0?'':'#F4F3F5'">{{item.time}}</u-td>
        <u-td width="122rpx" :background="index%2===0?'':'#F4F3F5'">{{item.duration}}</u-td>
        <u-td width="127rpx" :background="index%2===0?'':'#F4F3F5'">{{item.price}}</u-td>
      </u-tr>
    </u-table>
  </view>
  <view class="money-box">
    <view class="money-box-item u-flex u-row-between">
      <view class="money-box-item_label">合计时长：</view>
      <view class="money-box-item_content">48小时</view>
    </view>
    <view class="money-box-item u-flex u-row-between">
      <view class="money-box-item_label">合计金额：</view>
      <view class="money-box-item_content">144元</view>
    </view>
    <view class="last-item u-flex u-row-right">
      <view class="label">售价：</view>
      <view class="price">100元</view>
    </view>
  </view>
  <u-button shape="circle" :custom-style="customStyle" @click="payShow">确认支付</u-button>
  <pay-type :show="payModalShow" @close="payModalShow=false" @pay="pay"></pay-type>
</view>
</template>

<script>
import payType from "../../components/pay/payType";
export default {
  name: "reservationCardDetails",
  components: {payType},
  data(){
    return{
      customStyle: {
        height: '92rpx',
        background: '#2487FF',
        color: '#ffffff',
        fontSize: '31rpx',
        marginTop: '92rpx'
      },
      payModalShow:false,
      tableData:[
        {
          date:'20201-09-08',
          seat:'1',
          time:'18:00-24:00',
          duration:'6小时',
          price:'18元'
        },
        {
          date:'20201-09-08',
          seat:'1',
          time:'18:00-24:00',
          duration:'6小时',
          price:'18元'
        },  {
          date:'20201-09-08',
          seat:'1',
          time:'18:00-24:00',
          duration:'6小时',
          price:'18元'
        },  {
          date:'20201-09-08',
          seat:'1',
          time:'18:00-24:00',
          duration:'6小时',
          price:'18元'
        }
      ]
    }
  },
  methods:{
    payShow(){
      this.payModalShow=true
    },
    pay(){

    }
  }

}
</script>

<style lang="scss">
page{
  background: #F6F6F6;
}
.card-details{
  padding: 22rpx 30rpx;
  .my-table{
    background: #FFFFFF;
    border-radius: 6rpx;
    padding-bottom: 20rpx;
    overflow: hidden;
  }
  .money-box{
    width: 688rpx;
    height: 221rpx;
    background: #FFFFFF;
    border-radius: 6rpx;
    margin-top: 23rpx;
    padding: 0 15rpx;
    box-sizing: border-box;
    .money-box-item{
      border-bottom: 2rpx solid #EEEFF1;
      height: 71rpx;
      &_label{
        font-size: 28rpx;
        color: #8D8D8D;
      }
      &_content{
        font-size: 28rpx;
        color: #010101;
      }
    }
    .last-item{
      height: 71rpx;
      .label{
        font-size: 28rpx;
        color: #8D8D8D;
      }
      .price{
        font-size: 28rpx;
        color: #FC1716;
      }
    }
  }
}
</style>

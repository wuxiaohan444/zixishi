<template>
  <view class="container">
    <view class="account">
      <view class="account-info">
        <view class="u-font-26">账户余额</view>
        <view class="price">{{balance}}
          <text class="u-font-26">元</text>
        </view>
      </view>
      <u-button :custom-style="customStyle" shape="circle" size="mini" @click="recharge">立即充值</u-button>
    </view>
    <view class="detailed">
      <view class="titles">
        <text :class="current==0?'active':''" @click="change(0)">充值明细</text>
        <text :class="current==1?'active':''" @click="change(1)">使用明细</text>
      </view>
      <view class="detailed-info" v-show="current==0">
        <view v-for="(item,index) in rechargeData" :key="index" class="detailed-info-box">
          <view class="detailed-info-item">
            <text>充值时间</text>
            <text>{{ item.createTime }}</text>
          </view>
          <view class="detailed-info-item">
            <text>充值前余额</text>
            <text>¥{{ item.beforeBalance }}</text>
          </view>
          <view class="detailed-info-item">
            <text>充值金额</text>
            <text>¥{{ item.rechargeAmount }}</text>
          </view>
          <view class="detailed-info-item">
            <text>赠送金额</text>
            <text>¥{{ item.giveAmount }}</text>
          </view>
          <view class="detailed-info-item">
            <text>充值门店</text>
            <text>{{ item.storeName ? item.storeName : '--' }}</text>
          </view>
          <view class="detailed-info-item">
            <text>状态</text>
            <text>{{ item.status == 1 ? '正常' : '失败' }}</text>
          </view>
        </view>
      </view>
      <view class="detailed-info" v-show="current==1">
        <view class="detailed-info-box" v-for="(item,index) in usedData" :key="index">
          <view class="detailed-info-item">
            <text>使用时间</text>
            <text>{{item.createTime}}</text>
          </view>
          <view class="detailed-info-item">
            <text>使用前余额</text>
            <text>{{item.beforeBalance}}</text>
          </view>
          <view class="detailed-info-item">
            <text>使用余额</text>
            <text>{{item.usedAmount}}</text>
          </view>
          <view class="detailed-info-item">
            <text>使用门店</text>
            <text>{{item.storeName}}</text>
          </view>
          <view class="detailed-info-item">
            <text>状态</text>
            <text>{{ item.status == 1 ? '正常' : '失败' }}</text>
          </view>
        </view>
      </view>
      <u-loadmore :status="status"/>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      customStyle: {
        height: '78rpx',
        marginTop: '35rpx',
        width: '173rpx',
        color: '#3470FF',
        fontSize: '26rpx'
      },
      rechargeData: [],
      usedData:[],
      page: 1,
      size: 10,
      isMore: false,
      status: '',
      balance:'',
    }
  },
  onLoad() {
    this.rechargeList();
    this.balance = uni.getStorageSync('userInfo').balance;
  },
  methods: {
    // 充值记录
    rechargeList() {
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        current: this.page,
        size: this.size
      }
      this.$u.api.rechargeList(data).then((res) => {
        if(this.page>1){
          this.rechargeData = this.rechargeData.concat(res.data.records);
        }else{
          this.rechargeData = res.data.records;
        }
        this.isMore = this.rechargeData.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh();
      })
    },
    // 使用记录
    usedList(){
      this.status = 'loading'
      let data = {
        openId: this.$u.func.getOpenId(),
        current: this.page,
        size: this.size
      }
      this.$u.api.usedList(data).then((res) => {
        if(this.page>1){
          this.usedData = this.usedData.concat(res.data.records);
        }else{
          this.usedData = res.data.records;
        }
        this.isMore = this.usedData.length < res.data.total;
        if (this.isMore) {
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
        uni.stopPullDownRefresh()
      })
    },
    recharge() {
      uni.navigateTo({
        url: '/pages/recharge/recharge'
      })
    },
    change(index) {
      this.current = index;
      this.resetData()
      if(this.current===1){
        this.usedList()
      }else{
        this.rechargeList()
      }
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
      if(this.current===1){
        this.usedList()
      }else{
        this.rechargeList()
      }
    },
    //上拉加载
    onReachBottom() {
      if (!this.isMore) {
        return false;
      }
      this.page = this.page + 1;
      if(this.current===1){
        this.usedList()
      }else{
        this.rechargeList()
      }
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 40rpx 30rpx;
}

.account {
  padding: 40rpx;
  background: linear-gradient(90deg, #259BFF, #3470FF);
  border-radius: 20rpx;

  .account-info {
    color: #FFFFFF;
    border-bottom: 2rpx solid #81B3F1;

    .price {
      font-size: 64rpx;
      margin: 20rpx 0 40rpx 0;

      text {
        margin-left: 15rpx;
      }
    }
  }
}

.detailed {
  margin-top: 37rpx;
  padding: 30rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);

  .titles {
    border-bottom: 2rpx dashed #A3A3A3;
    padding-bottom: 34rpx;

    text {
      margin-right: 74rpx;
      font-size: 31rpx;
      color: #010101;
    }

    text.active {
      position: relative;
      color: #2487FF;
    }

    text.active::before {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: -15rpx;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2487FF;
      border-radius: 4rpx;
      width: 48rpx;
      height: 8rpx;
    }
  }

  .detailed-info {
    padding-top: 20rpx;

    .detailed-info-box {
      border-bottom: 2rpx dashed #A3A3A3;
      padding-top: 26rpx;

      .detailed-info-item {
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        color: #010101;
        margin-bottom: 22rpx;

        > text:first-child {
          color: #8D8D8D;
        }
      }
    }
    .detailed-info-box:last-child{
      border: none;
    }
    .detailed-info-box:first-child {
      padding-top: 0rpx;
    }
  }
}

</style>

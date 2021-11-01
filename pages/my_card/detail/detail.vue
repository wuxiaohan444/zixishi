<template>
  <view class="container">
    <view class="seat-list">
      <view class="card-header u-flex">
        <view class="card-header-name u-ellipsis">{{ info.durationCardName }}（{{info.storeName}}）</view>
      </view>
      <view class="content">
        <view class="title u-font-32 u-bold">{{ info.durationCardName }}（{{info.storeName}}）</view>
        <view class="doc">
<!--          <view>-->
<!--            <text>剩余天数：</text>-->
<!--            <text>0天</text>-->
<!--          </view>-->
          <view>
            <text>剩余时长：</text>
            <text>{{toHourMinute(info.surplusHours)}}</text>
          </view>
        </view>
        <view class="doc">
          <view>使用日期：</view>
          <view>{{info.expDate}}到期</view>
        </view>
        <view class="doc">
          <view>适用门店：</view>
          <view>{{info.storeName}}</view>
        </view>
      </view>
      <view class="record">
        <view class="title u-font-32 u-bold">使用记录</view>
        <view class="table">
          <u-table :font-size="23">
            <u-tr>
              <u-th fontSize="23rpx">开始使用时间</u-th>
              <u-th fontSize="23rpx">结束使用时间</u-th>
              <u-th fontSize="23rpx">消费时长</u-th>
              <u-th fontSize="23rpx" width="178rpx">消费后剩余时长</u-th>
            </u-tr>
            <block v-for="item in list">
              <u-tr>
                <u-td>{{ item.startDate }}</u-td>
                <u-td>{{ item.endDate }}</u-td>
                <u-td>{{ item.time }}</u-td>
                <u-td width="178rpx">{{ toHourMinute(item.surplusHours) }}</u-td>
              </u-tr>
            </block>
          </u-table>
        </view>
        <view style="padding-top: 50rpx">
          <u-empty text="暂无使用记录" mode="list" v-show="emptyShow"></u-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {toHourMinute} from '../../../utils/timeFunc'
export default {
  data() {
    return {
      list: [],
      info: '',
      tenantId:'',
      emptyShow:false
    }
  },
  onLoad(options) {
    this.info = JSON.parse(options.info);
    if (uni.getStorageSync('storeInfo')) {
      let data = uni.getStorageSync('storeInfo');
      this.tenantId = data.tenantId;
    }
    this.getList()
  },
  methods: {
    getList(){
      let data = {
        openId: this.$u.func.getOpenId(),
        current: 1,
        size:9999,
        tenantId: this.tenantId,
        durationCardId:this.info.id
      }
      this.$u.api.myCardTimeDetails(data).then((res) => {
        this.list = res.data.records;
        this.emptyShow = this.list.length <= 0;
      })
    },
    toHourMinute(minutes){
      return toHourMinute(minutes)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 30rpx;
}

.seat-list {
  padding: 15rpx;
  background-color: #FFFFFF;
  border-radius: 19rpx;
  clear: both;
  margin-bottom: 33rpx;

  .card-header {
    width: 100%;
    height: 179rpx;
    background-image: linear-gradient(90deg, #3B72FC, #8BB5FF);
    border-radius: 10rpx;
    padding: 50rpx;
    box-sizing: border-box;

    .card-header-name {
      color: #FFFFFF;
      font-size: 28rpx;
      font-weight: bold;
    }
  }

  .content {
    padding: 35rpx 0;
    color: #010101;
    border-bottom: 2rpx solid #EEEFF1;

    .doc,
    .doc-i,
    .doc-i view {
      display: flex;
      margin-top: 40rpx;
    }

    .doc-i {
      view {
        margin-top: 0;
      }

      view:last-child {
        margin-left: 160rpx;
      }

      view > text:first-child {
        color: #8D8D8D;
      }
    }

    .doc {

      > view:first-child {
        color: #8D8D8D;
      }
    }
  }

  .record {
    padding-top: 33rpx;

    .title {
      position: relative;
      padding-left: 18rpx;

      &::after {
        content: '';
        width: 8rpx;
        height: 30rpx;
        border-radius: 4rpx;
        background-color: #2487FF;
        position: absolute;
        left: 0;
        top: 52%;
        transform: translateY(-50%);
      }
    }

    .table {
      margin-top: 32rpx;
    }
  }
}
</style>

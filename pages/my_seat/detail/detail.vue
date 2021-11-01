<template>
  <view class="container">
    <view class="table">
      <u-table :font-size="23">
        <u-tr>
          <u-th width="178rpx">日期</u-th>
          <u-th>座位号</u-th>
          <u-th width="178rpx">订座时间</u-th>
          <u-th>时长</u-th>
          <u-th>价格</u-th>
        </u-tr>
        <block v-for="item in list">
          <u-tr>
            <u-td width="178rpx">{{ item.data }}</u-td>
            <u-td>{{ item.number }}</u-td>
            <u-td width="178rpx">{{ item.time }}</u-td>
            <u-td>{{ item.duration }}小时</u-td>
            <u-td>{{ item.price }}元</u-td>
          </u-tr>
        </block>
      </u-table>
    </view>
    <view class="all-time u-font-28">合计时长：
      <text class="u-black-color">{{ durationTime }}小时</text>
    </view>
  </view>
</template>

<script>
import {getAllDate} from '../../../utils/timeFunc'

export default {
  data() {
    return {
      list: [],
      info: '',
      durationTime: 0
    }
  },
  onLoad(options) {
    this.info = JSON.parse(options.info);
    let dateData = getAllDate(this.formatting(this.info.effectiveDate), this.formatting(this.info.expDate));
    let duration = this.differ(this.info.contractSeat.startTime, this.info.contractSeat.endTime);
    this.durationTime = duration * dateData.length
    dateData.map((item) => {
      this.list.push({
        data: item,
        number: this.info.contractSeat.seatName,
        price: this.info.salePirce / duration,
        duration: duration,
        time: this.info.contractSeat.startTime + '-' + this.info.contractSeat.endTime,
      })
    })
  },
  methods: {
    formatting(date) {
      return date.substr(0, 10)
    },
    differ(start, end) {
      var d1 = new Date("1111/1/1 " + start);
      var d2 = new Date("1111/1/1 " + end);
      var gap = Math.abs(d1 - d2) / 1000 / 60 / 60;
      return gap
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 20rpx 30rpx;
}

.table {
  background-color: #FFFFFF;
  padding-bottom: 22rpx;
}

.all-time {
  text-align: right;
  color: #8D8D8D;
}
</style>

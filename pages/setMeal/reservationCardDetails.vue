<template>
<view class="container card-details">
  <u-table font-size="23">
    <u-tr>
      <u-th width="178rpx">日期</u-th>
      <u-th width="99rpx">座位号</u-th>
      <u-th width="160rpx">订座时间</u-th>
      <u-th width="122rpx">时长</u-th>
      <u-th width="127rpx">价格</u-th>
    </u-tr>
    <u-tr>
      <u-td width="178rpx">20201-09-08</u-td>
      <u-td width="99rpx">1</u-td>
      <u-td width="160rpx">22</u-td>
      <u-td width="122rpx">22</u-td>
      <u-td width="127rpx">22</u-td>
    </u-tr>
    <u-tr>
      <u-td width="178rpx">20201-09-08</u-td>
      <u-td width="99rpx">1</u-td>
      <u-td width="160rpx">20</u-td>
      <u-td width="122rpx">20</u-td>
      <u-td width="127rpx">20</u-td>
    </u-tr>
  </u-table>
</view>
</template>

<script>
export default {
  name: "reservationCardDetails"
}
</script>

<style lang="scss">
page{
  background: #F6F6F6;
}
.card-details{
  padding: 22rpx 30rpx;
}
</style>

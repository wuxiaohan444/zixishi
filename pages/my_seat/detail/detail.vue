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
						<u-td width="178rpx">{{item.data}}</u-td>
						<u-td>{{item.number}}</u-td>
						<u-td width="178rpx">{{item.time}}</u-td>
						<u-td>{{item.duration}}小时</u-td>
						<u-td>{{item.price}}元</u-td>
					</u-tr>
				</block>
			</u-table>
		</view>
		<view class="all-time u-font-28">合计时长：<text class="u-black-color">48小时</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						data:'20201-09-08',
						number:'1',
						time:'18:00-24:00',
						duration:'16',
						price:'18'
					},
					{
						data:'20201-09-012',
						number:'4',
						time:'18:00-24:00',
						duration:'6',
						price:'66'
					},
					{
						data:'20201-10-08',
						number:'7',
						time:'18:00-24:00',
						duration:'6',
						price:'68'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 20rpx 30rpx;
	}
	.table{
		background-color: #FFFFFF;
		padding-bottom: 22rpx;
	}
	.all-time{
		text-align: right;
		color: #8D8D8D;
	}
</style>

<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="card-box">
			<view class="card-list">
				<view class="info">
					<view class="u-font-32 u-bold">天庆店春深读书堂自习馆</view>
					<view class="u-font-26 data">自习室一/1</view>
					<view class="u-font-26 time data">
						<text>2021-09-24 21:00-23:00</text>
						<text class="u-font-28">未消费</text>
					</view>
				</view>
				<view class="list-botton">
					<view class="u-font-28">开大门</view>
					<view class="u-font-28">开房间门</view>
					<view class="u-font-28 consumption">开门消费</view>
					<!-- <view class="u-font-28 consumption">续费</view> -->
					<view class="u-font-28 over" @click="over('2')">结束消费</view>
				</view>
			</view>
			
			<view class="card-list">
				<view class="info">
					<view class="u-font-32 u-bold">天庆店春深读书堂自习馆</view>
					<view class="u-font-26 data">自习室一/1</view>
					<view class="u-font-26 time data">
						<text>2021-09-24 21:00-23:00</text>
						<text class="u-font-28">未消费</text>
					</view>
				</view>
				<view class="list-botton">
					<view class="u-font-28">开大门</view>
					<view class="u-font-28">开房间门</view>
					<view class="u-font-28 consumption">续费</view>
					<view class="u-font-28 over" @click="over('2')">结束消费</view>
				</view>
			</view>
			<view class="card-list">
				<view class="info">
					<view class="u-font-32 u-bold">天庆店春深读书堂自习馆</view>
					<view class="u-font-26 data">自习室一/1</view>
					<view class="u-font-26 time data">
						<text>2021-09-24 21:00-23:00</text>
						<text class="u-font-28">未消费</text>
					</view>
				</view>
				<view class="list-botton">
					<view class="u-font-28">开大门</view>
					<view class="u-font-28 consumption">开门消费</view>
				</view>
			</view>
		</view>
		
		<view>
			<u-modal v-model="popupTipStatus" @confirm="confirm" show-cancel-button content="确定要结束消费吗?"></u-modal>
		</view>
	</view>
</template>

<script>
const app = getApp();
export default {
  name: "reserve",
  data() {
  	return {
  		current:0,
		popupTipStatus:false,
		winHeight:app.globalData.winHeight,
  	}
  },
  methods: {
  	change(index){
  		this.current = index;
  	},
  	over(id){
  		this.popupTipStatus = true;
  	},
	confirm(){
		console.log(3)
	}
  }
}
</script>

<style scoped lang="scss">
	.container,
	.card-box{
		background-color: #F5F5F5;
	}
	.card-box{
		padding: 26rpx 30rpx;
		
		.card-list{
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
			border-radius: 19rpx;
			margin-bottom: 25rpx;
			
			.tag{
				display: inline-block;
				background: #2487FF;
				border-radius: 6rpx;
				color: #FFFFFF;
				height: 31rpx;
				line-height: 31rpx;
				padding: 0 12rpx;
			}
			.info{
				border-bottom: 2rpx dashed #8B8B8B;
				padding: 22rpx 0;
				.data{
					color: #999999;
					margin-top: 20rpx;
				}
				.time{
					display: flex;
					justify-content: space-between;
					>text:last-child{
						color: #2487FF;
					}
				}
			}
			.list-botton{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #666666;
				padding-top: 10rpx;
				view{
					margin-left: 23rpx;
					width: 144rpx;
					height: 54rpx;
					line-height: 52rpx;
					background: #FFFFFF;
					border: 2rpx solid #B2B2B2;
					border-radius: 27rpx;
					text-align: center;
					color: #010101;
				}
				view.over{
					background-color: #D04D52;
					color: #FFFFFF;
					border-color: #D04D52;
				}
				view.consumption{
					background-color: #2487FF;
					color: #FFFFFF;
					border-color: #2487FF;
				}
			}
		}
	}
</style>

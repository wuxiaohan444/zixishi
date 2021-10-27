<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="infos">
			<view>充值金额</view>
			<view class="price">
				<u-icon class="icon" name="rmb" :size="24"></u-icon>
				<input type="number" >
				<view>赠送¥100</view>
			</view>
		</view>
		<view class="doc">
			<view class="current-price u-font-24">当前余额：¥356.0</view>
			<button type="default">去支付</button>
			<view class="activity-doc">
				<view>充值活动：</view>
				<view>·充值每满¥100送¥100 </view>
				<view>·每满¥200送¥210</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				winHeight:app.globalData.winHeight,
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.container{
		background-color: #F5F5F5;
		color: #010101;
	}
	.infos{
		background-color: #FFFFFF;
		padding: 112rpx 30rpx 55rpx 30rpx;
		
		.price{
			height: 94rpx;
			position: relative;
			display: flex;
			align-items: flex-end;
			margin-top: 19rpx;
			
			.icon{
				position: absolute;
				bottom: 20rpx;
				left: 23rpx;
			}
			
			input{
				width: 208rpx;
				height: 94rpx;
				background: #FFFFFF;
				border: 2rpx solid #B2B2B2;
				border-radius: 6rpx;
				padding-left: 56rpx;
				font-size: 71rpx;
				font-weight: bold;
			}
			
			view{
				margin-left: 19rpx;
				font-size: 31rpx;
				color: #2487FF;
			}
		}
	}
	.doc{
		padding: 19rpx 30rpx;
		
		button{
			width: 624rpx;
			height: 92rpx;
			line-height: 92rpx;
			background: #2487FF;
			border-radius: 46rpx;
			color: #FFFFFF;
			font-size: 31rpx;
			margin-top: 62rpx;
		}
		
		.activity-doc{
			padding: 48rpx 78rpx;
			color: #B9B9B9;
			font-size: 27rpx;
			line-height: 50rpx;
		}
	}

</style>

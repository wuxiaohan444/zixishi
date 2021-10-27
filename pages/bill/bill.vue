<template>
	<view class="container">
		<view class="account">
			<view class="account-info">
				<view class="u-font-26">账户余额</view>
				<view class="price">356.0<text class="u-font-26">元</text></view>
			</view>
			<button type="default" @click="recharge">立即充值</button>
		</view>
		<view class="detailed">
			<view class="titles">
				<text :class="current==0?'active':''" @click="change(0)">充值明细</text>
				<text :class="current==1?'active':''" @click="change(1)">使用明细</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '充值明细'
				}, {
					name: '使用明细'
				}],
				current: 0
			}
		},
		methods: {
			recharge(){
				uni.navigateTo({
					url:'/pages/recharge/recharge'
				})
			},
			change(index){
				this.current = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 40rpx 30rpx;
	}
	.account{
		padding: 40rpx;
		background: linear-gradient(90deg, #259BFF,#3470FF);
		border-radius: 20rpx;
		
		.account-info{
			color: #FFFFFF;
			border-bottom: 2rpx solid #81B3F1;
			
			.price{
				font-size: 64rpx;
				margin: 20rpx 0 40rpx 0;
				
				text{
					margin-left: 15rpx;
				}
			}
		}
	
		button{
			width: 173rpx;
			height: 78rpx;
			background: #FFFFFF;
			border-radius: 38rpx;
			font-size: 26rpx;
			color: #3470FF;
			margin: 35rpx 0 0 0;
		}
	}
	.detailed{
		margin-top: 37rpx;
		padding: 30rpx;
		box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
		
		.titles{
			border-bottom: 2rpx dashed #A3A3A3;
			padding-bottom: 34rpx;
			position: relative;
			overflow: hidden;
			
			// &::after,
			// &::before{
			// 	content: '';
			// 	// background-color: #FFFFFF;
			// 	box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
			// 	background-color: #DBF1E1;
			// 	position: absolute;
			// }
			// &::after{
				
			// }
			// &::before{
				
			// }
			text{
				margin-right: 74rpx;
				font-size: 31rpx;
				color: #010101;
			}
			text.active{
				position: relative;
				color: #2487FF;
			}
			text.active::before{
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
		
	}

</style>

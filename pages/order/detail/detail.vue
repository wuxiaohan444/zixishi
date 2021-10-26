<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="details-info">
			<view class="list-item">
				<view class="top">
					<view class="store">
						<text class="u-font-31 u-bold">夏日流星限定贩卖</text>
						<image src="/static/images/arrow.png"></image>
					</view>
					<view class="right u-font-26">交易成功</view>
				</view>
				<view class="center">
					<image src="/static/images/home/n2.png"></image>
					<view class="info">
						<view class="title u-font-26 u-black-color">自习室一/1</view>
						<view class="">下单时间:2021-09-24  21:00:00</view>
						<view>预订时间段:</view>
						<view class="time">2021-09-23   22:00-23:59</view>
					</view>
				</view>
				<view class="price u-font-31 u-bold">总计: <text>¥3.0</text></view>
				<view class="price-info">
					<view>
						<text class="u-font-28">订单总额:</text>
						<text class="u-font-31">¥10.0</text>
					</view>
					<view>
						<text class="u-font-28">会员优惠:</text>
						<text class="u-font-31">-¥0.0</text>
					</view>
					<view>
						<text class="u-font-28">代金券:</text>
						<text class="u-font-31">-¥0.0</text>
					</view>
				</view>
				<view class="content">
					<view class="u-font-28 title">订单信息</view>
					<view class="u-font-28">订单编号：123456789000987654 <text @click="copy('123456789000987654')">复制</text></view>
					<view class="u-font-28">创建时间：2021-09-23      21：21：21</view>
				</view>
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
		onLoad(options){
			console.log(options,'dsd')
		},
		methods: {
			copy(order){
				uni.setClipboardData({
					data:order,
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F5F5F5;
}
.details-info{
	padding: 30rpx;
}
.list-item{
		padding: 35rpx 26rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		
		.top{
			display: flex;
			justify-content: space-between;
			.store image{
				width: 12rpx;
				height: 21rpx;
				margin-left: 20rpx;
			}
			.right{
				color: #999999;
			}
		}
	
		.center{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 26rpx 0;
			border-bottom: 2rpx solid #CECECE;
			
			image{
				width: 130rpx;
				height: 130rpx;
				border-radius: 6rpx;
				margin-right: 27rpx;
			}
			
			.info{
				line-height: 40rpx;
				color: #666666;
				font-size: 24rpx;
			}
		}
		
		.price{
			text-align: right;
			margin-top: 22rpx;
			
			text{
				color: #FC1716;
			}
		}
	
		.price-info{
			padding-top: 24rpx;
			border-bottom: 2rpx solid #CECECE;
			color: #001010;
		}
		.price-info view{
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			>text:first-child{
				color: #8D8D8D;
			}
		}
		
		.content{
			padding: 25rpx 0;
			color: #8D8D8D;
			
			.title{
				color: #010101;
			}
			
			>view:nth-child(3),
			>view:nth-child(2){
				margin-top: 40rpx;
			}
			
			text{
				display: inline-block;
				padding: 0 30rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: #F5F5F5;
				border: 2rpx solid #B2B2B2;
				border-radius: 6rpx;
				color: #010101;
				font-size: 23rpx;
				margin-left: 42rpx;
			}
		}
	}
</style>

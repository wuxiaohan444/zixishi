<template>
	<view class="container">
		<view class="titles">
			<text :class="current==0?'active':''" @click="change(0)">订座套餐卡</text>
			<text :class="current==1?'active':''" @click="change(1)">预订时长卡</text>
		</view>
		<view class="card-box" v-show="current==0">
			<view class="card-list" @click="toDetails('2')">
				<text class="tag u-font-23">春深券</text>
				<view class="info">
					<view class="u-font-32 u-bold">两小时免费自习体验券</view>
					<view class="u-font-24 data">2021年09月15日到期</view>
				</view>
				<view class="times">
					<view class="u-font-24">剩余：3小时0分钟（1天）</view>
					<view class="use u-font-23">去使用</view>
				</view>
			</view>
			<view class="card-list">
				<text class="tag u-font-23">春深券</text>
				<view class="info">
					<view class="u-font-32 u-bold">两小时免费自习体验券</view>
					<view class="u-font-24 data">2021年09月15日到期</view>
				</view>
				<view class="times">
					<view class="u-font-24">剩余：3小时0分钟（1天）</view>
					<view class="use u-font-23">去使用</view>
				</view>
			</view>
		</view>
		<view class="card-box" v-show="current==1">
			<view class="card-list">
				<text class="tag u-font-23">春深券</text>
				<view class="info">
					<view class="u-font-32 u-bold">两小时免费自习体验券</view>
					<view class="u-font-24 data">2021年09月15日到期</view>
				</view>
				<view class="times">
					<view class="u-font-24">剩余：3小时0分钟（1天）</view>
					<view class="use u-font-23">去使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0
			}
		},
		methods: {
			change(index){
				this.current = index;
			},
			toDetails(id){
				uni.navigateTo({
					url:`/pages/my_card/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		background-color: #F5F5F5;
	}
	.titles{
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-evenly;
		padding: 78rpx 0 32rpx 0;
				
		text{
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
					color: #666666;
					margin-top: 20rpx;
				}
			}
			.times{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #666666;
				padding-top: 10rpx;
				.use{
					width: 122rpx;
					height: 51rpx;
					background: #EB5940;
					border-radius: 26rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 51rpx;
				}
			}
		}
	}

</style>

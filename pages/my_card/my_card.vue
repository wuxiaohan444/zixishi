<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF"
		        :bar-style="barStyle"></u-tabs>
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
	const app = getApp();
	export default {
		data() {
			return {
				winHeight:app.globalData.winHeight,
				current:0,
				list: [
				  {
				    name: '订座套餐卡'
				  }, {
				    name: '预订时长卡'
				  }
				],
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

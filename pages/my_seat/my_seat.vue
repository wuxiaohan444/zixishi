<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="seat-box">
			<view class="seat-list">
				<image mode="widthFix" src="../../static/images/personal/recharge-i.png"></image>
				<view class="content">
					<view class="title u-font-32">周末晚间时段定座月卡（门店名）</view>
					<view class="doc-i">
						<view>
							<text>销售价格：</text>
							<text>144.0元</text>
						</view>
						<view>
							<text>天数：</text>
							<text>30天</text>
						</view>
					</view>
					<view class="doc">
						<view>使用日期：</view>
						<view>周六、周日</view>
					</view>
					<view class="doc">
						<view>使用时间段：</view>
						<view>18:00-24:00</view>
					</view>
					<view class="doc">
						<view>封顶小时：</view>
						<view>48小时</view>
					</view>
					<view class="doc">
						<view>适用门店：</view>
						<view>门店名</view>
					</view>
					<view class="doc">
						<view>有 效 期：</view>
						<view>2021-09-08至2021-10-21</view>
					</view>
				</view>
				<view class="details" @click="toDetails('2')"><view>座位详情</view></view>
			</view>
			
			<view class="seat-list">
				<image mode="widthFix" src="../../static/images/personal/recharge-i.png"></image>
				<view class="content">
					<view class="title u-font-32">周末晚间时段定座月卡（门店名）</view>
					<view class="doc-i">
						<view>
							<text>销售价格：</text>
							<text>144.0元</text>
						</view>
						<view>
							<text>天数：</text>
							<text>30天</text>
						</view>
					</view>
					<view class="doc">
						<view>使用日期：</view>
						<view>周六、周日</view>
					</view>
					<view class="doc">
						<view>使用时间段：</view>
						<view>18:00-24:00</view>
					</view>
					<view class="doc">
						<view>封顶小时：</view>
						<view>48小时</view>
					</view>
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
		methods: {
			toDetails(id){
				uni.navigateTo({
					url:`/pages/my_seat/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		background-color: #F5F5F5;
	}
	.seat-box{
		background-color: #F5F5F5;
		padding: 30rpx;
	}
	
	.seat-list{
		padding: 15rpx;
		background-color: #FFFFFF;
		border-radius: 19rpx;
		clear:both;
		margin-bottom: 33rpx;
		
		image{
			width: 100%;
		}
		
		.content{
			padding: 35rpx 0;
			color: #010101;
			
			.doc,
			.doc-i,
			.doc-i view{
				display: flex;
				margin-top: 40rpx;
			}
			.doc-i{
				view{
					margin-top: 0;
				}
				view:last-child{
					margin-left: 160rpx;
				}
				view>text:first-child{
					color: #8D8D8D;
				}
			}
			
			.doc{
				
				>view:first-child{
					color: #8D8D8D;
				}
			}
		}
		.details{
			display: flex;
			justify-content: flex-end;
			padding-top: 19rpx;
			border-top: 2rpx solid #E5E5E5;
			view{
				width: 168rpx;
				height: 60rpx;
				background: #FFFFFF;
				border: 2rpx solid #2487FF;
				border-radius: 30rpx;
				text-align: center;
				line-height: 60rpx;
				color: #2487FF;
			}
		}
	}
</style>

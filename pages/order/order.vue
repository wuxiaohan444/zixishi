<template>
	<view class="container">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<view class="my-swiper">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="{'height':winHeight+'rpx'}">
				<swiper-item class="swiper-item" v-for="(item, index) in 5" :key="index" >
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="order-list">
							<view class="list-item" @click="toDetailes">
								<view class="top">
									<view class="store">
										<text class="u-font-31 u-bold">夏日流星限定贩卖</text>
										<image src="/static/images/arrow.png"></image>
									</view>
									<view class="right u-font-26">交易成功</view>
								</view>
								<view class="center">
									<image src="../../static/images/home/n2.png"></image>
									<view class="info">
										<view class="title u-font-26 u-black-color">自习室一/1</view>
										<view class="">下单时间:2021-09-24  21:00:00</view>
										<view>预订时间段:</view>
										<view class="time">2021-09-23   22:00-23:59</view>
										<view class="password">开大门密码:123456</view>
									</view>
								</view>
								<view class="price u-font-31">总计: <text>¥3.0</text></view>
							</view>
							
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list: [{
						name: '全部订单'
					},
					{
						name: '待付款'
					},
					{
						name: '支付成功',
						count: 5
					},
					{
						name: '已使用',
						count: 5
					},
					{
						name: '已取消',
						count: 5
					}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				winHeight:app.globalData.winHeight,
				id:0
			}
		},
		onLoad(){
			
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log(2)
			},
			toDetailes(){
				uni.navigateTo({
					url:`/pages/order/detail/detail?id=${this.id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.my-swiper{
	background-color: #F5F5F5;
}	
.order-list{
	padding: 30rpx;
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
	}
}
</style>

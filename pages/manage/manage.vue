<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="false" title="管理"
			:background="{ background: '#0BB9C8' }" title-color="#fff">
			<image slot="right" src="/static/images/home/message.png" class="message-icon" mode="widthFix"></image>
		</u-navbar>

		<view class="tab">
			<u-tabs :list="list" :is-scroll="false" :current="current" active-color="#14B9C8" inactive-color="#595959"
				height="100" @change="change"></u-tabs>
		</view>

		<swiper id="swiperBox" :style="{ height: swiperHeight + 'px' }" :current="current" @change="tabsChange">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y style="width: 100%;height: 100%;" @scrolltolower="onreachBottom">
					<view class="content">
						<u-grid :col="3">
							<u-grid-item v-for="(_item, _index) in gridList" :key="_index">
								<navigator url="" hover-class="none" class="gitem">
									<image :src="_item.img" class="img" mode="widthFix"></image>
									<view class="name">{{ _item.name }}</view>
								</navigator>
							</u-grid-item>
						</u-grid>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperHeight: 0,
				list: [{
						name: '常用'
					},
					{
						name: '系统'
					},
					{
						name: '部门'
					}
				],
				current: 0,
				gridList: [{
						name: '常规',
						img: '/static/images/manage/g1.png'
					},
					{
						name: '权限',
						img: '/static/images/manage/g2.png'
					},
					{
						name: '角色',
						img: '/static/images/manage/g3.png'
					},
					{
						name: '用户',
						img: '/static/images/manage/g4.png'
					},
					{
						name: '分类',
						img: '/static/images/manage/g5.png'
					},
					{
						name: '公告',
						img: '/static/images/manage/g6.png'
					}
				]
			};
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({
				success(e) {
					console.log(e);
					let {
						windowWidth,
						windowHeight,
						safeArea
					} = e;
					const query = uni.createSelectorQuery().in(that);
					query
						.select('#swiperBox')
						.boundingClientRect(data => {
							that.swiperHeight = safeArea.bottom - data.top;
						})
						.exec();
				}
			});
		},
		methods: {
			tabsChange(e) {
				this.current = e.detail.current;
			},
			change(index) {
				this.current = index;
			}
		}
	};
</script>

<style lang="scss">
	.swiper-box {
		height: 100vh;
	}

	.message-icon {
		width: 32rpx;
		height: auto;
		margin-right: 27rpx;
	}

	.tab {
		margin-bottom: 10rpx;
	}

	.gitem {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.img {
			width: 54rpx;
			height: auto;
			margin-bottom: 26rpx;
		}

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #030305;
		line-height: 36rpx;
	}
</style>

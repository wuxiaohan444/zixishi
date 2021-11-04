<template>
	<view class="container choice-box">
		<view class="choice-infos">
			<view class="u-font-40 u-bold">自习室一（1）号座位</view>
			<view class="time">2021-10-11 16:00:00 - 2021-11-11 16:00:00</view>
		</view>
		<view class="doc">
<!--			<view class="doc-item">-->
<!--				<view>-->
<!--					<image src="../../../static/images/meituan/meituan.png"></image>-->
<!--					<image src="../../../static/images/meituan/meituan.png"></image>-->
<!--				</view>-->
<!--				<view>-->
<!--					<text class="u-font-36">去验券</text>-->
<!--					<image class="arrow" src="../../../static/images/arrow.png"></image>-->
<!--				</view>-->
<!--			</view>-->
			<view class="doc-item" @click="toTimeCard">
				<view style="display: flex;align-items: center;">
					<u-radio-group class="radio" v-model="value">
						<u-radio active-color="#50D42F" :name="value" @change="radioChange()" ></u-radio>
					</u-radio-group>
					<text class="u-font-36">时长卡</text>
				</view>
				<view>
					<text class="u-font-36">1张</text>
					<image class="arrow" src="../../../static/images/arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="botton">
			<u-button shape="circle" type="primary" @click="paySuccess">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			}
		},
		methods: {
			radioChange(){

			},
			toTimeCard(){
				uni.navigateTo({
					url:'/pages/seat/time_card/time_card'
				})
			},
			paySuccess(){
				uni.navigateTo({
					url:'/pages/pay/paySuccess'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #F5F5F5;
}
.choice-box{
	.choice-infos{
		text-align: center;
		padding: 40rpx 0;
		.time{
			color: #999999;
			margin-top: 30rpx;
		}
	}

	.doc-item{
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		padding: 0 30rpx;
		margin-bottom: 20rpx;

		image{
			width: 70rpx;
			height: 70rpx;
			margin-right: 20rpx;
		}
		.arrow{
			width: 10rpx;
			height: 30rpx;
			margin-right: 0;
			margin-left: 30rpx;
		}
		text{
			color: #999999;
		}
	}

	.botton{
		padding: 30rpx;
	}
}

</style>

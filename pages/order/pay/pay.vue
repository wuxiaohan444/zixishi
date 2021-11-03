<template>
	<view class="container">
		<view class="tips">
			<view>待支付</view>
			<view class="u-font-23">请在2分钟内完成支付,订单开始120分钟前可取消订单，逾期不可取消</view>
		</view>
		<view class="info-box">
			<view class="titles">
				<view class="u-font-36 u-bold">{{storeInfo.fullName}}</view>
				<view class="u-font-31">{{seatInfo.roomName}}（{{seatInfo.seatName}}）号座位</view>
			</view>
			<view class="content">
				<view>
					<view class="u-font-28">预订时间:</view>
					<view class="u-font-31">
						<view>2021-09-08  16:00-18:00（星期三）</view>
						<view>2021-09-07  16:00-18:00（星期二）</view>
					</view>
				</view>
				<view>
					<view class="u-font-28">会员姓名:</view>
					<view class="u-font-31">{{ user.memberName }}({{user.memberLevelName}})</view>
				</view>
				<view>
					<view class="u-font-28">会员优惠:</view>
					<view class="u-font-31">房间费无折扣</view>
				</view>
				<view>
					<view class="u-font-28">会员余额:</view>
					<view class="u-font-31">{{user.balance}}元</view>
				</view>
				<view>
					<view class="u-font-28">订单金额:</view>
					<view class="u-font-31">5.0元</view>
				</view>
				<view>
					<view class="u-font-28">优惠金额:</view>
					<view class="u-font-31">-0.8元</view>
				</view>
			</view>
			<view class="all-price">
				<view>
					<view class="u-font-28">应付款:</view>
					<view class="u-font-31">5.0元</view>
				</view>
			</view>
		</view>
		<view class="botton">
			<u-button :custom-style="customStyle" shape="circle" type="primary" @click="useTimeCard">使用时长卡</u-button>
			<u-button :custom-style="customStyle" shape="circle" type="primary">余额支付:1.2元</u-button>
			<u-button :custom-style="customStyle" shape="circle" type="success">微信支付:1.2元</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
					marginBottom:'30rpx',
					height: '92rpx',
				},
        user:{},
        storeInfo:{},
        seatInfo:{},
			}
		},
    onLoad(){
      this.user = uni.getStorageSync('userInfo');
      this.storeInfo = uni.getStorageSync('storeInfo');
      this.seatInfo = uni.getStorageSync('seatInfo');
      console.log(this.seatInfo);
    },
		methods: {
			useTimeCard(){
				uni.navigateTo({
					url:'/pages/seat/choice_card/choice_card'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tips{
		background-color: #2487FF;
		padding: 30rpx;
		color: #FFFFFF;
		font-size: 46rpx;
		>view:last-child{
			margin-top: 35rpx;
		}
	}
	.info-box{
		padding: 45rpx 30rpx;
		.titles{
			text-align: center;
			padding-bottom: 40rpx;
			border-bottom: 2rpx solid #EEEFF1;;
			>view:last-child{
				margin-top: 35rpx;
			}
		}
	}

	.content{
		padding-top: 24rpx;
		border-bottom: 2rpx solid #CECECE;
		color: #001010;
	}
	.all-price{
		padding-top: 40rpx;
	}
	.content>view,
	.all-price>view{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		view>view:first-child{
			margin-bottom: 15rpx;
		}
		>view:first-child{
			color: #8D8D8D;
		}
	}
	.botton{
		padding: 0 30rpx;
	}

</style>

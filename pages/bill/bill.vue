<template>
	<view class="container">
		<view class="account">
			<view class="account-info">
				<view class="u-font-26">账户余额</view>
				<view class="price">356.0<text class="u-font-26">元</text></view>
			</view>
			<u-button :custom-style="customStyle" shape="circle" size="mini"  @click="recharge">立即充值</u-button>
		</view>
		<view class="detailed">
			<view class="titles">
				<text :class="current==0?'active':''" @click="change(0)">充值明细</text>
				<text :class="current==1?'active':''" @click="change(1)">使用明细</text>
			</view>
			<view class="detailed-info" v-show="current==0">
				<view>
					<text>吧台充值</text>
					<text>2021-09-23      21:21:21</text>
				</view>
				<view>
					<text>充值前余额</text>
					<text>¥3.0</text>
				</view>
				<view>
					<text>充值金额</text>
					<text>¥300.0</text>
				</view>
				<view>
					<text>赠送金额</text>
					<text>¥30.0</text>
				</view>
				<view>
					<text>充值门店</text>
					<text>门店名</text>
				</view>
				<view>
					<text>状态</text>
					<text>正常</text>
				</view>
			</view>
			<view class="detailed-info" v-show="current==1">
				<view>
					<text>使用时间</text>
					<text>2021-09-23      21:21:21</text>
				</view>
				<view>
					<text>使用前余额</text>
					<text>¥300.0</text>
				</view>
				<view>
					<text>使用余额</text>
					<text>¥30.0</text>
				</view>
				<view>
					<text>使用门店</text>
					<text>门店名</text>
				</view>
				<view>
					<text>状态</text>
					<text>正常</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				customStyle:{
					height: '78rpx',
					marginTop:'35rpx',
					width: '173rpx',
					color: '#3470FF',
					fontSize: '26rpx'
				}
			}
		},
    onLoad(){
      this.rechargeList()
    },
		methods: {
      // 充值记录
      rechargeList(){
        this.$u.api.rechargeList({openId:1}).then((res)=>{

        })
      },
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
	}
	.detailed{
		margin-top: 37rpx;
		padding: 30rpx;
		box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);

		.titles{
			border-bottom: 2rpx dashed #A3A3A3;
			padding-bottom: 34rpx;

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
		.detailed-info{
			padding-top: 37rpx;
			view{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #010101;
				margin-bottom: 22rpx;

				>text:first-child{
					color: #8D8D8D;
				}
			}
		}
	}

</style>

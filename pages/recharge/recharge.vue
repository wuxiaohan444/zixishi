<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="infos">
			<view>充值金额</view>
			<view class="price">
				<u-icon class="icon" name="rmb" :size="24"></u-icon>
				<input type="number" v-model="rechargeAmount">
				<view>赠送¥100</view>
			</view>
		</view>
		<view class="doc">
			<view class="current-price u-font-24">当前余额：¥356.0</view>
			<u-button :custom-style="customStyle" shape="circle" type="primary" @click="rechargeMoney">去支付</u-button>
			<view class="activity-doc">
				<view>充值活动：</view>
				<view>·充值每满¥100送¥100 </view>
				<view>·每满¥200送¥210</view>
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
				customStyle:{
					marginTop: '62rpx'
				},
        storeId:'',
        storeName:'',
        rechargeAmount:'',
        giveAmount:0,
			}
		},
    onLoad(){
      if (uni.getStorageSync('storeInfo')) {
        let data = uni.getStorageSync('storeInfo');
        console.log(data);
        this.storeId=data.id;
        this.storeName = data.fullName
      }
    },
		methods: {
      rechargeMoney(){
        let data={
          rechargeAmount:this.rechargeAmount,
          giveAmount:this.giveAmount,
          openId:this.$u.func.getOpenId(),
          storeId:this.storeId,
          storeName:this.storeName,
        }
        this.$u.api.rechargeMoney(data).then((res)=>{

        })
      }
		}
	}
</script>

<style scoped lang="scss">
	.container{
		background-color: #F5F5F5;
		color: #010101;
	}
	.infos{
		background-color: #FFFFFF;
		padding: 112rpx 30rpx 55rpx 30rpx;

		.price{
			height: 94rpx;
			position: relative;
			display: flex;
			align-items: flex-end;
			margin-top: 19rpx;

			.icon{
				position: absolute;
				bottom: 20rpx;
				left: 23rpx;
			}

			input{
				width: 208rpx;
				height: 94rpx;
				background: #FFFFFF;
				border: 2rpx solid #EEEFF1;
				border-radius: 6rpx;
				padding-left: 56rpx;
				font-size: 71rpx;
				font-weight: bold;
			}

			view{
				margin-left: 19rpx;
				font-size: 31rpx;
				color: #2487FF;
			}
		}
	}
	.doc{
		padding: 19rpx 30rpx;

		.activity-doc{
			padding: 48rpx 78rpx;
			color: #B9B9B9;
			font-size: 27rpx;
			line-height: 50rpx;
		}
	}

</style>

<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="details-info">
			<view class="list-item">
				<view class="top">
					<view class="store">
						<text class="u-font-31 u-bold">{{info.storeName}}</text>
						<image src="/static/images/arrow.png"></image>
					</view>
          <view class="right u-font-26" v-if="info.orderStatus==0">待支付</view>
          <view class="right u-font-26" v-if="info.orderStatus==1">支付成功</view>
          <view class="right u-font-26" v-if="info.orderStatus==2">交易成功</view>
          <view class="right u-font-26" v-if="info.orderStatus==3">已取消</view>
				</view>
				<view class="center">
					<image src="/static/images/home/n2.png"></image>
					<view class="info">
						<view class="title u-font-26 u-black-color">{{info.roomName}}/{{info.seatName}}</view>
						<view class="">下单时间:{{info.orderTime}}</view>
						<view>预订时间段:</view>
            <view class="time">{{info.startDate}}至{{info.endDate}}</view>
					</view>
				</view>
				<view class="price u-font-31 u-bold">总计: <text>¥{{info.amount}}</text></view>
				<view class="price-info">
					<view>
						<text class="u-font-28">实付金额:</text>
						<text class="u-font-31">¥{{info.actualPayment}}</text>
					</view>
					<view>
						<text class="u-font-28">会员折扣:</text>
						<text class="u-font-31">{{info.seatDiscount}}</text>
					</view>
<!--					<view>-->
<!--						<text class="u-font-28">代金券:</text>-->
<!--						<text class="u-font-31">-¥0.0</text>-->
<!--					</view>-->
				</view>
				<view class="content">
					<view class="u-font-28 title">订单信息</view>
					<view class="u-font-28">订单编号：{{info.orderId}} <text @click="copy(info.orderId)">复制</text></view>
					<view class="u-font-28">创建时间：{{info.createTime}}</view>
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
        info:'',
        orderId:'',
        tenantId:''
			}
		},
		onLoad(options){
      if (uni.getStorageSync('storeInfo')) {
        let data = uni.getStorageSync('storeInfo');
        this.tenantId = data.tenantId;
      }
		  this.orderId = options.id;
      this.getDetail()
		},
		methods: {
      getDetail(){
        let data = {
          openId: this.$u.func.getOpenId(),
          tenantId: this.tenantId,
          id:this.orderId
        }
        this.$u.api.orderList(data).then((res) => {
          this.info = res.data[0]
        });
      },
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
				border: 2rpx solid #EEEFF1;
				border-radius: 6rpx;
				color: #010101;
				font-size: 23rpx;
				margin-left: 42rpx;
			}
		}
	}
</style>

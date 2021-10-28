<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="header">
		    <view :style="{'height':statusBarHeight+'px'}"></view>
		    <view :style="{'height':navBarHeight+'px'}" class="header-navbar">
		      <image src="../../static/images/pay/close.png" @click="navToBackLastPage"/>
		    </view>
		  </view>

		  <view class="top">
		    <image src="../../static/images/rider.png" />
		    <view>这是我的描述</view>
		  </view>


		  <view v-if="!tokenStatus">
		    <button class="btn" @click="getUserProfile">
		      <image src="../../static/images/wx.png" />
		      <text>微信账号一键登录</text>
		    </button>
		  </view>

		  <view v-if="tokenStatus && !telStatus">
		    <button class="btn" open-type="getPhoneNumber" @click="getPhoneNumber">
		      <image src="../../static/images/personal/card-i.png" />
		      <text>授权手机号</text>
		    </button>
		  </view>

		  <view class="bottom" bindtap="protocolTap">
		    <text>登录即代表您同意</text>
		    <text>《这是服务服务协议》</text>
		  </view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				navBarHeight: app.globalData.navBarHeight, // 导航栏高度
				statusBarHeight: app.globalData.statusBarHeight, // 状态栏高度
				winHeight:app.globalData.winHeight+app.globalData.statusBarHeight+app.globalData.navBarHeight,
				flag: true,
				tokenStatus:false
			};
		},
		methods: {
			getUserProfile(){
				console.log(3);
				wx.login({
				  success: function (res) { //拿到code
					wx.setStorageSync('code', res.code);
				  }
				})
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (result) => {
						console.log(result,'dsds');
						this.tokenStatus = true;
						this.telStatus = false
					}
				})
			},
			getPhoneNumber(e){
				//获取用户的手机号码
				if(e.detail.encryptedData){
					const data = {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
					  }
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.header-navbar image {
	  padding-left: 30rpx;
	  width:48rpx;
	  height:48rpx;
	}

	.container {
	  width:100%;
	  height:100%;
	  bottom: 0;
	  zoom: 1;
	  flex-direction: column;
	  align-items: center;
	  color: #fff;
	  background-image: url('https://cdn.uviewui.com/uview/swiper/1.jpg');
	  background-repeat: no-repeat;
	  background-size: cover;
	  -webkit-background-size: cover;
	  -o-background-size: cover;
	}

	.top {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  margin-top: 280rpx;
	  font-size: 32rpx;
	}

	.top image {
	  width: 284rpx;
	  height: 92rpx;
	  margin-bottom: 30rpx;
	}

	button {
	  display: flex;
	  justify-content: center;
	  width: 520rpx !important;
	  height: 100rpx !important;
	  margin-top: 200rpx;
	  padding: 24rpx 70rpx !important;
	  background-color: #02BF65;
	  border-radius: 50rpx !important;
	  font-size: 36rpx !important;
	  font-weight: normal !important;
	  color: #fff;

	  text{
		  align-self: center;
	  }
	}

	.btn image {
	  width: 48rpx;
	  height: 48rpx;
	  margin-right: 20rpx;
	}

	.bottom {
	  text-align: center;
	  margin-top: 540rpx;
	  font-size: 24rpx;
	}

	.bottom text:first-child {
	  color: #ccc;
	}
</style>

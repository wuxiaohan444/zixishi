<template>
	<view class="container" :style="{'height':winHeight+'rpx'}">
		<view class="header">
		    <view :style="{'height':statusBarHeight+'px'}"></view>
		    <view :style="{'height':navBarHeight+'px'}" class="header-navbar"></view>
		  </view>
		  <view class="top">
		    <image src="../../static/images/rider.png" />
		    <view>这是我的描述</view>
		  </view>
		  <view>
		    <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
		      <text>授权手机号</text>
		    </button>
		  </view>
    <u-mask :show="show" @click="show = false">
      <view class="warp">
        <view class="rect" @tap.stop>
          <view class="title">为了更好的体验，请输入会员名称</view>
          <view class="form-box">
            <u-form :model="form" ref="uForm" >
              <u-form-item label="姓名"><u-input v-model="form.memberName" /></u-form-item>
            </u-form>
            <u-button shape="circle" type="primary" :custom-style="customStyle" @click="affirm">确认</u-button>
          </view>
        </view>
      </view>
    </u-mask>
	</view>
</template>

<script>
  import AESUtil from "../../js_sdk/CBCCrypto.js"
	const app = getApp();
	export default {
		data() {
			return {
				navBarHeight: app.globalData.navBarHeight, // 导航栏高度
				statusBarHeight: app.globalData.statusBarHeight, // 状态栏高度
				winHeight:app.globalData.winHeight+app.globalData.statusBarHeight+app.globalData.navBarHeight,
				flag: true,
				tokenStatus:false,
        code:'',
        show:false,
        form:{},
        customStyle:{
          marginTop:'20rpx'
        }
			};
		},
    onLoad(){
      var that = this;
      uni.login({
        success: (e) => {
          console.log("登录成功", e);
          that.code = e.code;
        },
        fail: (e) => {
          uni.showModal({
            content: "登录失败,原因为: " + e.errMsg,
            showCancel: false
          });
        }
      })
    },
		methods: {
      getPhoneNumber(e){
        let data = {
          code: this.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        this.$u.api.login(data).then((res)=>{
          let openid = AESUtil.decrypt((res.data.encryptedData).split(";")[0])
          // let phone = AESUtil.decrypt((res.data.encryptedData).split(";")[1])
          uni.setStorageSync('openId', openid);
          this.show = true
        })
			},
      affirm(){
        let data={
          memberName:this.form.memberName,
          openId: this.$u.func.getOpenId(),
        };
        this.$u.api.updateMemberName(data).then((res)=>{
          if(res.code===200){
            uni.navigateBack();
            this.show = false;
          }else{
            this.$u.toast(res.msg)
          }
        })
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
  .warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .rect {
    width: 500rpx;
    height: 340rpx;
    background-color: #fff;
    border-radius: 18rpx;
    .title{
      text-align: center;
      color: #333333;
      font-size: 24rpx;
      line-height: 100rpx;
    }
    .form-box{
      padding: 0 30rpx;
      font-size: 24rpx;
    }
  }
</style>

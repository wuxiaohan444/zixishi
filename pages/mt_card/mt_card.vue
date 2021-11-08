<template>
	<view class="container">
		<view class="card-box">
			<image src="/static/images/meituan/meituan.png"></image>
			<view class="content">
        <view class="demalCode-box u-flex u-row-between">
          <u-input v-model="demalCode" placeholder="请输入美团券码" style="width: 90%"/>
          <u-icon name="scan" size="36" @click="scan"></u-icon>
        </view>
			</view>
			<u-button :custom-style="customStyle" shape="circle" type="primary" @click="submitCode">提交</u-button>
		</view>
    <!--    审核券-->
    <u-popup v-model="twoShow" mode="bottom" height="582" border-radius="19" :closeable="true">
      <view class="ticket-box">
        <view class="ticket-item u-flex">
          <view class="ticket-item_left">时长卡</view>
          <view class="ticket-item_middle">
            <text class="u-bold u-black-color">{{meiTuanForm.deal_title}}</text>
            <text class="number">（{{meiTuanForm.count}}张券）</text>
          </view>
          <view class="ticket-item_right">
            立即体验
          </view>
        </view>
        <view class="u-flex u-row-between">
          <view class="u-black-color u-font-28">验券数量</view>
          <u-number-box v-model="ticketNumber" @change="valChange" :min="minNumber" :max="maxNumber"></u-number-box>
        </view>
        <view class="u-flex u-row-between">
          <view class="my-btn" @click="twoShow=false">取消</view>
          <view class="my-btn active" @click="affirmCoupons">确认验券</view>
        </view>
      </view>
    </u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
					marginTop: '42rpx'
				},
        twoShow:false,
        ticketNumber:0,
        meiTuanForm:{},
        minNumber:0,
        maxNumber:0,
        demalCode:'',
        storeInfo:{},
        user:{},
			}
		},
    onLoad(){
      this.storeInfo = uni.getStorageSync('storeInfo');
      this.user = uni.getStorageSync('userInfo');
      console.log(this.user.id);
    },
		methods: {
      affirmCoupons(){

      },
      valChange(){

      },
			scan(e){
        let that = this;
        // 允许从相机和相册扫码
        uni.scanCode({
          success: function (res) {
            that.demalCode = res.result;
            that.submitCode()
          }
        });
			},
      // 确认验券
      affirmCoupons(){
        let data = {
          storeId:this.storeInfo.id,
          receiptCode:this.demalCode,
          count:this.ticketNumber,
          memberId:this.user.id
        }
        console.log(data);
        this.$u.api.MeituanConsume(data).then((res)=>{
          if(res.code===200){
            console.log(res.data);
          }else{
            this.$u.toast(res.msg)
          }
        }).catch((res)=>{
          console.log(res);
          if(res.data.code==200){
            this.twoShow = false;
            this.$u.toast('兑换时长卡成功')
          }else{
            this.$u.toast(res.data.msg)
          }
        })
      },
      // 提交券码
      submitCode() {
        let data = {
          storeId:this.storeInfo.id,
          receiptCode:this.demalCode,
        }
        console.log(data);
        this.$u.api.prepareMeituan(data).then((res)=>{
          console.log(res);
          if(res.code===200){
            this.meiTuanForm = res.data;
            this.oneShow = false;
            this.twoShow = true;
          }else{
            this.$u.toast(res.msg)
          }
        }).catch((res)=>{
          console.log(res);
          if(res.data.code==200){
            this.meiTuanForm = res.data.data;
            this.maxNumber = this.meiTuanForm.count
            this.oneShow = false;
            this.twoShow = true;
          }else{
            this.$u.toast(res.data.msg)
          }
        })
      },
		}
	}
</script>

<style scoped lang="scss">
.demalCode-box {
  border: 1px solid #EEEFF1;
  border-radius: 6rpx;
  margin: 0 30rpx;
  padding: 0 20rpx;
}
.card-box{
	padding: 0 30rpx;
	margin-top: 156rpx;

	image{
		margin: auto;
		width: 108rpx;
		height: 108rpx;
		display: flex;
		justify-content: center;
	}

	.content{
		position: relative;
		box-sizing: border-box;
		margin-top: 134rpx;
		position: relative;

		image{
			width: 47rpx;
			height: 44rpx;
			position: absolute;
			right: 21rpx;
			top: 24rpx;
			z-index: 9;
		}

	}
}
.ticket-box {
  width: 750rpx;
  height: 582rpx;
  background: #F3F5F7;
  padding-top: 74rpx;
  padding-left: 31rpx;
  padding-right: 31rpx;
  box-sizing: border-box;

  .ticket-item {
    width: 688rpx;
    height: 217rpx;
    background: #FFFFFF;
    border-radius: 6rpx;
    margin-bottom: 22rpx;
    overflow: hidden;
    position: relative;

    .ticket-item_left {
      width: 197rpx;
      height: 217rpx;
      background: linear-gradient(-52deg, #FBD48B, #D49848);
      color: #FFFFFF;
      font-size: 31rpx;
      text-align: center;
      line-height: 217rpx;
    }

    .ticket-item_middle {
      width: 408rpx;
      height: 217rpx;
      border-right: 1px solid #E0E0E0;
      line-height: 217rpx;
      padding-left: 30rpx;
      box-sizing: border-box;

      .number {
        color: #999999;
      }
    }

    .ticket-item_right {
      width: 83rpx;
      font-size: 28rpx;
      color: #D69B4B;
      text-align: center;
      padding: 0 22rpx;
    }
  }

  .ticket-item::after, .ticket-item::before {
    content: '';
    position: absolute;
    background: #F3F5F7;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  .ticket-item::after {
    left: -20rpx;
  }

  .ticket-item::before {
    right: -20rpx;
  }

  .my-btn {
    width: 319rpx;
    height: 92rpx;
    background: #FFFFFF;
    border: 1px solid #C5C5C6;
    border-radius: 46rpx;
    font-size: 31rpx;
    font-weight: 500;
    color: #999999;
    text-align: center;
    line-height: 92rpx;
    margin-top: 46rpx;
  }

  .my-btn.active {
    background: #2487FF;
    border: 1px solid #2487FF;
    color: #FFFFFF;
  }
}
</style>

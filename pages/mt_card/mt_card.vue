<template>
	<view class="container">
		<view class="card-box">
			<image src="/static/images/meituan/meituan.png"></image>
			<view class="content">
				<u-input :border="true" :height="92" placeholder-style="color: #A1A3A6" type="text" value="" placeholder="输入美团券码验券" />
				<image src="/static/images/personal/scan.png" @tap.stop="scan($event)"></image>
			</view>
			<button>提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			scan(e){
				e.preventDefault();
				uni.scanCode({
					success(res) {
						Console.log(res)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
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
	
	button{
		margin-top: 42rpx;
		height: 92rpx;
		line-height: 92rpx;
		background: #2487FF;
		border-radius: 46rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}
}
</style>

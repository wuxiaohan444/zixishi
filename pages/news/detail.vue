<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward" title="新闻详情页"
			:background="{ background: '#fff' }" title-color="#000000">
			<view class="right-nav" slot="right">
				<image src="/static/images/news/search.png" class="icon icon-search" mode="widthFix"></image>
				<image src="/static/images/news/menu.png" class="icon icon-menu" mode="widthFix"></image>
			</view>
		</u-navbar>

		<view class="header">
			<image src="" class="avatar" mode=""></image>
			<view class="info">
				<view class="name">
					中国空间站
					<text class="tag">专栏作家</text>
				</view>
				<view class="date">06-17</view>
			</view>
			<view class="btn">+关注</view>
		</view>

		<view class="content">
			<view class="title">
				神舟十二号载人发射任务圆满成功
			</view>
			<view class="static">
				<view class="left">
					<view class="block">
						<image src="/static/images/news/gf.png" class="gf"></image>
						官方
					</view>
					<view class="block">
						<image src="/static/images/news/x.png" class="gf"></image>
						焦点新闻
					</view>
				</view>
				<view class="right">
					<image src="/static/images/news/l.png" class="l" mode="widthFix"></image>
					66666
				</view>
			</view>
			<view class="detail">
				<u-parse :html="content"></u-parse>
			</view>
		</view>

		<view class="footer">
			<input type="text" value="" placeholder="说点什么..." class="ipt" />
			<view class="control">
				<view class="block">
					<image src="/static/images/news/c.png" class="icon c" mode="widthFix"></image>
					458
				</view>
				<view class="block">
					<image src="/static/images/news/s.png" class="icon s" mode="widthFix"></image>
				</view>
				<view class="block">
					<image src="/static/images/news/t.png" class="icon t" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				content: `<p>神舟十二号载人飞船在长征2F运载火箭的托举下，以一往无前之势冲入澄澈霄汉。随后，神舟十二号载人飞船成功进入预定轨道，并完成太阳翼展开。这是中国载人航天史上由中国人书写的又一壮举，标志中国空间站建造任务再次向前迈出了一大步。</p>
				<p>据了解，神舟十二号载人飞船是由航天科技集团五院抓总研制，迄今为止我国研制的标准最高，各方面指标要求最严格的载人航天器。</p>
				<p>“神舟飞船是航天员实现天地往返的‘生命之舟’”。五院总体设计部神舟十二号载人飞船系统总体副主任设计师高旭介绍，神舟十二号飞船由轨道舱、返回舱和推进舱构成，全船共有14个分系统。</p>
				<p>据了解，神舟十二号飞船轨道舱配备了航天员在轨生活支持设备、交会对接敏感器等关键设备，为自主快速交会对接做好充分准备。返回舱是飞船发射和返回过程中航天员所乘坐的舱段，是飞船的“大脑”，推进舱则装配推进系统、电源等设备，为飞船提供动力，并在飞行过程中进行姿态轨道的控制。</p>
				<p>神舟十二号载人飞船是我国空间站任务阶段第一艘载人飞船，是载人空间站建设的重中之重。按照预定计划，飞船搭乘航天员采用自主快速交会对接的模式，与空间站天和核心舱前向对接口对接形成组合体，航天员驻留太空约90天后返回地面。</p>`
			};
		}
	};
</script>

<style lang="scss">
	.container {
		padding: 0 0 150rpx;
	}

	.right-nav {
		display: flex;
		align-items: center;
		margin-right: 40rpx;

		.icon {
			height: auto;

			&-search {
				width: 40rpx;
				margin-right: 40rpx;
			}

			&-menu {
				width: 40rpx;
			}
		}
	}

	.header {
		display: flex;
		align-items: center;
		padding: 44rpx;

		.avatar {
			flex-shrink: 0;
			width: 69rpx;
			height: 69rpx;
			background: #ffffff;
			border: 1px solid #14b9c8;
			border-radius: 50%;
		}

		.info {
			flex: 1;
			margin-left: 14rpx;

			.name {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				line-height: 36rpx;

				.tag {
					margin-left: 10rpx;
					display: inline-block;
					padding: 8rpx 10rpx;
					font-size: 14rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4cbeca;
					line-height: 21rpx;
					border: 1px solid #0bb9c8;
					border-radius: 6px;
				}
			}

			.date {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #a3a3a3;
				line-height: 36rpx;
			}
		}

		.btn {
			padding: 8rpx 19rpx;
			background: #e6e6e6;
			border-radius: 6rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4cbeca;
			line-height: 1;
		}
	}

	.content {
		padding: 0 44rpx;

		.title {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #000000;
			line-height: 47rpx;
		}

		.static {
			margin-top: 34rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left,
			.right {
				display: flex;
				align-items: center;

				.block {
					display: flex;
					align-items: center;
					margin-right: 10rpx;
				}
			}

			.left {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #787878;
				line-height: 1;

				.gf {
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
				}
			}

			.right {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #787878;
				line-height: 1;

				.l {
					width: 25rpx;
					height: auto;
					margin-right: 6rpx;
				}
			}
		}

		.detail {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 47rpx;
			margin-top: 50rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;

		.ipt {
			width: 380rpx;
			height: 77rpx;
			background: #f7f7f7;
			border-radius: 38px;
			padding: 0 37rpx;
			box-sizing: border-box;
			margin-right: 20rpx;
		}

		.control {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.block {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
			}

			.icon {
				height: auto;
			}

			.c {
				width: 41rpx;
				margin-right: 10rpx;
			}

			.s {
				width: 36rpx;
			}

			.t {
				width: 31rpx;
			}
		}
	}
</style>

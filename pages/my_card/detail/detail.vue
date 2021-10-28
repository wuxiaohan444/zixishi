<template>
	<view class="container">
			<view class="seat-list">
        <view class="card-header u-flex">
          <view class="card-header-name u-ellipsis">读书日卡（天庆大厦店）</view>
        </view>
				<view class="content">
					<view class="title u-font-32 u-bold">17小时读书卡（门店名）</view>
					<view class="doc-i">
						<view>
							<text>剩余天数：</text>
							<text>0天</text>
						</view>
						<view>
							<text>剩余时长：</text>
							<text>3小时0分钟</text>
						</view>
					</view>
					<view class="doc">
						<view>使用日期：</view>
						<view>2021年09月15日到期</view>
					</view>
					<view class="doc">
						<view>适用门店：</view>
						<view>门店名</view>
					</view>
				</view>
				<view class="record">
					<view class="title u-font-32 u-bold">使用记录</view>
					<view class="table">
						<u-table :font-size="23">
							<u-tr>
								<u-th fontSize="23rpx">开始使用时间</u-th>
								<u-th fontSize="23rpx">结束使用时间</u-th>
								<u-th fontSize="23rpx">消费时长</u-th>
								<u-th fontSize="23rpx" width="178rpx">消费后剩余时长</u-th>
							</u-tr>
							<block v-for="item in list">
								<u-tr>
									<u-td>{{item.data}}</u-td>
									<u-td>{{item.number}}</u-td>
									<u-td>{{item.time}}</u-td>
									<u-td width="178rpx">{{item.duration}}小时</u-td>
								</u-tr>
							</block>
						</u-table>
					</view>
				</view>
			</view>
		</view>
	</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						data:'2021.09.14  13:59:00',
						number:'2021.09.15  15:00:00',
						time:'1小时01分钟',
						duration:'15小时59分'
					},
					{
						data:'2021.09.14  13:59:00',
						number:'2021.09.15  15:00:00',
						time:'1小时01分钟',
						duration:'15小时59分'
					},
					{
						data:'2021.09.14  13:59:00',
						number:'2021.09.15  15:00:00',
						time:'1小时01分钟',
						duration:'15小时59分'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 30rpx;
	}

	.seat-list{
		padding: 15rpx;
		background-color: #FFFFFF;
		border-radius: 19rpx;
		clear:both;
		margin-bottom: 33rpx;

    .card-header {
      width: 100%;
      height: 179rpx;
      background-image: linear-gradient(90deg, #3B72FC, #8BB5FF);
      border-radius: 10rpx;
      padding: 50rpx;
      box-sizing: border-box;

      .card-header-name {
        color: #FFFFFF;
        font-size: 28rpx;
        font-weight: bold;
      }
    }

		.content{
			padding: 35rpx 0;
			color: #010101;
			border-bottom: 2rpx solid #EEEFF1;

			.doc,
			.doc-i,
			.doc-i view{
				display: flex;
				margin-top: 40rpx;
			}
			.doc-i{
				view{
					margin-top: 0;
				}
				view:last-child{
					margin-left: 160rpx;
				}
				view>text:first-child{
					color: #8D8D8D;
				}
			}

			.doc{

				>view:first-child{
					color: #8D8D8D;
				}
			}
		}
		.record{
			padding-top: 33rpx;
			.title{
				position: relative;
				padding-left: 18rpx;

				&::after{
					content: '';
					width: 8rpx;
					height: 30rpx;
					border-radius: 4rpx;
					background-color: #2487FF;
					position: absolute;
					left: 0;
					top: 52%;
					transform: translateY(-50%);
				}
			}
			.table{
				margin-top: 32rpx;
			}
		}
	}
</style>

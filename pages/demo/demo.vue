<template>
	<view class="wrap">
		<page-nav :desc="desc" :title="title"></page-nav>
		<view class="list-wrap">
			<u-cell-group title-bg-color="rgb(243, 244, 246)" :title="getGroupTitle(item)" v-for="(item, index) in list"
				:key="index">
				<u-cell-item :titleStyle="{fontWeight: 500}" @click="openPage(item1.path)" :title="getFieldTitle(item1)"
					v-for="(item1, index1) in item.list" :key="index1">
					<image slot="icon" class="u-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-gap height="70"></u-gap>
	</view>
</template>

<script>
	import pageNav from '@/components/page-nav/page-nav.vue';
	import list from "./demo.config.js";
	export default {
		components: {
			pageNav
		},
		data() {
			return {
				list: list,
				title: '基础功能示例合集',
				desc: '众多示例覆盖开发过程的各个需求，正在不断完善中。可让您快速集成，开箱即用。'
			}
		},
		computed: {
			getIcon() {
				return path => {
					return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
				}
			},
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: "233"
			});
		},
		created() {

		},
		methods: {
			openPage(path) {
				this.$u.route({
					url: path
				})
			},
			getGroupTitle(item) {
				return item.groupName
			},
			getFieldTitle(item) {
				return item.title
			}
		}
	}
</script>

<style>
	/* page {
		background-color: rgb(240, 242, 244);
	} */
</style>

<style lang="scss" scoped>
	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
</style>

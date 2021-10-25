<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/*uview全局样式*/
	@import "uview-ui/index.scss";
	/*app全局样式*/
	@import 'static/style/app.scss';
</style>
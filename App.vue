<script>	export default {		globalData: {  		    statusBarHeight: 0, // 状态栏高度		    navBarHeight: 0, // 导航栏高度		    navBarLeft: 0, // 导航栏左边宽度(去掉胶囊宽度)
			winHeight:0,//当前屏幕高度		},  		onLaunch: function() {			this.getNavigationHeight();	
			this._setHeight();		},		onShow: function() {			console.log('App Show')		},		onHide: function() {			console.log('App Hide')		},		methods:{			// 获取自定义			getNavigationHeight() {				const systemInfo = uni.getSystemInfoSync();				const statusBarHeight = systemInfo.statusBarHeight;				this.globalData.statusBarHeight = statusBarHeight;				// 胶囊按钮位置信息				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();				this.globalData.navBarLeft = menuButtonInfo.left;				// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度（不包括状态栏高度）				this.globalData.navBarHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight);			},
			_setHeight() { // 高度自适应
				uni.getSystemInfo({
				  success: (res) => {
					const clientHeight = res.windowHeight;
					const clientWidth = res.windowWidth;
					const rpxR = 750 / clientWidth;
					const calc = clientHeight * rpxR - 100;
					this.globalData.winHeight = calc;
				  }
				});
			},		}			}</script><style lang="scss">	/*uview全局样式*/	@import "uview-ui/index.scss";	/*app全局样式*/	@import 'static/style/app.scss';</style>
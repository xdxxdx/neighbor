<template>
	<view class="content" :class="{'active':active}">
		<image class="logo" :class="{'active':active}" src="../../static/title2.jpg"  mode="aspectFit"></image>
		<view class="tabbar-box-wrap">
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/add/add?index=0&fromPublish=true')">
					<image class="box-image" src="../../static/publish1.png" mode="aspectFit"></image>
					<text class="explain">美食分享</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/add/add?index=1&fromPublish=true')">
					<image class="box-image" src="../../static/publish2.png" mode="aspectFit"></image>
					<text class="explain">二手闲置</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/add/add?index=2&fromPublish=true')">
					<image class="box-image" src="../../static/publish3.png" mode="aspectFit"></image>
					<text class="explain">游玩休闲</text>
				</view>
			</view>
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/addcarsharing/addcarsharing?fromPublish=true')">
					<image class="box-image" src="../../static/publish4.png" mode="aspectFit"></image>
					<text class="explain">顺风出行</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/addshare/addshare?type=0')">
					<image class="box-image" src="../../static/publish5.png" mode="aspectFit"></image>
					<text class="explain">邻里故事</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/addshare/addshare?type=1')">
					<image class="box-image" src="../../static/publish6.png" mode="aspectFit"></image>
					<text class="explain">寻求帮助</text>
				</view>
			</view>
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #00400f;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		margin-bottom: 400px;
		width: 600px;
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: 100upx;
			}
		}
	}
}
</style>

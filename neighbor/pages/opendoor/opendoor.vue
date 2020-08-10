<template>
	<view class="page">
		<view style="font-size: 50upx;height: 150upx;">扫码开门</view>
		<image mode="widthFix" class="main-swiper-img" src="https://wx.icrat.cn/resources/neighbor/ui/ew.jpg" />
		<view style="font-size: 30upx;padding-top: 50upx;">二维码有效时间：2分钟</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.page {
	width: 750upx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;
	padding: 100upx;
}
</style>

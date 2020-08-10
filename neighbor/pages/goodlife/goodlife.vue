<template>
	<view class="page" v-if="uiUrl">

		<view class="card-bg" style="background-color: #c7e3ff;" @tap="goSociety">
			<view class="card-title">
				<view class="card-title-text">多彩协会</view>
				<view class="iconfont card-title-more" >查看更多&#xe65f;</view>
			</view>
			<view class="card-pic">
				<image mode="aspectFill" class="card-pic-img" :src="uiUrl + 'goodlife/1.jpg'" />
			</view>
		</view>
		<view class="card-bg" style="background-color: #ffdfc2;" @tap="goVolunteer">
			<view class="card-title">
				<view class="card-title-text">志愿服务</view>
				<view class="iconfont card-title-more" >查看更多&#xe65f;</view>
			</view>
			<view class="card-pic">
				<image mode="aspectFill" class="card-pic-img" :src="uiUrl + 'goodlife/2.jpg'" />
			</view>
		</view>
		<view class="card-bg" style="background-color: #e9c2ff;" @tap="goLifemall">
			<view class="card-title">
				<view class="card-title-text">分享链接</view>
				<view class="iconfont card-title-more" >查看更多&#xe65f;</view>
			</view>
			<view class="card-pic">
				<image mode="aspectFill" class="card-pic-img" :src="uiUrl + 'goodlife/3.jpg'" />
			</view>
		</view>
		

	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo', 'uiUrl']),
		data() {
			return {
				textList: ['多彩协会', '志愿服务', '分享链接']
			};
		},
		methods: {
			goSociety() {
				uni.navigateTo({
					url: '../society/society'
				});
			},
			goVolunteer() {
				uni.navigateTo({
					url: '../volunteer/volunteer'
				});
			},
			goLifemall() {
				uni.navigateTo({
					url: '../lifemall/lifemall'
				});
			}
		}
	}
</script>

<style>
	@import "../../common/newicon.css";

	.iconfont {
		color: #2782D7;
		font-size: 30px;
		padding-right: 15px;
	}

	.page {
		background: #ffffff;
		width: 750px;
		flex-direction: column;
	}

	.banner {
		width: 100%;
		display: flex;
		background-color: #ffffff;
		justify-content: center;
	}



	.btn-row {
		margin-top: 50upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		text-align: center;
		justify-content: space-around;
	}

	.row-item {
		width: 25%;
		flex-direction: column;
		font-weight: bold;
		font-size: 36upx;
		color: #70ac79;
	}

	.card-bg {
		width: 96%;
		
		display: flex;
		flex-direction: column;
		border-radius: 20upx;
		justify-content: center;
		align-items: center;
		padding-bottom: 15upx;
		margin-top: 20upx;
		margin-left: 2%;
	}

	.card-pic {
		width: 96%;
		border-radius: 20upx;
		justify-content: center;
	}
	
	.card-pic-img {
		width:100%;height: 300upx; border-radius: 10upx;
	}

	.card-title {
		width: 100%;
		display: flex;
		flex-direction: row;
		font-size: 36upx;
		justify-content: space-between;
	}
	
	.card-title-text {
		color: #70ac79;font-weight: bold;font-size: 40upx;padding: 6upx 30upx 6upx 30upx;
	}
	
	.card-title-more {
		color: #000000; padding: 6upx 30upx 6upx 30upx;font-size: 26upx;line-height: 75upx;
	}
</style>

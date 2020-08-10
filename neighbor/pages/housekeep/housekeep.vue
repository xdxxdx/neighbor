<template>
	<view class="page" v-if="uiUrl">
		<view class="banner">
			<image mode="widthFix" style="width: 100%;" :src="uiUrl + 'housekeep/banner.jpg'" />
		</view>
		
		<view class="btn-baoxiu" @tap="goSuggest">报事报修</view>
		<view v-for="(data,index) in list" :key="data.id">
			<view class="list-row" :style="'border-color:' + bgColors[index]">
				<view class="list-row-left">
					<image mode="widthFix" style="width:70%" :src="uiUrl + 'housekeep/' + index + '.png'" />
					<view>{{textList[index]}}</view>
				</view>
				<view class="list-row-mid" :style="'background-color:' + bgColors[index] ">

				</view>
				<view class="list-row-right"><text>{{infoList[index]}}</text></view>

			</view>
		</view>

		<view class="btn" @tap="phoneCall('27590008')">陶然新村：<text style="color: #70ac79;text-decoration:underline;">27590008</text></view>
		<view class="btn" @tap="phoneCall('27590018')">陶然居： <text style="padding-left: 30upx; color: #70ac79;text-decoration:underline;">27590018</text></view>
		<view class="btn" @tap="phoneCall('27590088')">东篱新村：<text style="color: #70ac79;text-decoration:underline;">27590088</text></view>
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
				list: [0, 1, 2, 3, 4, 5],
				textList: ['报修报事', '增值服务', '投诉建议', '家政服务', '访客通道', '生活缴费'],
				infoList: ['服务内容：\n照明维修、空调维修、家电维修、管道维修、\n水暖维修、木作工程、泥水维修、小区维修、\n卫生清理、绿化养护、安全提示',
					'服务内容：\n浇花、关门窗、递报费用代缴',
					'文明居家：噪音扰民、文明养宠、\n高空抛物、车位占用\n服务投诉：工程、客服、安保、保洁\n幸福生活：合理建议',
					'服务内容：\n即将上线',
					'服务内容：\n即将上线',
					'服务内容：\n即将上线'
				],
				bgColors: ['#a800ff', '#f43e58', '#f8ae0d', '#20d699', '#2b5deb', '#20bbc5'],
				boardColors: ['border: 4upx solid #a800ff', 'border: 4upx solid #f43e58', 'border: 4upx solid #f8ae0d',
					'border: 4upx solid #20d699', 'border: 4upx solid #2b5deb', 'border: 4upx solid #20bbc5'
				]
			};
		},
		methods: {
			toDetail(i) {
				uni.navigateTo({
					url: '../societydetail/societydetail?num=' + i
				});
			},
			phoneCall(num) {
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			goSuggest()
			{
				uni.navigateTo({
					url: '../suggest/suggest'
				});
			}
		}
	}
</script>

<style>
	.page {
		width: 750px;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.banner {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.list-row {
		width: 744upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		margin-top: 20upx;
		border-width: 2upx;
		border-style: solid;
	}

	.list-row-left {
		width: 120upx;
		flex-direction: column;
		padding-left: 10upx;

	}

	.list-row-mid {
		margin-left: 20upx;
		width: 2upx;

		height: 180upx;
	}

	.list-row-right {
		width: 560upx;
		text-align: left;

		/* background-color: #70ac79; */
		margin-left: 10upx;
		height: 200upx;
		padding: 10upx;
		/* color: #ffffff; */
	}

	.btn {
		width: 100%;
		line-height: 80px;
		background-color: #ffffff;
		border-radius: 10upx;
	}

	.btn-baoxiu {
		background-color: #70ac79;
		color: #fff;
		border-radius: 10upx;
		width: 98%;
		margin: 10upx 0;
		margin-left: 1%;
		font-size: 34upx;
	}
</style>

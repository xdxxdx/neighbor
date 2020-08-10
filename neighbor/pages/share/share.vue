<template>
	<view>
		<view class="guide-mask" v-if="currentStep != 4" @tap="nextStep">
			<view class="guide1" v-if="currentStep == 0"><text class="text-bg">宣传栏</text></view>
			<view class="guide2" v-if="currentStep == 0"><text class="text-bg">通知公告</text></view>
			<view class="guide3" v-if="currentStep == 1"><text class="text-bg">主功能版块</text></view>
			<view class="guide4" v-if="currentStep == 2"><text class="text-bg">小区成员</text></view>
			<view class="guide5" v-if="currentStep == 2"><text class="text-bg">邻里生活分享互助</text></view>
			<view class="guide6" v-if="currentStep == 3"><text class="text-bg">邻圈：社区首页，主功能版块入口\n排行：小区与个人爱心币排行\n发布：发布分享，顺风车，动态等\n消息：系统消息与个人消息\n我的：个人中心、发布管理</text></view>
			<view class="bottom-arrow" v-if="currentStep == 3"></view>
		</view>
		<page-Head class="index" :first="first" :isShare="true"></page-Head>
		
		<view id="tab-bar" class="share-tab">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['share-tab-list',tabIndex==index ? 'share-active' : '']"
			 :id="tab.id" @tap="tapTab(index)">{{tab.name}}</view>
		</view>

		<view class="share-list " v-if="listData" v-for="(value,key) in listData" :key="key">
			<view class="share-top" @click="goDetail(value.id)">
				<view class="share-user">
					<image class="share-top-avatar" :src="value.user.avatarUrl" />
					<text style="text-align: center;">{{value.user.nickName}}\n{{value.user.address}}</text>
				</view>
				<view>
					<text style="color: #888888;">{{value.createDate}}</text>
				</view>
			</view>
			<view class="share-title">
				<text style="color: #898989;">{{value.title}}</text>
			</view>
			<view class="share-image-line">
				<view class="share-image-frame">
					<video v-if="value.isVideo" class="share-image" :src="imageUrl + value.mainImage" initial-time="1"></video>
					<image v-if="value.isVideo == false" mode="aspectFill" class="share-image" :src="imageUrl + value.mainImage"
					 @click="goDetail(value.id)"></image>
				</view>
			</view>
			<view class="share-bottom">
				<text style="color: #888888;" decode="true"><text class="iconfont">&#xe606;</text>{{" " + value.reader}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;
	import pageHead from '@/components/page-head.vue'
	import {
		mapState,
	} from 'vuex'

	export default {
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '邻里故事',
						id: 'story'
					},
					{
						name: '邻里互助',
						id: 'help'
					}
				],
				listData: [],
				first: false,
				issearch: false,
				scrollLeft: 0,
				isClickChange: false,
				currentStep: 4,

			}
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		components: {
			pageHead
		},
		onLoad() {
			uni.getStorage({
				key: 'show_guide',
				success: (res) => {
					this.currentStep = 0;
					uni.removeStorage({
						key: 'show_guide',
						success: (res) => {
						}
					});
				}
			});

			uni.request({
				url: this.requestUrl + 'business/daySign',
				method: 'GET',
				data: {
					userId: this.userInfo.id
				},
				success: (res) => {
					//console.log(res);
					let data = res.data.data;
					if (data.newsign) {
						uni.showModal({
							title: "签到奖励",
							content: "恭喜您连续签到" + data.num + "天，奖励" + data.point + "个爱心币，明天请记得签到。",
							showCancel: false
						})
					}
				},
			});
		},
		onShow() {
			this.loadData();
		},
		onPullDownRefresh() {
			uni.reLaunch({
				url: '../share/share'
			});
		},

		onShareAppMessage(res) {
			return {
				title: '聚龙小镇',
				path: '/pages/entry/oauth',
				imageUrl: 'https://wx.icrat.cn/resources/neighbor/title2.jpg',
				success: (res) => {
					//console.log("转发成功", res);
				},
				fail: (res) => {
					//console.log("转发失败", res);
				}
			}
		},
		methods: {
			addShare() {
				if (this.userInfo.id == 0) {
					uni.navigateTo({
						url: '../userinfo/userinfo?state=0&isEdit=false',
					});
					return;
				}
				uni.navigateTo({
					url: '../addshare/addshare'
				});

			},
			loadData() {

				uni.request({
					url: this.requestUrl + 'business/listShareInfo',
					method: 'GET',
					data: {
						pageIndex: 0,
						communityId: 0, //this.userInfo.communityId
						type: this.tabIndex
					},
					success: (res) => {
						//console.log(res);
						this.listData = res.data.data.items;
						for (let data of this.listData) {
							data.createDate = dateUtils.format(this.formatDate(data.createDate));
							data.mainImage = data.images.split(",")[0];
							data.isVideo = false;
							if (data.mainImage.toLowerCase().lastIndexOf("mp4") != -1)
								data.isVideo = true;
							//console.log(data.createDate);
						}
					},
				});
			},

			goDetail: function(e) {

				uni.navigateTo({
					url: "../sharedetail/sharedetail?id=" + e
				})
			},
			async changeTab(e) {
				if (this.issearch)
					return;
				let index = e.target.current;

				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					this.loadData();
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; 
				this.loadData();
			},
			getElSize(id) { 
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e) { //点击tab-bar
				if (this.tabIndex === e) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e;
					this.loadData();
				}
			},
			nextStep() {
				this.currentStep++;
				console.log(this.currentStep)
			}
		},
	}
</script>

<style>
	@import "../../common/newicon.css";

	.share-list {
		background-color: #ffffff;
		flex-direction: column;
		align-items: center;
	}

	.share-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-left: 50upx;
		padding-right: 50upx;
		padding-top: 10upx;
	}

	.share-user {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.share-top-avatar {
		display: flex;
		width: 80upx;
		height: 80upx;
		border: 0 solid #ff0000;
		border-radius: 40upx;
		margin-right: 20upx;
	}

	.share-title {
		align-self: flex-start;
		padding-left: 50upx;
	}

	.share-image-line {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share-image-frame {
		width: 86%;
		height: 400upx;
		padding: 10upx;
		background-color: #f1f5f8;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.share-image {
		width: 94%;
		height: 94%;
	}

	.share-bottom {
		margin-bottom: 10upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 20upx;
		padding-right: 50upx;
	}

	.share-tab {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 80upx;
	}


	.share-tab-list {
		background-color: #ffffff;
		font-size: 30upx;
		width: 49.5%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		border-bottom: 5upx solid #f1f5f8;
	}

	.share-active {
		color: #70ac79;
		border-bottom: 5upx solid #70ac79;
	}



	/* 引导 */
	.guide-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
	}

	.text-bg {
		background-color: #ffbb4d;
		font-size: 30upx;
		padding: 0 15upx;
		border-radius: 10upx;
		color: #ffffff;
	}

	.guide1 {
		margin-top: 5upx;
		border: 10upx solid #ffffff;
		width: 720upx;
		height: 370upx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.guide2 {
		margin-top: 10upx;
		border: 10upx solid #ffffff;
		width: 720upx;
		height: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide3 {
		margin-top: 470upx;
		border: 10upx solid #ffffff;
		width: 720upx;
		height: 400upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide4 {
		margin-top: 910upx;
		border: 10upx solid #ffffff;
		width: 720upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide5 {
		margin-top: 10upx;
		border: 10upx solid #ffffff;
		width: 720upx;
		height: 70upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide6 {
		position: fixed;
		bottom: 0;
		border: 10upx solid #ffffff;
		width: 530upx;
		height: 300upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 50upx;
		background-color: #ffbb4d;
	}

	.bottom-arrow {
		bottom: 0;
		width: 0;
		height: 0;
		border-width: 30px 30px 30px 30px;
		border-style: solid;
		border-color: rgb(255, 255, 255) transparent transparent transparent;
		position: fixed;
	}
</style>

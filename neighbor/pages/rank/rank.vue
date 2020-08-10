<template>
	<view class="page-body">
		<view class="mask" v-show="show" @tap="hidePop()"></view>
		<view class="popup popup-middle" v-show="show">
			<view class="desc">
				<text style="font-weight: bold;">赠送爱心币</text>
				<view class="desc-left">
					<view class="inline-item">
						<text style="width: 30%;">数量：</text>
						<input style="width: 60%;" type="number" v-model="sendPointNum" placeholder="请输入赠送数量" />
					</view>
					<text class="heart" style="font-size: 26upx;">爱心币余额：{{userInfo.heartPoint}}</text>
				</view>
				<view>
					<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="doSend()">赠送</button>
					<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="hidePop()">取消</button>
				</view>
			</view>
		</view>

	
		<view class="banner" style="font-size: 34upx;font-weight: bold;">
			小区总排行
		</view>
		<view class="toprank-row" v-if="communityRank.length > 0">
			<view class="toprank-icon">
				<image style="width: 50%;" mode="widthFix" :src="uiUrl + '/rank1.png'" />
			</view>
			<text class="toprank-name">{{communityRank[2].name + "\n"}}</text>
			<text class="toprank-heart heart">&#xe600;{{communityRank[2].totalPoint}}</text>
		</view>
		<view class="toprank-row" v-if="communityRank.length > 0">
			<view class="toprank-icon">
				<image style="width: 50%;" mode="widthFix" src="https://wx.icrat.cn/resources/neighbor/ui/rank2.png" />
			</view>
			<text class="toprank-name">{{communityRank[1].name + "\n"}}</text>
			<text class="toprank-heart heart">&#xe600;{{communityRank[1].totalPoint}}</text>
		</view>
		<view class="toprank-row" v-if="communityRank.length > 0">
			<view class="toprank-icon">
				<image style="width: 50%;" mode="widthFix" src="https://wx.icrat.cn/resources/neighbor/ui/rank3.png" />
			</view>
			<text class="toprank-name">{{communityRank[0].name + "\n"}}</text>
			<text class="toprank-heart heart">&#xe600;{{communityRank[0].totalPoint}}</text>
		</view>
		<view class="search-row">
			<view class="search">
				<view class="search_arr">
					<icon class="search-icon" size='20' type='search'></icon>
					<input placeholder="请输入要搜索的内容..." v-model="searchWord" />
				</view>
			</view>
			<view class='search-sou' @tap="search">搜索</view>
		</view>
		<view id="tab-bar" class="rank-tab">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['rank-tab-list',tabIndex==index ? 'rank-active' : '']"
			 :id="tab.id" :data-current="index" @tap="tapTab(index)">{{tab.name}}</view>
		</view>
		<view class="my-rank">
			<view class="my-rank-info">
				<image class="item-avatar" :src="userInfo.avatarUrl" />
				<text style="width: 80upx;">{{userInfo.nickName}}</text>
				<text class="heart" style="margin-left: 20upx;font-size: 36upx;">&#xe600;</text>
				<text>{{userInfo.heartPoint}}</text>
			</view>
			<view class="my-rank-num">
				{{(ownerRank > 0) ? ownerRank : '暂无'}}
			</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="100" @change="changeTab">
			<swiper-item v-for="(tab,index1) in tabBars" :key="tab.id">
				<scroll-view class="list" scroll-y>
					<view class="item-row" v-for="(data,index2) in personalRank" :key="index2">
						<view class="item-rank" style="color: #FFD400;font-size: 46upx; font-weight: bold;text-shadow:2upx 2upx 0upx #000000;" v-if="index2 == 0">
							{{(data.heartPoint > 0) ? index2 + 1 : '暂无'}}
						</view>
						<view class="item-rank" style="color: #EEEEEE;font-size: 42upx; font-weight: bold;text-shadow:2upx 2upx 0upx #000000;" v-if="index2 == 1">
							{{(data.heartPoint > 0) ? index2 + 1 : '暂无'}}
						</view>
						<view class="item-rank" style="color: #F0AD4E;font-size: 38upx; font-weight: bold;text-shadow:2upx 2upx 0upx #000000" v-if="index2 == 2">
							{{(data.heartPoint > 0) ? index2 + 1 : '暂无'}}
						</view>
						<view class="item-rank" v-if="index2 > 2">
							{{(data.heartPoint > 0) ? index2 + 1 : '暂无'}}
						</view>
						<view class="item-info">
							<image class="item-avatar" :src="data.avatarUrl" @tap="toUser(data.openId)" />
							<view class="item-text">
								<text>{{data.nickName}}</text>
								<text class="heart" style="font-size: 32upx;">&#xe600;{{data.heartPoint}}</text>

							</view>
							<view class="item-btn" @tap="sendPoint(data)">赠币</view>
							<view class="item-btn" @tap="goHouse(data)">来我家</view>
							<view class="item-btn" @tap="changeAttention(data, index2)" v-if="data.id != userInfo.id">{{(attentionStates[index2] > 0) ? "已关注" : "未关注"}}</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo','uiUrl']),
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				currentPage: 0,
				issearch: false,
				searchWord : '',
				communityName: ["陶然新村", "东篱新村", "陶然居"],
				communityIds: [0, 7763, 7764, 7765],
				communityRank: [],
				personalRank: [],
				attentionStates: [],
				ownerRank: 0,
				sendTarget: '',
				sendPointNum: '',
				show: false,
				tabBars: [{
						name: '总排行',
						id: '0'
					},
					{
						name: '陶然新村',
						id: '1'
					},
					{
						name: '东篱新村',
						id: '2'
					},
					{
						name: '陶然居',
						id: '3'
					}
				],
			}
		},
		onLoad: function() {
			uni.request({
				url: this.requestUrl + 'business/communityRank',
				method: 'GET',
				success: (res) => {
					//console.log(res);
					this.communityRank = res.data.data;
				},
			});
			this.loadData();
		},
		methods: {
			loadData() {
				//this.ownerRank = 0;
				//this.personalRank = [];

				//console.log(this.tabIndex);
				uni.request({
					url: this.requestUrl + 'business/personalRank',
					method: 'GET',
					data: {
						communityId: this.communityIds[this.tabIndex],
						userId: this.userInfo.id,
						search: this.searchWord
					},
					success: (res) => {
						//console.log(res);
						this.ownerRank = 0;
						this.attentionStates = res.data.data.attentionStates;
						this.personalRank = res.data.data.rankList;
						for (let i = 0; i < this.personalRank.length; i++) {
							if (this.personalRank[i].id == this.userInfo.id) {
								this.ownerRank = i + 1;
								break;
							}
						}
					},
				});

			},
			search()
			{
				this.loadData();
			},
			toUser(openId) {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + openId + '&state=2'
				});
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
			async tapTab(e) {
				if (this.tabIndex === e) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; 
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e;
				}
			},
			changeAttention(user, n) {

				if (this.attentionStates[n] == 0) {
					uni.request({
						url: this.requestUrl + 'business/addAttention',
						method: 'POST',
						data: {
							openId: this.userInfo.openId,
							type: 1,
							targetId: user.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						success: (res) => {
							this.attentionStates[n] = res.data;
							uni.showModal({
								content: "已关注",
								showCancel: false
							});
							this.loadData();
						}
					});
				} else {
					uni.request({
						url: this.requestUrl + 'business/delAttention',
						method: 'GET',
						data: {
							id: this.attentionStates[n]
						},
						success: (res) => {
							this.attentionStates[n] = 0;
							uni.showModal({
								content: "取消关注",
								showCancel: false
							});
							this.loadData();
						}
					});
				}
			},
			goHouse(user) {
				uni.navigateTo({
					url: '../userhouse/userhouse?openId=' + user.openId + '&nickName=' + user.nickName +
						'&avatarUrl=' + user.avatarUrl + '&userId=' + user.id
				});
			},
			sendPoint(user) {
				this.show = true;
				this.sendTarget = user;
			},
			hidePop() {
				this.show = false;
			},
			doSend() {
				this.sendPointNum = Number(this.sendPointNum);
				if (this.sendPointNum == 0 || isNaN(this.sendPointNum) || this.sendPointNum > this.userInfo.heartPoint) {
					uni.showToast({
						title: '请输入正确赠送数量',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showLoading({
						title: '赠送中...',
						mask: true
					});
					uni.request({
						url: this.requestUrl + 'business/sendHeartpoint',
						method: 'POST',
						data: {
							userId: this.userInfo.id,
							targetId: this.sendTarget.id,
							num: this.sendPointNum
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						success: (res) => {
							uni.hideLoading();
							uni.showModal({
								content: "赠送成功",
								showCancel: false
							});
							this.userInfo.heartPoint = res.data.data;
							this.sendTarget.heartPoint += this.sendPointNum;
							this.sendPointNum = '';
						}
					});
					this.show = false;
				}
			}
		}
	}
</script>

<style>
	@import '../../common/mainpage.css';
	@import "../../common/newicon.css";

	.banner {
		display: flex;
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
	}

	.search {
		width: 80%;
	}

	.rank-tab {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 80px;
	}


	.rank-tab-list {
		background-color: #ffffff;
		font-size: 30px;
		width: 24.5%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		border-bottom: 5px solid #f1f5f8;
	}

	.rank-active {
		color: #70ac79;
		border-bottom: 5px solid #70ac79;
	}

	.my-rank {
		display: flex;
		background-color: #70ac79;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.my-rank-info {
		width: 100%;
		display: flex;
		background-color: #ffffff;
		padding-top: 10px;
		padding-bottom: 10px;
		justify-content: flex-start;
		align-items: center;
	}

	.my-rank-num {
		width: 200upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		font-weight: bold;
		font-size: 36upx;
	}

	.item-row {
		display: flex;
		background-color: #ffffff;
		margin-top: 5px;
		padding: 0px;
	}

	.item-info {
		width: 100%;
		display: flex;
		background-color: #ffffff;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding-top: 5px;
		padding-bottom: 5px;
		border-left: 1upx solid #70ac79;
	}

	.item-rank {
		width: 120upx;
		display: flex;
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
		color: #70ac79;
		font-weight: bold;
	}

	.item-avatar {
		width: 80px;
		height: 80px;
		border: 0 solid #ff0000;
		border-radius: 40px;
		align-items: center;
		margin-left: 10upx;
	}

	.item-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 220upx;
	}


	.item-btn {
		text-align: center;
		width: 90px;
		height: 50px;
		line-height: 50px;
		border: 0 solid #ff0000;
		border-radius: 10px;
		color: #ffffff;
		font-size: 26upx;
		background-color: #70ac79;
		margin-left: 10upx;
	}

	.communityRank {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		background-color: #ffffff;
		text-align: center;
		font-weight: bold;
		font-size: 20upx;
		padding-left: 100upx;
		padding-right: 100upx;
	}

	.communityRank1 {
		width: 33.3%;
		font-size: 28upx;
	}


	.communityRank2 {
		width: 33.3%;
		font-size: 28upx;
	}

	.communityRank3 {
		width: 33.3%;
		font-size: 28upx;
	}


	/*弹出框*/
	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 450upx;
		border-radius: 10upx;
		top: 100px;
		right: 0;
		left: 0;
		margin: auto;
	}

	.desc {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 30upx;
		line-height: 80upx;
		margin: 30upx;
		text-align: center;
	}

	.desc-left {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 30upx;
		line-height: 80upx;
		margin: 10upx;
		text-align: left;
	}

	.inline-item {
		display: flex;
		flex-direction: row;
	}


	.toprank-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		background-color: #ffffff;
		margin-bottom: 5upx;
		padding: 5upx;
		text-align: left;
		font-size: 32upx;
	}

	.toprank-icon {
		width: 20%;
		padding-left: 40upx;
		padding-right: 20upx;
	}

	.toprank-name {
		width: 40%;
	}

	.toprank-heart {
		width: 40%
	}
</style>

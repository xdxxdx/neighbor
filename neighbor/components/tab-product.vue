<template>

	<view class="index">
		<view class="search-row">
			<view class="search">
				<view class="search_arr">
					<icon class="search-icon" size='20' type='search'></icon>
					<input placeholder="请输入要搜索的内容..." v-model="searchWord" />
				</view>
			</view>
			<view class='search-sou' @tap="search">搜索</view>
			<view class="add-btn" @tap="goAdd()">
			<text>发布</text></view>
			
		</view>
		<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @tap="tapTab">{{tab.name}}</view>
		</scroll-view>

		<swiper :current="tabIndex" class="swiper-box" duration="100" @change="changeTab">
			<swiper-item v-for="(tab,index1) in tabBars" :key="tab.id">
				<scroll-view class="list" :scroll-y="enableY" @scrolltolower="loadMore(1)" >
					<view class="product-list">
						<block v-for="(newsitem,index2) in newsitems.data" :key="index2">
							<view class="product" >
								<view class="user-avatar-right">
								<view class="like" @tap="like(newsitem)"><text class="heart" style="font-size: 26px;line-height: 40px;">{{(newsitem.likeId == 0) ? '&#xe61e;' : '&#xe650;' }} </text> {{newsitem.likeNum}}</view>
								</view>
								<video v-if="newsitem.isVideo" class="product-image" :src="imageUrl + newsitem.mainImage"></video>
								<image v-if="newsitem.isVideo == false" @tap="toDetail(newsitem.id)" mode="aspectFill" class="product-image" :src="newsitem.mainImage ? imageUrl + newsitem.mainImage : 'https://via.placeholder.com/150x200'"></image>
								<view class="product-info" @tap="toDetail(newsitem.id)">
									<view class="product-title">{{newsitem.name}}</view>
									
									<view class="product-user">
										<text class="heart" v-if="newsitem.payType == 0">&#xe600;{{newsitem.price}}</text>
										<text class="heart" v-if="newsitem.payType == 1">&#xe601;{{newsitem.price}}</text>
										<text class="heart" v-if="newsitem.payType == 2">免费分享</text>
										<view class="user-avatar-right"><image class="user-avatar" :src="newsitem.ownerPic" /></view>
									
										
									</view>
								</view>
							</view>
						</block>
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
		props: ['tabBars', 'firstType', 'enableY'],
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				currentPage: 0,
				issearch: false,
			}
		},
		onLoad: function() {
			this.loadData();
		},
		onShow() {
			this.loadData();

		},
		methods: {
			like(item) {
				uni.showLoading({
					mask: true
				});
				if (item.likeId == 0) {
					uni.request({
						url: this.requestUrl + 'business/addAttention',
						method: 'POST',
						data: {
							openId: this.userInfo.openId,
							type: 3,
							targetId: item.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							item.likeId = res.data;
							item.likeNum++;
							uni.showModal({
								content: "已点赞",
								showCancel: false
							});
							uni.hideLoading();
						}
					});
				} else {
					uni.request({
						url: this.requestUrl + 'business/delAttention',
						method: 'GET',
						data: {
							id: item.likeId
						},
						success: (res) => {
							item.likeId = 0;
							item.likeNum--;
							uni.showModal({
								content: "取消赞",
								showCancel: false
							});
							uni.hideLoading();
						}
					});
				}
			},
			goAdd() {
				if (this.userInfo.id == 0)
				{
					uni.navigateTo({
						url: '../userinfo/userinfo?state=0&isEdit=false',
					});
					return;
				}
				uni.navigateTo({
					url: '../add/add?index=' + this.firstType + '&itemId=0'
				});
			
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				});
			},
			loadMore(e) {
				setTimeout(() => {
					this.loadData();
				}, 1000);
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
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; 
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current
				}
			},
			search() {
				this.issearch = true;
				this.tabIndex = 0;
				this.newsitems.data = [];
				this.loadData(this.searchWord);
			},
			loadData(e) {

				//this.newsitems = [];
				//console.log(this.userInfo.communityId);
				let word = (!e) ? "" : e;
				uni.request({
					url: this.requestUrl + 'business/listItem',
					method: 'GET',
					data: {
						userId: this.userInfo.id,
						firstType: this.firstType,
						secondType: this.tabIndex - 1,
						pageIndex: this.currentPage,
						search: word,
						communityId: 0//this.userInfo.communityId
					},
					success: (res) => {
						if (this.issearch)
							this.issearch = false;
						//console.log(JSON.stringify(res));
						let items = res.data.data.items;
						let users = res.data.data.users;
						let newsitem = {
							loadingText: "加载更多...",
							data: []
						};
						for (let index in items) {
							items[index].ownerPic = users[index].avatarUrl;
							items[index].ownerName = users[index].nickName;
							items[index].likeNum = users[index].likeNum;
							items[index].likeId = users[index].likeId;
							items[index].isVideo = false;
							if (items[index].mainImage.toLowerCase().lastIndexOf("mp4") != -1)
								items[index].isVideo = true;
							newsitem.data.push(items[index]);
						};
						this.newsitems = newsitem; //.splice(this.tabIndex, 0, newsitem);
						//console.log(JSON.stringify(this.newsitems));
					}
				});
			}
		}
	}
</script>

<style>
	@import '../common/mainpage.css';
	@import "../common/newicon.css";
	
	
	
</style>

<template>
	<view class="page-body" style="overflow-y: hidden;">
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
		<view id="tab-bar" class="swiper-tab">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @tap="tapTab">{{tab.name}}</view>
		</view>

		<swiper :current="tabIndex" class="swiper-box" duration="100" @change="changeTab">
			<swiper-item v-for="(tab,index1) in tabBars" :key="tab.id">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(1)">
				
						<view class="item-row" v-for="(newsitem,index2) in newsitems.data" :key="index2">
				
								<view class="like" @tap="like(newsitem)"><text class="heart" style="font-size: 26px;line-height: 40px;">{{(newsitem.likeId == 0) ? '&#xe61e;' : '&#xe650;' }} </text> {{newsitem.likeNum}}</view>
					
								<view ><video v-if="newsitem.isVideo" class="item-pic" :src="imageUrl + newsitem.mainImage" initial-time="1"></video>
								<image v-if="newsitem.isVideo == false" @tap="toDetail(newsitem.id)" class="item-pic" mode="aspectFill" :src="newsitem.mainImage ? imageUrl + newsitem.mainImage : 'https://via.placeholder.com/150x200'"></image>
								</view>
								
								<view class="item-info" @tap="toDetail(newsitem.id)">
									<view class="item-title">{{newsitem.name}}</view>									
									<view class="item-detail">
										<view><text>{{(newsitem.firstType == 2) ? "人数" : "数量" + " : " + newsitem.num}}</text></view>
										<view><text>截止{{" : " + newsitem.endTime}}</text></view>
										<view class="item-owner"><image class="item-avatar" :src="newsitem.ownerPic" /><text >{{newsitem.ownerName}}</text></view>
										
									<view class="item-right">
										<view><text class="heart" v-if="newsitem.payType == 0">&#xe600;{{newsitem.price}}</text></view>
										<view><text class="heart" v-if="newsitem.payType == 1">免费分享</text></view>
										<view class="item-buy">{{(newsitem.endTime == '已过期') ? '详情' : btnText[tabIndex]}}</view>
									</view>
									</view>
									
										
								</view>
								
							</view>
							<view style="height: 50upx;"></view>
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
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		data() {
			return {
				btnText: ['下单', '下单', '参加'],
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				currentPage: 0,
				firstType:0,
				issearch: false,
				searchWord: "",
				tabBars: [
					{
						name: '美食分享',
						id: 'eat'
					},
					{
						name: '二手闲置',
						id: 'use'
					},
					{
						name: '游玩休闲',
						id: 'play'
					}
				],
			}
		},
		onLoad: function(){
			//this.loadData();
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
					url: '../add/add?index=0&showFirst=true&itemId=0'
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
			async tapTab(e) { //点击tab-bar
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current
				}
			},
			search() {
				this.issearch = true;
				this.tabIndex = 0;
				this.newsitems.data = [];
				this.loadData();
			},
			loadData() {
				//this.newsitems = [];
				//console.log(this.userInfo.communityId);
				uni.request({
					url: this.requestUrl + 'business/listItem',
					method: 'GET',
					data: {
						userId: this.userInfo.id,
						firstType: this.tabIndex,
						secondType: 0,
						pageIndex: this.currentPage,
						search: this.searchWord,
						communityId: this.userInfo.communityId
					},
					success: (res) => {
						this.issearch = false;
						//console.log(JSON.stringify(res));
						let items = res.data.data.items;
						let users = res.data.data.users;
						let newsitem = {
							loadingText: "加载更多...",
							data: []
						};
						var timestamp = new Date().getTime();
						for (let index in items) {
							items[index].ownerPic = users[index].avatarUrl;
							items[index].ownerName = users[index].nickName;
							items[index].likeNum = users[index].likeNum;
							items[index].likeId = users[index].likeId;
							items[index].endTime = (timestamp > items[index].endTime) ? '已过期' : this.formatDate(items[index].endTime);
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
	@import '../../common/mainpage.css';
	@import "../../common/newicon.css";
	
	
	
</style>


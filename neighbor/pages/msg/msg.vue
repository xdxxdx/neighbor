<template>
	<view class="page-body">
		<view class="mask" v-show="show" @tap="hidePop()"></view>
		<view class="popup popup-middle" v-show="show" v-if="listData.length > 0">
			<view class="desc">
					<view style="font-size: 36upx;text-align: center;">{{currentTitle}}</view>
					<view class="item-line"></view>
					<text style="align-self:flex-start ; text-align: left;text-indent: 2em;">{{currentInfo}}</text>
			</view>
		</view>
		<view id="tab-bar" class="msg-tab">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['msg-tab-list',tabIndex==index ? 'msg-active' : '']" :id="tab.id"
			 @tap="tapTab(index)">{{tab.name}}</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="100" @change="changeTab">
			<swiper-item v-for="(tab,index1) in tabBars" :key="tab.id">
				<scroll-view scroll-y @scrolltolower="loadMore(1)">
					<view class="list">
					<view class="item-row" v-for="(data,index2) in listData" :key="index2">
						<view class="item-date">
							{{data.createDate}}
						</view>
						<view class="item-title">
							<text>{{data.title}}</text>
						</view>
						<view class="item-line"></view>
				
						<view class="item-detail" @tap="showDetail(index2)">
							<view class="item-info">{{data.info}}</view>
							<view>查看详情 ▶</view>
							</view>
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
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '系统消息',
						id: '0'
					},
					{
						name: '个人消息',
						id: '1'
					}
				],
				listData: [],
				first: false,
				issearch: false,
				scrollLeft: 0,
				isClickChange: false,
				currentTitle: '',
				currentInfo: '',
				show: false
			};
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			loadData() {
				uni.request({
					url: this.requestUrl + 'business/listMessage',
					method: 'GET',
					data: {
						userId: this.userInfo.id,
						type: this.tabIndex,
						pageIndex: 1,
					},
					success: (res) => {
						//console.log(res);
						this.listData = res.data.data.items;
						for (let data of this.listData) {
							data.createDate = this.formatDate(data.createDate);
						}
					}
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
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e;
				}
			},
			showDetail(n) {
				this.currentTitle = this.listData[n].title;
				this.currentInfo = this.listData[n].info;
				this.show = true;
			},
			hidePop() {
				this.show = false;
			},
		}
	}
</script>

<style>
	.msg-tab {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 80px;
		margin-top: 10px;
	}


	.msg-tab-list {
		background-color: #ffffff;
		font-size: 30px;
		width: 49.5%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		border-bottom: 5px solid #f1f5f8;
	}

	.msg-active {
		color: #70ac79;
		border-bottom: 5px solid #70ac79;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.item-row {
		display: flex;
		margin-top: 20px;
		flex-direction: column;
		width: 100%;
		padding-top: 0upx;
	}
	
	.item-date {
		width: 100%;
		background-color: #70ac79;
		text-align: center;
		font-size: 30upx;
		color: #ffffff;
	}
	
	.item-title {
		width: 90%;
		padding-bottom: 10px;
		color: #9B9B9B;
		font-size: 34upx;
	}
	

	

	
	.item-info {
		width: 70%;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		color: #B2B2B2;
	}
	
	.item-detail {
		display: flex;
		flex-direction: row;
		width: 90%;
		justify-content: space-between;
		color: #70ac79;
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
		width: 600upx;
		border-radius: 10upx;
		top: 100px;
		right: 0;
		left: 0;
		
	}
	
	.desc {
		display: flex;
		flex-direction: column;
		margin: 30upx;
		color: #9B9B9B;
		justify-content: center;
		align-items: center;
	}
	


</style>

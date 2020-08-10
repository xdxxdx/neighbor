<template>
	<view class="page-body">
		<view class="mask" v-show="show" @tap="hidePop()"></view>
		<view class="popup popup-middle" v-show="show" v-if="listData.length > 0">
			<view class="desc">
				<text style="font-weight: bold;">{{type == 0 ? '预约顺风车' : '顺风车接单'}}</text>
				<view class="desc-left">
					<text>{{type == 0 ? '座位数' : '人数'}}：{{listData[currentIndex].seat}}</text>
					<view class="inline-item" v-if="type == 0">
						<text>人数：</text>
						<number-box v-on:update="numberUpdate" :min="0" :max="listData[currentIndex].seat"></number-box>
					</view>
				</view>
				<view>
					<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="doOrder()">{{type == 0 ? '预约' : '接单'}}</button>
					<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="hidePop()">取消</button>

				</view>

			</view>
		</view>
		<view class="banner">
			<image mode="widthFix" style="width: 100%;" src="https://wx.icrat.cn/resources/neighbor/ui/sfbanner.jpg" />
		</view>
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
		<view class="btn-row">
			<view :class="type == 0 ? 'btn-select' : 'btn-unselect'" @tap="changeType(0)">车找人</view>
			<view :class="type == 1 ? 'btn-select' : 'btn-unselect'" @tap="changeType(1)">人找车</view>
		</view>
		
		<scroll-view class="list" scroll-y @scrolltolower="loadMore(1)" v-if="listData.length > 0">
			<view class="car-row" v-for="(data,index1) in listData" :key="data.id">
				<view class="car-user">
					<image class="car-user-avatar" :src="data.user.avatarUrl" />
					<view class="car-user-call" @tap="callphone(data.user.mobile)">
						联系他
					</view>
				</view>
				<view class="car-info">
					<text>出发时间：{{data.departTime}}</text>
					<text>出发地：{{data.startpoint}}</text>
					<text>目的地：{{data.destination}}</text>
					<text>{{type == 0 ? '座位数' : '人数'}}：{{data.seat}}</text>
					<view class="car-line"></view>
					<view class="car-num" v-if="type == 0">
						车牌号：{{data.carnum}}
					</view>

				</view>
				<view class="car-right">
					<view class="car-btn" @tap="order(index1)">
						{{type == 0 ? '预约' : '接单'}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import numberBox from '../../components/number-box.vue'

	import {
		mapState,
	} from 'vuex'
	export default {
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		data() {
			return {
				listData: [],
				currentPage: 1,
				currentIndex: 0,
				orderSeat: 0,
				show: false,
				issearch: false,
				searchWord: "",
				type: 0
			};
		},
		onLoad() {

		},
		onShow() {
			this.loadData();
		},
		components: {
			numberBox,
		},
		methods: {
			goAdd() {
				if (this.userInfo.id == 0) {
					uni.navigateTo({
						url: '../userinfo/userinfo?state=0&isEdit=false',
					});
					return;
				}
				uni.navigateTo({
					url: '../addcarsharing/addcarsharing'
				});

			},
			search() {
				this.issearch = true;
				this.listData = [];
				this.loadData();
			},
			loadData() {
				uni.request({
					url: this.requestUrl + 'business/listCarsharing',
					method: 'GET',
					data: {
						pageIndex: this.currentPage,
						search: this.searchWord,
						type: this.type
					},
					success: (res) => {
						this.issearch = false;
						this.listData = res.data.data.items;
						for (let data of this.listData) {
							data.departTime = this.formatDate(data.departTime).substring(0, 16);
						}

					}
				});
			},
			callphone(num) {
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			order(e) {
				this.show = true;
				this.currentIndex = e;
			},
			hidePop() {
				this.show = false;
			},
			doOrder(e) {
				if (this.type == 1)
				{
					this.orderSeat = this.listData[this.currentIndex].seat;
				}
				if (this.orderSeat == 0) {
					uni.showToast({
						title: "请选择人数!",
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				
				uni.request({
					url: this.requestUrl + 'business/orderSeat',
					method: 'POST',
					data: {
						userId: this.userInfo.id,
						num: this.orderSeat,
						carsharingId: this.listData[this.currentIndex].id,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.hideLoading();
						this.hidePop();
						let leftNum = res.data.data;
						if (leftNum > 0) {
							this.listData[this.currentIndex].seat = leftNum;
						} else {
							this.listData.splice(this.currentIndex, 1);
							this.currentIndex = 0;
						}
						uni.showModal({
							content: "提交成功",
							showCancel: false
						});

					}
				});
			},
			numberUpdate(value) {
				this.orderSeat = value;
			},
			changeType(type) {
				this.type = type;
				this.loadData();
			}
		}
	}
</script>

<style>
	.banner {
		width: 750upx;
		display: flex;
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
	}

	.car-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		margin-top: 10upx;

	}

	.car-user {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 28%;
		height: 300upx;
		background-color: #ffffff;
	}

	.car-user-avatar {
		width: 150px;
		height: 150px;
		border: 0 solid #ff0000;
		border-radius: 75px;
	}

	.car-user-call {
		width: 150px;
		height: 50px;
		color: #ffffff;
		background-color: #70ac79;
		border-radius: 10px;
		margin-top: 20upx;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.car-info {
		background-color: #ffffff;
		width: 51%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding-left: 20upx;
		height: 300upx;
		color: #898989;
	}

	.car-num {
		font-weight: bold;
		font-size: 30upx;
		justify-content: center;
		align-self: center;
	}

	.car-right {
		height: 300upx;
		background-color: #ffffff;
		width: 18%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.car-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120px;
		height: 120px;
		border: 0 solid #ff0000;
		border-radius: 60px;
		background-color: #a0cc99;
		color: #ffffff;
		font-size: 30upx;

	}

	.car-line {
		width: 350upx;
		height: 4upx;
		background-color: #f1f5f8;
		margin-top: 4upx;
		margin-bottom: 4upx;
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
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		line-height: 60upx;
	}

	.btn-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.btn-unselect {
		background-color: #fff;
		color: #70ac79;
		border: 1upx solid #70ac79;
		width: 49%;
		text-align: center;
	}

	.btn-select {
		background-color: #70ac79;
		color: #fff;
		border: 1upx solid #70ac79;
		width: 49%;
		text-align: center;
	}
</style>

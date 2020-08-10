<template>
	<view class="page">
		<view class="head">
			<segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></segmented-control>
		</view>
		<view class="order-list" v-for="(value,key) in orderlist" :key="key">
		
			<view class="cell-top">
				<view>
					<text class="cell-top-no">订单号：{{value.orderNo}}</text>
				</view>
				<view class="cell-top-right" v-if="current == 0">
					<view class='cell-top-btn' @tap="toDetail(value.item.id)">查看详情</view>
				</view>
			</view>
			<view class="cell-buyer" v-if="current == 1" >
					<image class="cell-top-avatar" :src="value.user.avatarUrl"></image>
					<text class="cell-top-name">{{value.user.nickName}}</text>
					<view class="cell-top-right">
					<view class='cell-top-btn' @tap="toBuyer(value.user.openId)">买家信息</view>
					</view>
			</view>
			<view class="cell-info">
				<view>
					<image class="cell-info-img" :src="imageUrl + value.item.mainImage"></image>
				</view>

				<view class="cell-info-text">
					<view style="font-weight: bold;">{{value.title}}</view>
					<view>数量：{{value.num}}</view>
					<view>价格：{{value.fee}}</view>
					<view>交易日期：{{value.createDate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';

	import {
		mapState,
	} from 'vuex'

	export default {
		data() {
			return {
				orderlist: [],
				items: [
					'已购订单',
					'卖出记录'
				],
				current: 0,
				activeColor: '#70ac79',
				styleType: 'button'
			};
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		components: {
			segmentedControl
		},
		onLoad() {
			this.loadBuyOrders();
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					this.orderlist = [];
					switch (index) {
						case 0:
							this.loadBuyOrders();
							break;
						case 1:
							this.loadSellOrders();
							break;
					}
				}
			},
			loadBuyOrders() {
				uni.request({
					url: this.requestUrl + 'business/listBuyOrdersByOpenId',
					method: 'GET',
					data: {
						openId: this.userInfo.openId,
						pageIndex: 0,
					},
					success: (res) => {
						//console.log(res);
						this.orderlist = res.data.data.items;
						for (let order of this.orderlist) {
							order.createDate = this.formatDate(order.createDate);
							//console.log(order.createDate);
						}
					}
				});
			},
			loadSellOrders() {
				uni.request({
					url: this.requestUrl + 'business/listSellOrdersByOpenId',
					method: 'GET',
					data: {
						openId: this.userInfo.openId,
						pageIndex: 0,
					},
					success: (res) => {
						//console.log(res);
						this.orderlist = res.data.data.items;
						for (let order of this.orderlist) {
							order.createDate = this.formatDate(order.createDate);
							//console.log(order.createDate);
						}
					}
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				});
			},
			toBuyer(openId) {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + openId + '&state=2'
				});
			},
		}
	}
</script>

<style>
	.order-list {
		width: 750px;
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
/* 		border: 2px solid #d0d0d0;
border-radius: 30px; */
		margin-bottom: 15px;
		
	}

	.cell-top {
		display: flex;
		flex: 1;
		flex-direction: row;
		border-bottom: 1px solid #d0d0d0;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
	}
	
	.cell-top-no {
		padding-left: 20px;
		line-height: 70px;
		color: #70ac79;
	}
	
	.cell-buyer {
		display: flex;
		flex: 1;
		flex-direction: row;
		border-bottom: 1px solid #d0d0d0;
	}

	.cell-top-avatar {
		width: 80px;
		height: 80px;
		border: 0 solid #ff0000;
		border-radius: 40px;
		margin: 10px;
	}

	.cell-top-name {
		padding-left: 20px;
		line-height: 100px;
	}

	.cell-top-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}

	
	.cell-top-btn {
		margin-right: 20px;
		line-height: 50px;
		width: 150px;
		text-align: center;
		border: 1px solid #d0d0d0;
		border-radius: 10px;
		background-color: #70ac79;
		color: #ffffff;
	}

	.cell-info {
		display: flex;
		flex: 1;
		flex-direction: row;
	}



	.cell-info-img {
		width: 180px;
		height: 180px;
		border-radius: 10upx;
		margin: 20px;
	}

	.cell-info-text {
		width: 500px;
		padding: 10px;
		flex-direction: column;
		color: #555555;
	}

	.head {
		width: 710px;
		padding: 20px;
		background-color: #ffffff;
		margin-bottom: 20px;
	}
</style>

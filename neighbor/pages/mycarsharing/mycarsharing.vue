<template>
	<view class="page">
		<view class="head">
			<segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></segmented-control>
		</view>
		<scroll-view class="list" scroll-y @scrolltolower="loadMore(1)" v-if="orderlist.length > 0" >
		<view class="car-row" v-for="(data,index1) in orderlist" :key="data.id">
			<view class="car-user">
				<view>{{(data.carsharing.carsharingType == 0) ? '[车找人]' : '[人找车]'}}{{(current == 0) ? '发布人' : '预约人'}}</view>
				<image v-if="current == 0" class="car-user-avatar" :src="data.carsharing.user.avatarUrl" @tap="toUser(data.carsharing.user.openId)"/>
				<image v-if="current == 1" class="car-user-avatar" :src="data.user.avatarUrl" @tap="toUser(data.user.openId)"/>
				<view>{{(current == 0) ? data.carsharing.user.nickName : data.user.nickName}}</view>
				<view v-if="current == 0" class="car-user-call" @tap="callphone(data.carsharing.user.mobile)">
					联系他
				</view>
				<view v-if="current == 1" class="car-user-call" @tap="callphone(data.user.mobile)">
					联系他
				</view>
			</view>
			<view class="car-info">
				<text class="cell-top-no">预约号：{{data.orderNo}}</text>
				<text>出发时间：{{data.carsharing.departTime}}</text>
				<text>出发地：{{data.carsharing.startpoint}}</text>
				<text>目的地：{{data.carsharing.destination}}</text>
				<text>预约人数：{{data.num}}</text>
				<view class="car-line"></view>
				<view class="car-num" v-if="data.carsharing.carsharingType == 0">
					车牌号：{{data.carsharing.carnum}}
					</view>
				
			</view>
		</view>
		</scroll-view>
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
					'我的预约',
					'我的发布'
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
					url: this.requestUrl + 'business/listOrderSeat',
					method: 'GET',
					data: {
						userId: this.userInfo.id,
						pageIndex: 1,
					},
					success: (res) => {
						console.log(res);
						this.orderlist = res.data.data.items;
						for (let order of this.orderlist) {
							order.carsharing.departTime = this.formatDate(order.carsharing.departTime);
							//console.log(order.createDate);
						}
					}
				});
			},
			loadSellOrders() {
				uni.request({
					url: this.requestUrl + 'business/listPublishSeat',
					method: 'GET',
					data: {
						userId: this.userInfo.id,
						pageIndex: 1,
					},
					success: (res) => {
						console.log(res);
						this.orderlist = res.data.data.items;
						for (let order of this.orderlist) {
							order.carsharing.departTime = this.formatDate(order.carsharing.departTime);
							//console.log(order.createDate);
						}
					}
				});
			},
			toUser(openId) {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + openId + '&state=2'
				});
			},
			callphone(num){
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
		}
	}
</script>

<style>
	.head {
		width: 710px;
		padding: 20px;
		background-color: #ffffff;
		margin-bottom: 20px;
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
		width: 39%;
		height: 350upx;
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
		justify-content:center;
		align-items: center;
	}
	
	.car-info {
		background-color: #ffffff;
		width: 58%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding-left: 20upx;
		height: 350upx;
		color: #898989;
	}
	
	.car-num {
		font-weight: bold;
		font-size: 30upx;
		justify-content: center;
		align-self: center;
	}
	
	.car-right {
		height: 350upx;
		background-color: #ffffff;
		width: 20%;
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
		width: 90%;
		height: 4upx;
		background-color: #f1f5f8;
		margin-top: 4upx;
		margin-bottom: 4upx;
	}

	
</style>

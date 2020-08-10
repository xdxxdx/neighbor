<template>
	<view class="page">
		<view class="order-list" v-for="(user,key) in neighbors" :key="key">
		
			<view class="cell-top">
				<image @tap="toUser(user.openId)" class="cell-top-avatar" :src="user.avatarUrl" ></image><text class="cell-top-name">{{user.nickName}}</text>
				<view class="cell-right">
					<view class='cell-btn' @tap="goHouse(user)">来我家</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	
	export default {
		computed: mapState(['requestUrl', 'userInfo']),
		data() {
			return {
				neighbors: []
			}
		},
		onLoad() {
			uni.request({
				url: this.requestUrl + 'user/findNeighborsByOpenId',
				method: 'GET',
				data: {
					openId: this.userInfo.openId,
				}, 
				success: (res) => {
					//console.log(JSON.stringify(res));
					this.neighbors = res.data.data; 
					//console.log(JSON.stringify(this.newsitems));
				}
			});
		},
		methods:{
			toUser(id) {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + id + '&state=2'
				});
			},
			goHouse(user) {
				uni.navigateTo({
					url: '../userhouse/userhouse?openId=' + user.openId + '&nickName=' + user.nickName +
						'&avatarUrl=' + user.avatarUrl + '&userId=' + user.id
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
		border-bottom: 2 solid #000000;
	}

	.cell-top {
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
		margin: 20px;
	}

	.cell-top-name {
		line-height: 120px;
	}

	.cell-top-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}

	.cell-top-btn {
		margin-right: 20px;
		line-height: 60px;
		width: 120px;
		text-align: center;
		border: 1px solid #d0d0d0;
		border-radius: 10rpx;
	}

	.cell-info {
		display: flex;
		flex: 1;
		flex-direction: row;
	}



	.cell-info-img {
		width: 180px;
		height: 180px;
		padding: 30px;
	}

	.cell-info-text {
		width: 500px;
		padding: 30px;
		flex-direction: column;
	}
	
		.cell-right {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: center;
		}
	
		.cell-btn {
			margin-right: 20px;
			line-height: 60px;
			width: 120px;
			text-align: center;
			border: 1px solid #d0d0d0;
			border-radius: 10rpx;
			color: #ffffff;
			background-color: #70ac79;
		}
</style>

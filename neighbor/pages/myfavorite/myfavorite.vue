<template>
	<view class="page">
		<view class="order-list" v-for="(item,key) in items" :key="key">

			<view class="cell-top" @tap="toDetail(item.id)">
				<image class="cell-top-avatar" :src="imageUrl + item.mainImage" ></image>
				<text class="cell-top-name">{{item.name}}</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
		</view>
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
				items: []
			}
		},
		onLoad() {
			uni.request({
				url: this.requestUrl + 'business/listAttention',
				method: 'GET',
				data: {
					openId: this.userInfo.openId,
					type: 0,
					pageIndex: 1
				}, 
				success: (res) => {
					//console.log(JSON.stringify(res));
					this.items = res.data.data; 
					//console.log(JSON.stringify(this.newsitems));
				}
			});
		},
		methods:{
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				});
			},
		}
	}
</script>

<style>
	@import "../../common/newicon.css";
	
	.iconfont {
		color: #2782D7;
		font-size: 50px;
		padding-right: 15px;
	}
	
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
	
	.navigat-arrow {
		display: flex;
		flex: 1;
		height: 120px;
		width: 40px;
		line-height: 120px;
		font-size: 34px;
		color: #555;
		text-align: right;
		font-family: texticons;
		justify-content: flex-end;
	}
</style>

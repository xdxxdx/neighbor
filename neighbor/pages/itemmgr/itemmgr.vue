<template>
	<view class="page">
		<view class="add-btn" @tap="goAdd()"><text>十发布</text></view>
		<view class="order-list" v-for="(value,key) in itemList" :key="key">
			<view class="cell-info">
				<view>
					<video v-if="value.isVideo" class="cell-info-img" :src="imageUrl + value.mainImage"></video>
					<image v-if="value.isVideo == false" class="cell-info-img" :src="imageUrl + value.mainImage"></image>
				</view>

				<view class="cell-info-text">
					<view style="font-weight: bold;">{{value.name}}</view>
					<view>数量：{{value.num}}</view>
					<view>价格：{{value.price}}</view>
					<view>结束时间：{{value.endTime}}</view>
				</view>
			</view>
			<view class="cell-top-right">
				<view class='cell-top-btn' @tap="downItem(value.id, key)" v-show="value.endTime != '已过期' && value.num != 0">下架</view>
				<view class='cell-top-btn' @tap="editItem(value.id, value.firstType)">编辑</view>
				<view class='cell-top-btn' @tap="toDetail(value.id)">详情</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	
	export default {
		data() {
			return {
				itemList: []
			};
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		onShow()
		{
			uni.request({
				url: this.requestUrl + 'business/listItemsByOpenId',
				method: 'GET',
				data: {
					openId: this.userInfo.openId,
					pageIndex: 0,
					onlyUp: false 
				},
				success: (res) => {
					//console.log(res);
					this.itemList = res.data.data.items;
					for (let item of this.itemList)
					{
						var timestamp=new Date().getTime();
						item.endTime = (timestamp > item.endTime) ? '已过期' : this.formatDate(item.endTime);
						item.isVideo = false;
						if (item.mainImage.toLowerCase().lastIndexOf("mp4") != -1)
						{
							item.isVideo = true;
						}
						//console.log(order.createDate);
					}
				}
			});
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id + "&hidUser=true&hidBuy=true"
				});
			},
			downItem(id, key) {
				uni.request({
					url: this.requestUrl + 'item/downItem',
					method: 'POST',
					data: {
						id: id,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.showModal({
							content: '下架成功',
							showCancel: false
						});
						this.itemList[key].num = 0;
						this.itemList[key].endTime = '已过期';
					}
				});
			},
			goAdd() {
				uni.navigateTo({
					url: '../add/add?index=0&showFirst=true&itemId=0'
				});
			},
			editItem(id, firstType) {
				uni.navigateTo({
					url: '../add/add?index='+ firstType + '&showFirst=false&itemId=' + id
				});
			}
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
		border-top: 2px solid #d0d0d0;
		margin-bottom: 20px;
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
		padding-bottom: 20px;
		padding-top: 20px;
	}

	.cell-top-btn {
		margin-right: 20px;
		line-height: 60px;
		width: 120px;
		text-align: center;
		border: 0px solid #d0d0d0;
		border-radius: 30rpx;
		background-color: #70ac79;
		color: #ffffff;
	}

	.cell-info {
		display: flex;
		flex: 1;
		flex-direction: row;
		border-bottom: 1px solid #d0d0d0;
	}



	.cell-info-img {
		width: 180px;
		height: 180px;
		padding: 15px;
	}

	.cell-info-text {
		width: 500px;
		padding: 10px;
		flex-direction: column;
		color: #555555;
	}
	
	/* 发布 */
	.add-btn {
		width: 710px;
		height: 70px;
		margin: 20px;
		display: flex;
		text-align: center;
		border: 0px solid #d0d0d0;
		border-radius: 30px;
		background-color: #70ac79;
		justify-content: center;
		line-height: 70px;
		flex-direction: row;
		color: #ffffff;
	}
	
	.add-icon {
		margin-right: 20px;
		width: 60px;
		height: 60px;
		padding-top: 5px;
		line-height: 70px;
	}
</style>

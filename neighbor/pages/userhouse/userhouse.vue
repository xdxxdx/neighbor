<template>
	<view class="page">
		<view class="cell-top">
			<image class="cell-top-avatar" :src="avatarUrl" @tap="toUser()"></image><text class="cell-top-name">{{nickName}}</text>
			<view class="cell-top-right">
				<view class='cell-top-btn' :style="(attentionId == 0) ? 'background-color: #ffffff;color: #70ac79' : 'background-color: #70ac79;color: #ffffff'" @tap="changeAttention()">{{(attentionId == 0) ? '关注' : '已关注'}}</view>
			</view>
		</view>
       <scroll-view class="list" scroll-y >
			<view class="product-list">
				<block v-for="(newsitem,index) in newsitems" :key="index"> 
					<view class="product" @tap="toDetail(newsitem.id)">
						<image class="product-image" mode="aspectFit" :src="newsitem.mainImage ? imageUrl + newsitem.mainImage : 'https://via.placeholder.com/150x200'"></image>
						<view class="product-info">
							<view class="product-title">{{newsitem.name}}</view>
							<text class="heart" v-if="newsitem.payType == 0">&#xe600;{{newsitem.price}}</text>
							<text class="heart" v-if="newsitem.payType == 1">&#xe601;{{newsitem.price}}</text>
							<text class="heart" v-if="newsitem.payType == 2">免费分享</text>
						</view>
					</view>
				</block>
			 </view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				userId: '',
				openId: '',
				nickName: '',
				avatarUrl: '',
				newsitems: [],
				attentionId: 0,
				//newsitem: null
			}
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		onLoad(p) {
			this.openId = p.openId;
			this.nickName = p.nickName;
			this.avatarUrl = p.avatarUrl;
			this.userId = p.userId;
			uni.request({
				url: this.requestUrl + 'business/checkAttention',
				method: 'GET',
				data: {
					openId : this.userInfo.openId,
					type: 1,
					targetId : this.userId
				},
				success: (res) => {
					this.attentionId = res.data;
				}
			});
			uni.request({
				url: this.requestUrl + 'business/listItemsByOpenId',
				method: 'GET',
				data: {
					openId: this.openId,
					pageIndex: 0,
					onlyUp: true
				},
				success: (res) => {
					//console.log(res);
					this.newsitems = res.data.data.items;
				}
			});
			//console.log(this.openId); 
		},
		methods:{
			toUser() {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + this.openId + '&state=2'
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id + '&hidUser=true'
				});
			},
			changeAttention () {
				if (this.attentionId == 0)
				{
					uni.request({
						url: this.requestUrl + 'business/addAttention',
						method: 'POST',
						data: {
							openId : this.userInfo.openId,
							type: 1,
							targetId : this.userId
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							this.attentionId = res.data;
							uni.showModal({
								content: "已关注",
								showCancel: false
							});
						}
					});
				}
				else
				{
					uni.request({
						url: this.requestUrl + 'business/delAttention',
						method: 'GET',
						data: {
							id : this.attentionId
						},
						success: (res) => {
							this.attentionId = 0;
							uni.showModal({
								content: "取消关注",
								showCancel: false
							});
						}
					});
				}
			},
		}
	}
</script>

<style>
	@import "../../common/mainpage.css";

	.cell-top {
		width: 750px;
		display: flex;
		flex: 1;
		flex-direction: row;
		border-bottom: 1px solid #d0d0d0;
		background-color: #ffffff;
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
		font-size: 26px;
		margin-right: 20px;
		line-height: 58px;
		width: 120px;
		text-align: center;
		border: 1px solid #70ac79;
		border-radius: 30rpx;
		color: #ffffff;
		background-color: #70ac79;
	}
</style>

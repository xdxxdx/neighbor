<template>
	
	<view class="page" v-if="shareInfo">
		<view class="title">
			<text>{{shareInfo.title}}</text>
		</view>
		
		<view class="sharer">
			<view class="user">
				<image class="user-avatar" :src="shareInfo.user.avatarUrl" @tap="toUser(shareInfo.user.openId)"/>
				</image>
				<text class="user-name">{{shareInfo.user.nickName}}</text>
			</view>
			<view class="user-time">{{shareInfo.createDate}}</view>
			
		</view>
		
		<view class="info">
			<view v-for="(value,key) in shareInfo.images" :key="value.id">
				<video v-if="value.isVideo" style="width: 86%;" :src="imageUrl + value.url"></video>
				<image v-if="value.isVideo == false" style="width: 86%;" mode="widthFix" :src="imageUrl + value.url" />
			</view>
			<view class="info-text">
				{{shareInfo.info}}
			</view>
			
		</view>
		
		<view class="uni-padding-wrap" style="text-align: left;background-color: #ffffff;padding-bottom: 150px;" v-if="commentList">
			<view class="uni-comment">
				<view class="item-line" v-if="commentList.length > 0"></view>
				<view class="uni-comment-list" v-for="(data,index) in commentList" :key="data.id">
					
					<view class="uni-comment-face">
						<image :src="data.user.avatarUrl" mode="widthFix" @tap="toUser(data.user.openId)"></image>
					</view>
					<view class="uni-comment-body">
						<view class="comment-title">
							<text style="color: #2782D7;">{{data.user.nickName}}</text>
							<text style="color: #888888;font-size: 24px;">{{data.createDate}}</text>
						</view>
						<view class="uni-comment-content" style="color: #888888;">{{data.info}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="comment-aera">
			<input confirm-type="send" class="input comment-input" type="text" v-model="commentInfo" placeholder="请输入评论内容" @confirm="sendComment()" maxlength="100"/>
			<view class="comment-btn" @click="sendComment()">发表评论</view>
		</view>
	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				shareInfo: null,
				commentInfo: '',
				commentList: null,
				itemId: 0,
			}
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		
		onLoad(e) {
			this.itemId = e.id;
			uni.request({
				url: this.requestUrl + 'business/detailShareInfo',
				method: 'GET',
				data: {
					id: this.itemId
				},
				success: (res) => {
					//console.log(res);
					this.shareInfo = res.data.data;
					this.shareInfo.createDate = this.formatDate(this.shareInfo.createDate);
					let pics = this.shareInfo.images.split(",");
					this.shareInfo.images = [];
					for (let i = 0; i < pics.length; i++) {
						let obj = {"isVideo": false, "url": pics[i]};
						if (pics[i].toLowerCase().lastIndexOf("mp4") != -1)
							obj.isVideo = true;
						this.shareInfo.images.push(obj);
					}
				},
			});
			this.loadComment();
		},
		methods: {
			loadComment()
			{
				uni.request({
					url: this.requestUrl + 'business/listComment',
					method: 'GET',
					data: {
						targetId: this.itemId,
						type: 0,
					},
					success: (res) => {
						//console.log(res);
						this.commentList = res.data.data;
						for (let data of this.commentList) {
							data.createDate = dateUtils.format(this.formatDate(data.createDate));
						}
					},
				});
			},
			toUser(openId) {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + openId + '&state=2'
				});
			},
			sendComment ()
			{
				uni.showLoading({
					title: '评论中...',
					mask: true
				});
				uni.request({
					url: this.requestUrl + 'business/addComment',
					method: 'POST',
					data: {
						userId: this.userInfo.id,
						targetId: this.itemId,
						type: 0,
						info: this.commentInfo
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					success: (result) => {
							uni.hideLoading();
							this.commentInfo = '';
							uni.showModal({
								content: "评论成功",
								showCancel: false
							})
							this.loadComment();
					},
					fail: (e) => {
						uni.showModal({
							content: "评论失败!",
							showCancel: false
						})
					}
				});
				
			}
		}
	}
</script>

<style>
	.page {
		width: 750px;
		background: #ffffff;

		flex-direction: column;
		text-align: center;
		justify-content: center;
	}

	.title {
		font-size: 40px;
		margin: 30px;
	}

	.sharer {
		display: flex;
		color: #888888;
		flex-direction: row;
		width: 750px;
		
		text-align: center;
		justify-content: center;
	}

	.user {
		display: flex;
		flex: 1;
		justify-content: flex-start;
		padding-left: 50px;
	}

	.user-avatar {
		width: 60px;
		height: 60px;
		border: 0 solid #ff0000;
		border-radius: 30px;
	}

	.user-name {
		line-height: 60px;
		padding-left: 10px;
	}

	.user-time {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		line-height: 60px;
		padding-right: 50px;
		color: #BBBBBB;
	}

	.info {
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding-top: 40px;
		
	}

	.info-text {
		text-indent: 2em;
		text-align: left;
		color: #888888;
		padding-top: 10px;
		padding-bottom: 60px;
		padding-left: 50px;
		padding-right: 50px;
	}

	.info-images {
		padding-top: 10px;
		padding-bottom: 60px;
		padding-left: 50px;
		padding-right: 50px;
	}
	
	.comment-title {
		display: flex;
		flex: 1;
		justify-content: space-between;
		flex-direction: row;
		padding-right: 30px;
	}
	
	.comment-aera {
		position: fixed;
		bottom: 0;
		display: flex;
		flex: 1;
		width: 100%;
		padding-top: 10px;
		
		justify-content: space-around;
		align-content: center;
		background-color: #70ac79;
		line-height: 70px;
		color: #000000;
		height: 70px;
	}
	
	.comment-input {
		text-align: left;
		width: 70%;
		line-height: 80px;
		height: 60px;
		background-color: #ffffff;
		border-radius: 10px;
		padding-left: 20px;
	}
	
	.comment-btn {
		text-align: center;
		width: 20%;
		line-height: 60px;
		height: 60px;
		background-color: #ffffff;
		border-radius: 10px;
	}
</style>

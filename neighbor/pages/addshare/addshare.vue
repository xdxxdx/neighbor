<template>
	<view class="page-body">
		<view class="input-view">
			<view class="label-view">
				<text class="label">标题</text>
			</view>
			<input class="input" type="text" v-model="title" placeholder="请输入标题" />
		</view>
		<view class="input-view" >
			<view class="label-view">
				<text class="label">类别</text>
			</view>
			<picker style="width: 300px;" @change="typePickerChange" :value="typeIndex" :range="typeArray">
				<view style="width: 300px;">{{typeArray[typeIndex]}} ▽</view>
			</picker>
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">详细描述</text>
			</view>
		</view>
		<view class="input-view" style="padding-bottom: 20px;">
			<textarea style="margin-left: 40px;height: 200px;width: 640px;border: 1px solid #BEBEBE;" v-model="info" />

			</view>
			
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">随手拍({{imageList.length}}/6)</view>
							<view class="clear-btn" @tap="clear()">清空图片</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image mode="aspectFit" class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title">随手录</view>	
								<view class="clear-btn" @tap="clearVideo()">删除视频</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<view class="uni-uploader__file" v-if="showVideo">
										<video style="width: 300px;height: 225px;" :src="videoSrc"></video>
									</view>
									<view class="uni-uploader__input-box" style="width: 300px;height: 225px;" v-if="!showVideo">
										<view class="uni-uploader__input" @tap="chooseVideo"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="input-view">
				<view class="button-view">
					<button type="default" plain="true" style="background-color: #70ac79;color: #ffffff; font-size: 32px;border-radius: 60px;border: 0 solid #ffffff;" @tap="publish">发布</button>
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
		data: {
			imageList: [],
			picUrl: '',
			picUrlNum: 0,
			countIndex: 2,
			count: [1, 2, 3],
			videoSrc: '',
			showVideo: false,
			typeIndex: 0,
			typeArray: ["邻里故事", "寻求帮助"]
		},
		computed: mapState(['requestUrl', 'userInfo']),
		onLoad(e) {
			this.typeIndex = e.type;
		},
		onUnload() {
			this.imageList = [],
			this.countIndex = 2;
		},
		methods: {
			validate() {
				let msg = '';
				
				if (!this.title || this.title.length == 0)
				{
					msg = "请填写标题";
				}else if(!this.info || this.info == 0)
				{
					msg = "请填写描述";
				}else if(this.imageList.length == 0 && this.showVideo == false)
				{
					msg = "请上传图片或视频";
				}
				if (msg.length > 0)
				{
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				return true;
			},
			chooseVideo() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.showVideo = true;
						this.videoSrc = res.tempFilePath;
					}
				});
			},
			clearVideo(){
				this.showVideo = false;
			},
			clear()
			{
				this.imageList = [];
			},
			chooseImage: async function() {
					if (this.imageList.length === 3) {
						let isContinue = await this.isFullImg();
						//console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						// #ifdef MP-WEIXIN
						sizeType: 'compressed',
						// #endif
						count: this.imageList.length + this.count[this.countIndex] > 3 ? 3 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
						}
					})
				},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有3张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			addShare () { 
				
				uni.request({
					url: this.requestUrl + 'business/addShare',
					method: 'POST',
					data: {
						title: this.title, 
						info: this.info, 
						picUrl: this.picUrl, 
						userId: this.userInfo.id,
						communityId: this.userInfo.communityId,
						type: this.typeIndex
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.hideLoading();
						uni.showModal({
							content: '发布成功',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									//console.log('用户点击确定');
									uni.reLaunch({
										url: '../share/share'
									});
								}
							}
						});
					}
				});
			},
			publish: function() {
				//console.log(this.title);
				if (this.validate() == false)
					return;
				uni.showLoading({
					title: '发布中...',
					mask: true
				});
				this.picUrl = '';
				this.picUrlNum = 0;
				if (this.showVideo)
					this.uploadVideo();
				else
					this.uploadPic();
			},
			uploadPic()
			{
				for (let index in this.imageList) {
					let fileName = this.imageList[index];
					let fileFormat = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
					uni.uploadFile({
						url: 'https://wx.icrat.cn/neighbor/business/uploadRes', 
						//url: 'http://192.168.0.104:8080/business/uploadPicture', 
						filePath: fileName,
						name: 'file',
						formData: {
							'userId': this.userInfo.id,
							'type': "1",
							'format': fileFormat
						},
						success: (uploadFileRes) => {
							this.picUrlNum++;
							this.picUrl = this.picUrl + uploadFileRes.data + ',';
							this.checkadd();
						}
					}); 
				}
				this.checkadd();
			},
			uploadVideo()
			{
				let fileFormat = this.videoSrc.substring(this.videoSrc.lastIndexOf(".") + 1, this.videoSrc.length);
				uni.uploadFile({
					url: 'https://wx.icrat.cn/neighbor/business/uploadRes', 
					filePath: this.videoSrc,
					name: 'file',
					formData: {
						'userId': this.userInfo.id,
						'type': "v0",
						'format': fileFormat
					},
					success: (uploadFileRes) => {
						this.picUrl = uploadFileRes.data + ',';
						this.uploadPic();
					}
				}); 
			},
			checkadd()
			{
				if (this.picUrlNum == this.imageList.length)
				{
					this.picUrl = this.picUrl.substring(0, this.picUrl.length - 1);
					this.addShare();
				}
			}
		}
	}
</script>

<style>
	@import "../../common/uni.css";

	/* 上传 */

	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}
	
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.uni-uploader-info {
		color: #B2B2B2;
		flex-direction: row;
	}
	
	.uni-uploader-body {
		margin-top: 16px;
		
	}
	
	.uni-uploader__file {
		float: left;
		margin-right: 18px;
		margin-bottom: 18px;
	}
	
	.uni-uploader__img {
		display: block;
		width: 200px;
		height: 158px;
	}
	
	.uni-uploader__input-box {
		float: left;
		position: relative;
		margin-right: 18px;
		margin-bottom: 18px;
		width: 200px;
		height: 154px;
		border: 2px solid #D9D9D9;
	}
	
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	
	.uni-uploader__input-box:before {
		width: 4px;
		height: 79px;
	}
	
	.uni-uploader__input-box:after {
		width: 79px;
		height: 4px;
	}
	
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
	
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.cell-pd {
		padding: 22px 30px;
	}
	
	.list-pd {
		margin-top: 0px;
	}

	textarea {
		width: 400px;
		height: 34px;
		line-height: 34px;
	}

	.textarea-wrp {
		padding: 0 5px;
	}

	.hid_price {
		display: none;
		flex-direction: row;
	}

	.show_price {
		display: block;
		flex-direction: row;
	}
	
	.clear-btn {
		width: 150px;
		line-height:60px ;
		background-color: #70ac79;
		color: #ffffff;
		font-size: 26px;
		border: 0 solid #ffffff;
		height: 60px;
		border-radius: 20upx;
		text-align: center;
	}
</style>

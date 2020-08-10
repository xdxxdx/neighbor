<template>
	<view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">标题</text>
			</view>
			<input class="input" type="text" placeholder="请输入标题" v-model="name" />
		</view>
		<view class="input-view" v-show="showFirst">
			<view class="label-view">
				<text class="label">类别</text>
			</view>
			<picker style="width: 300px;" @change="firstPickerChange" :value="firstIndex" :range="firstArray">
				<view style="width: 300px;">{{firstArray[firstIndex]}} ▽</view>
			</picker>
		</view>
		<view class="input-view" v-if="false">
			<view class="label-view">
				<text class="label">二级类别</text>
			</view>
			<picker style="width: 300px;" @change="secondPickerChange" :value="secondIndex" :range="currentSecondArray[firstIndex]">
				<view style="width: 300px;">{{currentSecondArray[firstIndex][secondIndex]}} ▽</view>
			</picker>
		</view>
		<view class="input-view" v-if="firstIndex != 3">
			<view class="label-view">
				<text class="label">{{(firstIndex == 2) ? "人数" : "数量"}}</text>
			</view>
			<input class="input" maxlength="5" type="number" placeholder="请输入数量" v-model="num" @input="numInput()" />
		</view>
		<view class="input-view" v-if="firstIndex < 2">
			<view class="label-view">
				<text class="label">支付方式</text>
			</view>
			<picker style="width: 300px;" @change="payTypePickerChange" :value="payTypeIndex" :range="payTypeArray">
				<view style="width: 300px;">{{payTypeArray[payTypeIndex]}} ▽</view>
			</picker>
		</view>
		<view v-if="payTypeIndex != 1 && firstIndex < 2">
			<view class="input-view">
				<view class="label-view">
					<text class="label">价格</text>
					<text class="heart" v-if="payTypeIndex == 0">&#xe600;</text>
				</view>

				<input class="input" maxlength="5" type="number" placeholder="请输入价格" v-model="price" @input="priceInput()" />
			</view>
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">分享时限</text>
			</view>
			<picker style="width: 60px;" @change="timePickerChange" :value="timeIndex" :range="timeArray">
				<view style="width: 60px;">{{timeArray[timeIndex]}}</view>
			</picker>
			<text class="label">小时 ▽</text>
		</view>
		<view class="input-view" v-if="firstIndex < 2">
			<view class="label-view">
				<text class="label">配送方式</text>
			</view>
			<picker style="width: 300px;" @change="deliverPickerChange" :value="deliverIndex" :range="deliverArray">
				<view style="width: 300px;">{{deliverArray[deliverIndex]}} ▽</view>
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
			<button type="default" plain="true" style="background-color: #70ac79;color: #ffffff; font-size: 32px;border-radius: 60px;border: 0 solid #ffffff;" hover-class="hover" @tap="publish">发布</button>
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
			returnPage: ['eat', 'use', 'play', 'help'],
			firstArray: ['美食分享', '二手闲置', '游玩休闲'],
			firstIndex: 0,
			showFirst: false,
			secondArray1: ['自制美食', '家乡特色', '休闲零食'],
			secondArray2: ['母婴用品', '闲置二手', '物品租赁'],
			secondArray3: ['亲子活动', '运动娱乐', '旅游出行'],
			secondArray4: ['资讯分享', '生活互助', '社区公益'],
			currentSecondArray: [],
			secondIndex: 0,
			payTypeArray: ['爱心币', '免费'],
			payTypeIndex: 0,
			timeArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			timeIndex: 0,
			deliverArray: ['自提', '送货上门', '自行约定'],
			deliverIndex: 2,
			imageList: [],
			picUrl: '',
			picUrlNum: 0,
			countIndex: 5,
			count: [1, 2, 3, 4, 5, 6],
			itemId:0,
			videoSrc: '',
			showVideo: false,
			num:0,
			name:'',
			info:'',
			fromPublish:false,
			}
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		onLoad(e) {
			this.fromPublish = e.fromPublish;
			this.currentSecondArray = [this.secondArray1, this.secondArray2, this.secondArray3, this.secondArray4];
			this.firstIndex = e.index;
			this.secondIndex = 0;
			this.showFirst = true;
			this.price = 0;
			this.payTypeIndex = 1;
			this.itemId = (e.itemId === undefined) ? 0 : e.itemId;
			this.name = '';
			this.num = 0;
			this.info = '';
			
			if (this.firstIndex == 3)
				this.num = 1;
			
			if (this.itemId != undefined && this.itemId != 0)
			{
				uni.request({
					url: this.requestUrl + 'business/detailInfo',
					method: 'GET',
					data: {
						id: this.itemId,
					},
					success: (res) => {
						var detail = res.data.data;
						//console.log(detail);
						this.name = detail.name;
						this.firstIndex = detail.firstType;
						this.secondIndex = detail.secondType;
						this.num = detail.num;
						this.price = detail.price;
						this.payTypeIndex = detail.payType;
						this.deliverIndex = detail.deliverType;
						this.info = detail.info;
						for (var pic of detail.pics)
						{
							if (pic.url.toLowerCase().lastIndexOf("mp4") != -1)
							{
								this.videoSrc = this.imageUrl + pic.url;
								this.showVideo = true;
							}
							else
								this.imageList.push(this.imageUrl + pic.url);
						}
						
						
					}
				});
			}
			
			//console.log(this.showFirst);
		},
		onUnload() {
			this.imageList = [],
			this.countIndex = 5;
		},
		methods: {
			firstPickerChange(e) {
				this.firstIndex = e.target.value;
				this.secondIndex = 0;
				if (this.firstIndex == 3)
					this.num = 1;
			},
			secondPickerChange(e) {
				this.secondIndex = e.target.value;
			},
			payTypePickerChange(e) {
				this.payTypeIndex = e.target.value;
			},
			timePickerChange(e) {
				this.timeIndex = e.target.value;
			},
			deliverPickerChange(e) {
				this.deliverIndex = e.target.value;
			},
			numInput() {
				this.num = Number(this.num);
			},
			priceInput() {
				this.price = Number(this.price);
			},
			validate() {
				let msg = '';
				var checkNum = new RegExp('^\\+?[1-9][0-9]*$','g');
				var checkPrice = new RegExp('^\\+?[1-9][0-9]*$','g');
				if (!this.name || this.name.length == 0)
				{
					msg = "请填写标题";
				}else if (!this.num || checkNum.exec(this.num) == null)
				{
					msg = "请填写正确数量";
				}else if((this.payTypeIndex != 1 && this.firstIndex < 2) && (!this.price || checkPrice.exec(this.price) == null))
				{
					msg = "请填写正确单价";
				}else if(!this.info || this.info.length == 0)
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
					if (this.imageList.length === 6) {
						let isContinue = await this.isFullImg();
						
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						// #ifdef MP-WEIXIN
						sizeType: 'compressed',
						// #endif
						count: this.imageList.length + this.count[this.countIndex] > 6 ? 6 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
						}
					})
				},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有6张图片了,是否清空现有图片？",
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
			addItem () {
				uni.request({
					url: this.requestUrl + 'item/saveOrUpdateItem',
					method: 'POST',
					data: {
						id: this.itemId,
 						name: this.name, 
						firstType: this.firstIndex, 
						secondType: this.secondIndex, 
						payType: this.payTypeIndex,
						deliverIndex: this.deliverIndex,
						num: this.num,
						price: this.price, 
						info: this.info, 
						picUrl: this.picUrl, 
 						userId: this.userInfo.id,
 						stayTime: this.timeArray[this.timeIndex],
						communityId: this.userInfo.communityId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.hideLoading();
						uni.showModal({
							content: '发布成功',
							showCancel: false,
							success: (res1) => {
								if (res1.confirm) {
									//console.log('用户点击确定');
									if (this.fromPublish)
									{
										uni.redirectTo({
											url: '../neighborcenter/neighborcenter'
										});
									}
									else
									{
										uni.navigateBack({
											delta: 1
										});
									}
								}
							}
						});
					}
				});
			},
			publish: function() {
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
				for (let fileName of this.imageList) {
					if (fileName.lastIndexOf(this.imageUrl) != -1)
					{
						this.picUrlNum++;  
						this.picUrl = this.picUrl + fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length) + ',';
						//console.log(this.picUrl);
					}else
					{
						let fileFormat = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
						uni.uploadFile({
							url: 'https://wx.icrat.cn/neighbor/business/uploadRes', 
							filePath: fileName,
							name: 'file',
							formData: {
								'userId': this.userInfo.id,
								'type': "p",
								'format': fileFormat
							},
							success: (uploadFileRes) => {
								this.picUrlNum++;
								this.picUrl = this.picUrl + uploadFileRes.data + ',';
								this.checkadd();
							}
						}); 
					}
				}
				this.checkadd();
			},
			uploadVideo()
			{
				
				if (this.videoSrc.lastIndexOf(this.imageUrl) != -1)
				{
					this.picUrl = this.videoSrc.substring(this.videoSrc.lastIndexOf("/") + 1, this.videoSrc.length) + ',';
					this.uploadPic();
				}
				else
				{
					let fileFormat = this.videoSrc.substring(this.videoSrc.lastIndexOf(".") + 1, this.videoSrc.length);
					uni.uploadFile({
						url: 'https://wx.icrat.cn/neighbor/business/uploadRes', 
						filePath: this.videoSrc,
						name: 'file',
						formData: {
							'userId': this.userInfo.id,
							'type': "v1",
							'format': fileFormat
						},
						success: (uploadFileRes) => {
							this.picUrl = uploadFileRes.data + ',';
							this.uploadPic();
						}
					}); 
				}
			},
			checkadd()
			{
				if (this.picUrlNum == this.imageList.length)
				{
					this.picUrlNum = 0;
					this.picUrl = this.picUrl.substring(0, this.picUrl.length - 1);
					this.addItem();
				}
			}
		},
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

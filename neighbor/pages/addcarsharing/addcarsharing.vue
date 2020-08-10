<template>
	<view class="page-body">
		<view class="input-view" >
			<view class="label-view">
				<text class="label">类别</text>
			</view>
			<picker style="width: 300px;" @change="typePickerChange" :value="type" :range="typeArray">
				<view style="width: 300px;">{{typeArray[type]}} ▽</view>
			</picker>
		</view>
		<view class="input-view" v-if="type == 0">
			<view class="label-view">
				<text class="label">车牌号</text>
			</view>
			<input class="input" type="text" v-model="carnum" placeholder="请输入车牌号" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">出发地</text>
			</view>
			<input class="input" type="text" v-model="startpoint" placeholder="请输入出发地" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">目的地</text>
			</view>
			<input class="input" type="text" v-model="destination" placeholder="请输入目的地" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">{{type == 0 ? '座位数' : '人数'}}</text>
			</view>
			<input class="input" type="num" v-model="seat" placeholder="请输入座位数" @input="seatInput()"/>
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">出发日期</text>
			</view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">出发时间</text>
			</view>
			<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
				<view class="uni-input">{{time}}</view>
			</picker>
		</view>
		<view class="input-view">
		<view class="button-view">
			<button type="default" plain="true" style="background-color: #70ac79;color: #ffffff; font-size: 32px;border-radius: 60px;border: 0 solid #ffffff;" @tap="publish">发布</button>
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
			carnum: '',
			startpoint:'',
			destination: '',
			departTime: 0,
			seat: '',
			date: '',
			time: '12:01',
			fromPublish:false,
			type: 0,
			typeArray: ['车找人', '人找车']
		},
		computed: mapState(['requestUrl', 'userInfo']),
		onLoad(e) {
			this.fromPublish = e.fromPublish;
			this.date = this.getDate({
				format: true
			});
			let date = new Date();
			let hour = date.getHours();
			let min = date.getMinutes();
			this.time = hour + ":" + min;
			this.carnum = '';
			this.startpoint ='';
			this.destination = '';
			this.departTime = 0;
			this.seat = '';
			uni.getStorage({
				key: 'carnum',
				success: (res) => {
					this.carnum = res.data;
				}
			});
		},
		onUnload() {
		},
		methods: {
			typePickerChange(e) {
				this.type = e.target.value;
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
			
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
			
				return `${year}-${month}-${day}`;
			},
			validate() {
				let msg = '';
				var checkNum = new RegExp('^\\+?[1-9][0-9]*$','g');//非0正整数
				this.seat = Number(this.seat);
				let settime = this.date + " " + this.time;
				settime = settime.replace(/-/g,'/'); 
				this.departTime = new Date(settime).getTime();
				let currentTime = new Date().getTime();
				if (!this.carnum || this.carnum.length == 0)
				{
					msg = "请填写车牌号";
				}else if(!this.startpoint || this.startpoint == 0)
				{
					msg = "请填写出发地";
				}else if(!this.destination || this.destination == 0)
				{
					msg = "请填写目的地";
				}else if (!this.seat || checkNum.exec(this.seat) == null)
				{
					msg = "请填写座位数";
				}else if (this.departTime - currentTime < 900000)
				{
					msg = "出发时间至少要15分钟后";
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
			seatInput() {
				let num = Number(this.seat);
				if (isNaN(num))
				{
					this.seat = '';
				}
			},
			publish: function() {
				//console.log(this.title);
				if (this.validate() == false)
					return;
				uni.showLoading({
					title: '发布中...',
					mask: true
				});
				uni.setStorage({
					key: 'carnum',
					data: this.carnum,
					success: () =>  {
					}
				});
				uni.request({
					url: this.requestUrl + 'business/addCarsharing',
					method: 'POST',
					data: {
						carnum: this.carnum, 
						departTime: this.departTime, 
						startpoint: this.startpoint, 
						destination: this.destination, 
						seat: this.seat, 
						userId: this.userInfo.id,
						type: this.type
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
									if (this.fromPublish)
									{
										uni.redirectTo({
											url: '../carsharing/carsharing'
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
		margin-top: 50px;
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

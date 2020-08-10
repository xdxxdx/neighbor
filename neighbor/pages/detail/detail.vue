<template>
	<view v-if="detailInfo">
		<view class="page-section">
			<view class="mask" v-show="show" @tap="hidePop()"></view>
			<view class="popup popup-middle" v-show="show">
				<view class="desc">
					<text style="font-weight: bold;">{{buyText}}</text>
					<view class="desc-left">
						<text v-if="detailInfo.payType != 1">单价：{{detailInfo.price}}</text>
						<view class="inline-item">
							<text>{{(detailInfo.firstType != 2)? '数量' : '人数'}}：</text>
							<number-box v-on:update="numberUpdate" :min="0" :max="detailInfo.num"></number-box>
						</view>
						<text v-if="detailInfo.payType != 1">总计：{{total}}</text>
						<text class="heart" v-show="detailInfo.payType == 0">爱心币余额：{{userInfo.heartPoint}}</text>
					</view>
					<view>
						<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="doBuy()">{{buyText}}</button>
						<button type="primary" style="background-color: #70ac79;font-size: 30px;" @tap="hidePop()">取消</button>

					</view>

				</view>
			</view>
			<view class="cell-top" v-if="!hidUser">
				<image class="cell-top-avatar" :src="detailInfo.avatarUrl" @tap="toUser()"></image><text class="cell-top-name">{{detailInfo.nickName}}</text>
				<view class="cell-top-right">
					<view class='cell-top-btn' :style="(attentionId == 0) ? 'background-color: #ffffff;color: #70ac79' : 'background-color: #70ac79;color: #ffffff'"
					 @tap="changeAttention()">{{(attentionId == 0) ? '收藏' : '已收藏'}}</view>
					<view class='cell-top-btn' @tap="goHouse()">来我家</view>

				</view>
			</view>
			<view class="main-swiper" style="height: 800px;">
				<view class='cell-top-btn' style="position: absolute;left:20upx;z-index: 999;" @tap="goShare()">返回首页</view>
				<swiper :indicator-dots="true" :autoplay="false" :circular="true" style="height: 800px;">
					<swiper-item  style="height: 800px;" v-if="videoUrl">
						<video class="main-swiper-img" style="height: 800px;" :src="imageUrl + videoUrl"></video>
					</swiper-item>
					<swiper-item v-for="(pic,index) in detailInfo.pics" :key="pic.id" style="height: 800px;">
						
						<image class="main-swiper-img" mode="aspectFit" style="height: 800px;" :src="imageUrl + pic.url"/>
					</swiper-item>
				</swiper>
			</view>
			<view class="input-view" style="padding-top: 20px;" v-if="likeUsers.length > 0">
				<view class="heart" style="line-height: 0px;font-size: 40px;">&#xe650;</view>
				<view v-for="(user,index) in likeUsers" :key="user.id" style="margin-left: 10px;" >
		
					<image class="like-avatar" :src="user.avatarUrl"></image>
				</view>
			</view>
			<view class="cell-top">
				<text class="info-title">{{detailInfo.name}}</text>
				<view class="cell-top-right">
					<button style="margin: 20px;line-height:60px ;background-color: #70ac79;color: #ffffff;font-size: 26px;border: 0 solid #ffffff;height: 60px;border-radius: 30px;"
					 type="default" plain="true" open-type="share">分享</button>
				</view>
			</view>
			<view class="input-view" v-if="detailInfo.firstType != 3">
				<view class="label-view">
					<text class="label">{{(detailInfo.firstType == 2) ? '人数' : '数量'}}</text>
				</view>
				<text class="label">{{detailInfo.num}}</text>
			</view>
			<view class="input-view" v-if="detailInfo.firstType < 2">
				<view class="label-view">
					<text class="label">{{(detailInfo.payType == 1) ? "免费分享" : "单价"}}</text>
				</view>
				<text class="heart" style="padding-left: 0px; font-size: 32px;line-height: 50px;" v-if="detailInfo.payType == 0">&#xe600;{{detailInfo.price}}</text>
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">分享时限</text>
				</view>
				<text class="label">{{detailInfo.endTime}}</text>
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">描述</text>
				</view>
				<text class="textarea">{{detailInfo.info}}</text>
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">联系方式</text>
				</view>
				<text class="label" @tap="phoneCall(detailInfo.mobile)" style="color: #2782D7;text-decoration:underline">{{detailInfo.mobile}}</text>
			</view>
			<view class="input-view" v-if="detailInfo.deliverType == 0">
				<view class="label-view">
					<text class="label">地址</text>
				</view>
				<text class="label">{{detailInfo.address}}</text>
			</view>
			<view class="input-view" v-if="detailInfo.firstType < 2">
				<view class="label-view">
					<text class="label">配送方式</text>
				</view>
				<text class="label">{{deliverArray[detailInfo.deliverType]}}</text>
			</view>

			<view class="input-view" style="height: 100px;">
				<view class="label-view"></view>
			</view>
		</view>
		<view class="uni-flex uni-row" v-if="detailInfo.num > 0 && !hidBuy && detailInfo.endTime != '已过期'">

			<view class="buy-btn" @click="order()">立即{{buyText}}</view>
		</view>

	</view>
</template>

<script>
	import numberBox from '../../components/number-box.vue'

	import {
		mapState,
		mapMutations
	} from 'vuex'


	export default {
		data() {
			return {
				buyText: '',
				deliverArray: ['自提', '送货上门', '自行约定'],
				detailInfo: [],
				hidUser: false,
				hidBuy: false,
				show: false,
				numberValue: 0,
				total: 0,
				attentionId: 0,
				id: 0,
				likeUsers: [],
				videoUrl: null,
			}
		},
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo']),
		components: {
			numberBox,
		},
		onBackPress() {
			if (this.show) {
				this.show = false;
				this.hide();
				return true;
			}
		},
		onLoad(p) {
			this.hidUser = p.hidUser;
			this.hidBuy = p.hidBuy;
			this.id = p.id;
			
			uni.request({
				url: this.requestUrl + 'business/detailInfo',
				method: 'GET',
				data: {
					id: p.id,
				},
				success: (res) => {
					this.detailInfo = res.data.data;
					this.hidBuy = (this.detailInfo.firstType ==3 && this.detailInfo.secondType == 0);
				
					if (this.detailInfo.pics[0].url.toLowerCase().lastIndexOf("mp4") != -1)
					{
						this.videoUrl = this.detailInfo.pics[0].url;
						//console.log(this.videoUrl);
						this.detailInfo.pics.shift();
					}
					var timestamp = new Date().getTime();
					this.detailInfo.endTime = (timestamp > this.detailInfo.endTime) ? '已过期' : this.formatDate(this.detailInfo.endTime);
					if (this.detailInfo.firstType == 2)
						this.buyText = '参加';
					else if (this.detailInfo.firstType == 3)
						this.buyText = '帮忙';
					else if (this.detailInfo.payType == 2)
						this.buyText = '预定';
					else
						this.buyText = '购买';
					//console.log(timestamp);
				}
			});
			uni.request({
				url: this.requestUrl + 'business/checkAttention',
				method: 'GET',
				data: {
					openId: this.userInfo.openId,
					type: 0,
					targetId: p.id
				},
				success: (res) => {
					this.attentionId = res.data;
				}
			});
			uni.request({
				url: this.requestUrl + 'business/listLikeUser',
				method: 'GET',
				data: {
					type: 3,
					targetId: p.id
				},
				success: (res) => {
					this.likeUsers = res.data.data;
				}
			});
		},
		onShareAppMessage(res) {
			return {
				title: this.detailInfo.name,
				path: '/pages/detail/detail?id=' + this.id,
				imageUrl: this.imageUrl + this.detailInfo.pics[0].url
			}
		},
		onUnload() {
			this.hidUser = false;
		},
		methods: {
			...mapMutations(['setUserInfo']),
			phoneCall(num) {
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			numberUpdate(value) {
				this.numberValue = value;
				this.total = this.detailInfo.price * value;
			},
			order() {
				//console.log(this.detailInfo.firstType);
				if (this.detailInfo.firstType != 3) {
					if (this.userInfo.id == 0) {
						uni.navigateTo({
							url: '../userinfo/userinfo?state=0&isEdit=false',
						});
						return;
					}
					this.show = true;
				} else {
					uni.showModal({
						content: "确定要帮忙吗？",
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								this.numberValue = 1;
								this.doBuy();
							} else if (res.cancel) {
								
							}
						}
					})
				}
			},
			hidePop() {
				this.show = false;
			},

			toUser() {
				uni.navigateTo({
					url: '../userinfo/userinfo?openId=' + this.detailInfo.openId + '&state=2'
				});
			},
			changeAttention() {
				if (this.attentionId == 0) {
					uni.request({
						url: this.requestUrl + 'business/addAttention',
						method: 'POST',
						data: {
							openId: this.userInfo.openId,
							type: 0,
							targetId: this.detailInfo.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							this.attentionId = res.data;
							uni.showModal({
								content: "已收藏",
								showCancel: false
							});
						}
					});
				} else {
					uni.request({
						url: this.requestUrl + 'business/delAttention',
						method: 'GET',
						data: {
							id: this.attentionId
						},
						success: (res) => {
							this.attentionId = 0;
							uni.showModal({
								content: "取消收藏",
								showCancel: false
							});
						}
					});
				}
			},
			goHouse() {
				uni.navigateTo({
					url: '../userhouse/userhouse?openId=' + this.detailInfo.openId + '&nickName=' + this.detailInfo.nickName +
						'&avatarUrl=' + this.detailInfo.avatarUrl + '&userId=' + this.detailInfo.userId
				});
			},
			goShare()
			{
				uni.switchTab({
					url: '../share/share'
				});
			},
			doBuy() {
				if (this.numberValue == 0) {
					uni.showToast({
						title: "请选择购买数量!",
						icon: "none"
					});
					return;
				}
				this.hidePop();
				if (this.detailInfo.payType == 2)
					this.requestPayment();
				else
					this.payByHeartPoint();
			},
			async requestPayment() {
				let orderInfo = await this.getOrderInfo();
				//console.log("得到订单信息", orderInfo);
				if (orderInfo.statusCode !== 200) {
					//console.log("获得订单信息失败", orderInfo);
					uni.showModal({
						content: "获得订单信息失败",
						showCancel: false
					})
					return;
				}
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: orderInfo.data.timeStamp,
					nonceStr: orderInfo.data.nonceStr,
					package: orderInfo.data.package,
					signType: orderInfo.data.signType,
					paySign: orderInfo.data.paySign,
					success: (e) => {
						//console.log("success", e);
						uni.showLoading({
							title: '微信支付中...',
							mask: true
						});
						uni.request({
							url: this.requestUrl + 'business/paymentFinish',
							method: 'POST',
							data: {
								name: this.detailInfo.name,
								id: this.detailInfo.id,
								openId: this.userInfo.openId,
								fee: this.total,
								num: this.numberValue,
								isHeartPoint: false
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (result) => {
								uni.hideLoading();
								if (result.data.success == false) {
									uni.showModal({
										content: result.data.errorMessage,
										showCancel: false
									});
								} else {
									this.detailInfo.num = result.data.data.leftNum;
									uni.showModal({
										content: "微信支付成功!",
										showCancel: false,
										success: (res) => {
											if (res.confirm) {
												if (this.detailInfo.num == 0)
												{
													uni.navigateBack({
														delta: 1
													});
												}
											}
										}
									});
									
								}

							},
							fail: (e) => {
								uni.showModal({
									content: "微信支付失败!",
									showCancel: false
								})
								//console.log(e);
							}
						});
					},
					fail: (e) => {
						//console.log("fail", e);
						uni.showModal({
							content: "微信支付失败!",
							showCancel: false
						})
					},
					complete: () => {

					}
				})
			},
			payByHeartPoint() {
				if (this.userInfo.heartPoint < this.total) {
					uni.showModal({
						content: "爱心币不足，请充值!",
						showCancel: false
					});
					return;
				} else
					uni.showLoading({
						title: this.buyText + '中...',
						mask: true
					});
				uni.request({
					url: this.requestUrl + 'business/paymentFinish',
					method: 'POST',
					data: {
						name: this.detailInfo.name,
						id: this.detailInfo.id,
						openId: this.userInfo.openId,
						fee: this.total,
						num: this.numberValue,
						isHeartPoint: true
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.success == false) {
							uni.showModal({
								content: result.data.errorMessage,
								showCancel: false
							});
						} else {
							this.detailInfo.num = result.data.data.leftNum;
							this.userInfo.heartPoint = result.data.data.heartPoint;
							this.setUserInfo(this.userInfo);
							uni.hideLoading();
							uni.showModal({
								content: this.buyText + "成功!",
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										if (this.detailInfo.num == 0)
										{
											uni.navigateBack({
												delta: 1
											});
										}
									}
								}
							});
							
						}
					},
					fail: (e) => {
						uni.showModal({
							content: this.buyText + "失败!",
							showCancel: false
						})
					}
				});
			},
			getOrderInfo() {
				return new Promise((res) => {
					uni.request({
						url: this.requestUrl + 'business/payment',
						method: 'POST',
						data: {
							name: this.detailInfo.name,
							id: this.detailInfo.id,
							openId: this.userInfo.openId,
							fee: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (result) => {
							res(result);
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			}
		}
	}
</script>

<style>
	@import "../../common/newicon.css";

	.input-view {

		align-items: baseline;
	}

	.btn-mini {
		font-size: 25px;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border: 0 solid #ff0000;
		border-radius: 40px;
	}
	.like-avatar {
		width: 60px;
		height: 60px;
		border: 0 solid #ff0000;
		border-radius: 30px;
	}

	.textarea {
		display: flex;
		width: 450px;
		/* line-height: 30px; */
		color: #555;
		text-align: left;
		/* align-items: center; */

	}

	.cell-top {
		display: flex;
		flex: 1;
		flex-direction: row;
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
		padding-right: 20px;
	}

	.cell-top-btn {
		height: 58px;
		font-size: 26px;
		border: 1px solid #70ac79;
		margin-right: 20px;
		line-height: 60px;
		width: 120px;
		text-align: center;
		border-radius: 30rpx;
		background-color: #70ac79;
		color: #ffffff;
	}

	/*弹出框*/
	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 450upx;
		border-radius: 10upx;
		top: 100px;
		right: 0;
		left: 0;
		margin: auto;
	}

	.desc {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 30upx;
		line-height: 80upx;
		margin: 30upx;
		text-align: center;
	}

	.desc-left {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 30upx;
		line-height: 80upx;
		margin: 10upx;
		text-align: left;
	}

	.inline-item {
		display: flex;
		flex-direction: row;
	}

	.info-title {
		font-size: 34px;
		padding-left: 45px;
		padding-top: 20px;
		width: 500px;
	}

	.buy-btn {
		/* margin-left: 40%; */
		text-align: center;
		color: #ffffff;
		height: 100px;
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: #70ac79;
		line-height: 100px;
	}

	.follow-btn {
		text-align: center;
		color: #ffffff;
		height: 100px;
		position: fixed;
		bottom: 0;
		display: flex;
		width: 20%;
		justify-content: center;
		background-color: #F0AD4E;
		line-height: 100px;
	}

	.gohome-btn {
		margin-left: 20%;
		text-align: center;
		color: #ffffff;
		height: 100px;
		position: fixed;
		bottom: 0;
		display: flex;
		width: 20%;
		justify-content: center;
		background-color: #8A6DE9;
		line-height: 100px;
	}
</style>

<template>

	<view class="center" v-if="userData">
		<view class="mask" v-show="show" @tap="hidePop()"></view>
		<view class="popup popup-middle" v-show="show">
			<view class="desc">
				<text style="font-weight: bold;">充值</text>
				<view class="desc-left">
					<text style="color: #70ac79">爱心币余额：{{userInfo.heartPoint}}</text>
					<view class="inline-item">
						<text class="money-label">充值金额(￥)：</text><input class="money-input" v-model="money" type="number" maxlength="5"
						 @input="moneyInput()" />
					</view>
					<text>兑换爱心币：{{amountText}}</text>
				</view>
				<view>
					<button type="primary" style="background-color: #70ac79;font-size: 36px;" @tap="doBuy()">支付</button>
					<button type="primary" style="background-color: #70ac79;font-size: 36px;" @tap="hidePop()">取消</button>
				</view>

			</view>
		</view>
		<view class="mask" v-show="showWithDrawFlag" @tap="hideWithDraw()"></view>
		<view class="popup popup-middle-withdraw" v-show="showWithDrawFlag">
			<view class="desc">
				<text style="font-weight: bold;">提现申请</text>
				<view class="desc-left">
					<text style="color: #70ac79">爱心币余额：{{userInfo.heartPoint}}</text>
					<view class="inline-item">
						<text class="money-label">提现数量：</text><input class="money-input" v-model="heartPoint" type="number" maxlength="7"
						 @input="heartPointInput()" />
					</view>
					<text>提现金额：{{withDrawAmountText}}</text>
					<view class="inline-item">
						<text class="money-label">银行：</text>
						<picker style="width: 300px;" @change="bankPickerChange" :value="bankIndex" :range="bankArray">
							<view style="width: 300px;">{{bankArray[bankIndex]}} ▽</view>
						</picker>

					</view>
					<view class="inline-item">
						<text class="money-label">卡号：</text><input class="bank-input" v-model="bankcard" type="number" />
					</view>
					<view class="inline-item">
						<text class="money-label">支行：</text><input class="bank-input" v-model="subbranch" type="text" />
					</view>
					<view class="inline-item">
						<text class="money-label">姓名：</text><input class="bank-input" v-model="realName" type="text" />
					</view>
				</view>
				<view>
					<button type="primary" style="background-color: #70ac79;font-size: 36px;" @tap="doWithdraw()">申请</button>
					<button type="primary" style="background-color: #70ac79;font-size: 36px;" @tap="hideWithDraw()">取消</button>

				</view>

			</view>
		</view>
		<view class="user">
			<view>
				<image class="user-img" :src="userData.avatarUrl"></image>
			</view>
			<view class="top-info">
				<view>
					<text class="user-name">{{userData.nickName}}</text>
					<text class="iconfont editicon" @tap="goEdit()">&#xe6b0;</text>
					<text class="iconfont editicon" style="margin-left: 10px !important;" @tap="showQRCode()">&#xe603;</text>
				</view>
				<view class="account-info">
					<text class="heart" style="font-size: 36px;">&#xe600;{{userData.heartPoint}}</text>
					<view class="account-info-right">
					</view>
				</view>
			</view>

		</view>
		<view class="sign-title">签到奖励</view>
		<view class="sign-info">
			<view class="sign-box" v-for="(data, index) in signDatas" :key="index">
				<view class="sign-box-day">{{data.day}}日<text v-if="data.signed" class="heart" style="font-size: 30px;color: #1AAD19;">&#xe607;</text></view>
				<view class="sign-box-reward"><text class="heart" style="font-size: 50px;">&#xe600;</text>{{data.reward}}</view>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @tap="goPage(0)">

				<text class="iconfont">&#xe63f;</text>
				<text class="list-text">订单管理</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>

			</view>
			<view class="center-list-item" @tap="goPage(1)">
				<text class="iconfont">&#xe6de;</text>
				<text class="list-text">账户明细</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
			<view class="center-list-item" @tap="goPage(2)">
				<text class="iconfont">&#xe69e;</text>
				<text class="list-text">发布管理</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
			<view class="center-list-item" @tap="goPage(8)">
				<text class="iconfont">&#xe60d;</text>
				<text class="list-text">顺风车管理</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @tap="goPage(3)">
				<text class="iconfont">&#xe661;</text>
				<text class="list-text">我的关注</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
			<view class="center-list-item" @tap="goPage(4)">
				<text class="iconfont">&#xe643;</text>
				<text class="list-text">我的收藏</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
			<view class="center-list-item" @tap="goPage(5)">
				<text class="iconfont">&#xe88e;</text>
				<text class="list-text">我的邻居</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
		</view>
		<view class="center-list">
		
			<view class="center-list-item" @tap="goPage(7)">
				<text class="iconfont">&#xe662;</text>
				<text class="list-text">建议投诉</text>
				<text class="navigat-arrow iconfont">&#xe65f;</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: mapState(['requestUrl', 'userInfo']),

		data() {
			return {
				pageNames: ['ordermgr', 'accountmgr', 'itemmgr', 'myfollow', 'myfavorite', 'myneighbor', 'setting', 'suggest',
					'mycarsharing'
				],
				userData: null,
				bankArray: ['中国工商银行', '中国建设银行', '中国银行', '中国农业银行', '交通银行', '招商银行', '中信银行', '浦发银行', '兴业银行', '民生银行'],
				bankIndex: 0,
				bankcard: '',
				subbranch: '',
				realName: '',
				money: 0,
				amount: 0,
				show: false,
				heartPoint: 0,
				withDrawAmount: 0,
				showWithDrawFlag: false,
				amountText: '0',
				withDrawAmountText: '0',
				signDatas: []
			}
		},
		onShow() {
			if (this.userInfo.id == 0) {
				uni.navigateTo({
					url: '../userinfo/userinfo?state=0&isEdit=false',
				});
				return;
			}
			uni.request({
				url: this.requestUrl + 'user/findUserByOpenID',
				method: 'GET',
				data: {
					openId: this.userInfo.openId
				},
				success: (res) => {
					//console.log(res);
					this.setUserInfo(res.data);
					this.userData = res.data;
					this.updateSignData(res.data.signnum);
				}
			});
		},
		methods: {
			...mapMutations(['setUserInfo']),
			updateSignData(num) {
				let date = new Date();
				let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				let maxDay = d.getDate();
				let today = date.getDate();
				let n = parseInt(today / 7)
				let startDay = ((today % 7 == 0) ? n - 1 : n)  * 7;
				this.signDatas = [];
				for (let i = 0; i < 7; i++)
				{
					let box = {};
					startDay = startDay + 1;
					if (startDay > maxDay)
						break;
					box.day = startDay
					box.reward = 10;
					if (startDay == 7 || startDay == 14 || startDay == 28)
						box.reward = 50;
					box.signed = startDay <= today && today - startDay < num;
					this.signDatas.push(box);
				}
			},
			upgradeInfo() {
				uni.showModal({
					title: "等级规则",
					content: "1. XXXXXXXX\n2.XXXXXXXX\n3.XXXXXXXXXXXX",
					showCancel: false,
					confirmText: "确定"
				})
			},
			goPage(index) {
				let pageName = this.pageNames[index];
				uni.navigateTo({
					url: '../' + pageName + '/' + pageName
				});
			},
			goEdit() {
				uni.navigateTo({
					url: '../userinfo/userinfo?state=1'
				});
			},
			showQRCode ()
			{
				uni.navigateTo({
					url: '../userqrcode/userqrcode'
				});
			},
			moneyInput() {
				this.money = Number(this.money);
				this.amount = this.money * 100;
				this.amountText = this.amount;
				if (this.amount > 50000) {
					this.amountText = this.amount + " + 80";
					this.amount += 80;
				} else if (this.amount > 10000) {
					this.amountText = this.amount + " + 15";
					this.amount += 15;
				} else if (this.amount > 5000) {
					this.amountText = this.amount + " + 6";
					this.amount += 6;
				} else if (this.amount > 3000) {
					this.amountText = this.amount + " + 3";
					this.amount += 3;
				} else if (this.amount > 1000) {
					this.amountText = this.amount + " + 1";
					this.amount += 1;
				}
			},
			showPop() {
				this.show = true;
				this.money = 0;
				this.amount = 0;
			},
			hidePop() {
				this.show = false;
			},
			doBuy() {
				//console.log("buy");
				var regNum = new RegExp('^\\+?[1-9][0-9]*$', 'g'); //非0正整数
				if (!this.amount || regNum.exec(this.amount) == null || this.amount <= 0) {
					uni.showToast({
						title: "请填写正确的购买金额!",
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title: '支付中...',
					mask: true
				});
				this.requestPayment();
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
						console.log("success", e);
						uni.showToast({
							title: "支付成功!",
						})
						this.doReCharge();
						uni.hideLoading();
					},
					fail: (e) => {
						//console.log("fail", e);
						uni.showModal({
							content: "支付失败!",
							showCancel: false
						})
						uni.hideLoading();
					},
					complete: () => {

					}
				})
			},
			getOrderInfo() {
				return new Promise((res) => {
					uni.request({
						url: this.requestUrl + 'business/payment',
						method: 'POST',
						data: {
							name: 'TestWXPay',
							id: '1',
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
			},
			//test
			doReCharge() {
				uni.request({
					url: this.requestUrl + 'business/recharge',
					method: 'POST',
					data: {
						openId: this.userInfo.openId,
						amount: this.money,
						heartPoint: this.amount
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						this.userData.heartPoint = res.data.data;
						this.setUserInfo(this.userInfo);
						this.hidePop();
					},
					fail: (e) => {

					}
				})
			},
			bankPickerChange(e) {
				this.bankIndex = e.target.value;
			},
			heartPointInput() {
				let num = Number(this.heartPoint);
				if (num > this.userInfo.heartPoint)
					num = Number(this.userInfo.heartPoint);
				let amount = num / 100;
				let rate = 0;
				if (amount > 1000) {
					rate = 0.98;
				} else if (amount > 500) {
					rate = 0.97;
				} else if (amount > 300) {
					rate = 0.96;
				} else {
					rate = 0.95;
				}
				this.heartPoint = num;
				this.withDrawAmount = Math.floor(amount * rate * 100) / 100;
				this.withDrawAmountText = this.withDrawAmount;
				//console.log(this.heartPoint);
				//console.log(this.withDrawAmount);
				//console.log(this.withDrawAmountText);
			},
			showWithDraw() {
				this.showWithDrawFlag = true;
				this.heartPoint = 0;
				this.withDrawAmount = 0;
				uni.getStorage({
					key: 'bankname',
					success: (res) => {
						//console.log(res);
						if (res.data)
							this.bankIndex = res.data;
					}
				});
				uni.getStorage({
					key: 'bankcard',
					success: (res) => {
						//console.log(res.data);
						if (res.data)
							this.bankcard = res.data;
					}
				});
				uni.getStorage({
					key: 'subbranch',
					success: (res) => {
						//console.log(res.data);
						if (res.data)
							this.subbranch = res.data;
					}
				});
				uni.getStorage({
					key: 'realName',
					success: (res) => {
						//console.log(res.data);
						if (res.data)
							this.realName = res.data;
					}
				});
			},
			hideWithDraw() {
				this.showWithDrawFlag = false;
			},
			doWithdraw() {
				var regNum = new RegExp('^\\+?[1-9][0-9]*$', 'g'); //非0正整数
				if (!this.heartPoint || regNum.exec(this.heartPoint) == null || this.heartPoint <= 0) {
					uni.showToast({
						title: "请填写正确的提现爱心币数量!",
						icon: "none"
					});
					return;
				} else if (this.heartPoint < 10000) {
					uni.showToast({
						title: "爱心币最少为10000个!",
						icon: "none"
					});
					return;
				}
				uni.setStorage({
					key: 'bankname',
					data: this.bankIndex,
					success: function() {
						//console.log('success');
					}
				});
				uni.setStorage({
					key: 'bankcard',
					data: this.bankcard,
					success: function() {
						//console.log('success');
					}
				});
				uni.setStorage({
					key: 'subbranch',
					data: this.subbranch,
					success: function() {
						//console.log('success');
					}
				});
				uni.setStorage({
					key: 'realName',
					data: this.realName,
					success: function() {
						//console.log('success');
					}
				});


				uni.showLoading({
					title: '申请中...',
					mask: true
				});
				uni.request({
					url: this.requestUrl + 'business/withDraw',
					method: 'POST',
					data: {
						openId: this.userInfo.openId,
						heartPoint: this.heartPoint,
						bankname: this.bankArray[this.bankIndex],
						bankcard: this.bankcard,
						subbranch: this.subbranch,
						realName: this.realName

					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						this.userData.heartPoint = res.data.data;
						this.setUserInfo(this.userInfo);
						this.hideWithDraw();
						uni.hideLoading();
						uni.showModal({
							content: '申请成功，请等待审核',
							showCancel: false
						});
					},
					fail: (e) => {

					}
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

	.lvicon {
		color: #ffd400;
		font-size: 40px;
		padding-left: 5px;
		padding-right: 15px;
	}

	.editicon {
		font-size: 38px;
		margin-left: 40px;
	}

	.user {
		display: flex;
		flex: 1;
		width: 750px;
		height: 150px;
		padding-left: 40px;
		box-sizing: border-box;
		background-color: #ffffff;
		flex-direction: row;
	}

	.top-info {
		margin-left: 30px;
		padding: 15px 0 10px 30px;
		/* box-sizing: border-box; */
		background-color: #FFFFFF;
		width: 550px;
		height: 120px;
		border-radius: 40px;
		flex-direction: column;
	}



	.user-hover {
		opacity: 0.8;
	}

	.user-img {
		width: 130px;
		height: 130px;
		border-radius: 130px;
	}

	.user-title {
		height: 150px;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		margin-left: 40px;
	}

	.user-name {
		height: 60px;
		line-height: 60px;
		font-size: 34px;

	}

	.user-info {
		height: 60px;
		line-height: 60px;
		font-size: 40px;
		color: #FFFFFF;
		align-items: center;
		justify-content: space-between;
	}

	.go-userinfo.iconfont {
		font-size: 38px;
		color: #FFFFFF;
	}

	.userinfo-title {
		height: 150px;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20px;
	}


	.center-list {
		background-color: #FFFFFF;
		margin-top: 20px;
		width: 750px;
		flex-direction: column;
	}

	.center-list-item {
		display: flex;
		flex: 1;
		height: 90px;
		width: 750px;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0px 20px;
	}

	.border-bottom {
		border-bottom-width: 1px;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40px;
		height: 90px;
		line-height: 90px;
		font-size: 34px;
		color: #FF80AB;
		text-align: center;
		font-family: texticons;
		margin-right: 20px;
	}

	.list-text {
		height: 80px;
		line-height: 80px;
		font-size: 32px;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90px;
		width: 40px;
		line-height: 90px;
		font-size: 34px;
		color: #555;
		text-align: right;
		font-family: texticons;
	}

	.item-left {
		width: 70%;
	}

	.item-right {
		width: 30%;
	}

	.account-info {
		width: 450px;
		display: flex;
		flex: 1;
		flex-direction: row;
	}

	.account-info-right {
		font-size: 24px;
		color: #FFFFFF;
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}

	.account-info-btn {
		line-height: 40px;
		width: 80px;
		text-align: center;
		border: 0px solid #d0d0d0;
		border-radius: 20rpx;
		margin-left: 20px;
		background-color: #70ac79;
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
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 550upx;
		height: 600upx;
		border-radius: 10upx;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}

	.popup-middle-withdraw {
		width: 600upx;
		height: 850upx;
		border-radius: 10upx;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}

	.desc {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 40upx;
		line-height: 80upx;
		margin: 20upx;
		text-align: center;
	}

	.desc-left {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 38upx;
		line-height: 80upx;
		margin: 10upx;
		text-align: left;
	}

	.inline-item {
		display: flex;
		flex-direction: row;
	}

	.money-label {
		display: flex;
		line-height: 30px;
		text-align: left;
		align-items: center;
	}

	.money-input {
		width: 180px;
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 1px solid #d0d0d0;
	}

	.bank-input {
		width: 380px;
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 1px solid #d0d0d0;
	}

	.sign-info {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #ffffff;
		padding: 10upx;
	}
	
	.sign-title {
		color: #70ac79;
		font-weight: bold;
		font-size: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		margin-top: 10upx;
	}

	.sign-box {
		display: flex;
		flex-direction: column;
		width: 100upx;
		background-color: #e6f1d8;
		text-align: center;
		border: 1upx solid #70ac79;
		color: #70ac79;
	}
	
	.sign-box-day {
		height: 50upx;
	}
	
	.sign-box-reward {
		border-top: 1upx solid #70ac79;
		color: #DD524D;
	}
	
	.sign-box-icon {
		border-top: 1upx solid #70ac79;
	}
	
</style>

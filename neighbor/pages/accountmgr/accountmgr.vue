<template>
	<view class="page">

		<view class="cell-list" style="font-weight: bold;color:#70ac79;font-size: 28upx;">
			<view class="cell-info-1">类型</view>
			<view class="cell-info-2">数额</view>
			<view class="cell-info-3">创建时间</view>
			<view class="cell-info-3">完成时间</view>
		</view>
		<view class="cell-list" v-for="(value,key) in amountDetailList" :key="key">
			<view class="cell-info">
				<view :class="['cell-info-1',(value.type==1 || value.type==2 || value.type==4) ? 'redText' : 'greenText']">{{amountType[value.type]}}</view>
				<view class="cell-info-2" v-show="value.type == 0"><text class="heart">￥{{value.amount}}</text><text class="heart" >&#xe600;{{value.heartPoint}}</text></view>
				<view class="cell-info-2" v-show="value.type == 1"><text class="heart">&#xe600;{{value.heartPoint}}</text><text class="heart">￥{{value.amount}}</text></view>
				<view class="cell-info-2" v-show="value.type > 1"><text class="heart">&#xe600;{{value.heartPoint}}</text></view>
				<view class="cell-info-3">{{value.createDate}}</view>
				<view class="cell-info-3">{{(value.finishTime === null) ? '审核中' : value.finishTime}}</view>
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
		data() {
			return {
				amountType: ['充值', '提现', '赠送', '受赠', '使用', '收入', '签到'],
				amountDetailList: [],
			};
		},
		onLoad() {
			this.loadData();
		},
		computed: mapState(['requestUrl', 'userInfo']),
		methods: {
			...mapMutations(['setUserInfo']),
			loadData() {
				uni.request({
					url: this.requestUrl + 'business/listAmountDetailByOpenId',
					method: 'GET',
					data: {
						openId: this.userInfo.openId,
						pageIndex: 0
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						this.amountDetailList = res.data.data.items;
						for (let detail of this.amountDetailList) {
							detail.createDate = this.formatDate(detail.createDate);
							if (!detail.finishTime == false)
								detail.finishTime = this.formatDate(detail.finishTime);
							//console.log(order.createDate);
						}
					},
					fail: (e) => {

					}
				})
			},
			
		}
	}
</script>

<style>
	.heart {
		line-height: 60px;
		padding-left: 0px;
		font-size: 30px;
	}
	
	
	.account-info {
		width: 750px;
		display: flex;
		flex: 1;
		flex-direction: row;
		background-color: #ffffff;
		margin-bottom: 20px;
		padding: 30px;
	}

	.account-info-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}

	.account-info-btn {
		margin-right: 50px;
		line-height: 60px;
		width: 150px;
		text-align: center;
		border: 1px solid #d0d0d0;
		border-radius: 10rpx;
	}

	.cell-list {
		width: 750px;
		line-height: 60px;
		display: flex;
		flex: 1;
		flex-direction: row;
		background-color: #ffffff;
		border-top: 2px solid #d0d0d0;
		padding-left: 2%;
	}

	.cell-info {
		display: flex;
		flex: 1;
		flex-direction: row;
	}



	.cell-info-1 {
		width: 15%;
	}

	.cell-info-2 {
		width: 25%;
		display: flex;
		flex-direction: column;
	}

	.cell-info-3 {
		width: 30%;
	}
	
	.greenText {
		color: green;
	}
	
	.redText {
		color: red;
	}

	
</style>

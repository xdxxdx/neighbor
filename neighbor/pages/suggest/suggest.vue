<template>
	<view style="background-color: #ffffff;">
		<view class="input-view">
			<view class="label-view">
				<text class="label">标题 </text>
			</view>
			<input class="input" type="text" placeholder=" " v-model="suggestTitle" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">详细描述</text>
			</view>
			
		</view>
		<view class="input-view">
			<textarea style="margin-left: 40upx; height: 200px;width: 640px;border: 1px solid #BEBEBE;" v-model="info" />
			</view>
		<view class="button-view">
			<button type="primary" hover-class="hover" style="background-color: #70ac79;" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: mapState(['requestUrl', 'userInfo']),
		methods: {
			submit()
			{
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				uni.request({
					url: this.requestUrl + 'business/addSuggest',
					method: 'POST',
					data: {
						openId: this.userInfo.openId,
						title: this.suggestTitle,
						info: this.info
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					success: (res) => {
						uni.hideLoading();
						uni.showModal({
							content: '提交成功，感谢您的建议！',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.reLaunch({
										url: '../center/center'
									});
								} 
								}
						});
						
					}
				});
			}
			}
	}
</script>

<style>
	
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50px;
		font-weight: bold;
		margin: 30px;
	}
	
	textarea {
			width: 400px;
			padding: 5px 0;
			height: 34px;
			line-height: 34px;
		}
	
		.textarea-wrp {
			padding: 0 5px;
		}

</style>

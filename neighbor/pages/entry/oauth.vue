<template>
	
	<view class="index" style="background-color: #00400f; background-size:100%;-moz-background-size:100%;">
		<view class="page-body">
			<view class="page-section">    
				
				<view class="oauth-logo">
					
					<image class="logo" mode="widthFix" src="../../static/title2.jpg"></image>
				 
					<br />
					<br />
					<br />
					<br />
					
				</view>
			</view>
			<view class="page-section">
				<view class="oauth-button">
					<button type="default" plain="true" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" style="font-size: 30px; background-color:#fffabf;color: #00400f;border-radius: 60px;border: 0 solid #ffffff;">进入</button>
				</view>
			</view>
			<br />
			<br />
			<br />
			<br />
			
			
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data: {
			isRegistered: true
		},
		computed: mapState(['requestUrl', 'userInfo']),
		methods: {
			...mapMutations(['setUserInfo']),
			onGotUserInfo(wxdata) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						uni.request({
							url: this.requestUrl + 'user/checkUserAccount',
							method: 'GET',
							data: {
								code: loginRes.code
							},
							success: (res) => {
								let info = res.data;
								if (!info) {
									uni.hideLoading();
									uni.showModal({
										content: '登录失败，请联系客服!',
										showCancel: false,
									});
									return;
								} 
								//console.log(info);
								var toUrl = '../share/share?first=true';
								var id = info.id;
								if (id == 0) {
									//console.log('no register');
									toUrl = '../userinfo/userinfo?state=0&isEdit=false';
									info = wxdata.detail.userInfo
									info.openId = res.data.openId;
									info.communityId = 7763;
									info.id = 0;
								}
								
								info.id = id;
								this.setUserInfo(info);
								uni.hideLoading();
								
								if (res.data.lv == 999)
								{
									toUrl = '../main/main';
								}
								uni.reLaunch({
									url: toUrl
								});
							}
						});
					}
				});
			},
		},
		onShareAppMessage(res) {
			return {
				title: '聚龙小镇',
				path: '../entry/oauth',
				imageUrl: 'https://wx.icrat.cn/resources/neighbor/title2.jpg'
			}
		},
		onLoad() {

		}
	}
</script>

<style>
	page {
		background-color: #00400f;
	}

	.oauth-logo {
		font-size: 100px;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	.oauth-button {
		width: 250px;
		font-weight: bold;
		margin-left: auto;
		margin-right: auto;
		
	}

	.logo {
		margin-top: 200px;
		margin-bottom: 100px;
		width: 600px;
	}
	
	.copyright {
		text-align: center;
		font-size: 20px;
		text-align: center;
		color: #ffffff;
		height: 50px;
		position: fixed;
		bottom:0;
			display:flex;
			width:100%;
			justify-content:center;
		line-height: 50px;
		margin-bottom: 50px;
	}
	
	
	
</style>

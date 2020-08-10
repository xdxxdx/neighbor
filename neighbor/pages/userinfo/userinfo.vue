<template>
	<view style="background-color: #ffffff;">
		<view class="mask" v-if="state == 2"></view>
		<view class="page-body" style="background-color: #ffffff;" v-if="isShow">
			<view class="input-view">
				<view class="userinfo-two">
					<view>
						<image class="userinfo-avatar" :src="avatarUrl"></image>
					</view>
					<view class="userinfo-two-right">
						<view class="input-view">
							<view class="label-view">
								<view class="iconfont">&#xe7af;</view><text class="label">昵称</text>
								<input style="padding-left: 30px;" class="input" type="text" v-model="nickName" />
							</view>
						</view>
						<view class="input-view">
							<view class="label-view">
								<view class="iconfont">&#xe62d;</view><text class="label">性别</text>
								<picker style="width: 300px;padding-left: 30px;" @change="sexPickerChange" :value="gender" :range="sexArray">
									<view style="width: 300px;">{{sexArray[gender] + ((state == 2) ? '' : ' ▽')}}</view>
								</picker>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="iconfont">&#xe612;</text><text class="label">手机 </text>
					<input style="padding-left: 60px;" class="input" type="text" placeholder=" " v-model="mobile" />
				</view>

			</view>
			<view class="input-view" v-if="false">
				<view class="label-view">
					<view class="iconfont">&#xe640;</view><text class="label">省份 </text>
				</view>
				<picker style="width: 300px;" @change="provincePickerChange" :value="province" :range="provinceArray">
					<view style="width: 300px;">{{provinceArray[province] + ((state == 2) ? '' : ' ▽')}}</view>
				</picker>
			</view>
			<view class="input-view" v-if="false">
				<view class="label-view">
					<view class="iconfont">&#xe63c;</view><text class="label">城市 </text>
				</view>
				<picker style="width: 300px;" @change="cityPickerChange" :value="city" :range="cityArray">
					<view style="width: 300px;">{{cityArray[city] + ((state == 2) ? '' : ' ▽')}}</view>
				</picker>
			</view>
			<view class="input-view" v-if="false">
				<view class="label-view">
					<view class="iconfont">&#xe66e;</view><text class="label">区/县 </text>
				</view>
				<picker style="width: 300px;" @change="areaPickerChange" :value="area" :range="areaArray">
					<view style="width: 300px;">{{areaArray[area] + ((state == 2) ? '' : ' ▽')}}</view>
				</picker>
			</view>
			<view class="input-view">
				<view class="label-view">
					<view class="iconfont">&#xe789;</view><text class="label">小区 </text>
					<picker :disabled="state == 1" style="width: 300px;padding-left: 60px;" @change="communityPickerChange" :value="community"
					 :range="communityArray">
						<view style="width: 300px;">{{communityArray[community] + ((state == 2) ? '' : ' ▽')}}</view>
					</picker>
				</view>

			</view>
			<view class="input-view">
				<view class="label-view">
					<view class="iconfont">&#xe63b;</view><text class="label">地址</text>
					<input :disabled="state == 1" style="padding-left: 60px;" class="input" type="text" :placeholder="(state == 2) ? '' : 'XX栋XX单元XX号'"
					 v-model="address" />
				</view>

			</view>
			<view class="input-view">
				<view class="label-view">
					<view class="iconfont">&#xe673;</view><text class="label">年龄 </text>
					<input style="padding-left: 60px;" class="input" type="text" placeholder="0" v-model="age" />
				</view>

			</view>
			<view class="input-view">
				<view class="label-view">
					<view class="iconfont">&#xe604;</view><text class="label">学历 </text>
					<input style="padding-left: 60px;" class="input" type="text" placeholder=" " v-model="education" />
				</view>

			</view>
			<view class="input-view">
				<view class="label-view">
					<view class="iconfont">&#xe860;</view><text class="label">兴趣 </text>
					<input style="padding-left: 60px;" class="input" type="text" placeholder=" " v-model="interest" />
				</view>

			</view>
			<view class="button-view">
				<button type="default" plain="true" style="background-color: #70ac79;color: #ffffff; font-size: 32px;border-radius: 60px;border: 0 solid #ffffff;"
				 hover-class="hover" @tap="submit" v-if="state != 2">提交</button>
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
				mobileValid: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, 
				sexArray: ['', '男', '女'],
				provinceData: [],
				provinceArray: ['请选择'],
				cityData: [],
				cityArray: ['请选择'],
				areaData: [],
				areaArray: ['请选择'],
				communityData: [{
					"id": 7763,
					"name": "陶然新村"
				}, {
					"id": 7764,
					"name": "东篱新村"
				}, {
					"id": 7765,
					"name": "陶然居"
				}],
				communityArray: ['请选择', '陶然新村', '东篱新村', '陶然居'],
				nickName: '',
				avatarUrl: '',
				gender: '',
				mobile: '',
				province: 1,
				city: 1,
				area: 1,
				community: 0,
				address: '',
				age: 0,
				describe: '',
				education: '',
				interest: '',
				state: 0,
				openId: '',
				isShow: false,
			}
		},
		computed: mapState(['requestUrl', 'userInfo']),

		onLoad(e) {
			this.nickName = '';
			this.avatarUrl = '';
			this.state = e.state;
			this.openId = (this.state == 2) ? e.openId : this.userInfo.openId;

			this.initData();
			

		},
		onUnload() {
			this.nickName = '';
			this.avatarUrl = '';
		},
		methods: {
			...mapMutations(['setUserInfo']),
			initData() {
				if (this.state == 0) {
					this.nickName = this.userInfo.nickName;
					this.avatarUrl = this.userInfo.avatarUrl;
					this.gender = this.userInfo.gender;
					this.isShow = true;
				} else {
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
					uni.request({
						url: this.requestUrl + 'user/findUserByOpenID',
						method: 'GET',
						data: {
							openId: this.openId
						},
						success: (res) => {
							let info = res.data;
							this.nickName = info.nickName;
							this.avatarUrl = info.avatarUrl;
							this.gender = info.gender;
							this.mobile = info.mobile;
							this.address = info.address;
							this.describe = info.describe;
							this.education = info.education;
							this.interest = info.interest;
							for (let i = 0; i < this.communityData.length; i++) {
								if (info.communityId == this.communityData[i].id) {
									this.community = i + 1;
									break;
								}
							}
							this.isShow = true;
							uni.hideLoading();
							
						}
					});
				}
			},
			sexPickerChange(e) {
				this.gender = e.target.value;
			},
			provincePickerChange(e) {
				this.province = e.target.value;
				if (this.province == 0) {
					this.cityArray = ['请选择'];
					this.areaArray = ['请选择'];
					this.communityArray = ['请选择'];
					this.city = 0;
					this.area = 0;
					this.community = 0;
					return;
				}
				uni.request({
					url: this.requestUrl + 'business/getCitiesByProvinceId',
					method: 'GET',
					data: {
						id: this.provinceData[this.province - 1].provinceid
					},
					success: (res) => {
						this.cityData = res.data;
						this.cityArray = ['请选择'];
						this.areaArray = ['请选择'];
						this.communityArray = ['请选择'];
						this.city = 0;
						this.area = 0;
						this.community = 0;
						for (let p of this.cityData) {
							this.cityArray.push(p.city);
						}
					}
				});
			},
			cityPickerChange(e) {
				this.city = e.target.value;
				if (this.city == 0) {
					this.areaArray = ['请选择'];
					this.communityArray = ['请选择'];
					this.area = 0;
					this.community = 0;
					return;
				}
				uni.request({
					url: this.requestUrl + 'business/getAreasByCityId',
					method: 'GET',
					data: {
						id: this.cityData[this.city - 1].cityid
					},
					success: (res) => {
						this.areaData = res.data;
						this.areaArray = ['请选择'];
						this.communityArray = ['请选择'];
						this.area = 0;
						this.community = 0;
						for (let p of this.areaData) {
							this.areaArray.push(p.area);
						}
					}
				});
			},
			areaPickerChange(e) {
				this.area = e.target.value;
				if (this.area == 0) {
					this.communityArray = ['请选择'];
					this.community = 0;
					return;
				}
				uni.request({
					url: this.requestUrl + 'business/getCommunityByAreaId',
					method: 'GET',
					data: {
						id: this.areaData[this.area - 1].id
					},
					success: (res) => {
						this.communityData = res.data;
						this.communityArray = ['请选择'];
						this.community = 0;
						for (let p of this.communityData) {
							this.communityArray.push(p.name);
						}
					}
				});
			},
			communityPickerChange(e) {
				this.community = e.target.value;

			},
			check() {
				let tip = "";
				if (!this.mobileValid.test(this.mobile)) {
					//if (this.mobile.length != 11) {
					tip = '手机号填写不正确';
				} else if (this.province == 0) {
					tip = '请选择省份';
				} else if (this.city == 0) {
					tip = '请选择城市';
				} else if (this.area == 0) {
					tip = '请选择区/县';
				} else if (this.community == 0) {
					tip = '请选择小区';
				}
				if (tip.length > 0) {
					uni.showToast({
						icon: 'none',
						title: tip
					});
					return false;
				}
				return true;

			},
			submit() {
				if (this.check() == false)
					return;

				if (this.state == 0) {
					uni.showModal({
						content: '提交后小区不可修改，是否确定提交？',
						success: (res1) => {
							if (res1.confirm) {
								this.doSubmit();
							}
						}
					});
				} else {
					this.doSubmit();
				}
			},
			doSubmit() {
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				uni.request({
					url: this.requestUrl + 'user/registerOrUpdate',
					method: 'POST',
					data: {
						openId: this.openId,
						mobile: this.mobile,
						address: this.address,
						gender: this.gender,
						describe: this.describe,
						nickName: this.nickName,
						avatarUrl: this.avatarUrl,
						communityId: this.communityData[this.community - 1].id,
						education: this.education,
						interest: this.interest,
						age: this.age
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.success) {
							this.setUserInfo(res.data.data);
							uni.showModal({
								content: '提交成功',
								showCancel: false,
								success: (res1) => {
									if (res1.confirm) {
										let url = '';
										if (this.state == 0) {
											url = '../share/share';
											uni.setStorage({
												key: 'show_guide',
												data: 'true',
												success: function() {
												}
											});
										} else {
											url = '../center/center';
										}
										//console.log(url)
										uni.switchTab({
											url: url
										});
									}
								}
							});
						} else {
							uni.showModal({
								content: '提交失败，请重试！',
								showCancel: false,
								success: (res2) => {}
							});
						}
					}
				});
			},
		},
	}
</script>

<style>
	@import "../../common/newicon.css";

	.iconfont {
		font-size: 40px;
		padding-right: 10px;
		color: #2782D7;
	}

	.userinfo-two {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.userinfo-two-right {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.userinfo-avatar {
		width: 200px;
		height: 200px;
		border: 0 solid #ff0000;
		border-radius: 100px;
		margin-left: 30px;
	}

	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0);
	}


	.label-view {
		width: 600px;
	}
</style>

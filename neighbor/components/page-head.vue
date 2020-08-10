<template name="page-head">
	<view class="page-body top">

		<view class="page-section">

			<view class="main-swiper">
				<swiper style="height: 400px;" :indicator-dots="true" :autoplay="true" :circular="true">
					<swiper-item v-for="(value,key) in swiperList" :key="value.id" @tap="swiperDetail(value)" style="height: 400px;" v-if="swiperList.length > 0">
						<image mode="widthFix" class="main-swiper-img" :src="imageUrl + 'swiper/' + value.image" />
					</swiper-item>
				</swiper>
			</view>
			<swiper class="notice-swiper" autoplay="true" circular="false" interval="8000" duration="5000">
				<swiper-item class="notice-swiper-item" v-for="(value,key) in noticeList" :key="value.id" @tap="showNotice(value)">
					<text class="notice-swiper-text"><text class="iconfont" style="font-size: 28px; color: #00B26A;">&#xe641;</text>{{' [' + noticeType[value.type] + ']:' + value.title}}</text>
				</swiper-item>

			</swiper>
			
			<view class="nine-part-row">
				<view class="nine-part-item nine-part-color1" @tap="opendoor">
					<view style="font-family: 'iconfont';font-size: 65upx;position: absolute;top:-10upx; left:82upx;">&#xe6f6;</view>
					<view  class="nine-part-text">访客通道</view>
				</view>
				<view class="nine-part-item nine-part-color2" @tap="goIntroduction">
					<view style="font-family: 'iconfont';font-size: 40upx;position: absolute;top:10upx; left:82upx;"><image style="width: 68upx;height: 68upx;" src="../../static/logo.png"></image></view>
					<view  class="nine-part-text">走进聚龙</view>
				</view>
				<view class="nine-part-item nine-part-color1" @tap="goSociety">
					<view style="font-family: 'iconfont';font-size: 75upx;position: absolute;top:-18upx; left:82upx;">&#xe60a;</view>
					<view  class="nine-part-text">社区文化</view>
				</view>
			</view>
			<view class="nine-part-row">
				<view class="nine-part-item nine-part-color2">
					<view style="font-family: 'iconfont';font-size: 65upx;position: absolute;top:-10upx; left:82upx;">&#xee16;</view>
					<view  class="nine-part-text">泊车付费</view>
				</view>
				<view class="nine-part-item nine-part-color1" @tap="opendoor">
					<view style="font-family: 'iconfont';font-size: 65upx;position: absolute;top:-10upx; left:82upx;">&#xe69f;</view>
					<view  class="nine-part-text">门禁刷卡</view>
				</view>
				<view class="nine-part-item nine-part-color2" @tap="goLiveMall">
					<view style="font-family: 'iconfont';font-size: 65upx;position: absolute;top:-10upx; left:82upx;">&#xe669;</view>
					<view  class="nine-part-text">贴心管家</view>
				</view>
			</view>
			<view class="nine-part-row">
				<view class="nine-part-item nine-part-color1" @tap="goCarsharing">
					<view style="font-family: 'iconfont';font-size: 80upx;position: absolute;top:-18upx; left:80upx;">&#xe608;</view>
					<view class="nine-part-text">顺风出行</view>
				</view>
				<view class="nine-part-item nine-part-color2">
					<view style="font-family: 'iconfont';font-size: 68upx;position: absolute;top:-10upx; left:82upx;">&#xe64d;</view>
					<view class="nine-part-text">酒店商务</view>
				</view>
				<view class="nine-part-item nine-part-color1" @tap="goLoveInHere">
					<view style="font-family: 'iconfont';font-size: 56upx;position: absolute;top:-6upx; left:82upx;">&#xe60e;</view>
					<view class="nine-part-text">爱在聚龙</view>
				</view>
			</view>
			<view class="member-line" v-if="userInfo.id != 0" @tap="goRank">
				<text class="member-title">小区成员\n（{{neighbors.count}}）</text>
				<view class="member-avatar">
					<view class="member-item" v-for="(value,key) in neighbors.data" :key="value.id" v-if="key < 5">
						<image  class="member-image"  :src="value.avatarUrl"></image>
					</view>
				</view>
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
		name: "page-head",
		props: ['first', 'isShare', 'firstTypeIndex'],
		data() {
			return {
				noticeType: ['物业公告', '街道办通知'],
				addText: ['发布吃', '发布用', '发布玩', '发布帮'],
				province: 0,
				city: 0,
				community: 0,
				area: 0,
				provinceData: [],
				provinceArray: ['请选择'],
				cityData: [],
				cityArray: ['请选择'],
				areaData: [],
				areaArray: ['请选择'],
				communityData: [],
				communityArray: ['请选择'],
				noticeList: [],
				neighbors: [],
				swiperList: []
			}
		},
		computed: mapState(['requestUrl', 'userInfo', 'imageUrl']),
		onLoad() {
			if (this.userInfo.id != 0)
			{
				uni.request({
					url: this.requestUrl + 'user/findCountAndNeighbors',
					method: 'GET',
					data: {
						openId: this.userInfo.openId
					}, 
					success: (res) => {
						//console.log(res);
						this.neighbors = res.data.data; 
						//console.log(JSON.stringify(this.newsitems));
					}
				});
			}
			uni.request({
				url: this.requestUrl + 'business/listNotices',
				method: 'GET',
				success: (res) => {
					//console.log(res);
					this.noticeList = res.data.data;
				}
			});
			uni.request({
				url: this.requestUrl + 'business/listSwiper',
				method: 'GET',
				success: (res) => {
					//console.log(res);
					this.swiperList = res.data.data;
				}
			});
			uni.request({
				url: this.requestUrl + 'business/getPlaceEditDataByCommunityId',
				method: 'GET',
				data: {
					id: this.userInfo.communityId
				},
				success: (res1) => {
					let placeData = res1.data.data;
					this.provinceData = placeData.provinceData;
					this.province = placeData.province;
					this.provinceArray = ['请选择'];
					for (let p of this.provinceData) {
						this.provinceArray.push(p.province);
					}
					this.cityData = placeData.cityData;
					this.city = placeData.city;
					this.cityArray = ['请选择'];
					for (let p of this.cityData) {
						this.cityArray.push(p.city);
					}
					this.areaData = placeData.areaData;
					this.area = placeData.area;
					this.areaArray = ['请选择'];
					for (let p of this.areaData) {
						this.areaArray.push(p.area);
					}
					this.communityData = placeData.communityData;
					this.community = placeData.community;
					this.communityArray = ['请选择'];
					for (let p of this.communityData) {
						this.communityArray.push(p.name);
					}
				}
			});
		},
		methods: {
			...mapMutations(['setUserInfo']),
			opendoor()
			{
				uni.navigateTo({
					url: '../opendoor/opendoor',
				});
			},
			goNeighborCenter()
			{
				uni.navigateTo({
					url: '../neighborcenter/neighborcenter',
				});
			},
			goCarsharing()
			{
				uni.navigateTo({
					url: '../carsharing/carsharing?fromShare=true',
				});
			},
			goSociety()
			{
				uni.navigateTo({
					//url: '../society/society',
					url: '../goodlife/goodlife',
				});
			},
			goLiveMall()
			{
				uni.navigateTo({
					//url: '../lifemall/lifemall',
					url: '../housekeep/housekeep',
				});
			},
			goRank()
			{
				uni.switchTab({
					url: '/pages/rank/rank',
				});
			},
			goIntroduction()
			{
				uni.navigateTo({
					url: '/pages/introduction/introduction',
				});
			},
			goLoveInHere()
			{
				uni.navigateTo({
					url: '/pages/loveinhere/loveinhere',
				});
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
				if (e.target.value == 0 || e.target.value == this.community)
					return;
				this.community = e.target.value;
				this.userInfo.communityId = this.communityData[this.community - 1].id;
				this.setUserInfo(this.userInfo);
				var pages = getCurrentPages();
				var url = pages[pages.length - 1].route
				url = url.replace("pages", "..");
				uni.reLaunch({
					url: url
				});
			},
			goCenter() {
				//console.log(this.userInfo);
				if (this.userInfo.id == 0) {
					uni.navigateTo({
						url: '../userinfo/userinfo?state=0&isEdit=false',
					});
					return;
				}
				uni.navigateTo({
					url: '../center/center'
				});
			},
			swiperDetail(value) {
				uni.navigateTo({
					url: '../swiperdetail/swiperdetail?title=' + value.title + "&info=" + value.info + "&image=" + value.image + "&author=" + value.author + "&createDate=" + value.createDate
				});
			},
			showNotice(value) {
				uni.navigateTo({
					url: '../noticedetail/noticedetail?title=' + value.title + "&info=" + value.info
				});
			},			
		}
	}
</script>

<style>
	@import "../common/uni.css";

	.top {
		width: 750upx;
		justify-content: center;
		flex-direction: column;
	}
	/*公共头*/
	.alltoprow {
		flex: 1;
		width: 750upx;
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		justify-content: center;
		padding-bottom: 10upx;
	}

	.alltop {
		padding: 0 0 0 0;
	}

	.alltop-avatar {
		width: 60upx;
		height: 60upx;
		border: 0 solid #ff0000;
		border-radius: 30upx;
		margin-left: 10upx;
	}


	.alltop-middle {
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}

	.alltop-btn {
		font-size: 24upx;
		width: 120upx;
		height: 50upx;
		display: flex;
		text-align: center;
		border: 2upx solid #ffffff;
		border-radius: 10upx;
		background-color: #70ac79;
		justify-content: center;
		line-height: 50upx;
		flex-direction: row;
		color: #ffffff;
		margin-left: 10upx;
	}

	.alltop-btn3 {
		margin-left: 10upx;
		font-size: 24upx;
		width: 220upx;
		height: 50upx;
		display: flex;
		text-align: center;
		border: 2upx solid #ffffff;
		border-radius: 10upx;
		background-color: #70ac79;
		justify-content: center;
		line-height: 50upx;
		flex-direction: row;
		color: #ffffff;
	}


	.alltop-logo {
		width: 80upx;
		height: 80upx;
		border: 0 solid #ff0000;
		border-radius: 40upx;
		padding-left: 10upx;
	}

	.notice-swiper {
		flex: 1;
		width: 100%;
		height: 50upx;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		margin-bottom: 10upx;
	}

	.notice-swiper-item {
		display: flex;
		align-items: center;
		height: 50upx;
	}

	.notice-swiper-text {
		margin-left: 2%;
		width: 96%;
		height: 50upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		color: #70ac79;

	}

	/*
	.main-swiper {
		flex: 1;
		width: 100%;
		height: 400upx;
		display: flex;
		flex-direction: column;
	}
	
	.main-swiper-item {
		display: flex;
		align-items: center;
	}
	
	.main-swiper-img {
		width: 100%;
		height: 400upx;
	
	} */

	.main-swiper {
		width: 100%;
		margin-bottom: 10upx;
		background-color: #ffffff;
		height: 400upx;
	}

	.main-swiper-img {
		width: 100%;
		height: 400upx;
	}


	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 32.7%;
		height: 150upx;
		line-height: 150upx;
		text-align: center;
		font-size: 36upx;
		align-items: center;
		border: 2upx solid #777777;
	}

	.service {
		flex: 1;
		width: 90%;
		height: 270upx;
		display: flex;
		border-radius: 80upx;
		/* background-color: #ffffff; */
		margin: 2%;
		padding: 20upx;
		flex-direction: column;
	}

	.service-line {
		flex: 1;
		display: flex;
		flex-direction: row;
	}

	.service-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 18%;
		text-align: center;
		align-items: center;
	}

	.service-icon {
		width: 90upx;
		height: 90upx;
	}

	.service-text {
		font-size: 25upx;
		text-align: center;
		color: #888888;
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
		width: 80%;
		border-radius: 10upx;
		top: 100upx;
		right: 0;
		left: 0;
		margin: auto;
	}

	.desc {
		display: flex;
		flex: 1;
		flex-direction: column;
		font-size: 30upx;
		margin: 30upx;
		text-align: center;
		justify-content: center;
	}

	.desc-left {
		text-align: left;
		color: #888888;
		padding: 10upx;
		font-size: 24upx;

	}

	.inline-item {
		display: flex;
		flex-direction: row;
	}

	.info-title {
		font-weight: bold;
		font-size: 30upx;
		padding-left: 45upx;
		padding-top: 20upx;
		width: 500upx;
	}


	.part-line {
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
	}

	.part-image {
		width: 44%;
		margin-left:4%;
		margin-top:30upx;
	}
	
	.member-line {
		display: flex;
		flex-direction: row;
		margin-bottom: 10upx;
		
	}
	
	.member-title{
		background-color: #ffffff;
		width: 30%;
		margin-right: 1%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10upx;
	}
	
	.member-avatar {
		background-color: #ffffff;
		width: 69%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx;
		
	}
	
	.member-item {
		display: flex;
		align-items: center;
		margin-left: 15upx;
	}
	
	.member-image {
		width: 80upx;
		height: 80upx;
		border: 0 solid #ff0000;
		border-radius: 40upx;
		
	}
	
	.mid-icon {
		position: absolute;
		z-index: 997;
		top: 600upx;
		left:300upx;
	}
	
	.nine-part-row {
		width: 750upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 8upx;
	}
	
	.nine-part-item {
		height: 130upx;
		position: relative;
		border-radius: 10upx;
		width: 31.5%;
		text-align: center;
		flex-direction: column;
	}
	
	.nine-part-color1 {
		background-color: #A0CC99;
		color: #fff;
	}
	
	.nine-part-color2 {
		background-color: #fff;
		color: #A0CC99;
	}
	
	.nine-part-text {
		font-weight: bold;
		font-size: 28supx;
		position: absolute;
		bottom: 5upx;
		left:60upx;
	}
	
	
</style>

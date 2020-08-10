<template>
	<view class="page-body" v-if="uiUrl">
		<view class="banner">
		<image mode="widthFix" style="width: 100%;" :src="uiUrl + 'life/lifemall.jpg'" />
		</view>
		
		<view class="list" v-if="listData.length > 0" style="padding-bottom: 80upx;">
		<view class="life-row" v-for="(data,index1) in listData" :key="data.id" v-if="index1 > 1">
			<view class="life-pic">
				<image class="life-pic-image" :src="uiUrl + 'life/' + index1 + '.png'" />
			</view>
			<view class="life-info">
				<text class="life-title">{{data.title}}</text>
				<text>营业时间：{{data.time}}</text>
				<text>地址：{{data.address}}</text>
				<text>联系电话：{{data.phone}}</text>
			</view>
			<view class="life-right">
				<image class="life-call" :src="uiUrl + 'life/call.png'"  @tap="callphone(data.phone)"/>
			
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
		computed: mapState(['requestUrl', 'imageUrl', 'userInfo', 'uiUrl']),
		data() {
			return {
				listData: [{"title":"物业报修", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"13514010723"},
				 {"title":"家政服务", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"13799576149"},
				 {"title":"凯莱酒店", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"87316708"},
				 {"title":"聚龙温泉", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"27378888"},
				 {"title":"聚龙医院", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"27596120"},
				 {"title":"外国语学校", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"27686666"},
				 {"title":"良品派送", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"87317589"},
				 {"title":"亲子乐园", "time":"9:00 - 16:00", "address":"聚龙小镇", "phone":"87316379"}],
			};
		},
		methods: {
			
			callphone(num){
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			
		}
	}
</script>

<style>

	.banner {
		display: flex;
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
	}
	
	.life-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		margin-top: 10upx;
		
	}
	.life-title {
		font-size: 30upx;
		font-weight: bold;
	}
	
	.life-pic {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 29%;
		height: 240upx;
		background-color: #ffffff;
	}
	
	.life-pic-image {
		width: 180px;
		height: 180px;
		border: 0 solid #ff0000;
		border-radius: 10px;
	}
	
	.life-call {
		width: 100px;
		height: 100px;
		justify-content:center;
		align-items: center;
	}
	
	.life-info {
		background-color: #ffffff;
		width: 48%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding-left: 15upx;
		height: 240upx;
		color: #898989;
	}
	

	
	.life-right {
		height: 240upx;
		background-color: #ffffff;
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
</style>

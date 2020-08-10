<template>
	<view class="page" v-if="imageUrl">
		<view class="title">
			<text>{{'聚龙小镇十二周年'}}</text>
		</view>
		<view class="sharer">
			<view class="user">
				<text class="user-name">{{'聚龙小镇'}}</text>
			</view>
			<view class="user-time">{{'2018-12-20 14:00:00'}}</view>
		</view>
		<view class="info">
				<image class="info-images" mode="widthFix" :src="imageUrl + 'swiper/3.jpg'"/>
			
			<view class="info-text">
				1200多平方米聚龙信用良品店新馆全新启幕\n
300余桌，百家欢聚，共享天南地北家乡菜\n
12位聚龙业主匠心之作，邻里艺术展精彩来袭\n
“好厝边，来逗阵”十二周年邻里系列活动\n
汇聚浓浓邻里情\n
 ……\n

十二年\n
邻里一家亲\n
3月30日至3月31日\n
聚龙小镇创建十二周年庆典\n
诚邀您莅临，举杯同庆，共享美好\n
			</view>
			
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
				shareInfo: null,
				
			};
		},
		computed: mapState(['requestUrl', 'imageUrl']),
		onLoad(e) {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	.page {
		background: #ffffff;
		width: 750px;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 40px;
		margin: 30px;
	}

	.sharer {
		display: flex;
		color: #8F8F94;
		flex-direction: row;
		border-bottom: 2px solid #BEBEBE;
		text-align: center;
		justify-content: space-between ;
		padding: 0 20px 0 20px;
	}

	

	.user-name {
		line-height: 60px;
	}

	.user-time {
		justify-content: flex-end;
		line-height: 60px;
	}

	.info {
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		width: 90%;
		padding: 5%;
	}

	.info-text {
		text-indent: 2em;
		text-align: left;
		color: #777777;
	}

	.info-images {
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 30px;
	}
</style>

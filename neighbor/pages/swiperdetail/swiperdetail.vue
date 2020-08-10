<template>
	<view class="page" v-if="swiperInfo != null">
		<view class="title">
			<text>{{swiperInfo.title}}</text>
		</view>
		<view class="sharer">
			<view class="user">
				<text class="user-name">{{swiperInfo.author}}</text>
			</view>
			<view class="user-time">{{swiperInfo.createDate}}</view>
		</view>
		<view class="info">
				<image class="info-images" mode="widthFix" :src="imageUrl + '/swiper/' + swiperInfo.image" />
			
			<view class="info-text">
				{{swiperInfo.info}}
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
				swiperInfo: null,
				
			};
		},
		computed: mapState(['requestUrl', 'imageUrl']),
		onLoad(e) {
			//console.log(e)
			e.createDate = this.formatDate(parseInt(e.createDate));
			this.swiperInfo = e;
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

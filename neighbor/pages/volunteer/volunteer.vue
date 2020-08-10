<template>
	<view class="page" v-if="uiUrl">
		<view class="list-row">
		<view class="list-item" v-for="(data,index) in list" :key="data.id">
			<image mode="widthFix" style="width: 100%;" :src="uiUrl + 'volunteer/' + index + '.jpg'" @tap="toDetail(index)"/>
			<text style="background-color: #70ac79;color: #ffffff;width: 100%;">{{textList[index]}}</text>
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
				list: [0,1,2,3,4,5,6, 7],
				textList: ['老兵服务队', '爱心义工社', '环保宣导队', '文明督导队', '顺风车队', '健康服务队', '红领巾队', '其它']
			};
		},
		methods:{
			toDetail(i)
			{
				if (i > 4)
					return;
				uni.navigateTo({
					url: '../volunteerdetail/volunteerdetail?num=' + i
				});
			}
		}
	}
</script>

<style>

.page {
		background: #ffffff;
		width: 750px;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
	}
	
	.list-row {
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
	}
	
	.list-item {
		margin:20upx 10upx;
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	


</style>

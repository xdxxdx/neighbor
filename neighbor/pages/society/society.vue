<template>
	<view class="page" v-if="uiUrl">
		<view class="list-row">
		<block class="list-row" v-for="(data,index) in list" :key="data.id" v-if="index != 4 && index != 9 && index != 10 && index != 11">
			<image class="list-item" mode="widthFix" :style="(index == 12) ? 'width:94%' : ''" :src="uiUrl + 'society/' + index + '.jpg'" @tap="toDetail(index)"/>
		</block>
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
				list: [0,1,2,3,4,5,6,7,8,9,10,11,12],
			};
		},
		methods:{
			toDetail(i)
			{
				uni.navigateTo({
					url: '../societydetail/societydetail?num=' + i
				});
			}
		}
	}
</script>

<style>

	.list-row {
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	
	.list-item {
		margin: 10upx;
		width: 46%;
		border-radius: 10upx;
		display: flex;
	}

</style>

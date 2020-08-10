<template>
	<view>
		<tab-Product :tabBars="tabBars" :firstType="0" :enableY="enableY"></tab-Product>
	</view>
</template>
<script>
	import pageHead from '@/components/page-head.vue'
	import tabProduct from '@/components/tab-product.vue'
	import {
		mapState,
	} from 'vuex'
	export default {
		components: {
			tabProduct,
			pageHead
		},
		data() {
			return {
				tabBars: [{
						name: '全部',
						id: 'all'
					},
					{
						name: '自制美食',
						id: 'meishi'
					},
					{
						name: '家乡特色',
						id: 'techan'
					},
					{
						name: '休闲零食',
						id: 'linshi'
					}
				],
				enableY : true,
			}
		},
		onShareAppMessage(res) {
			return {
				title: '聚龙小镇',
				path: '/pages/entry/oauth',
				imageUrl: 'https://wx.icrat.cn/resources/neighbor/title2.jpg'
			}
		},
		methods:{
			lower ()
			{
				this.enableY = true;
			},
			upper()
			{
				this.enableY = false;
			}
		}
	}
</script>

<style>
</style>
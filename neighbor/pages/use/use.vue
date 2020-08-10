<template>
	<view>
		<tab-Product :tabBars="tabBars" :firstType="1" :enableY="enableY"></tab-Product>
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
						name: '母婴用品',
						id: 'xianzhi'
					},
					{
						name: '闲置二手',
						id: 'zhulin'
					},
					{
						name: '物品租赁',
						id: 'zhulin'
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

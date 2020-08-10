<template>
	<scroll-view class="index" scroll-y @scrolltolower="lower" @scrolltoupper="upper">
		<view>
		<page-Head :firstTypeIndex="3"></page-Head>
		</view>
		<tab-Product :tabBars="tabBars" :firstType="3"></tab-Product>
	</scroll-view>
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
						name: '资讯分享',
						id: 'zhixun'
					},
					{
						name: '生活互助',
						id: 'shenghuo'
					},
					{
						name: '小区公益',
						id: 'gongyi'
					}
				],
				enableY : false,
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

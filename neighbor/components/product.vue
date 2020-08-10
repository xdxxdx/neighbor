<template>
	<view class="product" @tap="toDetail">
		<image class="product-image" :src="image ? imageUrl + image : 'https://via.placeholder.com/150x200'"></image>
		<view class="product-info">
			<view class="product-title" style="font-weight:bold">{{title}}</view>
			<view class="product-title">数量：{{num}}</view>
			<view class="product-title">{{price == 0 ? '免费分享' : '单价：' + price + '💗'}}</view>
			<view>
				<image class="avatar" :src="ownerPic" />
				</image>
				<text>{{ownerName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	
	export default {
		name: 'product',
		props: ['id', 'image', 'title', 'num', 'price', 'ownerPic', 'ownerName'],
		computed: mapState(['imageUrl']),
		methods: {
			toDetail() {
				uni.navigateTo({
					url: '../detail/detail?id=' + this.id
				});
			}
		}
	}
</script>

<style>
	.product {
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
	}

	.product-image {
		height: 330px;
		width: 330px;
	}

	.product-info {
		background-color: #FFFFFF;
		border-top: 2px solid #D8D8D8;
		padding: 10px;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 40px;
	}

	.product-title {
		width: 300px;
		text-align: left;
		font-size: 32px;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.product-price {
		font-size: 28px;
		position: relative;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border: 0 solid #ff0000;
		border-radius: 40px;
	}
</style>

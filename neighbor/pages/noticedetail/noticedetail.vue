<template>
	<view class="page" v-if="title">
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view class="info">
			<view class="info-text">
				<text>{{info}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title : '',
				info: '',
				
			};
		},
		onLoad(e) {
			this.title = e.title;
			this.info = e.info;
		}
	}
</script>

<style>

	.page {
		width: 750px;
		background: #ffffff;
	
		flex-direction: column;
		text-align: center;
		justify-content: center;
	}
	
	.title {
		font-size: 36px;
		margin: 50px;
	}
	
	
	

	
	.info {
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding-top: 20px ;
	}
	
	.info-text {
		text-align: left;
		color: #888888;
		padding-top: 10px;
		padding-bottom: 60px;
		padding-left: 50px;
		padding-right: 50px;
	}
	
	
</style>

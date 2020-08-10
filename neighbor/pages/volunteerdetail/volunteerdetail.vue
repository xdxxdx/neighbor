<template>
	<view class="page" v-if="uiUrl" style="background-color: #ffffff;">
		<view class="banner">
		<image class="banner-image" mode="widthFix" :src="uiUrl + 'volunteer/' + num + '.jpg'" />
		</view>
		<view class="info">
		<text class="info-text">{{info[num]}}</text>
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
				num: 0,
				info: [
					'2016年3月31日，定居小镇的退伍军人们发起组建了一支“老兵服务队”，他们建立正式的值班制度，热心参与小镇安保服务工作，发扬部队优良传统。每周组织园区安全巡查，定期开展安全知识分享、关爱退伍军人及弘扬军旅文化的传播活动，积极协助节假日活动的安保工作',
					
					'聚龙爱心义工社成立于2013年11月，由一群热心于公益事业的小镇业主组建是一个倡导爱与奉献的公益社团。从最初组织业主学习传统文化、各种爱心捐赠，到创办“爱心简餐”，为小镇业主及游客提供素食，弘扬素食文化，定期组织关爱老人等各项公益活动。',
					
					'2017年3月，由聚龙家人许当治女士发起并组建而成，他们每周都在小镇环保垃圾分类站开展“环保共修”分享会，他们参与到小镇的垃圾分类、禁用塑料袋等文明、环保活动，助力小镇环保工作的推行。',
					
					'2013年，聚龙爱心志愿者从“我爱我家”的主题活动开始，每周自发组织园区巡查、捡垃圾等环保行动。后于2015年1月26日正式成立督导团，将“我爱我家”的理念进一步扩大影响。他们旨在践行人文精神，督导大家做文明人，对园区所有不文明行为进行劝导，让文明成为一种习惯。在小镇各类活动中，文明督导团的志愿者们也会踊跃参加并协助工作。',
					
					'这是一个由聚龙爱心车主发起的，旨在方便邻里出行的公益互助平台。每天的顺风车有四五百个车次，所有加入爱心顺风车的车主都会在前挡风玻璃前放置一块统一的标示牌，以方便需要搭车的人拦车询问。爱心顺风车主要通过两个平台，第一，通过手机端建立起专用社交微信群，小镇家人可在微信群里提前预约，发布与搭乘相关的信息。第二，目前在园区内设有3个互助停靠点——吻峰台、聚龙外国语学校、邻里中心，小镇家人或游客可在站点搭、载，为小镇家人提供方便和服务。',
				],
			};
		},
		onLoad(e) {
			this.num = e.num;
		}
	}
</script>

<style>
	.banner {
		width: 750upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.banner-image {
		width:100%;
	}
	
	.info {
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding-top: 20px;
		
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

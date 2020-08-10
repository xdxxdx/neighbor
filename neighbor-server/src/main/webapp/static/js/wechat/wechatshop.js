var count = 1;
mui.init({
	pullRefresh: {
		container: '#merchant_commodity',
		up: {
			auto:true,
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
mui('.mui-scroll-wrapper-y').scroll({
	indicators: false,
});
var gallery = mui('#scroll_banner');
gallery.slider({
	interval: 5000
});

mui('#scroll_banner_area').on('tap','.mui-slider-item',function(){
	location.href='/wechatRealCommodityDetail?realCommodityId=' + $(this).attr('cid');
})

mui('body').on('tap','.customized_info',function(){
	location.href='/wechatRealCommodityDetail?realCommodityId=' + $(this).attr('cid');
});
mui('.mui-scroll-wrapper-x').scroll({
	scrollX: true,
	indicators: false, //是否显示滚动条
});

mui('body').on('tap','.ahref',function(){
	location.href = $(this).attr('href');
});

mui('body').on('tap','.merchant_coupon_item',function(){
	if($(this).hasClass('coupon_received_class')){
		mui.alert('您已经取得过这张优惠券了','提示');
	}else{
		var couponid = $(this).attr('couponid');
		$.ajax({
			type : 'get',
			url : '/receiveCoupon?couponId=' + couponid,
			dataType : 'html',
			success : function(date) {
				if(date == 1){
					mui.alert('恭喜你获得一张购物券','恭喜你');
				}else{
					mui.alert('您已经取得过这张优惠券了','提示');
				}
				$(this).addClass('coupon_received_class');
			},
			error : function(){
				mui.alert('系统繁忙出错了，请稍后重试','对不起');
			}
		})
	}
});

mui('body').on('tap','.merchant_head_followBtn',function(){
	$.ajax({
		type : 'get',
		url : '/merchantCollect?merchantCollect.merchantId=' + $('body').attr('mid'),
		dataType : 'html',
		success : function(json) {
			$('#merchant_head_followBtn').removeClass('merchant_head_followBtn').addClass('merchant_head_followCancel');
			$('#merchant_head_followBtn').html('').append('已关注');
			$('.merchant_head_fansNum em').text(parseInt($('.merchant_head_fansNum em').text()) + 1);
		}
	})
});

mui('body').on('tap','.merchant_head_followCancel',function(){
	$.ajax({
		type : 'get',
		url : '/merchantCollectCancel?merchantCollect.merchantId=' + $('body').attr('mid'),
		dataType : 'html',
		success : function(json) {
			$('#merchant_head_followBtn').removeClass('merchant_head_followCancel').addClass('merchant_head_followBtn');
			$('#merchant_head_followBtn').html('').append('<i class="iconfont">&#xe651;</i>关注');
			$('.merchant_head_fansNum em').text(parseInt($('.merchant_head_fansNum em').text()) - 1);
		}
	})
});

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

$.ajax({
	type : 'get',
	url : '/usableCoupon?merchantId=' + $('body').attr('mid'),
	dataType : 'json',
	success : function(json) {
		if(json.couponList.length > 0){
			var scrollHtml = '<div id="merchant_coupon" class="mui-scroll-wrapper mui-scroll-wrapper-x"><div class="mui-scroll" style="width: calc(157px * ' + json.couponList.length;
			scrollHtml += ');">';
			for(var i in json.couponList){
				scrollHtml += '<div class="merchant_coupon_item ' + (json.couponList[i].isReceive == 1 ? 'coupon_received_class' : '');//如需颜色去掉_class
				scrollHtml += '" couponid="' + json.couponList[i].couponId;
				scrollHtml += '"><img src="/' + json.couponList[i].pictrue;
				scrollHtml += '"></div>';
			}
			scrollHtml += '</div></div>';
			$('.merchant_coupon_area').append(scrollHtml);
			$('.merchant_coupon_area').show();
			mui('.mui-scroll-wrapper-x').scroll({
				scrollX: true,
				indicators: false, //是否显示滚动条
			});
		}
	}
})

mui('body').on('tap','.merchant_class_title',function(){
	location.href = '/wxShopColumnCommodity?merchantId=' + $('body').attr('mid') + '&merchantClassId=' + $(this).attr('cid');
});

function pullupRefresh(){
	$.ajax({
		type : 'get',
		url : '/wechatCommodityList?merchantId=' + $('body').attr('mid') + '&page=' + count,
		dataType : 'json',
		success : function(json) {
			count = count + 1;
			for(var i in json.commodityList){
				var commodityItem = json.commodityList[i];
				var commodityHtml = '<div class="customized_goods"><div class="customized_info" cid="' + commodityItem.realCommodityId;
				commodityHtml += '"><div class="customized_goods_adiv"><img src="/WechatImages/Q200dimg.jpg"><img class="real_customized_img" src="/' + commodityItem.columnPicture.replace('.','L.');
				commodityHtml += '"></div><p class="customized_name"><i class="red_level">热销</i>' + commodityItem.realCommodityName;
				commodityHtml += '</p><div class="customized_num"><a class="customized_price"><i>￥</i>' + commodityItem.promotionPrice;
				commodityHtml += '</a><a class="customized_buyer">' + (commodityItem.saleVolume + commodityItem.increment);
				commodityHtml += '人付款</a></div></div></div>';
				$('#merchant_all_commodity').append(commodityHtml);
			}
			mui('#merchant_commodity').scroll().refresh();
			mui('#merchant_commodity').pullRefresh().endPullupToRefresh((json.commodityList.length != 10));
		}
	})
}
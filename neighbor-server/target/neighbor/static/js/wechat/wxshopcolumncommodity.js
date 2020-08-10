mui.init({
	pullRefresh: {
		container: '#merchant_class_commodity',
		up: {
			contentrefresh: '正在加载商品 ',
			contentnomore:'没有更多商品了',
			auto:true,
			callback: pullupRefresh
		}
	}
})
count = 1;
pagesize = 10;

function pullupRefresh(){
	$.ajax({
		type : 'get',
		url : '/shopColumnCommodityAjax?merchantId=' + $('body').attr('mid') + '&merchantClassId=' + $('body').attr('cid') + '&page=' + count,
		dataType : 'json',
		success : function(json) {
			count = count + 1;
			
			var $body = $('body');    
			document.title = json.merchantClassName;    
			var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function(){setTimeout(function(){$iframe.off('load').remove()},0)}).appendTo($body);

			for(var i in json.shopCommodityList){
				var commodityItem = json.shopCommodityList[i];
				var commodityHtml = '<div class="customized_goods"><div class="customized_info" cid="' + commodityItem.realCommodityId;
				commodityHtml += '"><div class="customized_goods_adiv"><img src="/WechatImages/Q200dimg.jpg"><img class="real_customized_img" src="//www.wonyen.com/' + commodityItem.columnPicture;
				commodityHtml += '"></div><p class="customized_name"><i class="red_level">热销</i>' + commodityItem.realCommodityName;
				commodityHtml += '</p><div class="customized_num"><a class="customized_price"><i>￥</i>' + commodityItem.promotionPrice;
				commodityHtml += '</a><a class="customized_buyer">' + (commodityItem.saleVolume + commodityItem.increment);
				commodityHtml += '人付款</a></div></div></div>';
				console.log(commodityHtml);
				$('#merchant_class_all_commodity').append(commodityHtml);
			}
			mui('#merchant_class_commodity').scroll().refresh();
			mui('#merchant_class_commodity').pullRefresh().endPullupToRefresh((json.shopCommodityList.length != 10));
		}
	})
}

mui('body').on('tap','.customized_info',function(){
	location.href='/wechatRealCommodityDetail?realCommodityId=' + $(this).attr('cid');
});

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
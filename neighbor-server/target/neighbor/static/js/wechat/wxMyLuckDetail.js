var page = 1;
var luckType = {};
luckType.urlList =[{title:'逸品亲子绘本生活馆单次体验卡',url : '/wxMyReadCardList'},{title:'逸品生活200积分（2元抵用券）',url : '/wxYipinIndex'},{title:'5元素氏养生堂优惠券',url : '/wechatShop?merchantId=1'},{title:'10元素氏养生堂优惠券',url : '/wechatShop?merchantId=1'}]
mui.init({
  pullRefresh : {
    container:'#pullrefresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : '正在加载...',//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});

mui('body').on('tap','.luck-item',function(){
	var orderStr = $(this).data('orderId') + ',';
	var orderTitle = $(this).data('luckDrawName');
	if(!returnUrl(orderTitle)){
		var orderArray = orderStr.split(',');
		var orderIdArray = [];
		for(var oi in orderArray){
			if(orderArray[oi] != ''){
				orderIdArray.push(orderArray[oi]);
			}
			if(/.*[\u4e00-\u9fa5]+.*$/.test(orderStr)){
				location.href = '/double12Lottery';
				}else{
					if(orderIdArray.length == 1){
					location.href = '/wechatRealOrderDetail?realOrderId=' + orderIdArray[0];
				}else{
					location.href = '/wechatMyRealOrder';
				}
			}
		}
	}else{
		location.href = returnUrl(orderTitle);
	};
	
	
})

function pullupRefresh(){
	$.ajax({
		type : 'get',
		 url : '/luckDetailAjax?page=' + page,
		 dataType : 'json',
		 success : function(json) {
		 	page = page + 1;
		 	for(var i in json.luckDetailList){
		 		var luckDetail = json.luckDetailList[i];
		 		var html = '<li class="mui-table-view-cell mui-media luck-item" data-order-id="' + luckDetail.realOrderId;
		 		html += '" data-luck-draw-name="' + luckDetail.luckPrizeName;
		 		html +='"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="/' + luckDetail.picSrc;
		 		html += '"><div class="mui-media-body" style="font-size:16px;">奖品：' + luckDetail.luckPrizeName;
		 		html += '<p class="mui-ellipsis-2">参与活动~ ' + luckDetail.luckDrawName;
		 		html += '</p><p class="mui-ellipsis"> 抽奖时间:' + luckDetail.createTime;
		 		html += '</p><p class="mui-ellipsis-2"> 订单号:' + luckDetail.realOrderId;
		 		html += '</p></div></a></li>';
		 		
		 		$('#pullrefresh ul.mui-table-view').append(html);
		 	}
		 	mui('#pullrefresh').pullRefresh().endPullupToRefresh(json.luckDetailList.length < 10);
		 	
		 }
	});
}

function returnUrl(t){
	for(var ui in luckType.urlList){
		var urlItem = luckType.urlList[ui];
		if(t == urlItem.title){
			return urlItem.url;
		}
	}
	
	return false;
}
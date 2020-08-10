mui.init()
$.ajax({
	type : 'get',
	url : '/merUnDeliverOrderListAjax',
	dataType : 'json',
	success : function(json) {
		if(json.orderList == ''){
			mui.alert('您的店铺今日没有订单哦~加油哦','抱歉!');
			return false;
		}
		for(var oi in json.orderList){
			var order = json.orderList[oi];
			var orderItemArr = order.subject.split('  ');
			var html = '<div class="mui-card"><div class="mui-card-header wechatMerHome_cardOrder">订单号:' + order.realOrderId;
			html += '<em>' + order.createTime;
			html += '</em></div>';
			for(var ii in orderItemArr){
				if(orderItemArr[ii] !=''){
					var orderItem = orderItemArr[ii];
					var intro = orderItemArr[ii].split('X');
					if(intro[1]){
						html += '<div class="mui-card-content wechatMerHome_cardContent mui-clearfix"><div class="mui-card-content-inner wechatMerHome_mediaIntro"><p style="color: #333;margin-bottom: 5px;" class="mui-ellipsis">' + intro[0];
						html += '<p class="wechatMerHome_price"><em>' + intro[1];
						html += '</em></p></div></div>';
					}
				}
			}
			html += '<div class="mui-card-footer wechatMerHome_footer"><a class="totalPrice">' + order.totalFee
			html +=	'</a></div></div>';
			$('#orderAppend').append(html);
		}
		mui('.mui-scroll-wrapper').scroll({
			indicators : false
		});

	}
});
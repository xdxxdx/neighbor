mui('body').on('tap', '#continuepay', function() {
	var _this = $(this)
	var oid = _this.data('orderId');
	$('.yipin-cashier-pay-btn').attr('orderId', oid)
	var total = 0;
	var deposit = 0;
	$.ajax({
		type : 'get',
		url : 'wxOrderDetailAjax?realOrderId=' + oid,
		dataType : 'json',
		success : function(json) {
			$('.yipin-cashier-pay-disable').hide();
			$('.yipin-cashier-pay-btn').show();
			total = json.totalFee;
			$('.yipin-cashier-pay-btn').attr('total', total)
			$('.yipin-cashier-price').text(total);
			$('#realCommodityName').text(json.realOrder.subject);
		}
	})
	mui('#ContinuePopover').popover('toggle');
	// location.href =
	// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID +
	// '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state='
	// + oid + '#wechat_redirect';
	return false;

});
mui('body').on('tap', '.yipin-cashier-cancel', function() {
			mui('#ContinuePopover').popover('toggle');
		})

mui('body').on('tap', '.yipin-cashier-pay-btn', function() {
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
				+ wx_AppID
				+ '&redirect_uri='
				+ rURL
				+ '&response_type=code&scope=snsapi_base&state='
				+ $(this).attr('orderId') + '#wechat_redirect';
})
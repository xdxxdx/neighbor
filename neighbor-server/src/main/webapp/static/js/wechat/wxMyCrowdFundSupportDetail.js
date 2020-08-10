mui.init();
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://www.wonyen.com/wechatPayCrowdFund';
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005
// flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
mui('.foot_nav_order').on('tap', '#checkLogistics', function() {
	mui('#logistics_popover').popover('toggle');
});
mui('#logistics_popover').on('tap', '#spec_close', function() {
	mui('#logistics_popover').popover('toggle');
});
mui('.foot_nav_order').on('tap', '#intomerchant', function() {
	var mid = $('body').attr('mid');
	window.location.href = '';
});
mui('.foot_nav_order').on('tap', '#checkreceipt', function() {
	var oid = $('body').attr('oid');
	var btnArray = ['取消', '确定'];
	mui.confirm('请确认宝贝是否收到', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/confirmReceipt?realOrderId=' + oid,
				dataType : "html",
				async : false,
				success : function(data) {
					data == 1 ? location.reload() : mui.alert('收货失败，请重试','逸品生活',function(){location.reload()});
				}
			})
		}
	});
	
});
mui('.foot_nav_order').on('tap', '#continuepay', function() {
	var oid = $('body').attr('oid');
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + oid + '#wechat_redirect';
});

mui('.foot_nav_order').on('tap', '#reminderdelivery', function() {
	var oid = $('body').attr('oid');
	$.ajax({
		type : 'get',
		url : '/remindDelivery?realOrderId=' + oid,
		dataType : "html",
		async : false,
		success : function(data) {
			mui.toast('已提醒卖家发货');
			$('#reminderdelivery').remove();
		}
	})
});

mui('.foot_nav_order').on('tap', '#cancelorder', function() {
	var oid = $('body').attr('oid');
	var btnArray = ['取消', '确定'];
	mui.confirm('确定要取消该订单么', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/realOrderCancel?realOrder.realOrderId=' + oid,
				dataType : "html",
				async : false,
				success : function(data) {
					data == 1 ? window.location.replace('/wechatMyRealOrder') : mui.alert('取消订单失败','逸品生活',function(){location.reload()});
				}
			})
		}
	})
});

mui('.foot_nav_order').on('tap', '#orderEvaluate', function() {
	var oid = $('body').attr('oid');
	location.href= '/wechatRealOrderEvaluate?realOrderId=' + oid;
});

mui('body').on('tap', '#ahref', function() {
	location.href= $(this).attr('href');
});





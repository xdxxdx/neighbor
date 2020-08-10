//var wx_AppID = 'wxc034ddcd6d10e418';
var wx_AppID = '';
var timeStamp = '';
var nonceStr = '';
var paySign = '';
var sign = '';
var packageValue = ''; // 这里用packageValue是预防package是关键字在js获取值出错
var signType = '';
var payJson = '';
var orderid = '';
mui.init();
$(function() {
	payJson = $('#json_area').html();
	payJson = JSON.parse(payJson);
	orderid = $('#state').text();//订单号
})

function onBridgeReady() {
	WeixinJSBridge.invoke('getBrandWCPayRequest', {
		'appId' : payJson.appId, // 公众号名称，由商户传入
		'timeStamp' : payJson.timeStamp, // 时间戳，自1970年以来的秒数
		'nonceStr' : payJson.nonceStr, // 随机串
		'package' : payJson.packageValue,
		'signType' : payJson.signType, // 微信签名方式：
		"paySign" : payJson.paySign
	// 微信签名
	}, function(res) {
		var center = '我的商城';
		var faildurl = 'wxMyMall';
		if (res.err_msg == 'get_brand_wcpay_request:ok') {
				mui.alert('支付成功，将跳转到个人中心页面');
				location.href = '/wxMyMall'; //正常的订单
		} else{
			mui.alert('支付失败，正在转跳' + center,'合智千安',function(){location.href = faildurl;});
		}
	});
}
if (typeof WeixinJSBridge == 'undefined') {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
} else {
	onBridgeReady();
}

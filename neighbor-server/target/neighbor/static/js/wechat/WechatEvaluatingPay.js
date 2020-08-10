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
var isEvaluating = '';
mui.init();
$(function() {
	payJson = $('#json_area').html();
	payJson = JSON.parse(payJson);
	orderid = $('#state').text();
	isEvaluating = $('#isEvaluating').text();
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
		var center = '测评';
		var faildurl = 'wxYipinIndex';
		
		if (res.err_msg == 'get_brand_wcpay_request:ok') {
			if(localStorage.orderJson){
				var orderStr = localStorage.orderJson;
				orderStr.split('&').forEach(function(param){
  					param = param.split('=');
  					var name = param[0],val = param[1];
  					$('#redirectForm').append('<input name="' + name + '" value="' + val + '"/>')
				})
				$('#redirectForm').attr('action',localStorage.referrerUrl);
				$('#redirectForm').submit();
			}else{		
				location.href = './evaluatingOrderPage'; //测评的订单

			}
		} else{
			mui.alert('支付失败，正在转跳' + center,'逸品生活',function(){location.href = faildurl;});
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

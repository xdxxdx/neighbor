const href = window.location.href;
mui.init();

mui('body').on('tap', '.ahref', function() {
	var href = $(this).attr('href');
	href == '' || href == undefined
			? mui.alert('敬请期待！', '逸品生活')
			: location.href = href;
});
mui('.mui-scroll-wrapper').scroll({
			deceleration : 0.0005,
			indicators : false
		});

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxc034ddcd6d10e418', // 必填，公众号的唯一标识
    timestamp: $('#timestamp').val(), // 必填，生成签名的时间戳
    nonceStr: $('#noncestr').val(), // 必填，生成签名的随机串
    signature: $('#signature').val(),// 必填，签名，见附录1
    jsApiList: ['chooseCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

$('body').on('tap','.card-code-popover-btn',function(){
	mui('#CardCodePopover').popover('toggle');
})

mui('body').on('tap','.open-card-coffee',function(){
	var cardJson = JSON.parse($('#cardJson').val());
	wx.chooseCard({
		shopId:'473104551',
		timestamp: cardJson.timestamp, // 卡券签名时间戳
		nonceStr: cardJson.noncestr, // 卡券签名随机串
		signType: 'SHA1', // 签名方式，默认'SHA1'
		cardSign: cardJson.cardSign, // 卡券签名
		success: function (res) {
			$('.wechat-wait-dialog span.wechat-wait-text').text('请稍候');
			$('.wechat-wait-dialog').show();
			$('.card-code-popover-qrcode').html('');
			var cardList= JSON.parse(res.cardList); // 用户选中的卡券列表信息
			$.ajax({
				type : 'get',
				url : '/wxCardCode?encryptCode=' + encodeURI(cardList[0].encrypt_code).replace(/\+/g,'%2B'),
				dataType : 'html',
				success : function(data) {
					$('.wechat-wait-dialog').hide();
					if(data != ''){
						mui('#CardCodePopover').popover('toggle');
						$('.card-code-popover-qrcode').qrcode({
							width:$('.card-code-popover-qrcode').width(),
							height:$('.card-code-popover-qrcode').height(),
							correctLevel:0,
							text:data
						});  
					}
				}
			})
		}
	});
})
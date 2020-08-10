mui.init();

$('.card-num-area').addClass('card-num-area-animate');

var storageCoffeeJson = localStorage.coffeeJson;
if(storageCoffeeJson != '[]' && storageCoffeeJson){
	$('.ahref[href="/wechatCoffeeList"]').append('<span class="mui-badge mui-badge-danger mymall_badge" style="top: 13px; margin-right: 0px; margin-left: auto;">'+JSON.parse(storageCoffeeJson).length+'</span>')
}

mui('body').on('tap','.ahref',function() {
	var href = $(this).attr('href');
	href == '' || href == undefined ? mui.alert('敬请期待！', '逸品生活') : location.href = href;
});
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005, 
	indicators : false
});

mui('body').on('tap','#showmyqr',function(){
	mui('#recommender_popover').popover('toggle');
})

mui('body').on('tap','#goodsOrigin',function(){
	wx.scanQRCode({
	    needResult: 1,
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    success: function (res) {
	    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	}
	});
});

mui('body').on('tap','.user_Name_uH,#CloserecommenderPopover',function(){
	if($('.user_Name_uH i').length > 0){
		mui('#recommender_popover').popover('toggle');
	}
	
})

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
mui('body').on('tap','.deposit-code',function() {
	var accountMode = $(this).data("accountMode");
	if(accountMode==2){
		location.href="/wxDepositCode";
	}else{
		var btnArray = ['否', '是'];
						mui.confirm('使用代金券必须先绑定手机号，去绑定？', '绑定手机号', btnArray, function(e) {
							if (e.index == 1) {
								window.location.href="/wechatGoBind";
							} else {
							}
						})
	}
});
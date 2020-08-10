var imgL = 0;
mui.init();
mui('#gusslikeScroll').scroll();
$('.real_customized_img').each(function(){
	imgL = imgL + 1;
	if(imgL < 21){
		var src = $(this).data('lazyload');
		$(this).removeAttr('data-lazyload');
		$(this).attr('src', src);
	}
	
})
mui('body').on('tap','.customized_info',function(){
	var cid = $(this).attr('cid');
	window.location.href = './wechatRealCommodityDetail?realCommodityId=' + cid;
	_czc.push(['_trackEvent','非标商品','查看商品详情',cid,$('body').attr('uid'),'1']);
	//cnzz 事件统计，点击事件，商品类型，动作事件，商品Id，用户id，无意义
});

mui('body').on('tap' , '.ahref',function(){
	location.href = $(this).attr('ahref');
});

mui(document).imageLazyload({
	placeholder: '/WechatImages/Q200dimg.jpg'
});

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

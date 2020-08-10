mui.init()
mui('body').on('tap','.ahref',function(){
	location.href = $(this).attr('href');
})

if ( $('body').data('draw') == 1) {
	var oid = $('body').data('realOrderId');
	var btnArray = ['不想去', '去抽奖'];
	mui.confirm('您已在商城购买了商品，有机会参加抽奖哦~', '感谢您', btnArray, function(e) {
				if (e.index == 1) {
					location.href = '/lotteryChance?realOrderId=' + (oid+'').replace(/Z/g, ',');
				}
			})
}
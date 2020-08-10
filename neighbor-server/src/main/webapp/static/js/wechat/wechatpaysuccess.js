var tUrl;
mui.init();
var oid = $('.pay_success_hdpic_bgpic').attr('oid');
var accountmode = $('body').attr('accountmode');
$(function() {
			
			if (oid.indexOf('c') > -1) {
				console.log(oid)
				tUrl = '/wechatMyCrowdFund';
			} else {
				if (oid.indexOf('Z') > -1) {
					var o_ary = oid.split('Z');
					var o_len = o_ary.length;
					o_len > 2
							? tUrl = '/wechatMyRealOrder'
							: tUrl = '/wechatRealOrderDetail?realOrderId='
									+ o_ary[0];

				} else {
					if (oid.indexOf('d') > -1) {
						tUrl = '/wechatMyMall';
					} else {
						tUrl = '/wechatRealOrderDetail?realOrderId=' + oid;
					}

				}
			}
		})

if (oid.indexOf('c') < 0 && oid.indexOf('d') < 0 && $('body').data('draw') == 1) {
	var btnArray = ['不想去', '去抽奖'];
	mui.confirm('您已在商城购买了商品，有机会参加抽奖哦~', '感谢您', btnArray, function(e) {
				if (e.index == 1) {
					location.href = '/lotteryChance?realOrderId=' + oid.replace(/Z/g, ',');
				}
			})
}

mui('body').on('tap', '.pay_success_hdpic_bgpic', function() {
	if(accountmode == 2){
		location.href = tUrl;
	}else{
		var btnArray = ['不要', '好的'];
		mui.confirm('您还未绑定帐号，是否前去绑定', '逸品生活', btnArray, function(e) {
			if (e.index == 1) {
				location.href = '/wechatGoBind';
			}else{
				location.href = tUrl;
			}
		})
	}
});

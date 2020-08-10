mui.init();
mui('#cerealsWrapper').scroll({
			indicators : false
		});
document.body.addEventListener('touchmove', function(e) {
			e.preventDefault();
		})

mui('body').on('tap', '.ahref', function() {
			location.href = $(this).attr('href');
		})
		
mui('body').on('tap','#getcoupon',function(){
	getUsableCoupon();
	mui('#getcoupon_popover').popover('toggle');
})



mui('body').on('tap','.getcoupon_over',function(){
	mui('#getcoupon_popover').popover('toggle');
})

mui('body').on('tap','.getcoupon_btn',function(){
	if($(this).parents('.mui-table-view-cell').hasClass('coupon_received')){
		var merchantid = $(this).parents('.mui-table-view-cell').attr('merchantid');
		location.href = '/wechatShop?merchantId=' + merchantid;
		return false;
	}
	var couponid = $(this).parents('.mui-table-view-cell').attr('couponid');
	$.ajax({
		type : 'get',
		url : '/receiveCoupon?couponId=' + couponid,
		dataType : 'html',
		success : function(data) {
			data == 1 ? mui.toast('领取成功') : mui.toast('您已领取优惠券');
			getUsableCoupon();
		},
		error : function(){
			mui.toast('领取失败');
		}
	})
});

function getUsableCoupon(){
	$.ajax({
		type : 'POST',
		url : '/wxUsableCoupon',
		datatype : 'data',
		success : function(data) {
			$('#getcoupon_scroll ul li').remove();
			var json = JSON.parse(data);
			for(var ci in json.couponList){
				var coupon = json.couponList[ci];
				var html = '<li class="mui-table-view-cell ' + (coupon.isReceive == 0 ? 'coupon_receiveing' : 'coupon_received');
				html += '" couponid="' + coupon.couponId;
				html += '" merchantId="' + coupon.merchantId;
				html += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-10"><h4 class="mui-ellipsis coupon_value">' + coupon.couponValue;
				html += '</h4><h5 class="getcoupon_intro">' + coupon.merchantName;
				html += '专用&nbsp;满&nbsp;' + coupon.consumeAmount;
				html += '元（不含邮费）&nbsp;减&nbsp;' + coupon.couponValue;
				html += '元</h5><p class="mui-h6 mui-ellipsis getcoupon_time">' + coupon.startTime.split(' ')[0];
				html += '-' + coupon.endTime.split(' ')[0];
				html += '</p></div><div class="mui-table-cell mui-col-xs-2 mui-text-right getcoupon_area"><span class="getcoupon_btn">' + (coupon.isReceive == 0 ? '领取' : '去使用');
				html += '</span></div></div></li>';
				
				$('#getcoupon_scroll ul').append(html);
			}
		}
	})
}
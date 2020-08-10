mui.init()
mui('.Evaluate_scroll').scroll({
	indicators : false,
	scrollY : true,
	deceleration : 0.0005
});
$('.order_Item_D').each(function(){
	var _this = $(this);
	var rcid = _this.attr('rcid');
	var pid = -1;
	$.ajax({
        type: 'get',
        url: '/commentToForum?realCommodityId=' +	rcid,
        dataType: 'html',
        async: false,
        success: function(data) {
        	var tid = data;
        	$.ajax({
                type: 'get',
                url: '/commodityComment?tid=' +	tid,
                dataType: 'json',
                async: false,
                success: function(json) {
                	if(json.result == 1){
                		var info = json.info;
                		for(var i in info){
                			if(info[i].position == 1){
                				pid = info[i].pid;
                				_this.attr('pid',pid);
                			}
                		}
                	}
                }
        	});
        }
	});
	
});
mui('body').on('tap','.star-five span',function(){
	var _this = this;
	$(_this).parent('.star-five').attr('score',$(this).index() + 1)
	$(_this).text('').append('&#xe6a5;').css('color','#dd2727');
	$(_this).nextAll().text('').append('&#xe6a4;').css('color','#c7c7c7');
	$(_this).prevAll().text('').append('&#xe6a5;').css('color','#dd2727');
	
})
mui('body').on('tap','.foot_sent_Evaluate',function(){
	if($('.Evaluate_textarea').val() != ''){
		$('.order_Item_D').each(function(){
			var _this = $(this);
			var pid = _this.attr('pid');
			var message = _this.find('.Evaluate_textarea').val();
			$.ajax({
				type : 'get',
				url : '/orderEvaluateSave',
				data:{
					orderId: $('body').attr('oid'),
					expressScore:_this.find('.express-score').attr('score'),
					serviceScore:_this.find('.service-score').attr('score'),
					commodityScore:_this.find('.commodity-score').attr('score'),
					realCommodityId:_this.attr('rcid'),
					comment:message	
				},
				dataType : 'json',
				success : function(json) {
				}
			})
			$.ajax({
				type : 'get',
				url : '/bbsReply?pid=' + pid + '&message='+ message,
				dataType : 'json',
				success : function(json) {
					mui.toast('嘿嘿，感谢您对商品的评论~');
					$.ajax({
						type : 'get',
						url : '/setRealOrderCommented?realOrderId=' + $('body').attr('oid'),
						dataType : 'html',
						success : function(data) {}
					})
					location.replace('/wechatMyRealOrder');
				}
			})
		});
	}else{
		mui.toast('亲，请对订单的所有商品进行评论哦~')
	}
});
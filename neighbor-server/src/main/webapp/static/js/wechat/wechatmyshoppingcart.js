mui.init({
	pullRefresh : {
		container : '#shopingcart_scroll_wrapper',
		down : {
			auto : true,
			contentdown : '下拉可以刷新',
			contentover : '释放立即刷新',
			contentrefresh : '正在刷新...',
			callback : pulldownRefresh
		}
	}
})
var shopingcartNum = 0;
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005,
	indicators : false, // 是否显示滚动条
	// flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

mui('#shopingcart_scroll_wrapper').on('tap','.shopingcart_item_edit',function(){
	var pobj = $(this).parents('.shopingcart_item').find('.shopingcart_item_bdone');
	$(this).parents('.shopingcart_item_head').find('.shopingcart_complete_btn').show();
	$(this).parents('.shopingcart_item_head').find('.shopingcart_edit_btn').hide();
	pobj.find('.view_area_show').hide();
	pobj.find('.edit_area_show').show();
});

mui('#shopingcart_scroll_wrapper').on('tap','.shopingcart_complete_btn',function(){
	var pobj = $(this).parents('.shopingcart_item').find('.shopingcart_item_bdone');
	$(this).parents('.shopingcart_item_head').find('.shopingcart_complete_btn').hide();
	$(this).parents('.shopingcart_item_head').find('.shopingcart_edit_btn').show();
	pobj.find('.view_area_show').show();
	pobj.find('.edit_area_show').hide();
});

mui('#shopingcart_scroll_wrapper').on('tap','.detele_shopingcart',function(){
	var scitem = $(this).parents('.shopingcart_item_bdone');
	var scparents = $(this).parents('.shopingcart_item');
	var shopingcartid = scitem.attr('shopingcartid');
	var btnArray = ['取消', '确认'];
	mui.confirm('确认要删除这个宝贝吗？', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/deleteShoppingCart?shoppingCart.shoppingCartId=' + shopingcartid,
				dataType : 'html',
				success : function(data) {
					if(data == '1'){
						var shopingcart_l = scitem.parent('.shopingcart_item_body').find('.shopingcart_item_bdone').length;
						if(shopingcart_l == 1){scparents.remove();}else{scitem.remove();}
						var pc = priceCalculation();
						var shopingcartNum = $('.shopingcart_item_bdone').lengtn;
						shopingcartNum == undefined ? shopingcartNum = 0 : shopingcartNum = shopingcartNum;
						document.title = '购物车(' + shopingcartNum + ')';
				    	var $body = $('body');
				    	var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
				    	$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
						$('.shopingcart_money').find('i').text(pc.sum);
						$('.shopingcart_sum').find('em').text(pc.num);
					}else{
						mui.alert('删除失败','逸品生活');
					}
				}
			})
		}
	});
});

mui('.allselect_shopingcart').on('change', 'input#select_all', function() {
	var c = this.checked ? 'true' : 'false';
	if(c == 'true'){
		$('#shopingcart_scroll').find('input[type=checkbox]').prop('checked','checked');
	}else{
		$('#shopingcart_scroll').find('input[type=checkbox]').removeProp('checked');
	}
	var pc = priceCalculation();
	$('.shopingcart_money').find('i').text(pc.sum);
	$('.shopingcart_sum').find('em').text(pc.num);
	return false;
});

mui('#shopingcart_scroll').on('change','input[name=merchantId]',function(){
	var c = this.checked ? 'true' : 'false';
	if(c == 'true'){
		$(this).parents('.shopingcart_item ').find('input[name=realCommodityId]').prop('checked','checked');
	}else{
		$(this).parents('.shopingcart_item ').find('input[name=realCommodityId]').removeProp('checked');
	}
	var pc = priceCalculation();
	$('.shopingcart_money').find('i').text(pc.sum);
	$('.shopingcart_sum').find('em').text(pc.num);
	pc.all ? $('#select_all').prop('checked','checked') : $('#select_all').removeProp('checked');
});

mui('#shopingcart_scroll').on('change','input[name=realCommodityId]',function(){
	var c = this.checked ? 'true' : 'false';
	var othis = $(this);
	var ee = 0;
	var oparent = $(this).parents('.shopingcart_item');
	var tot = oparent.find('.shopingcart_item_body').data('shopingcart');
	if(c == 'true'){
		oparent.find('input[name=realCommodityId]').each(function(){
			var ergodic = $(this);
			ergodic.prop('checked') ? ee += 1 : ee = ee;
			
		});
		ee == tot ? oparent.find('input[name=merchantId]').prop('checked','checked') : oparent.find('input[name=merchantId]').removeProp('checked');		
	}else{
		oparent.find('input[name=merchantId]').removeProp('checked');
	}
	var pc = priceCalculation();
	$('.shopingcart_money').find('i').text(pc.sum);
	$('.shopingcart_sum').find('em').text(pc.num);
	pc.all ? $('#select_all').prop('checked','checked') : $('#select_all').removeProp('checked');
});

mui('.foot_nav_shopingcart').on('tap','.shopingcart_sum',function(){
	var buyArray = [];
	var buyStr = '';
	var tStu = 0;
	var buyNum = 0;
	$('input[name=realCommodityId]').each(function(){
		var audit = 0;
		var hasele = 0;
		var so = $(this);
		if(so.prop('checked')){
			var sign = so.data('sign');
			var signArray = sign.split(',');
			if(buyStr == ''){
				buyStr = '[{"merchantId":"'+ signArray[0] +'","shoppingCartId": "' + signArray[1] + '"}]';
			}else{
				var buyJson = JSON.parse(buyStr);
				for(i in buyJson){
					if(buyJson[i].merchantId == signArray[0] && audit == 0){
						buyJson[i].shoppingCartId = buyJson[i].shoppingCartId + ',' + signArray[1];
						buyStr = JSON.stringify(buyJson);
						audit = 1;
						hasele = 1;
					}
				}
				if(hasele == 0){
					var tempstr = '{"merchantId":"'+ signArray[0] +'","shoppingCartId": "' + signArray[1] + '"}';
					buyJson.push(JSON.parse(tempstr));
					buyStr = JSON.stringify(buyJson);
					tStu = 0;
				}
			}
			
		}
	});
	$('#shoppingCartJosn').val(buyStr);
	$('#shopingcart_form').submit();
	console.log(buyStr)
});

mui('.shopingcart_pa').on('tap' , 'span' ,function(){
	$('.shopingcart_pa').fadeOut();
});

mui('.shopingcart_pa').on('tap' , '.shopingcart_pa_tap' ,function(){
	location.href = '/wechatGoBind';
});

mui('body').on('tap','.getcoupon',function(){
	var mParent = $(this).parents('.shopingcart_item');
	var couponJson = JSON.parse(mParent.find('.couponJsonTemp').text());
	$('.getcoupon_scroll ul .mui-table-view-cell').remove();
	for(var i in couponJson.couponList){
		$('.couponMer').text(couponJson.couponList[i].merchantName);
		var receiveSign = couponJson.couponList[i].isReceive == 1 ? ' coupon_received' : ' coupon_receiveing';
		var receiveBtn = couponJson.couponList[i].isReceive == 1 ? '已领取' : '领取';
		var cHtml = '<li class="mui-table-view-cell' + receiveSign + '" couponid="' + couponJson.couponList[i].couponId;
		cHtml += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-10"><h4 class="mui-ellipsis coupon_value">' + couponJson.couponList[i].couponValue;
		cHtml += '</h4><h5 class="getcoupon_intro">店铺优惠券 订单满' + couponJson.couponList[i].consumeAmount;
		cHtml += '元可使用（不含邮费）</h5><p class="mui-h6 mui-ellipsis getcoupon_time">使用期限 ' + couponJson.couponList[i].startTime.split(' ')[0].replace(/-/g, '.');
		cHtml += '-' + couponJson.couponList[i].endTime.split(' ')[0].replace(/-/g, '.');
		cHtml += '</p></div><div class="mui-table-cell mui-col-xs-2 mui-text-right getcoupon_area"><span class="getcoupon_btn">' + receiveBtn + '</span></div></div></li>';
		$('.getcoupon_scroll ul').append(cHtml);
	}
	mui('#getcoupon_scroll').scroll().refresh();
	mui('#getcoupon_popover').popover('toggle');
	
});
mui('body').on('tap','.getcoupon_over',function(){
	mui('#getcoupon_popover').popover('toggle');
});

mui('body').on('tap','.getcoupon_btn',function(){
	if($(this).parents('.mui-table-view-cell').hasClass('coupon_received')){
		return false;
	}
	var couponid = $(this).parents('.mui-table-view-cell').attr('couponid');
	$.ajax({
		type : 'get',
		url : '/wxReceiveCoupon?couponId=' + couponid,
		dataType : 'html',
		success : function(data) {
			data == 1 ? mui.toast('领取成功') : mui.toast('您已领取优惠券');
		},
		error : function(){
			mui.toast('领取失败');
		}
	})
});

$('#shopingcart_scroll').on('change','.shopingcart_number_box',function(){
	var _this = $(this);
	var num = _this.val();
	var scid = _this.parents('.shopingcart_item_bdone').attr('shopingcartid');
	$.ajax({
		type : 'get',
		url : '/wxUpdateShoppingCartCommodityNum?shoppingCartId=' + scid + '&commodityNum=' + num,
		dataType : 'html',
		success : function(data) {
			_this.parents('.shopingcart_item_bdone').find('.input_commodity').attr('data-num',num);
			_this.parents('.shopingcart_item_bdone').find('em.shopingcart_num').text('×' + num);
			var pc = priceCalculation();
			$('.shopingcart_money').find('i').text(pc.sum);
			$('.shopingcart_sum').find('em').text(pc.num);
		}
	})
});

function pulldownRefresh() {
	$.ajax({
	      type : 'get',
	      url : '/wxMyShoppingCartAjax',
	      dataType : 'json',
	      success : function(json) {
	    	  shopingcartNum = 0;
	    	  $('#select_all').removeProp('checked');
	    	  $('#shopingcart_scroll').find('.shopingcart_item').remove();
	    	  for(i in json.merchantList){
	    		  var jm = json.merchantList[i];
	    		  var si = '<div class="shopingcart_item" merchantId="' + json.merchantList[i].merchantId;
	    		  si += '"><div class="shopingcart_item_head clearfix"><div class="mui-input-row mui-checkbox mui-left shopingcart_item_merchant"><label><i class="iconfont">&#xe617;</i>' + json.merchantList[i].merchantName;
	    		  si += '<span class="mui-icon mui-icon-arrowright"></span></label> <input name="merchantId" value="' + json.merchantList[i].merchantId + '" type="checkbox"></div><div class="shopingcart_item_edit shopingcart_edit_btn">编辑</div><div class="shopingcart_item_edit shopingcart_complete_btn">完成</div><div class="getcoupon">领券</div></div><div class="shopingcart_item_body" data-shopingcart="'+json.merchantList[i].shoppingCartList.length+'">';
	    		  for(j in json.merchantList[i].shoppingCartList){
	    			  shopingcartNum += 1;
	    			  si += '<div class="shopingcart_item_bdone" shopingcartid="' + json.merchantList[i].shoppingCartList[j].shoppingCartId + '"><div class="mui-input-row mui-checkbox mui-left shopingcart_item_bdinput"><label></label> <input class="input_commodity" data-promotionPrice="' + json.merchantList[i].shoppingCartList[j].promotionPrice + '" data-num="' + json.merchantList[i].shoppingCartList[j].commodityNum + '" data-sign="' + json.merchantList[i].merchantId + ',' + json.merchantList[i].shoppingCartList[j].shoppingCartId + '" name="realCommodityId" value="'+ json.merchantList[i].shoppingCartList[j].realCommodityId +'" type="checkbox"></div><div class="hopingcart_item_bdpicture"><img src="http://wonyen.com/' + json.merchantList[i].shoppingCartList[j].photoSrc.replace('.','M.');
	    			  si += '"></div><div class="hopingcart_item_bdintro view_area_show"><h5>' + json.merchantList[i].shoppingCartList[j].commodityName + '</h5><p>规格：' + json.merchantList[i].shoppingCartList[j].specName + '</p><div class="hopingcart_item_bdnumber"><em class="sale_price">￥<i>' + json.merchantList[i].shoppingCartList[j].promotionPrice;
	    			  si += '</i></em><em class="oiginal_price">￥<i>' + json.merchantList[i].shoppingCartList[j].price + '</i></em> <em class="shopingcart_num">×' + json.merchantList[i].shoppingCartList[j].commodityNum;
	    			  si += '</em></div></div><div class="hopingcart_item_bdintro edit_area_show"><div class="edit_shopingcart_area"><div class="mui-numbox edit_shopingcart_number_box" data-numbox-min="1" data-numbox-max="9999"><button class="mui-btn mui-btn-numbox-minus" type="button">-</button><input id="test" class="mui-input-numbox shopingcart_number_box" type="number" value="' + json.merchantList[i].shoppingCartList[j].commodityNum;
	    			  si += '" /><button class="mui-btn mui-btn-numbox-plus" type="button">+</button></div><div class="edit_shopingcart_spec_box">规格：' + json.merchantList[i].shoppingCartList[j].specName
	    			  si += '</div></div><div class="detele_shopingcart">删除</div></div></div>';
	    		  }
	    		  si += '</div><div class="couponJsonTemp"></div></div>';
	    		  $('#shopingcart_scroll').append(si);
	    	  }
	    	  getcoupon();
	    	  document.title = '购物车(' + shopingcartNum + ')';
	    	  var $body = $('body');
	    	  var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
	    	  $iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
	    	  mui('#shopingcart_scroll_wrapper').pullRefresh().endPulldownToRefresh();
	    	  mui('#shopingcart_scroll_wrapper').scroll().refresh();
	    	  mui('.mui-numbox').numbox();
	      }
	})

}

function priceCalculation(){
	var priceSum = 0 , priceNum = 0;
	$('input[name=realCommodityId]').each(function(){
		if($(this).prop('checked')){
			priceNum += 1;
			priceSum -= ($(this).data('promotionprice')*100) * ($(this).attr('data-num')*100);
		}
	});
	var obj = new Object();
	obj.sum = Math.abs(priceSum/10000);
	priceNum == 0 ? obj.num = '' : obj.num = '(' + priceNum + ')';
	priceNum == shopingcartNum ? obj.all = true : obj.all = false;
	return obj;
}

function getcoupon(){
	$('.shopingcart_item').each(function(){
		var _this = $(this);
		var merchantid = _this.attr('merchantid');
		$.ajax({
		      type : 'get',
		      url : '/wxUsableCoupon?merchantId=' + merchantid,
		      dataType : 'json',
		      success : function(json) {
		    	  if(json.couponList.length > 0){
		    		  _this.find('.getcoupon').show();
		    		  _this.find('.couponJsonTemp').text(JSON.stringify(json));
		    	  }
		      }
		})
	});
}

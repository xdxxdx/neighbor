var count = 1;
var pagesize = 10;
var xhr = '';
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://localhost:8080/wxPay';
var ajaxurl;
var tabHash = location.hash.replace('#','') == '' ? '0' : location.hash.replace('#','');
var tabSlider = mui('#slider');
tabSlider.slider().gotoItem(tabHash);
mui.init();
mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl){
	mui(pullRefreshEl).pullToRefresh({
		up:{
			auto: true,
			contentinit: '正在加载订单',
			contentdown: '上拉显示更多订单',
			contentrefresh: '正在加载更多订单...',
			contentnomore: '没有更多订单了',
			callback: function() {
				var self = this;
				
				var _content = $('#my_order_content');
				var _sliderItem = _content.find('.mui-control-content').eq(index);
				var _appendDom = _sliderItem.find('.order_append_area');
				
				var ajaxUrl = _sliderItem.attr('ajaxurl');
				var page = _sliderItem.attr('page');
				var ajaxUrl = ajaxUrl.replace('{{page}}',page).replace('{{pagesize}}',pagesize);
				
				getRealOrder(ajaxUrl,self,_appendDom,_sliderItem);
				
			}
		}
	});
})


mui('#realorder_scroll_wrapper').scroll({
	deceleration : 0.0005, 
	scrollY: false
});

mui('.append_area').on('tap','.imghref',function(){
	location.href = $(this).data('href');
	return false;
});

//document.getElementById('slider').addEventListener('slide', function(e) {
//	$('.append_area').find('.order_item').each(function(){$(this).remove();});
//	count = 1 ;
//	ajaxurl = $('.mui-slider-group').find('div.mui-active').attr('ajaxurl');
//	mui('#realorder_scroll_wrapper').pullRefresh().refresh(true);
//	mui('#realorder_scroll_wrapper').pullRefresh().pullupLoading();
//});

function pullupRefresh() {
	ajaxurl = $('.mui-slider-group').find('.mui-active').attr('ajaxurl');
	getRealOrder(ajaxurl);
}

function getRealOrder(ajaxurl,self,dom,sliderItem){
	$.ajax({
		type : 'get',
		 url : ajaxurl,
		 dataType : 'json',
		 success : function(json) {
		 	sliderItem.attr('page',parseInt(sliderItem.attr('page')) + 1);
		 	mosaic(json,self,dom,sliderItem);
		 }
	});
}

function mosaic(json,self,dom,sliderItem){
	for(i in json.orderList){
		var cardNum = 0;
		var order = json.orderList[i];
		var orderlist = '<div class="shopingcart_item order_item" mid="'+ order.merchantId;
		orderlist += '" oid="' + order.realOrderId + '"><div class="shopingcart_item_head clearfix"><div class="order_merchant_list_title"><i class="iconfont merchant_icon">&#xe617;</i>' + order.merchantName;
		orderlist += '<span class="mui-icon mui-icon-arrowright"></span></div><div class="shopingcart_item_edit">'+ getDate(order.createTime)
		orderlist += '</div></div><div class="shopingcart_item_body" oid="' + order.realOrderId + '">';
		for(j in order.commodityList){
			var orderitem = order.commodityList[j];
			if(orderitem.commodityType == 2){
				cardNum = cardNum + 1;
			}
			var specHtml = '';
			var cancelHtml = '';
			var returnFoodsHtml = '';
			if(orderitem.orderStatus == '100' ){
				specHtml = '<p>规格：' + orderitem.specName + '</p>';
				if(order.orderStatus>0){
					returnFoodsHtml = '<div class="return-goods-btn">退货</div>';
				}
				
			}else{
				if(orderitem.orderStatus == '0'){
				cancelHtml = '<div class="hopingcart_item_cancelOrder">退款审核中</div>';
				}else if(orderitem.orderStatus == 3){
					cancelHtml = '<div class="hopingcart_item_cancelOrder">退款成功</div>'
				}else if(orderitem.orderStatus == '-1'){
					cancelHtml = '<div class="hopingcart_item_cancelOrder">退款失败</div>';
					returnFoodsHtml = '<div class="return-goods-btn">退货</div>';
				}
			}
				
			orderlist += '<div class="shopingcart_item_bdone" commodityType="'+orderitem.commodityType;
			orderlist += '" ocid="'+orderitem.orderCommodityId;
			orderlist += '" cid="'+orderitem.realCommodityId;
			orderlist += '"><div class="order_space"></div><div class="hopingcart_item_bdpicture"><img class="imghref" data-href="/wechatRealCommodityDetail?realCommodityId=' + orderitem.realCommodityId;
			orderlist += '" src="/' + orderitem.photoSrc.replace('.','s.');
			orderlist += '"></div><div class="hopingcart_item_bdintro order_item_bdintro">' + returnFoodsHtml;
			orderlist += '<h5 style="padding-right:60px;">' + orderitem.realCommodityName;
			orderlist += '</h5>' + specHtml;
			orderlist += '<div class="hopingcart_item_bdnumber"><em class="sale_price">￥<i>' + orderitem.promotionPrice;
			orderlist += '</i></em> <em class="oiginal_price">￥<i>' + orderitem.price;
			orderlist += '</i></em> <em class="shopingcart_num">×' + orderitem.commodityNum;
			orderlist += '</em></div>' + cancelHtml;
			orderlist += '</div></div>';
		}
		orderlist += '<div class="order_bottom_tools ">共<span>' + order.commodityList.length;
		orderlist += '</span>件商品&nbsp;合计:￥<em>' + (order.totalFee + order.freight - order.couponValue);
		orderlist += '</em>(含运费<i>￥' + order.freight;
		orderlist += order.couponValue == 0 ? '</i>' : ('，抵扣优惠券<i>￥' + order.couponValue + '</i>');
		orderlist += ')</div>';
		if(order.orderStatus >= 2 && order.wxCardReceive == 0){
			var cardReceiveTips = '可兑换';
		}else if(order.orderStatus == 3){
			var cardReceiveTips = '已兑换';
		}else{
			var cardReceiveTips = '不可兑换';
		}
		if(cardNum > 0 && order.orderStatus >= 0){
			console.log(order.orderStatus)
			orderlist += '<div class="order_bottom_tools action_bottom_tools">订单中<span>' + cardNum;
			orderlist += '</span>件商品可兑换优惠券&nbsp;<em>(' + cardReceiveTips;
			orderlist += ')</em></div>';
		}
		
		if(order.luckDrawId){
			console.log('参加了活动');
			orderlist += '<div class="order_bottom_tools action_bottom_tools order_active_tips" data-luck-draw-id="' + order.luckDrawId;
			orderlist += '">该订单已经参与商城活动。<em>点击查看详情</em></div>';
		}
		var addAddressBtn='';
		var toolslist ='';
		if(order.pickUpAddressId == -1){
			addAddressBtn = '<div class="btn_bottom_tools edit_address_btn">完善收货地址</div>'
		}
		if(order.orderStatus == -1){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools">退款中</div></div>';
		}
		if(order.orderStatus == -2){
			toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools cancelorder">删除订单</div></div>';
		}
		if(order.orderStatus == 0){
			toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import continuepay" id="continuepay" data-order-id="' + order.realOrderId
			toolslist += '">付款</div><div class="btn_bottom_tools btn_order_detail">订单详情</div></div>';
		}
		if(order.orderStatus == 1){
			toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_detail">订单详情</div><!--<div class="btn_bottom_tools">提醒发货</div>--></div>';
		}
		if(order.orderStatus == 2){
			if(cardNum > 0 && order.wxCardReceive == 0){
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import btn_order_getcard">领取优惠券</div><div class="btn_bottom_tools btn_order_detail">订单详情</div></div>';
			}else{
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import btn_order_receipt">确认收货</div><div class="btn_bottom_tools btn_order_detail">订单详情</div></div>';
			}
		}
		if(order.orderStatus == 3){
			if(cardNum > 0 && order.wxCardReceive == 0){
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import btn_order_getcard">领取优惠券</div><div class="btn_bottom_tools btn_order_detail">订单详情</div><!--<div class="btn_bottom_tools">申请售后</div><div class="btn_bottom_tools">删除订单</div>--></div>';
			}else{
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import btn_order_evaluate">评价</div><div class="btn_bottom_tools btn_order_detail">订单详情</div><!--<div class="btn_bottom_tools">申请售后</div><div class="btn_bottom_tools">删除订单</div>--></div>';
			}
			
		}
		if(order.orderStatus == 4){
			if(cardNum > 0 && order.wxCardReceive == 0){
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_import btn_order_getcard">领取优惠券</div><div class="btn_bottom_tools btn_order_detail">订单详情</div><!--<div class="btn_bottom_tools">申请售后</div><div class="btn_bottom_tools">删除订单</div>--></div>';
			}else{
				toolslist = '<div class="order_bottom_tools action_bottom_tools">'+addAddressBtn+'<div class="btn_bottom_tools btn_order_detail">订单详情</div><!--<div class="btn_bottom_tools">申请售后</div><div class="btn_bottom_tools">删除订单</div>--></div>';
			}
			
		}
		/*if(order.orderStatus == 3){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><!--<div class="btn_bottom_tools">申请售后</div>--><div class="btn_bottom_tools cancelorder">删除订单</div></div>';
		}*/
		orderlist += toolslist + '</div>';
		dom.append(orderlist);
	}
	if(json.orderList.length == pagesize){
		self.endPullUpToRefresh();
	}else{
		self.endPullUpToRefresh(true);
	}
	
}

function getDate(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = b[0] + '年' + b[1] + '月' + b[2] + '日 ' + c[0] + ':' + c[1] + ':' + c[2];
    return date;
}

mui('body').on('tap' , '.shopingcart_item_bdone' ,function(){
	var cid = $(this).attr('cid');
	location.href = '/wxCommodityDetail?realCommodityId=' + cid;
	return false;
});

mui('body').on('tap','.shopingcart_item.order_item',function(){
	var oid = $(this).attr('oid');
	location.href = '/wxOrderDetail?realOrderId=' + oid;
	return false;
})

mui('body').on('tap','.bottom-tips-cloose',function(){
	$('.bottom-tips').fadeOut();
	return false;
})

mui('body').on('tap','.bottom-tips',function(){
	location.href = '/wxMyCrowdFund';
	return false;
})


mui('body').on('tap' , '.btn_order_receipt' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	var btnArray = ['取消', '收货'];
	mui.confirm('亲~收到货了么', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/wxConfirmReceipt?realOrderId=' + oid,
				dataType : "html",
				async : false,
				success : function(data) {
					data == 1 ? $('.order_item').each(function(){if($(this).attr('oid') == oid){$(this).remove();mui.toast('收货成功');}}) : mui.alert('亲~收货失败哦~','提醒');
				}
			})
		}
	})
	return false;
});

mui('body').on('tap' , '.btn_order_evaluate' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	location.href = '/wxOrderEvaluate?realOrderId='+ oid;
	return false;
});

mui('body').on('tap' , '.cancelorder' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	var btnArray = ['取消', '确定'];
	mui.confirm('确定要取消该订单么', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/wxOrderCancel?realOrderId=' + oid,
				dataType : "html",
				async : false,
				success : function(data) {
					data == 1 ? $('.order_item').each(function(){if($(this).attr('oid') == oid){$(this).remove()}}) : mui.alert('删除订单失败','逸品生活');
				}
			})
		}
	})
	return false;
});

mui('body').on('tap' , '.btn_order_detail' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	location.href = '/wxOrderDetail?realOrderId=' + oid ;
	return false;
});

mui('body').on('tap' , '.edit_address_btn' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	location.href = '/wxOrderSetAddress?realOrderId=' + oid ;
	return false;
});

mui('body').on('tap','.btn_order_getcard',function(){
	var _this = $(this);
	var btnArray = ['下次再说', '领取'];
	mui.confirm('领取卡券后，请在3个月内使用，否则将会过期\n是否现在领取', '温馨提示', btnArray, function(e) {
		if (e.index == 1) {
			var _parents = _this.parents('.shopingcart_item_body');
			var oid = _parents.attr('oid');
			var card = {};
			card.realOrderId = oid;
			card.commodityList = [];
			_parents.find('.shopingcart_item_bdone').each(function(){
				var _findThis = $(this)
				if(_findThis.attr('commoditytype') == 2){
					var commodityObj = {};
					commodityObj.realCommodityId = _findThis.attr('cid');
					commodityObj.commodityNum = _findThis.find('.shopingcart_num').text().replace('×','');
					card.commodityList.push(commodityObj);
				}
			})
			location.href = 'wxCard?card='+ JSON.stringify(card);
			return false;
		} else {
			return false;
		}
	})
	return false;
});

mui('body').on('tap','.return-goods-btn',function(){
	var _this = $(this);
	var mid = _this.parents('.order_item').attr('mid');
	var ocid = _this.parents('.shopingcart_item_bdone').attr('ocid');
	location.href = '/wxGoRefund?orderCommodityId='+ ocid + '&merchantId=' + mid;
	return false;
})

mui('body').on('tap','.order_active_tips',function(){
	location.href = '/wechat/double11.jsp';
	return false;
})

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

var count = 1;
var pagesize = 10;
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://localhost:8080/wxPay';
var orderStatus = $('#pullrefresh_orderall').attr('orderStatus');
mui.init({
	pullRefresh : {
		container : '#pullrefresh_orderall',
		up : {
			contentrefresh : '正在加载...',
			contentnomore : '没有更多商品了',
			callback : pullupRefresh
		}
	}
});
mui('#pullrefresh_orderall').scroll({
	deceleration : 0.0005, 
	indicators : false, 
});
function pulldownRefresh(){}
function pullupRefresh() {
	$.ajax({
		 type : 'get',
	      url : '/wxMyOrderListAjax?orderStatus=' + orderStatus + '&page=' + count + '&pagesize=' + pagesize,
	      dataType : 'json',
	      success : function(json) {
	    	  count += 1;
	    	  var l = mosaic(json);
	    	  if(l == 10){
	    		  mui('#pullrefresh_orderall').pullRefresh().endPullupToRefresh(false); 
	    	  }else{
	    		  mui('#pullrefresh_orderall').pullRefresh().disablePullupToRefresh()
	    	  }
	    	  
	      }
	});
}

function mosaic(json){
	for(i in json.orderList){
		var order = json.orderList[i];
		var orderlist = '<div class="shopingcart_item order_item" oid="' + order.realOrderId + '"><div class="shopingcart_item_head clearfix"><div class="order_merchant_list_title"><i class="iconfont merchant_icon">&#xe617;</i>' + order.merchantName;
		orderlist += '<span class="mui-icon mui-icon-arrowright"></span></div><div class="shopingcart_item_edit">'+ getDate(order.createTime)
		orderlist += '</div></div><div class="shopingcart_item_body" oid="' + order.realOrderId + '">';
		for(j in order.commodityList){
			var orderitem = order.commodityList[j];
			orderlist += '<div class="shopingcart_item_bdone"><div class="order_space"></div><div class="hopingcart_item_bdpicture"><img src="http://xmhzqa.com/' + orderitem.photoSrc;
			orderlist += '"></div><div class="hopingcart_item_bdintro order_item_bdintro"><h5>' + orderitem.realCommodityName;
			orderlist += '</h5><p>规格：' + orderitem.specName;
			orderlist += '</p><div class="hopingcart_item_bdnumber"><em class="sale_price">￥<i>' + orderitem.promotionPrice;
			orderlist += '</i></em> <em class="oiginal_price">￥<i>' + orderitem.price;
			orderlist += '</i></em> <em class="shopingcart_num">×' + orderitem.commodityNum;
			orderlist += '</em></div></div></div>';
		}
		orderlist += '<div class="order_bottom_tools">共<span>' + order.commodityList.length;
		orderlist += '</span>件商品&nbsp;合计:￥<em>' + order.totalFee;
		orderlist += '</em>(含运费<i>￥' + ' 0.00';
		orderlist += '</i>)</div>';
		var toolslist ='';
		if(order.orderStatus == -1){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools">退款中</div></div>';
		}
		if(order.orderStatus == -2){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools cancelorder">删除订单</div></div>';
		}
		if(order.orderStatus == 0){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools btn_order_import continuepay">付款</div><div class="btn_bottom_tools cancelorder">取消订单</div></div>';
		}
		/*if(order.orderStatus == 1){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools btn_order_import">确认收货</div><div class="btn_bottom_tools">提醒发货</div></div>';
		}
		if(order.orderStatus == 2){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools btn_order_import">确认收货</div><div class="btn_bottom_tools">订单详情</div></div>';
		}
		if(order.orderStatus == 3){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><div class="btn_bottom_tools btn_order_import">评价</div><div class="btn_bottom_tools">申请售后</div><div class="btn_bottom_tools">删除订单</div></div>';
		}
		if(order.orderStatus == 3){
			toolslist = '<div class="order_bottom_tools action_bottom_tools"><!--<div class="btn_bottom_tools">申请售后</div>--><div class="btn_bottom_tools cancelorder">删除订单</div></div>';
		}*/
		orderlist += toolslist + '</div>';
		$('.append_area').append(orderlist);
	}
	return json.orderList.length;
}

function getDate(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = b[0] + '年' + b[1] + '月' + b[2] + '日 ' + c[0] + ':' + c[1] + ':' + c[2];
    return date;
}

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#pullrefresh_orderall').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#pullrefresh_orderall').pullRefresh().pullupLoading();
	});
}

mui('.append_area').on('tap' , '.shopingcart_item_bdone' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	top.location.href = '/wxOrderDetail?realOrderId=' + oid;
	return false;
});

mui('.append_area').on('tap' , '.continuepay' ,function(){
	var oid = $(this).parents('.shopingcart_item_body').attr('oid');
	top.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + oid + '#wechat_redirect';
});

mui('.append_area').on('tap' , '.cancelorder' ,function(){
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
					data == 1 ? window.parent.cancelOrder(oid) : mui.alert('删除订单失败','逸品生活');
				}
			})
		}
	})
});

function cancelFun(oid){
	$('.order_item').each(function(){if($(this).attr('oid') == oid){$(this).remove()}})
}
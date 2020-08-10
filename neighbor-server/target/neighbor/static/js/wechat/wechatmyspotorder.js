var count = 1;
var pagesize = 10;
var ajaxurl;
//pullupRefresh();
mui.init({
	pullRefresh : {
		container : '#spotorder_scroll_wrapper',
		up : {
			contentrefresh : '正在加载...',
			contentnomore : '没有更多商品了',
			callback : pullupRefresh
		}
	}
});

mui('#spotorder_scroll_wrapper').scroll({
	deceleration : 0.0005, 
});
document.getElementById('spot_slider_title').addEventListener('slide', function(e) {
	ajaxurl = $('#urlTemp').find('div.mui-active').attr('ajaxurl');
	count == 1 ;
	mui('#spotorder_scroll_wrapper').pullRefresh().refresh(true);
	getSpotOrder(ajaxurl);
});
function pulldownRefresh() {
	
	
}


function pullupRefresh() {
	ajaxurl = $('#urlTemp').find('div.mui-active').attr('ajaxurl'); 
	getSpotOrder(ajaxurl);
}
if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#spotorder_scroll_wrapper').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#spotorder_scroll_wrapper').pullRefresh().pullupLoading();
	});
}

//$(function() {
//	$('.logo_header_search_input').focusin(function(){
//		$('.logo_header_search').css('background','#f0f0f0');
//		$('.logo_header_search').css('width','calc(100% - 20px)');
//		$('.logo_header_search').css('left','10px');
//		$('.logo_header_img').hide();
//	})
//	$('.logo_header_search_input').focusout(function(){
//		$('.logo_header_search').removeAttr('style');
//		$('.logo_header_img').show();
//	})
//});


function getSpotOrder(ajaxurl){
	$('.append_area').find('.spot_order_item').remove();
	$.ajax({
	      type : 'get',
	      url : ajaxurl,
	      dataType : 'json',
	      success : function(json) {
	    	 var spot = json.spotOrderBid;
	    	 var len = spot.length;
	    	 for(var i in spot){
	    		 if(spot[i].type == '1'){
	    			 var li = '<div class="spot_order_item"><div class="spot_order_item_head"><span class="spot_order_item_time">' + spot[i].createTime;
	    			 li += '</span><span class="spot_order_item_edit">由"' + spot[i].spotSupplierName;
	    			 li += '"提供</span></div><div class="spot_order_item_body"><div class="spot_order_item_pic"><img src="http://wonyen.com/' + spot[i].defaultPicture;
	    			 li += '"></div><div class="spot_order_item_intro"><div class="shpt_order_spotname">' + spot[i].spotCommodityName;
	    			 li += '</div><div class="shpt_order_spotspec">规格：' + spot[i].spec;
	    			 li += '</div><div class="shpt_order_ordernum">需求数量：' + spot[i].commotityAmount + spot[i].unit;
	    			 li += '</div><div class="shpt_order_unitprice">期望单价：<em>' + spot[i].price +'</em>元/' + spot[i].unit;
	    			 li += '</div></div></div>%{{foot}}%</div>';
	    			 var stu = spot[i].orderStatus == 0 ? '等待供货商确认' : '供货商已确认';
	    			 var tot = spot[i].commotityAmount*spot[i].price;
	    			 var foot = '<div class="spot_order_item_foot"><div class="shpt_order_spotstatus"><span>' + stu +'</span></div><span class="shpt_order_spotsum">总价:<em>' + toDecimal2(tot) + '</em></span></div>'
	    			li = li.replace('%{{foot}}%',foot)
	    		 }else{
	    			 var li ='<div class="spot_order_item"><div class="spot_order_item_head"><span class="spot_order_item_time">' + spot[i].createTime;
	    			 li += '</span><span class="spot_order_item_edit">等待需求方"' + spot[i].contacter;
	    			 li += '"确认</span></div><div class="spot_order_item_body"><div class="spot_order_item_pic"><img src="http://wonyen.com/' + spot[i].defaultPicture;
	    			 li += '" /></div><div class="spot_order_item_intro"><div class="shpt_order_spotname">' + spot[i].spotCommodityName;
	    			 li += '</div><div class="shpt_order_spotspec">规格：' + spot[i].spec;
	    			 li += '</div><div class="shpt_order_ordernum">数量：' + spot[i].commotityAmount + spot[i].unit;
	    			 li += '</div><div class="shpt_order_unitprice">联系电话：<em>' + spot[i].contacterPhone;
	    			 li += '</em></div></div></div><div class="spot_order_item_foot"><div class="shpt_order_spotstatus"><span><i class="mui-icon mui-icon-phone"></i>联系需求方</span></div><span class="shpt_order_spotsum">报价:<em>' +spot[i].price;
	    			 li += '</em></span></div></div>';
	    		 }
	    		 $('.append_area').append(li);
	    	 }
	    	 
	    	 if(len<10 ||len==0 || len==null || len > pagesize){
	    		 mui('#spotorder_scroll_wrapper').pullRefresh().disablePullupToRefresh();
	    	  }else{
	    		  mui('#spotorder_scroll_wrapper').pullRefresh().endPullupToRefresh(false);
	    	  }
	    	 count += 1;
	      }
	})
}

function toDecimal2(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}    

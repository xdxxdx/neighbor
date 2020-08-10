var count = 1;
var pagesize = 10;
mui.init({
	pullRefresh : {
		container : '#collectcommodity_scroll',
		up : {
			contentrefresh : '正在加载...',
			contentnomore : '没有更多商品了',
			callback : pullupRefresh
		}
	}
})
mui('.mui-scroll-wrapper').scroll();

mui('.append_area').on('tap' , '.ahref' ,function(){
	location.href = $(this).attr('href');
})

function pullupRefresh(){
	$.ajax({
	      type : 'get',
	      url : '/wechatMyCommodityCollect?page=' + count + '&pagesize=' + pagesize,
	      dataType : 'json',
	      success : function(json) {
	    	 var cc = json.commodityCollectList;
	    	 var len = cc.length;
	    	 for(var i in cc){
	    		 var li = '<div class="concern_commodity_item ahref" href="/wechatRealCommodityDetail?realCommodityId=' + cc[i].commodityId + '"><div class="concern_commodity_pic"><img src="http://wonyen.com/' + cc[i].columnPicture;
	    		 li += '" /></div><div class="concern_commodity_intro"><div class="concern_commodity_intro_area"><div class="concern_commodity_h">' + cc[i].realCommodityName;
	    		 li += '</div><div class="concern_commodity_activity"><!--<em>包邮</em>--></div><div class="concern_commodity_price"><em>￥</em>'+ cc[i].promotionPrice;
	    		 li += '</div></div></div></div>';
	    		 $('.append_area').append(li);
	    	 }
	    	 if(len<10 ||len==0 || len==null || len > pagesize){
	    		 mui('#collectcommodity_scroll').pullRefresh().disablePullupToRefresh();
	    	  }else{
	    		  mui('#collectcommodity_scroll').pullRefresh().endPullupToRefresh(false);
	    	  }
	    	 count += 1;
	      }
	})
}

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#collectcommodity_scroll').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#collectcommodity_scroll').pullRefresh().pullupLoading();
	});
}
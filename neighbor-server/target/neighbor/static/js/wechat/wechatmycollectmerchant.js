var count = 1;
var pagesize = 10;
mui.init({
	pullRefresh : {
		container : '#collectmerchant_scroll',
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
	      url : '/wechatMyMerchantCollect?page=' + count + '&pagesize=' + pagesize,
	      dataType : 'json',
	      success : function(json) {
	    	 var cm = json.merchantCollectList;
	    	 var len = cm.length;
	    	 for(var i in cm){
	    		var li = '<div class="concern_merchant_item "><div class="concern_merchant_pic"><img src="http://wonyen.com/' + cm[i].defaultPicture;
	    		li += '"/></div><div class="concern_merchant_intro"><div class="concern_merchant_name">' + cm[i].merchantName;
	    		li += '</div>';
	    		li += '</div></div></div>';
	    		$('.append_area').append(li);
	    	 }
	    	 if(len<10 ||len==0 || len==null || len > pagesize){
	    		 mui('#collectmerchant_scroll').pullRefresh().disablePullupToRefresh();
	    	  }else{
	    		  mui('#collectmerchant_scroll').pullRefresh().endPullupToRefresh(false);
	    	  }
	    	 count += 1;
	      }
	})
}

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#collectmerchant_scroll').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#collectmerchant_scroll').pullRefresh().pullupLoading();
	});
}
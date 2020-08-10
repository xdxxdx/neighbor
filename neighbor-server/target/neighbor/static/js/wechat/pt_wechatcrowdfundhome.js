var count = 1;
var pagesize = 10;
mui.init({
	pullRefresh : {
		container : '#crowdfund_wrapper',
		up : {
			contentrefresh : '正在加载...',
			contentnomore : '没有更多商品了',
			callback : pullupRefresh
		}
	}
});
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005,
	indicators: false,
});
mui('body').on('tap','.ahref',function(){
	location.href = $(this).attr('href');
});
function pullupRefresh(){
	$.ajax({
	      type : 'get',
	      url : '/wechatCrowdFundList?page=' + count + '&pagesize=' + pagesize +'&crowdFundType=1',
	      dataType : 'json',
	      success : function(json) {
	    	 var cfl = json.crowdFundList;
	    	 var len = cfl.length
	    	 for(var i in cfl){
	    		 if(cfl[i].crowdFundId != 7){
	    			var itemHtml = '<div class="cfs_item ahref" href="/wechatCrowdFundDetail?crowdFundId='+cfl[i].crowdFundId;
	 	    		itemHtml = itemHtml +'"><div class="cfs_defaultimg"><img src="http://wonyen.com/' + cfl[i].columnPicture;
	 	    		itemHtml = itemHtml + '"></div><div class="cfs_title">' + cfl[i].projectName;
	 	    		itemHtml = itemHtml + '</div><div class="cfs_title_ProgressBarArea"><div class="cfs_title_completionDegree cfsList_title_completionDegree">' + ((cfl[i].supportMoney/cfl[i].moneyAmount)*100).toFixed(2);
	 	    		itemHtml = itemHtml + '</div><div class="cfs_title_ProgressBar cfsList_title_ProgressBar"><div class="cfs_title_ProgressBarNow" style="width:' + ((cfl[i].supportMoney/cfl[i].moneyAmount)*100).toFixed(2);
	 	    		itemHtml = itemHtml + '%;"></div></div></div><div class="cfs_title_BaseInfo"><div class="cfs_title_BaseInfo_item"><i class="iconfont">&#xe63b;</i>' + cfl[i].supportNum;
	 	    		itemHtml = itemHtml + '</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_center"><i class="iconfont">&#xe63a;</i>' + cfl[i].supportMoney;
	 	    		itemHtml = itemHtml + '</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_right"><span class="gotosponerscf_list">' + '去拼团<i class="mui-icon mui-icon-arrowright"></i>' + '</span></div></div></div>';
	 	    		$('#append_area').append(itemHtml); 
	    		 }else{
	    			 var itemHtml = '<div class="cfs_item ahref" href="/wechatCrowdFundDetail?crowdFundId=7"><div class="cfs_defaultimg"><img src="http://wonyen.com/uploadFiles/CrowdFund/1480388332196.jpg"></div><div class="cfs_title">【素氏】五常稻花香米</div><div class="cfs_title_ProgressBarArea"><div class="cfs_title_completionDegree cfsList_title_completionDegree">34.90</div><div class="cfs_title_ProgressBar cfsList_title_ProgressBar"><div class="cfs_title_ProgressBarNow" style="width:34.90%;"></div></div></div><div class="cfs_title_BaseInfo"><div class="cfs_title_BaseInfo_item"><i class="iconfont"></i>176</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_center"><i class="iconfont"></i>34900</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_right"><span class="gotosponerscf_list">去支持<i class="mui-icon mui-icon-arrowright"></i></span></div></div></div>';
	    			 $('#append_area').append(itemHtml); 
	    		 }
	    		
	    	 }
	    	 if(len<10 ||len==0 || len==null || len>10){
	    		  mui('#crowdfund_wrapper').pullRefresh().disablePullupToRefresh();
	    	  }else{
	    		  mui('#crowdfund_wrapper').pullRefresh().endPullupToRefresh(false);
	    		  count = count + 1
	    	  }
	      }
	});
}

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#crowdfund_wrapper').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#crowdfund_wrapper').pullRefresh().pullupLoading();
	});
}


function crowdFundStatus(s){
	switch(s)
	{
	case 0:
		return '预热中'
	  break;
	case 1:
		return '众筹中'
	  break;
	case 2:
		return '众筹成功'
	  break;
	case -1:
		return '众筹失败'
	  break;
	default:
		return '已退款'
	}
}
var page = 1;
mui.init({
  pullRefresh : {
    container:"#recommender_scroll_wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,
      auto: true,
      contentdown : '上滑加载新数据',
      contentrefresh : '正在加载...',
      contentnomore : '没有其他收益了',
      callback :pulldownRefresh 
    }
  }
});


mui('body').on('tap','#CloserecommenderPopover',function(){

		mui('#recommender_popover').popover('toggle');
	
})
mui('body').on('tap', '.recommender_qrcode_btn', function() {
	$(this).removeClass('bounce');
	$(this).addClass('wobble');
	setTimeout(function() {
		if($('body').attr('isbind') != '1'){
			mui.alert('您还没有绑定帐号，请前往绑定！','谢谢',function(){location.href = '/wechatGoBind'});
		}else{
			if($('body').attr('accountmode') != '2'){
				mui.alert('请切换为逸品生活帐号！','谢谢',function(){location.href = '/wechatAccountManager'});
			}else{
				mui('#recommender_popover').popover('toggle');
				var width = $('#recommender_popover').width() ; //这是我们准备画的div
				var height =  $('#recommender_popover').height() ;
				html2canvas( $('#recommender_popover') ,{            
			        onrendered: function(canvas){  
			           $('#imgCanvas img').attr('src',canvas.toDataURL());
			        }
			    }); 
			}
		}
		setTimeout(function() {
				$('.recommender_qrcode_btn').removeClass('wobble');
		},500);
	}, 500);
});

mui('body').on('tap','#withdrawals',function(){
	location.href = '/wxGoRebateCash '
});

mui('body').on('tap','#SpokespersonGuideBtn',function(){
	mui('#SpokespersonGuidePopover').popover('toggle');
});

mui('body').on('tap','#SloseSpokespersonGuidePopover',function(){
	mui('#SpokespersonGuidePopover').popover('toggle');
});

mui('body').on('tap','.recommender_back',function(){
	location.href = '/wechatMyMall';
});

mui('body').on('tap','.rebate_record',function(){
	location.href = '/wxRebateCashRecord';
});

mui('body').on('tap','#toSokesman',function(){
	location.href = '/wechat/wechatMyRecommenderList.html';
});

mui('#SpokespersonGuideWrapper').scroll({ deceleration: 0.0005 });

$.ajax({
    type : 'get',
    url : '/agentList',
    dataType : 'json',
    success : function(json) {
    	json.agentList.length > 0 ? $('.spokesmanDetial_title table').show() : '';
    	for(var ai in json.agentList){
    		var agentItem = json.agentList[ai];
    		var tr = '<tr><td>' + agentItem.buyerName;
    		tr += '</td><td>' +  agentItem.createTime.split(' ')[0];
    		tr += '</td><td>' + agentItem.reateMoney;
    		tr += '</td></tr>';
    		$('.spokesmanDetial_title tbody').append(tr);
    	}
    	mui('#spokesmanDetial').scroll({ deceleration: 0.0005 });
    },
    complete : function(){
    	$('.spokesmanDetial_title .mui-loading').remove();
    }
});

function pulldownRefresh(){
	var l = 0
	$.ajax({
	      type : 'get',
	      url : '/rebateDetail?pagesize=10&page=' + page,
	      dataType : 'json',
	      success : function(json) {
	    	  page = page + 1;
	    	  for(var ri in json.rebateDetail){
	    		  l = l + 1;
	    		  var rebateDetail = json.rebateDetail[ri];
	    		  var tr = '<tr><td>' + rebateDetail.buyerName;
	    		  tr += '</td><td>' +  rebateDetail.rebateMoney;
	    		  tr += '</td></tr>';
	    		  $('#recommender_scroll_wrapper table').show();
	    		  $('#recommender_scroll_wrapper tbody').append(tr);
	    	  }
	    	  mui('#recommender_scroll_wrapper').pullRefresh().endPulldownToRefresh();
	    	  mui('#recommender_scroll_wrapper').pullRefresh().endPullupToRefresh(l != 10);
	      },
	      complete : function(){
	    	  $('#recommender_scroll_wrapper .mui-loading').remove();
	      }
	});
}
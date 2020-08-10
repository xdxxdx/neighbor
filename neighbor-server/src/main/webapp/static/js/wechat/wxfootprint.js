var page = 1;
mui.init({
	pullRefresh: {
		container: '#foot_print_wrapper',
		up: {
			contentrefresh: '正在加载足迹 ',
			contentnomore:'没有更多记录了',
			auto:true,
			callback: pullupRefresh
		}
	}
})

function pullupRefresh(){
	$.ajax({
      type : 'get', 
      url : '/myFootPrintList?page=' + page, 
      dataType : 'json',
      success : function (json) {
    	  page = page + 1;
    	  for(var i in json.footPrintList){
    		  var footItem = json.footPrintList[i];
    		  var item = '<li class="mui-table-view-cell mui-media foot_print_li" rid="' + footItem.realCommodityId;
    		  item += '"><img class="mui-media-object mui-pull-left foot_print_img" src="/' + footItem.columnPicture;
    		  item += '"><div class="mui-media-body"><h4 class="foot_print_title mui-ellipsis-2">' + footItem.realCommodityName;
    		  item += '</h4><p class="foot_print_rmb">' + footItem.promotionPrice;
    		  item += '</p></div></li>';
    		  $('.foot_print_view').append(item);
    	  }
    	  if(json.footPrintList.length != 10){
    		  mui('#foot_print_wrapper').pullRefresh().endPullupToRefresh(true);  
    	  }else{
    		  mui('#foot_print_wrapper').pullRefresh().endPullupToRefresh(false); 
    	  }
      }
	}) 
}

mui('body').on('tap','.foot_print_li',function(){
	location.href = '/wechatRealCommodityDetail?realCommodityId=' + $(this).attr('rid');
})
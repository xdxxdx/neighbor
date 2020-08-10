var count = 0;
mui.init({
	pullRefresh: {
		container: '#recommender_scroll_wrapper',
		up: {
			contentrefresh: '正在加载收益记录 ',
			contentnomore:'没有更多记录了',
			auto:true,
			callback: pullupRefresh
		}
	}
})


function pullupRefresh(){
	count = count + 1;
	var jsonArr = [];
	$.ajax({
		type : 'get',
		url : '/agentListByLevel?page=' + count + '&level=' + getUrlParam('level'),
		dataType : 'json',
		success : function(json) {
			for(var ai in json.agentList){
	    		var agentItem = json.agentList[ai];
	    		var tr = '<tr><td>' + agentItem.userName;
	    		tr += '</td><td>' +  agentItem.regTime.split(' ')[0];
	    		tr += '</td></tr>';
	    		$('#recommender_scroll_wrapper tbody').append(tr);
	    	}
			 mui('#recommender_scroll_wrapper').pullRefresh().endPullupToRefresh(json.agentList.length != 10);
		}
	});
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
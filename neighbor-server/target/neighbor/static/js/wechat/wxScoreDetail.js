var count = 0;
mui.init({
	pullRefresh: {
		container: '.deposit_scroll',
		up: {
			contentrefresh: '正在加载积分记录 ',
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
		url : '/scoreAjax?page=' + count,
		dataType : 'json',
		success : function(json) {
			for(var c in json.scoreGetList){
				var jsonObj = {};
				var timeArr = json.scoreGetList[c].createDate.split(/[- : \/]/)
				jsonObj.time = Date.parse(new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]));
				jsonObj.json = json.scoreGetList[c];
				jsonObj.type = '1';
				jsonArr.push(jsonObj);
				console.log(jsonObj);
			}
			for(var l in json.scoreUseList){
				var jsonObj = {};
				var timeArr = json.scoreUseList[l].createTime.split(/[- : \/]/)
				jsonObj.time = Date.parse(new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]));
				jsonObj.json = json.scoreUseList[l];
				jsonObj.type = '0'
				jsonArr.push(jsonObj);
				console.log(jsonObj);
			}
			jsonArr.sort(getSortFun('desc', 'time'));
			console.log(jsonArr);
			for(var n in jsonArr){
				var html = '';
				if(jsonArr[n].type ==1 ){
					html += '<li class="mui-table-view-cell"><div class="mui-table"><div class="mui-table-cell mui-col-xs-10"><h4 class="mui-ellipsis-2">' + jsonArr[n].json.details.replace('X','×');
					html += '</h4><p class="mui-h6 mui-ellipsis">' + jsonArr[n].json.createDate;
					html += '</p></div><div class="mui-table-cell mui-col-xs-2 mui-text-right"><span class="mui-h5" style="font-size:16px;">' + (jsonArr[n].json.score > 0 ? '+' + jsonArr[n].json.score : jsonArr[n].json.score);
					html += '</span></div></div></li>';
				} else{
					html += '<li class="mui-table-view-cell"><div class="mui-table"><div class="mui-table-cell mui-col-xs-10"><h4 class="mui-ellipsis-2">商城消费使用积分抵扣，订单号：' + jsonArr[n].json.realOrderStr.replace(/Z/g,',');
					html += '</h4><p class="mui-h6 mui-ellipsis">' + jsonArr[n].json.createTime;
					html += '</p></div><div class="mui-table-cell mui-col-xs-2 mui-text-right"><span class="mui-h5" style="font-size:16px;">-' + jsonArr[n].json.score;
					html += '</span></div></div></li>';
				}
				
				$('.Score_append').append(html);
			}
			if(jsonArr.length > 0){
				mui('.deposit_scroll').pullRefresh().endPullupToRefresh(false);
			}else{
				mui('.deposit_scroll').pullRefresh().endPullupToRefresh(true);
			}
			
		}
	});
}

function getSortFun(order, sortBy) {
	var ordAlpah = (order == 'asc') ? '>' : '<';
	var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
	return sortFun;
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
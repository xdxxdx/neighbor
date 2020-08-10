var count = 0;
mui.init({
	pullRefresh: {
		container: '.deposit_scroll',
		up: {
			contentrefresh: '正在加载消费记录 ',
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
		url : '/wechatDepositAndConsumeDetail?page=' + count,
		dataType : 'json',
		success : function(json) {
			for(var c in json.depositConsumes){
				var jsonObj = {};
				var timeArr = json.depositConsumes[c].createTime.split(/[- : \/]/)
				jsonObj.time = Date.parse(new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]));
				jsonObj.json = json.depositConsumes[c];
				jsonObj.type = '1';
				jsonArr.push(jsonObj);
			}
			for(var l in json.depositLogs){
				var jsonObj = {};
				var timeArr = json.depositLogs[l].payTime.split(/[- : \/]/)
				jsonObj.time = Date.parse(new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]));
				jsonObj.json = json.depositLogs[l];
				jsonObj.type = '0'
				jsonArr.push(jsonObj);
			}
			jsonArr.sort(getSortFun('desc', 'time'));
			for(var n in jsonArr){
				if(jsonArr[n].type ==1 ){
					var typeTips = '余额消费';
					var typeClass = 'deposit_out';
					var money = jsonArr[n].json.consumeMoney;
					var noteHtml = '<div class="deposit_note">' + jsonArr[n].json.note + '</div>';
				} else{
					var typeTips = '账户充值';
					var typeClass = 'deposit_in';
					var money = jsonArr[n].json.deposit ;
					var noteHtml = '';
				}
				var html = '<div class="deposit_item"><div class="deposit_sign ' + typeClass;
				html += '"></div><div class="deposit_tips">' + typeTips;
				html += '</div><div class="deposit_money">' + toDecimal2(money).split('.')[0] + '.<em>' + toDecimal2(money).split('.')[1] + '</em>';
				html += '</div><div class="deposit_time">操作时间：' + (jsonArr[n].type == 0 ? jsonArr[n].json.payTime　: jsonArr[n].json.createTime); 
				html += '</div>' + noteHtml;
				html += '</div>';
				$('.deposit_append').append(html);
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
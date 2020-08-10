var count = 1;
mui.init({
	pullRefresh : {
		container : '#NoticeWrapper',
		up : {
			auto : true,
			contentrefresh : '正在加载...',
			callback : pullupRefresh
		}
	}
});
mui('.mui-scroll-wrapper').scroll();

function pullupRefresh() {
	$.ajax({
		type : 'GET',
		url : '/orderMsgAjax?page=' + count,
		dataType : 'json',
		success : function(json) {
			var i = 0;
			count += 1;
			for ( var i in json.msgList) {
				var msg = json.msgList[i];
				$('#noticeAppend').append(spellHtml(msg));
			}
			var listL = json.msgList.length;
			console.log(listL);
			mui('#NoticeWrapper').pullRefresh().endPullupToRefresh((listL < 30));
		}
	});
}

mui('body').on('tap', '.set-readed', function() {
	var userMsgId = $(this).data('userMsgId');
	$.ajax({
		type : 'GET',
		url : '/setUserMsgRead?userMsg.userMsgId=' + userMsgId,
		dataType : 'json',
		success : function(json) {}
	});
	location.href = $(this).attr('href');
})

function spellHtml(o) {
	var html = '<li class="mui-table-view-cell set-readed"  href="/' + o.wxUrl + '" data-user-msg-id="' + o.userMsgId;
	html += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-9"><h4 class="mui-ellipsis-2">' + (o.isRead == 0 ? '<font style="color:#f00">【未读】</font>' : '') + o.msgContent;
	html += '</h4><p class="mui-h6 mui-ellipsis-2">' + o.msgTitle;
	html += '</p></div><div class="mui-table-cell mui-col-xs-3 mui-text-right"><span class="mui-h5">' + o.createTime.split(' ')[0];
	html += '<br>' + o.createTime.split(' ')[1];
	html += '</span></div></div></li>';
	return html;
}
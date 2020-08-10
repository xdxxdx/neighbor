var count = 1;
mui.init({
	pullRefresh : {
		container : '#picMuseumNoticeWrapper',
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
		url : '/picMuseumNoticeAjax?page=' + count,
		dataType : 'json',
		success : function(json) {
			var i = 0;
			for ( var i in json.noticeList) {
				var notice = json.noticeList[i];
				$('#noticeAppend').append(spellHtml(notice));
			}
			var listL = json.noticeList.length;
			console.log(listL);
			mui('#picMuseumNoticeWrapper').pullRefresh().endPullupToRefresh((listL < 10));
		}
	});
}

mui('body').on('tap', '.ahref', function() {
	location.href = $(this).attr('href');
})

function spellHtml(o) {
	var html = '<li class="mui-table-view-cell ahref" href="/wxNoticeDetail?noticeId=' + o.noticeId;
	html += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-9"><h4 class="mui-ellipsis">' + o.noticeTitle;
	html += '</h4><p class="mui-h6 mui-ellipsis-2">' + o.noticeAbstract;
	html += '</p></div><div class="mui-table-cell mui-col-xs-3 mui-text-right"><span class="mui-h5">' + o.issueTime.split(' ')[0];
	html += '<br>' + o.issueTime.split(' ')[1];
	html += '</span></div></div></li>';
	return html;
}
var page = 1;
mui.init({
	pullRefresh : {
		container : '#cookBookList',
			up : {
				auto : true,
				contentrefresh : '正在加载...',
				callback : pullupRefresh
			}
		}
});

function pullupRefresh() {
	$.ajax({
		type : 'get',
		url : 'cookBookListAjax?page=' + page,
		dataType : 'json',
		success : function(json) {
			page = page + 1;
			for (var ci in json.cookBookList) {
				var cookBook = json.cookBookList[ci];
				var html = '<div class="mui-card cook-book-card" data-cook-book-id="'+ cookBook.cookBookId;
				html += '"><div class="mui-card-header mui-card-media" style="height: 51.97vw; background-image: url(/'+ cookBook.picSrc;
				html += ')"></div><div class="mui-card-content"><div class="mui-card-content-inner"><p>发表于 '+ cookBook.createTime;
				html += '</p><p style="color: #333;">' + cookBook.cookBookName;
				html += '</p></div></div></div>'
				$('#cookBookAppend').append(html);
			}
			mui('#cookBookList').pullRefresh().endPullupToRefresh(false);
			if(json.cookBookList.length < 10){
				mui('#cookBookList').pullRefresh().disablePullupToRefresh();
			}
		}
	})
}

mui('body').on('tap', '.cook-book-card', function() {
	location.href = '/wxCookBookDetail?cookBookId='+ $(this).data('cookBookId');
})
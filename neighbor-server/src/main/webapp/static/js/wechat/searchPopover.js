mui('.logo_header').on('tap', '.logo_header_search', function() {
	mui('#search_popover').popover('toggle');
	$('.mui-backdrop').remove();
	$('#search_comment_area').val($('.logo_header_search_input').text());
	document.getElementById('search_comment_area').focus();
	if (window.localStorage) {
		$('#history_search_ulli').find('a').remove();
		var searchArray = localStorage.getItem('searchArray');
		if (searchArray != '' && searchArray != null) {
			var arr = searchArray.split(',');
			arr = arr.reverse();
			var arrL = arr.length;
			for (i in arr) {
				var aint = '<a href="/wechatSearch?keyWord='+ arr[i] +'">' + arr[i] + '</a>';
				$('#history_search_ulli').append(aint);
			}
		}
	} else {
		$('#history_search_tips').remove();
	}
});
mui('.search_news_input').on('tap', '.search_cancel', function() {
	document.getElementById('search_comment_area').blur();
	mui('#search_popover').popover('toggle');
});
mui('.search_news_input').on('tap', '.search_search', function() {
	$('#search_form').submit();
	mui('#search_popover').popover('toggle');
});

mui('.history_search_tips').on('tap', '.delete_search_history', function() {
	$('.history_search_ulli').find('a').remove();
	localStorage.removeItem('searchArray');
});
mui('body').on('tap','.history_search_ulli a',function(){
	location.href=$(this).attr('href');
})

search_form.onsubmit = function() {
	var searchKey = $('#search_comment_area').val();
	var arrLength;
	if (window.localStorage) {
		var searchArray = localStorage.getItem('searchArray');
		if (searchArray == '' || searchArray == null) {
			arr = searchKey;
		} else {
			var arr = searchArray.split(',');
			for (i in arr) {
				if (searchKey == arr[i]) {
					arr.splice(i, 1);
				}
			}
			arrLength = arr.push(searchKey);
		}
		if (arrLength > 10) {
			arr.shift();
		}
		localStorage.setItem('searchArray', arr);
	} else {
		$('.history_search_tips').remove();
	}
};

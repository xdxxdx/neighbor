	$(function() {
		mui('.mui-scroll-wrapper').scroll();
		$('body').on('tap', '.ahref', function() {
			var _this = this;//原生
			var url = $(_this).data('url');
			console.log(url);
			location.href=url;
		});
		$('body').on('tap', '#goback', function() {
			window.history.go(-1);
		});
		
	})
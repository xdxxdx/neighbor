mui.init();
mui('.mui-scroll-wrapper').scroll();

mui('body').on('tap', '.ahref', function() {
			location.href = $(this).attr('href');

		});
document.body.addEventListener('touchmove', function(e) {
			e.preventDefault();
		})
mui.init();
(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});

})(mui);
$(function() {
	$('#group_area').height($('#wrap').height() - $('#slider').height());
	$('#scroll1').height(($('#item1mobile').height()));
})
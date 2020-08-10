mui('.mui-scroll-wrapper').scroll();
var gallery = mui('.mui-slider');
gallery.slider({
	interval : 5000
});
mui('body').on('tap', '.ahref', function() {
	var url = $(this).attr('href');
	location.href = url;
})
mui('body').on('tap', '#xuzhiPopoverArea', function() {
	mui('#xuzhiPopover').popover('show');
})
mui('body').on('tap', '#closeXuzhi', function() {
	mui('#xuzhiPopover').popover('hide');
})

mui('body').on('tap', '#kechengPopoverArea', function() {
	mui('#kechengPopover').popover('show');
})
mui('body').on('tap', '#closeKecheng', function() {
	mui('#kechengPopover').popover('hide');
})
mui('body').on('tap','#goback',function(){
	 document.referrer === '' ? window.location.href = '/wxYipinIndex' : window.history.go(-1);
})
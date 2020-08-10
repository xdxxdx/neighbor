mui('body').on('tap','.yipin_footer_nav a.mui-tab-item',function(){
	var navUrl = $(this).attr('href');
	location.href = navUrl;
});
var navTabNum = $('.yipin_footer_nav').attr('navtabnum');
$('#navtab_' + navTabNum).addClass('mui-active');
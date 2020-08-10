mui.init();
$('.yipin_article_body img').each(function(){
	$(this).attr('data-preview-src',$(this).attr('src')).attr('data-preview-group','1');
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false, //是否显示滚动条
	bounce: false ,
});
document.getElementById('yipin_article_content_scroll').addEventListener('scroll',function(e) {
	var titleH = $('#yipin_article_title').height()+15;
	if (Math.abs(e.detail.lastY) > titleH) {
	 	$('.mui-title').addClass('yipin_spa_title');
	 	$('#spa_two_title').show();
	}else{
		$('.mui-title').removeClass('yipin_spa_title');
		$('#spa_two_title').hide();
	}
});

mui('body').on('tap','.ahref',function(){
	location.href= $(this).attr('ahref');
})

mui.previewImage();

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
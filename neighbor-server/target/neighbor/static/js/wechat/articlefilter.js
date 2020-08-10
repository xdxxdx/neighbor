mui.init()
mui.previewImage();
mui('#list_scroll').scroll();
mui('#news_scroll').scroll();
document.getElementById('close_off_canvas').addEventListener('tap',function() {
	mui('.mui-off-canvas-wrap').offCanvas('close');
});

mui('#right_newslist_b').on('tap','.left_view_list_cell',function(){
	var gid = $(this).attr('gid');
	location.href = './wechatNewsDetail?generalId=' + gid;
})

mui('body').on('tap' , '#__MUI_PREVIEWIMAGE' , function(){
	$(this).fadeOut('100',function(){$(this).removeClass('mui-preview-in')});
})

$(function() {
	var starttime = Date.parse(new Date());
	$('#news_article_filter').find('span').removeAttr('style');
	$('#news_article_filter').find('input').removeAttr('style');
	$('#news_article_filter').find('img').removeAttr('style').removeAttr('_src');
	$('#news_article_filter').find('img').attr('data-preview-src','').attr('data-preview-group','1');
	var article = $('#news_article_filter').html();
	console.log(article)
	article = article.replace(/<p>&nbsp;<\/p>/g, '').replace(/src="\/UploadFiles\//g, 'src="http://www.ifncn.com/UploadFiles/').replace(/<input /g, '<img data-preview-src="" data-preview-group="1"');
	article = article.replace(/<a class="insidelink" href="javascript:void\(0\);" title="">/g, '').replace(/<\/a>/g, '');
	$('#news_article_filter').html('').html(article);
	var endtime = Date.parse(new Date());
	console.log(starttime +'||'+ endtime)
	console.log(endtime - starttime);
	
	
	
	$('.left_view_list_cell').click(function(){
		alert()
	})
})

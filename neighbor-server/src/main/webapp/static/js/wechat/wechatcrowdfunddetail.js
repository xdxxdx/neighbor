mui.init();
var cp_setinterval;
if (window.location.hash != '' && window.location.hash != null) {
	location.hash = '';
}
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators : false, // 是否显示滚动条

});
document.getElementById('cfd_scroll_wrapper').addEventListener('scroll',function(e) {
	var imgH = $('.cfd_header_img').height();
	if (Math.abs(e.detail.lastY) > imgH) {
		$('.cfd_currentProgress').css('bottom', '-25px');
	} else {
		$('.cfd_currentProgress').css('bottom', '');
	}
});

mui('.cfd_specificDescription').on('tap','a',function(){
	if($(this).attr('href')){
		location.href=$(this).attr('href');
	}
})

$('.cfd_specificDescription').find('img').attr('data-preview-group', '1');
$('.cfd_specificDescription').find('img').attr('data-preview-src', '');

mui('.cfd_return_page').on('tap', '.cfd_return_page_warnimg_more', function() {
	$('.cfd_return_page_warnimg').addClass('cfd_return_page_complete');
});
mui('.cfd_return_page').on('tap', '.cfd_return_page_warnimg_space', function() {
	$('.cfd_return_page_warnimg').removeClass('cfd_return_page_complete');
});
mui('body').on('tap', '.hash_repay', function() {
	location.hash = '#repay';
});

mui('.cfd_footer_btn').on('tap', '.no_cdf_col', function() {
	$.ajax({
	      type : 'get',
	      url : '/crowdFundFollow?crowdFundId='+$('body').attr('cfid'),
	      dataType : "json",
	      success : function(json) {
	    	 mui.toast('嘿嘿，收到了1次关注，好开心~');
	    	 $('.cfd_footer_collect').removeClass('no_cdf_col').addClass('yes_cdf_col');
	      }
	})
});

mui('.cfd_footer_btn').on('tap', '.yes_cdf_col', function() {
	$.ajax({
	      type : 'get',
	      url : '/crowdFundCancelFollow?crowdFundId='+$('body').attr('cfid'),
	      dataType : "json",
	      success : function(json) {
	    	  mui.toast('555~失去了关注');
	    	 $('.cfd_footer_collect').removeClass('yes_cdf_col').addClass('no_cdf_col');
	      }
	})
});

mui('.cfd_return_page_returnItem').on('tap','.rBaseInfo_sup_btn',function(){
	location.href = $(this).attr('href');
});
$(window).bind('hashchange', function() {
	var hash = window.location.hash;
	$('.hash_control').hide();
	if (hash == '' || hash == null) {
		return false;
	}
	$(hash).show();
});
mui.previewImage();

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

$(function(){
	if (is_weixn()) {
		var description = $(".cfd_specificDescription a").attr("href");
		
		var newstr = description.replace('realCommodityDetail','wechatRealCommodityDetail');
		//应用示例
		$(".cfd_specificDescription a").attr("href", newstr);
	} 
})
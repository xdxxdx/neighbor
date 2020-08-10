 $.ajax({
	type: 'GET',
	url: 'http://139.196.235.228:8087/yipinIM/unreadMessageSize',
	data: {userId:$('body').attr('uid')},
	dataType: 'jsonp',
	jsonp:'callback',
	success: function(jsonp){
         if(jsonp.size > 0){
         	if($('#CustomerService').length > 0){
         		$('#CustomerService').append('<em class="mui-badge mui-badge-danger">' + (jsonp.size > 100 ? '99+' : jsonp.size) + '</em>');
         		$('.ahref[href="/mobileVisitor"]').append('<em class="mui-badge mui-badge-danger" style="top: 10px;right: 0px;z-index: 99;">' + (jsonp.size > 100 ? '99+' : jsonp.size) + '</em>')
         	}else{
         		$('body').append('<div class="unread-message" style="z-index:998;width:50px;height:50px;position:fixed;right:15px;bottom:10vh;"><img class="shakeAnimation" src="/WechatImages/laba-note.png" style="width:100%;height:100%;"/></div>');
         		$('.unread-message').append('<em class="mui-badge mui-badge-danger" style="position: absolute;top: -4px;right: -5px;">' + (jsonp.size > 100 ? '99+' : jsonp.size) + '</em>');
         	}	
         } 
         mui('body').on('tap','.shakeAnimation',function(){
			location.href = '/mobileVisitor';
		})
    }
});


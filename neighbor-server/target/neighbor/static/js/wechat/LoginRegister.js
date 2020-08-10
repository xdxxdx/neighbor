mui.init();
$(function() {
	$('body').on('touchmove', function(event) {
		event.preventDefault();
	});
	
	$('#login').click(function(){
		var ajax_option = {
				url : './yipinCheckUser',
				type : 'post',
				dataType : "html",
				success : function(data) {
					if(data == 1){
						window.location.href = 'http://www.wonyen.com/wechatRealCommodityColumn';
					}else if(data == 0 || data == -1){
						mui.alert('你输入的密码和账户名不匹配,或帐号不存在','逸品生活');
					}else if(data == 3){
						mui.alert('邮箱未激活,请到注册的邮箱查询激活邮件','逸品生活')
					}else if(data == -4){
						mui.alert('登录失败，请检查网络、重启路由器','逸品生活');
					}else{
						mui.alert('未知错误，请摆好姿势再次重试','逸品生活');
					}
				},
				error : function(){
					mui.alert('请切换至WI-FI或信号较好的地方重试','逸品生活')
				}
		}
		if($('#login_username').val() == ''){
			mui.alert('请输入有效的用户名','逸品生活')
		}else if($('#login_password').val() == ''){
			mui.alert('请输入正确的密码','逸品生活')
		}else{
			$('#login-form').ajaxSubmit(ajax_option);
		}
	})
})
var rUrl = document.referrer; //获得来源
var buynum = localStorage.getItem('buynum');
var specid = localStorage.getItem('specid');
var cid = localStorage.getItem('cid');
var referrerpathname = rUrl.replace('http://' + window.location.hostname+':'+window.location.port,''); //获得来源页的pathname
console.log(referrerpathname)
referrerpathname != window.location.pathname && referrerpathname != '' && referrerpathname != '/weChatRegister' && referrerpathname != '/wechatPwdReset' ? localStorage.setItem('rUrl', referrerpathname) : rUrl == '' || localStorage.getItem('rUrl') == '' || localStorage.getItem('rUrl') == undefined || localStorage.getItem('rUrl') == null || localStorage.getItem('rUrl') == ' ' ? localStorage.setItem('rUrl', '/wechatRealCommodityColumn') : console.log(localStorage.getItem('rUrl'));
mui.init();
$(function() {
	$('body').on('touchmove', function(event) {
		event.preventDefault();
	});
	var reseturl = $('body').attr('reseturl');
	if(reseturl != ''){localStorage.setItem('rUrl', '/'+$('body').attr('reseturl'))};
	
	$('#login').click(function(){
		var ajax_option = {
				url : './wxLoginCheck',
				type : 'post',
				dataType : "html",
				success : function(data) {
					if(data == 1){
						var toUrl = localStorage.getItem('rUrl');
						localStorage.removeItem('rUrl');
						//toUrl == ''
						//if(cid == '' || cid == null || cid == undefined){
							if(toUrl==null||toUrl==''){
								//来路不明，直接跳转到首页
								location.replace('/wxYipinIndex');
							}else if(toUrl=='/wechatRealOrderComfirm'||toUrl=='wechatRealOrderComfirm'){
								//从立即购买处过来的
								$('#f_rc').val(cid);
								$('#f_sid').val(specid);
								$('#f_cn').val(buynum);
								$('#ro').submit();	
							}else{
								location.replace(toUrl);
							}
							
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
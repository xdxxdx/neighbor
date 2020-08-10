var phone_format_error = '输入的手机号码格式不正确';
var phone_exist_error = '输入的手机号码不存在，请确认后在输入';
var ajax_error = '系统出现错误，错误原因';
var code_error = '错误的验证码格式，验证码为6位存数字';
var pw_difference_erroe = '2次输入的密码不一致';
var resetpwd_errer = '重置密码失败，请再次尝试';
var code_invalid = '验证码错误或失效，请检查验证码';
var password_null = '请输入密码，密码不可为空';
var password_error = '密码输入错误';
var bind_error = '绑定失败,请刷新页面';
var style = '<style id="addStyle">.mui-popup-backdrop.mui-active{z-index:9999}</style>';
var waiting = '请稍后...';
var nexting = '下一步';
var completing = '完成';
var waitingStatus = 1;
var countdown = 60;
var rUrl = document.referrer; //获得来源
var phone;
var phoneTemp;
var sms_token=$("#sms_token").val();//防刷短信的验证码令牌
mui.init();
document.title = '完善手机号';
var $body = $('body');
var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);


$('#input_tel').keyup(function() {
	var _this = $(this);
	$('#first_error_RRtips').html('&nbsp;');
	_this.val() != '' ? $('#first_next').removeClass('first_cannext') :  $('#first_next').addClass('first_cannext');
});


mui('.Bind_first').on('tap','#first_next',function(){
	if(waitingStatus == 1){
		phone = $('#input_tel').val();
		phoneTemp = phone.substr(0,4) + '***' + phone.substr(7,11);
		if((/^1[34578]\d{9}$/.test(phone))){
			$.ajax({
				type : 'get',
				url : '/checkBindPhone?phone=' + phone,
				dataType : 'html',
				beforeSend : function(){
					waitingStatus = 0;
					$('#first_next').text(waiting);
				}, 
				complete: function(){
					waitingStatus = 1;
					$('#first_next').text(nexting);
			    },
				success : function(data) {
					if(data == 1){
						document.title = '验证帐号登录密码';
						mui('#Bind_second_one').popover('toggle');
						$('.Bind_second_head_tips').find('em').text(phoneTemp);
						$('#second_error_RRtips').html('&nbsp;');
					}else{
						$('#input_login_un').val(phone);
						document.title = '设置逸品帐号登录密码';
						mui('#Bind_second_two').popover('toggle');
						$('#third_error_RRtips').html('&nbsp;');
					}
					$('#first_error_RRtips').html('&nbsp;');
					$('#input_tel').blur();
					$('#input_tel').attr('readonly','true');
					var $body = $('body');
					var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
					$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
				},
				error : function(XMLHttpRequest){
					$('#first_error_RRtips').text(ajax_error + XMLHttpRequest.readyState);
				}
			})
		}else{
			$('#first_error_RRtips').text(phone_format_error);
		}	
	}
	
});

mui('.Bind_second').on('tap','#hasphone_bind_ok',function(){
	if(waitingStatus == 1){
		var hp_pw = $('#input_login_pw').val();
		if(hp_pw != ''){
			$.ajax({
				type : 'get',
				url : '/bindAccount?phone=' + phone + '&pwd=' + hp_pw,
				dataType : 'html',
				beforeSend : function(){
					waitingStatus = 0;
					$('#hasphone_bind_ok').text(waiting);
				}, 
				complete: function(){
					waitingStatus = 1;
					$('#hasphone_bind_ok').text(completing);
			    },
				success : function(data){
					if(data == 1){
						upActive();
						mui.alert('您可以长按图片关注公众号，或开始购物之旅','绑定成功',function(){$('.bind_success').show()});
					}else if(data == 0){
						$('#second_error_RRtips').text(password_error);
					}else{
						$('#second_error_RRtips').text(bind_error);
					}
				},
				error : function(XMLHttpRequest){
					$('#second_error_RRtips').text(ajax_error + XMLHttpRequest.readyState);
				}
			})
		}else{
			$('#second_error_RRtips').text(password_null);
			
		}
	}
	
});

mui('.Bind_input_div ').on('tap' , '.sent_Msn' ,function(){
	if(countdown == 60){
		$.ajax({
			type : 'get',
			url : 'sendSms_wonyen?peUser.phone=' + phone+'&sms_token='+sms_token,
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					$('#phone_hidden').val(phone);
					sentCountDown();
				}else  if(data==-1){
					$('#third_error_RRtips').text('当前手机号码已经注册过了，请重新输入手机号！');
				}else if(data==-2){
					$('#third_error_RRtips').text('手机号格式不正确，请确认手机号码！');
				}else{
					$('#third_error_RRtips').text('发送失败，请刷新页面后重新发送');
				}
			}
		})
	}
});

mui('.Bind_second').on('tap','#nophone_bind_ok',function(){
	if(waitingStatus == 1){
		var ajax_option = {
				url : '/phoneRegister',
				type : 'post',
				dataType : 'html',
				beforeSubmit: function(a,f,o) {
					waitingStatus = 0;
					$('#nophone_bind_ok').text(waiting);
				},
				success : function(data) {
					waitingStatus = 1;
					$('#nophone_bind_ok').text(completing);
					if(data == 1){
						upActive();
						mui.alert('您可以长按图片关注公众号，或开始购物之旅','绑定成功',function(){$('.bind_success').show()});
					}else if(data == -1){
						$('#third_error_RRtips').text(code_invalid);
					}else if(data == -2){
						$('#third_error_RRtips').text('当前手机号码与验证的手机号不匹配，或未验证!');
					}else if(data == -3){
						$('#third_error_RRtips').text(code_invalid);
					}else if(data == -4){
						$('#third_error_RRtips').text('用户名已被注册');
					}
				},
				error : function(XMLHttpRequest){
					waitingStatus = 1;
					$('#nophone_bind_ok').text(completing);
					$('#third_error_RRtips').text(ajax_error + XMLHttpRequest.readyState);
				}
		}
		if($('#phone_hidden').val() != '' && $('#input_login_un').val() != '' && $('#input_login_pw1').val() != '' && $('#checkcode') != ''){
			$('#reg_form').ajaxSubmit(ajax_option);
		}else{
			$('#third_error_RRtips').text('请完整填写注册信息');
		}
	}
});

mui('.mui-popover').on('tap' , '.bind_cancel' , function(){
	$('#input_tel').removeAttr('readonly');
	mui('.mui-popover').popover('hide');
});

mui('.mui-popover').on('tap' , '.reset_pwd_ahref' , function(){
	location.href = $(this).attr('href');
});

mui('body').on('tap' , '.bind_to-buy' , function(){
	location.href = '/wxYipinIndex';
});

mui('body').on('tap' , '.bind_to-user' , function(){
	location.href = '/wechatMyMall';
});

function upActive(){
	$('body').find('#addStyle').remove();
	$('body').append(style);
}


function sentCountDown(){
	console.log(countdown);
	$('.sent_Msn').addClass('sented_Msn');
	if (countdown == 0) {
		$('.sent_Msn').removeClass('sented_Msn');
		$('.sent_Msn').html('获取短信验证码')
		countdown = 60; 
	} else { 
		countdown--; 
		$('.sent_Msn').html('重新发送(' + countdown + 'S)');
		setTimeout(function() { sentCountDown() },1000);
	} 
}


function returnUrl(){
	var returnAction = sessionStorage.getItem('bindReturnAction');
	var returnForm = sessionStorage.getItem('bindReturnForm');
	sessionStorage.removeItem('bindReturnAction');
	sessionStorage.removeItem('bindReturnForm');
	if(returnAction == null || returnForm == null){
		location.href = rUrl
	}else{
		$('#returnform').attr('action',returnAction);
		$('#returnform').append(returnForm);
		$('#returnform').submit();
	}
}
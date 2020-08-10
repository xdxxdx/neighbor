var phone_format_error = '输入的手机号码格式不正确';
var phone_exist_error = '输入的手机号码不存在，请确认后在输入';
var ajax_error = '系统出现错误，错误原因';
var code_error = '错误的验证码格式，验证码为6位存数字';
var pw_difference_erroe = '2次输入的密码不一致';
var resetpwd_errer = '重置密码失败，请再次常识';
var code_invalid = '验证码错误或失效，请检查验证码';
var countdown = 60;
var phone;
var phoneTemp;
mui.init();
document.title = '输入手机号码';
var $body = $('body');
var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);

$('#input_tel').keyup(function() {
	var _this = $(this);
	$('#first_error_RRtips').html('&nbsp;');
	_this.val() != '' ? $('#first_next').removeClass('first_cannext') :  $('#first_next').addClass('first_cannext');
});

mui('.PwdR_first').on('tap','#first_next',function(){
	phone = $('#input_tel').val();
	phoneTemp = phone.substr(0,3) + '*****' + phone.substr(8,11);
	$('.phone_temp').text(phoneTemp)
	if((/^1[34578]\d{9}$/.test(phone))){
		$.ajax({
			type : 'get',
			url : '/sendSms4Reset?peUser.phone=' + phone,
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					$('#first_error_RRtips').html('&nbsp;');
					mui('#PwdR_second').popover('toggle');
					$('#input_tel').blur();
					$('#input_code').focus();
					$('#input_tel').attr('readonly','true');
					sentCountDown();
					document.title = '输入验证码和新密码';
					var $body = $('body');
					var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
					$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
				}else if(data == -1){
					$('#first_error_RRtips').html(phone_exist_error+',错误码:'+data);
				}else{
					$('#first_error_RRtips').text(phone_format_error+',错误码:'+data);
				}
			},
			erroe : function(XMLHttpRequest){
				$('#first_error_RRtips').text(ajax_error + XMLHttpRequest.readyState);
			}
		});
	}else{
		$('#first_error_RRtips').text(phone_format_error+'，检验失败');
	}
});

mui('#PwdR_second').on('tap' , '#second_next' ,function(){
	var code = $('#input_code').val();
	var pw1 = $('#input_pw1').val();
	var pw2 = $('#input_pw2').val();
	if((/\d{6}/.test(code))){
		if(pw1 != pw2){
			$('#second_error_RRtips').text(pw_difference_erroe);
		}else{
			$('#second_error_RRtips').html('&nbsp;');
			$.ajax({
				type : 'get',
				url : '/resetPwdSave?peUser.phone=' + phone + '&activateCode=' + code + '&peUser.userPassword=' + pw1,
				dataType : 'html',
				success : function(data) {
					if(data == 1){
						mui.alert('重置密码成功，正在返回绑定页','逸品生活',function(){location.replace('/wechatGoBind')});
					}else if(data == 0){
						$('#second_error_RRtips').text(resetpwd_errer);
					}else{
						$('#second_error_RRtips').text(code_invalid);
					}
				},
				erroe : function(XMLHttpRequest){
					$('#second_error_RRtips').text(ajax_error + '(' + XMLHttpRequest.readyState + ')');
				}
			});
		}	
	}else{
		$('#second_next').text(code_error);
	}
});

mui('#PwdR_second').on('tap' , '#sent_msg' ,function(){
	if(!$(this).hasClass('noagain_sentcode')){
		$.ajax({
			type : 'get',
			url : 'sendSms4Reset?peUser.phone=' + phone,
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					sentCountDown()
				}else {
					$('#second_error_RRtips').text(phone_format_error + '或没有注册该手机号');
				}
			}
		})
	}
});


function sentCountDown(){
	console.log(countdown);
	$('#sent_msg').addClass('noagain_sentcode');
	if (countdown == 0) {
		$('#sent_msg').removeClass('noagain_sentcode');
		$('#sent_msg').html('重新发送验证码')
		countdown = 60; 
	} else { 
		countdown--; 
		$('#sent_msg').html('重新发送验证码(' + countdown + 'S)');
		setTimeout(function() { sentCountDown() },1000);
	} 
}
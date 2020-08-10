mui.init();
$('#input_pw1').pwStrength({
    strengthProperties: 'level',
    maxLength: 18,
    minLength: 6,
    callback: function(o, l) {console.log(l)}
});
mui('body').on('tap' , '#change_complete',function(){
	$('#change_error_RRtips').html('&nbsp;');
	var patrn=/^[0-9a-zA-Z_#!@,.]{6,16}$/;   
	var nullinput = 0;
	$('input').each(function(){
		$(this).blur();
		if($(this).val() == ''){
			nullinput = nullinput + 1;
		}
	});
	
	if(nullinput != 0){
		$('#change_error_RRtips').html('填写的信息不完整，请检查！');
		return false;
	}
	
	if (!patrn.exec($('#input_pw1').val())){
		$('#change_error_RRtips').html('新密码为6到12位数字，英文或_#!@,.');
		return false;
	} 
	
	if($('#input_pw1').val() != $('#input_pw2').val()){
		$('#change_error_RRtips').html('2次输入的密码不一致！');
		return false;
	};
	
	var ajax_option = {
			url : '/pwdChangeSave',
			type : 'post',
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					mui.alert('密码修改成功，正在转跳到我的逸品','逸品生活',function(){$('input').val('');location.replace('/wechatMyMall');});
				}else if(data == -1){
					$('#change_error_RRtips').append('原密码错误，请确认后输入，或<i class="ahref" href="/wechatPwdReset">忘记密码</i>');
				}else{
					$('#change_error_RRtips').html('修改失败，请稍后重试！');
				}
			}
	};
	$('#change_PWD_form').ajaxSubmit(ajax_option);
});

mui('body').on('tap','.ahref',function(){
	var href = $(this).attr('href');
	href == '' || href == undefined ? mui.alert('功能正在努力实现中，敬请期待','逸品生活') : location.href = href;
});


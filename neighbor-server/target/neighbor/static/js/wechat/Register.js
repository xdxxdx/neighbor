mui.init();
var InterValObj;
var count = 58;
var curCount;
$(function () {
	$('#register').click(function () {
		var ajax_option = {
				url : './phoneRegister',
				type : 'post',
				dataType : "html",
				success : function(data) {
					if(data == 1){
						location.href = 'http://www.wonyen.com/wechatRealCommodityColumn';
					}else if(data == -1){
						mui.alert('验证码过期了，请重新验证！','逸品生活');
					}else if(data == -2){
						mui.alert('当前手机号码与验证的手机号不匹配，或未验证，请重新验证手机号！','逸品生活')
					}else if(data == -3){
						mui.alert('当验证码错误，请重新核对验证码！','逸品生活');
					}else if(data == -4){
						mui.alert('用户名已被注册','逸品生活');
					}
				},
				error : function(){
					mui.alert('请切换至WI-FI或信号较好的地方重试','逸品生活')
				}
		};
		if($('#telephone').val() != '' && $('#peUser.userName').val() != '' && $('#pw1').val() != '' && $('#pw2').val() != '' && $('#activateCode') != ''){
			if($('#pw1').val() == $('#pw2').val()){
				$('#register_form').ajaxSubmit(ajax_option);
			}else{
				mui.alert('输入的2次密码不相同','逸品生活');
			}
		}else{
			mui.alert('请完整填写注册信息','逸品生活');
		}
		
	    
	});
//    $('#register_form').Validform({
//        btnSubmit: '#hidebtn',
//        ajaxPost: true,
//        tiptype: function (msg, o, cssctl) {
//            if (o.obj[0].id == 'telephone' && o.type == '2') {
//                $('.sent_shortmsg').removeAttr('id').attr('id', '');
//            } else if (o.obj[0].id == 'telephone' && o.type != '2') {
//                $('.sent_shortmsg').removeAttr('id').attr('id', 'reg_maynot_sent');
//            };
//            
//        },
//        datatype: {
//            'un': function (gets, obj, curform, regxp) {
//                var reg = /^[a-zA-Z0-9]{3,20}$/i;
//                if (reg.test(gets)) {
//                    return true;
//                } else {
//                    return false;
//                }
//            },
//        },
//        callback: function (data) {
//        	console.log(data)
//        	if(data == -1){
//        		mui.alert('验证码过期了，请重新验证！','逸品生活');
//        	}else if(data == -2){
//        		mui.alert('当前手机号码与验证的手机号不匹配，或未验证，请重新验证手机号！','逸品生活');
//        	}else if(data == -3){
//        		mui.alert('当验证码错误，请重新核对验证码！','逸品生活');
//        	}else if(data == 1){
//        		mui.alert('注册成功','逸品生活');
//        	}else{
//        		mui.alert('这是一个未知的错误','逸品生活');	
//        	}
//        },
//
//    });
	
	$('.sent_shortmsg').click(function(){
		if($(this).attr('id') == 'reg_can_sent'){
			$.ajax({
			      type : 'get',
			      url : './sendSms?peUser.phone=' + $('#telephone').val(),
			      dataType : "html",
			      success : function(data) {
			    	  if(data == '-1'){mui.alert('当前手机号码已经注册过了，请重新输入手机号！','逸品生活');}
			    	  else if(data == '-2'){mui.alert('手机号格式不正确，请确认手机号码','逸品生活');}
			    	  else if(data == '0'){mui.alert('发送失败，请检查网络','逸品生活');}
			    	  else{
			    		$('.sent_shortmsg').removeAttr('id').attr('id', 'reg_maynot_sent');
				  		$('.sent_shortmsg').html('59秒后重发');
			    		curCount = count;
			  			InterValObj = window.setInterval(SetRemainTime, 1000);
			  			
			    	  }
			      }
			})
		}
	})
})

function SetRemainTime() {
	if (curCount == 1) {
		window.clearInterval(InterValObj);
		$('.sent_shortmsg').html('免费发送验证码');
		$('.sent_shortmsg').removeAttr('id').attr('id', 'reg_can_sent');
	} else {
		curCount--;
		$('.sent_shortmsg').html(curCount + '秒后重发');
	}
}

//msg：提示信息;
//o:{obj:*,type:*,curform:*},
//obj指向的是当前验证的表单元素（或表单对象，验证全部验证通过，提交表单时o.obj为该表单对象），
//type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
//curform为当前form对象;
//cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;

//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
//注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
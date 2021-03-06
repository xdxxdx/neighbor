$(function() {
	var type=$("[name=type]").val();
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			adminName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: './accountByName',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该用户名已经存在'
                            }
				}
			},
			trueName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			password : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			detail : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
		}
	}
	if(type==2){
		validForm.fields.adminName={
			message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					}
				}
		}
	}
	$('#thisForm').formValidation(validForm);
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		var bv = $form.data('formValidation');
		bv.validate();
		if(bv.isValid()){
			$.ajax({
				type:'post',
				url:'accountSave',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.search_current_page();//刷新父页面
					}else{
						alert("失败");
					}
				}
				
			});
		}
	});
	$(".show-pwd").click(function(){
		var _this=$(this);
		var type=_this.parent().find("input").attr("type");
		if(type=='password'){
			_this.parent().find("input").attr("type","text");
			_this.text("隐藏")
		}else{
			_this.parent().find("input").attr("type","password");
			_this.text("显示")
		}
	})

});


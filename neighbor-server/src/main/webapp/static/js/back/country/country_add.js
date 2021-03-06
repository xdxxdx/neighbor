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
			countryName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: './countryByName',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该国家已经存在'
                            }
				}
			},
			housepriority : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					    regexp: {
                            regexp: /^([0-9][0-9]*)$/,
                            message: '必须为整数'
                        }
				}
			},
			immpriority : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					    regexp: {
                            regexp: /^([0-9][0-9]*)$/,
                            message: '必须为整数'
                        }
				}
			},
		}
	}
	if(type==2){
		validForm.fields.countryName={
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
				url:'./save',
				 cache: false,
                data: new FormData($('#thisForm')[0]),
                processData: false,
                contentType: false,
                dataType : 'html',
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

});


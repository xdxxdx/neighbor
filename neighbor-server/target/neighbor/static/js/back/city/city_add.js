$(function() {
	var type=$("[name=type]").val();
	var countryId=$("#countryId").val();
	$(".countryId").change(function(){
		countryId=$("#countryId option:selected");
	})
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			cityName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: './cityByName',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该城市已经存在'
                            }
				}
			},
			priority : {
				message : '表单校验失败',
				validators : {
					    regexp: {
                            regexp: /^([0-9][0-9]*)$/,
                            message: '必须为整数'
                        }
				}
			},
		}
	}
	if(type==2){
		validForm.fields.cityName={
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
});


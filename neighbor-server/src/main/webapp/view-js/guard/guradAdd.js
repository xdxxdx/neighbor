$(function() {
	var type=$("[name=type]").val();
	var communityId=$("#communityId").val();
	$("#communityId").change(function(){
		communityId=$("#communityId option:selected").val();
	})
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			guardName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'GET',
                                url: 'backend/guardByName?communityId='+communityId,
                                validKey: 'valid',
		                        dataType:'json',
		                        message: '该楼栋或公共大门名称已存在'
                            }
				}
			},
			guardNo : {
				message : '表单校验失败',
				validators : {
					    regexp: {
                            // regexp: /^\d{4}|\d{8}|\d{16}$/,
							regexp: /^\d{4}$/,
                            message: '必须为4位数字'
                        }
				}
			},
		}
	}
	if(type==2){
		validForm.fields.guardName={
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
				url:'backend/saveGuard',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.location.reload();
					}else{
						alert("失败");
					}
				}
				
			});
		}
	});
});


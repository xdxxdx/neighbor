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
			address: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			realName: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			cardNo: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			age : {
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
	$('#thisForm').formValidation(validForm);
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		var bv = $form.data('formValidation');
		bv.validate();
		if(bv.isValid()){
			$.ajax({
				type:'post',
				url:'user/saveUser',
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


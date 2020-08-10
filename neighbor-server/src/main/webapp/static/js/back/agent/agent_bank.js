$(function() {
	var validForm = {
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			bankNum : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				   regexp: {
                       regexp: /^([1-9]{1})(\d{14}|\d{18})$/,
                       message: '不是有效的银行卡号'
                   }
				}
			},
			bankAccountName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
		}
	}
	$('#thisForm').formValidation(validForm);
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		var bv = $form.data('formValidation');
		bv.validate();
		if (bv.isValid()) {
			$.ajax({
				type : 'post',
				url : '/agent/bankChange',
				data : $('#thisForm').serialize(),
				dataType : 'html',
				success : function(data) {
					if (data > 0) {
						alert("银行卡信息设置成功");
						document.getElementById("thisForm").reset();
						location.href="/agentHome";
					}else{
						alert("银行卡信息设置失败");
					}
				}

			});
		}
	})

})

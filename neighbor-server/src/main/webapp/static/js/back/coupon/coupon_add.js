

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
			couponValue : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					}, 
					greaterThan: {
		                        value: 0,
		                        inclusive: false,
		                        message: '请填写数字'
		                    }
				}
			},
            consumeAmount : {
                message : '表单校验失败',
                validators : {
                    notEmpty : {
                        message : '不能为空'
                    },
                      greaterThan: {
		                        value: 0,
		                        inclusive: false,
		                        message: '请填写数字'
		                    }
                }
            },
            startTime : {
                message : '表单校验失败',
                validators : {
                    notEmpty : {
                        message : '不能为空'
                    },
                }
            },
            endTime : {
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
		if(bv.isValid()){
                $.ajax({
                    type : 'post',
                    url : './save',
                    cache: false,
                    data: new FormData($('#thisForm')[0]),
                    processData: false,
                    contentType: false,
                    dataType : 'html',
                    success : function(data) {
                        if (data > 0) {
                        	alert("成功");
                            window.parent.close_layer();
                            window.parent.search_current_page();//刷新父页面
                        } else {
                            alert("失败")
                        }
                    }
                });
		}
	});

});













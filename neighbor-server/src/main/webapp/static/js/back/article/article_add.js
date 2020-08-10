$(function() {
	if($("#articleType").val()=="repairCase"){
		$("#guideCategory").attr("disabled","disabled");
	}else{
		$("#guideCategory").removeAttr("disabled");
	}
	var current_num=$("#articleIntro").val().length;
	if(current_num<=150){
		$(".current-num").text(150 - current_num);
	}
	var type=$("[name=type]").val();
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			articleUrl : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
            articleTitle : {
                message : '表单校验失败',
                validators : {
                    notEmpty : {
                        message : '不能为空'
                    },
                }
            },
             source : {
                message : '表单校验失败',
                validators : {
                    notEmpty : {
                        message : '不能为空'
                    },
                }
            },
		}
	}
	$("#articleType").change(function(){
		if($("#articleType").val()=="repairCase"){
			$("#guideCategory").attr("disabled","disabled");
			}else{
				$("#guideCategory").removeAttr("disabled");
			}
	})
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
	$('#articleIntro').bind('input propertychange', function(){
		var current_num=$(this).val().length;
			if(current_num<=150){
			$(".current-num").text(150 - $(this).val().length);
			}else{
				$(this).val($(this).val().slice(0,150));
			}
	})

});













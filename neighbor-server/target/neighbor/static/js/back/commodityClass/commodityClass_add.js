$(function() {
	initSelect();
	var type=$("[name=type]").val();
	//二级联动
	$("#topClassIdSelect").remoteChained("#classType","./topClassListByClassType?topClassId="+$("#topClassIdTmp").val())
	$("#secondClassIdSelect").remoteChained("#topClassIdSelect","./secondClassListBytopClass?secondClassId="+$("#secondClassIdTmp").val())
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			commodityClassName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: './commodityClassNameOnly',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该菜单已经存在'
                            }
				}
			},
		}
	}
	if(type==2){
		validForm.fields.commodityClassName={
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
			var classType=$('#classType') .val();
			if(classType==2){
				$("#parentClassId").val($("#topClassIdSelect").val().substring(4));
			}else if(classType==3){
				$("#parentClassId").val($("#secondClassIdSelect").val().substring(4));
			}
			$.ajax({
				type:'post',
				url:'./save',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.query();//刷新父页面
					}else{
						alert("失败");
					}
				}
				
			});
		}
	});
	
	$("#classType").change(function(){
		setTimeout(function(){ initSelect(); }, 1000);
	})
	$("#topClassIdSelect").change(function(){
		setTimeout(function(){ initSelect(); }, 1000);
	})

});
function initSelect(){
	var classType=$('#classType') .val();
	if(classType==1){
		$(".root-class").attr("disabled","disabled");
		$(".second-class").attr("disabled","disabled");
	}else if(classType==2){
		$(".root-class").attr("disabled",false);
		$(".second-class").attr("disabled","disabled");
	}else{
		$(".root-class").attr("disabled",false);
		$(".second-class").attr("disabled",false);
	}
}


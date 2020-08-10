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
			userNo : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: '/user/exist',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该用户不存在'
                            }
				}
			},
			tagetUseNo : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					remote: {
                                type: 'POST',
                                url: '/user/exist',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该用户不存在'
                            }
				}
			},
			projectCode: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			dealFee : {
				message : '表单校验失败',
				validators : {
					    greaterThan: {
                                value: 0,
                                message: '请填写数字'
                            },
				}
			},
			commissionRate: {
				message : '表单校验失败',
				validators : {
					    greaterThan: {
                                value: 0,
                                message: '请填写数字'
                            },
				}
			},
			commissionFee: {
				message : '表单校验失败',
				validators : {
					    greaterThan: {
                                value: 0,
                                message: '请填写数字'
                            },
				}
			},
		}
	}
	$("body").on("click",".rate-count",function(){
		var ruleId=$("#ruleId").val();
		var levelId=$("#levelId").val();
		var dealFee=$("#dealFee").val();
		if(dealFee!=null&&dealFee!=''){
			$.ajax({
				type:'post',
				url:'/commissionRule/commissionRuleById?ruleId='+ruleId,
//				data:$('#thisForm').serialize(),
				dataType:'json',
				success:function(data){
					var firstRate=data.rule.firstRate;
					var secondRate=data.rule.secondRate;
					var rate;
					if(levelId==1){
						rate=firstRate;
					}else{
						rate=secondRate;
					}
					$("#commissionRate").val(rate);
					$("#commissionFee").val((dealFee*rate/100).toFixed(2));
				}
				
			});
		}else{
			alert("请先填写成交金额");
		}
			
	})
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


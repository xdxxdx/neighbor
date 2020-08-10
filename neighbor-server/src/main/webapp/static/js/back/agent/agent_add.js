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
			agentName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					//远程验证，请求服务器接口后验证
					remote: {
                                type: 'POST',
                                url: './agentByName',
                                 validKey: 'valid',
		                        dataType:'json',
		                        message: '该代理名称已经存在'
                            }
				}
			},
			phone : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					remote: {
                        type: 'POST',
                        url: './agentByPhone',
                         validKey: 'valid',
                        dataType:'json',
                        message: '该手机号已经存在'
                    },
                    phone : {
                        message : '不是有效的电话号码',
                        country:'CN'
                    },
				}
			},
		}
	}
	if(type==2){
		validForm.fields.agentName={
			message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					}
				}
		}
		validForm.fields.phone={
				message : '表单校验失败',
					validators : {
						notEmpty : {
							message : '不能为空'
						},
	                    phone : {
	                        message : '不是有效的电话号码',
	                        country:'CN'
	                    },
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
	
    $('#parentAgentName').autocomplete({
        serviceUrl: '/agent/parentAgentJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
          $("#selection-ajax1").html('您选择了'+suggestion.value);
          console.log(suggestion.data.agentId)
          $('[name="parentAgentId"]').val(suggestion.data.agentId);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
          $('#selection-ajax1').html('您未选择，若无则填无');
        }
    });
    $('#introduceAgentName').autocomplete({
        serviceUrl: '/agent/allAgentJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
          $("#selection-ajax2").html('您选择了'+suggestion.value);
          console.log(suggestion.data.agentId)
          $('[name="introduceAgentId"]').val(suggestion.data.agentId);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
          $('#selection-ajax2').html('您未选择，若无则填无');
        }
    });

});


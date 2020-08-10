$(function() {
	initSelect();
	var type = $("[name=type]").val();
	// 二级联动
	$("#topClassIdSelect").remoteChained(
			"#merchantClassType",
			"./topClassListByClassType?topClassId=" + $("#topClassIdTmp").val()
					+ "&merchantId=" + $("#merchantId").val())
	$("#secondClassIdSelect").remoteChained(
			"#topClassIdSelect",
			"./secondClassListBytopClass?secondClassId="
					+ $("#secondClassIdTmp").val())
	var validForm = {
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			merchantCommodityClassName : {
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
	$("#submit1").click(
			function() {
				var $form = $("#thisForm");
				var bv = $form.data('formValidation');
				bv.validate();
				if (bv.isValid()) {
					var merchantClassType = $('#merchantClassType').val();
					if (merchantClassType == 2) {
						$("#parentClassId").val(
								$("#topClassIdSelect").val().substring(4));
					} else if (merchantClassType == 3) {
						$("#parentClassId").val(
								$("#secondClassIdSelect").val().substring(4));
					}
					$.ajax({
						type : 'post',
						url : './save',
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								window.parent.close_layer();
								window.parent.query();// 刷新父页面
							} else {
								alert("失败");
							}
						}

					});
				}
			});
	$("#merchantClassType").change(function() {
		setTimeout(function(){ initSelect(); }, 1000);
		
	})
	$("#topClassIdSelect").change(function() {
		setTimeout(function(){ initSelect(); }, 1000);
	})

});
function initSelect() {
	var merchantClassType = $('#merchantClassType').val();
	if (merchantClassType == 1) {
		$(".root-class").attr("disabled", "disabled");
		$(".second-class").attr("disabled", "disabled");
	} else if (merchantClassType == 2) {
		$(".root-class").attr("disabled", false);
		$(".second-class").attr("disabled", "disabled");
	} else {
		$(".root-class").attr("disabled", false);
		$(".second-class").attr("disabled", false);
	}
}

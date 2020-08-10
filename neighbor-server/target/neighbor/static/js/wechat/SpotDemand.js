$(function() {
	$('body').on('touchmove', function(event) {
		event.preventDefault();
	});
	
	$(document).on('change', '#selectclass', function() {
		sentselectclassid($('#selectclass').val());
	})
	
	sentselectclassid($('#selectclass').find('option').eq(0).val());
	
	$('#sentsd').click(function(){
		var ajax_option = {
				url : '/spotDemandSave',
				type : "post",
				dataType : "html",
				success : function(data) {
					if (data == 1) {
						alert('发布成功');
					} else {
						alert('发布失败！请检查是否填写完整');
					}
				}
			}
		 $('#spotdemand_form').ajaxSubmit(ajax_option);
	})
})
function sentselectclassid(v) {
	v = v.split(',')[0];
	$('#selectspotCommodity').find('option').remove();
	$.ajax({
		type : 'get',
		url : './spotCommodityJsonByClassId?classId=' + v,
		dataType : 'json',
		async : false,
		success : function(json) {
			var jl = json.spotCommodityList.length;

			if (jl == 0) {

			} else {
				var optionlist = '';
				for (var i = 0; i < jl; i++) {
					optionlist = optionlist + '<option value="'
							+ json.spotCommodityList[i].spotCommodityId + ','
							+ json.spotCommodityList[i].spotCommodityName
							+ '">'
							+ json.spotCommodityList[i].spotCommodityName
							+ '</option>'
				}
				$('#selectspotCommodity').append(optionlist);
			}

		},
		error : function() {
		}
	})
};
function SpotDemand(){
	
}
//var ue = UE.getEditor('dpeditor', {
//	toolbars : [ ['cleardoc','selectall','|', 'undo', 'redo', '|', 'bold', 'italic', 'underline',
//			'strikethrough','fontsize', 'forecolor','fontfamily','link','|', 'justifyleft', 'justifycenter',
//			'justifyright','|','horizontal','pasteplain', '|','simpleupload','insertimage','insertvideo','wordimage','|', 'removeformat', 'emotion', 'map','|','drafts','charts']
//
//	],
//	autoHeightEnabled : false,
//	autoFloatEnabled : false,
//	elementPathEnabled : false,
//	relativePath : true,
//	pasteplain : true,
//	saveInterval : 60 * 60 * 24,
//	wordCount : false,
//
//});
//ue.ready(function() {
//	var temp = $('.temp_n').html();
//	ue.setContent(temp);
//});
$(".panel-body").hide(); // 信息内部页面切换
$("#commodityListPage1").show();
$(".button_switch_hyzx span").click(
		function() {
			var n = $(".button_switch_hyzx span").index(this);
			$(this).addClass("button_switch_select").siblings().removeClass(
					"button_switch_select")
			$(".panel-body").hide();
			$(".panel-body").eq(n).show();

		});

// 上传图片
$('#select_portrait_tt').click(function() { // 选择图片
	$('.changeimg .fileimg').eq(-1).click();
});
$(".deleteUploadImg").click(function() {
	$('.changeimg .fileimg').eq(-1).click();
})

	


$(document).on("click", ".deleteUploadImg", function() {
	var gnl = confirm("确定要删除?");
	if (gnl == true) {
		$(this).parent(".up_portrait").remove();
		return true;
	} else {
		return false;
	}

})
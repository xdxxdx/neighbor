$(function() {
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		$.ajax({
			type: 'post',
			url: './cashSave',
			cache: false,
			data: new FormData($('#thisForm')[0]),
			processData: false,
			contentType: false,
			dataType: 'html',
			success: function(data) {
				if(data > 0) {
					alert("成功");
					window.parent.close_layer();
					window.parent.search_current_page(); //刷新父页面
				} else {
					alert("失败")
				}
			}
		});
	});

});
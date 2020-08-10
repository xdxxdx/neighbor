let type = $("#type").val();
$(function() {

	$("#submit1").click(function() {
		$(".mask").show();
		$.ajax({
			type: 'post',
			url: './videoSave',
			cache: false,
			data: new FormData($('#thisForm')[0]),
			processData: false,
			contentType: false,
			dataType: 'html',
			success: function(data) {
				if(data > 0) {
					alert("成功");
					$(".mask").hide();
					window.location.reload();
				} else {
					alert("失败")
				}
			}
		});
	})
})
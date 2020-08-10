$(function() {
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		$("#guardNo").val($("#m2").ySelectedValues(","));
		console.log($("#guardNo").val());
			$.ajax({
				type:'post',
				url:'userSetGuardNo',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.search_current_page();
					}else{
						alert("失败");
					}
				}
				
			});
	});
});


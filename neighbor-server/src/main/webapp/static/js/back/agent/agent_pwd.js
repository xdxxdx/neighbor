$(function(){
	$("#submit1").click(function(){
			$.ajax({
			type:'post',
			url:'/agent/pwdChange',
			data:$('#thisForm').serialize(),
			dataType:'json',
			success:function(data){
				alert(data.msg);
				if(data.result>0){
					document.getElementById("thisForm").reset(); 
				}
			}
			
		});
	})

})

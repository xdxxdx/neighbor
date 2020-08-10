$(function() {
	var type=$("[name=type]").val();
	var communityId=$("#communityId").val();
	$("#communityId").change(function(){
		communityId=$("#communityId option:selected").val();
	});
	var floorId=$("#floorId").attr("floorId");
	var floorCode=$("#floorId").attr("floorCode");
	var roomId=$("#roomId").attr("roomId");
	var roomCode=$("#roomId").attr("roomCode");
	$("#floorId").remoteChained("#communityId", "floorJsonByCommunityId");
	setTimeout(function(){
		if(floorId!=null&&floorId!=''&&floorId!='undefined'&&floorId!=0){
			$("#floorId").prepend("<option value="+floorId+">"+floorCode+"</option>");
			$("#floorId").val(floorId);
		}
		//开始初始化区级
		$("#roomId").remoteChained("#floorId", "roomJsonByFloorId");
		if(roomId!=null&&roomId!=''&&roomId!='undefined'&&roomId!=0){
			setTimeout(function(){
				$("#roomId").prepend("<option value="+roomId+">"+roomCode+"</option>");
				$("#roomId").val(roomId);
			},500);
		}
	}, 1000);
	var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			realName: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			cardNo: {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			age : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
					regexp: {
						regexp: /^([0-9][0-9]*)$/,
						message: '必须为整数'
					}
				}
			},
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
				url:'saveUser',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.location.reload();
					}else{
						alert("失败");
					}
				}
				
			});
		}
	});
});


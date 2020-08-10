var cxt = $("input#cxt").val();


$(function() {
	$('#userListTable').DataTable({
		"ajax": {
			"url": cxt + "/backend/listUser",
			"dataSrc": "data"
		},
		// fnDrawCallback:function (table) {
		//     //点击显示大图
		//     var colorbox_params = {
		//         closeButton: false,
		//         scalePhotos: true,
		//         scrolling: false,
		//         maxWidth: '800px',
		//         onOpen: function () {
		//             document.body.style.overflow = 'hidden';
		//         },
		//         onClosed: function () {
		//             document.body.style.overflow = 'auto';
		//         },
		//         onComplete: function () {
		//             $.colorbox.resize();
		//         }
		//     };
		//     $('#userListTable [data-rel="colorbox"]').colorbox(colorbox_params);
		// },
		"columns": [{
				"title": "用户ID",
				"data": "id"
			},
			{
				"title": "小区",
				"data": "communityId",
				"width": "10%",
				"render": function(data, type, full) {
					if (data == 7763) {
						return '陶然新村'
					} else if (data == 7764) {
						return '东篱新村'
					} else if (data == 7765) {
						return "陶然居";
					}
				}
			},
			{
				"title": "门牌号",
				"data": "address"
			},
			{
				"title": "头像",
				"data": "avatarUrl",
				"render": function(data, type, full) {
					return '<image src="' + data + '" width="50px" height="50px"/>';
				}
			},
			{
				"title": "注册时间",
				"data": "createDate",
				"render": function(data, type, full) {
					return timeFormat(data);
				}
			},
			{
				"title": "昵称",
				"data": "nickName"
			},
			{
				"title": "姓名",
				"data": "realName"
			},
			{
				"title": "性别",
				"data": "gender",
				"render": function(data, type, full) {
					return (data == 1) ? "男" : "女";
				}
			},
			{
				"title": "年龄",
				"data": "age"
			},
			{
				"title": "手机号",
				"data": "mobile"
			},
			{
				"title": "爱心币",
				"data": "heartPoint"
			},
			{
				"title": "角色",
				"data": "role",
				"render": function(data, type, full) {
					if (data == 'owner') {
						return '业主'
					} else if (data == 'propertyManager') {
						return '物业管理'
					} else if(data=='TrxcManager'){
						return '陶然新村管理员'
					}else if(data=='TrgManager'){
						return '陶然居管理员'
					}else if(data=='DlxcManager'){
						return '东篱新村管理员'
					}
				}
			},
			{
				"title": "门禁",
				"data": "guardNo",
				"width": "10%",
				"render": function(data, type, full) {
					if (data == null) {
						return '暂未设置'
					} else {
						return data;
					}
						
				}
			},
			{
				"title": "操作",
				"data": "id",
				width: "25%",
				"render": function(data, type, row, full) {
					var param = JSON.stringify(row);
					var html = '';
					if (row.state == 0)
						html += '<button type="button" class="btn bg-orange margin" onclick="changeState(' + data +
						', 1)">冻结</button>';
					else if(row.state!=0)
						html += '<button type="button" class="btn bg-green margin" onclick="changeState(' + data +
						', 0)">审核</button>';
					html += '<button type="button" class="btn bg-green margin" onclick="setRole(' + row.id + ',\''+row.role+'\')">角色</button>';
					html += '<button type="button" class="btn bg-green margin" onclick="setGuard(' + row.id + ')">门禁</button>';
					html += '<button type="button" class="btn bg-green margin" onclick="edit(' + row.id + ')">编辑</button>';
					return html;
				}
			},
		],

		'paging': true,
		'lengthChange': false,
		'searching': true,
		'ordering': true,
		'info': true,
		'autoWidth': true,
		"aaSorting": [
			[0, "desc"]
		],
		"oLanguage": {
			"sUrl": "Chinese.json"
		}
	})
});
//关闭弹出层
function close_layer() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.closeAll();
	});
}
function changeState(id, state) {
	$.ajax({
		url: cxt + "/user/changeState",
		type: 'post',
		data: {
			'id': id,
			'state': state
		},
		success: function(data) {
			if (data == true) {
				alert("操作成功");
				window.location.reload();
			} else
				alert("操作失败");
		}
	});
}
function setRole(id,role){
	$('#popup_div [name="id"]').val(id);
	$('#popup_div [name="role"]').val(role);
	layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title : '角色设置',
				area : [ '400px', '200px' ],
				type : 1,
				content : $('#popup_div')
			});
		});
}
  $("#submit1").click(function() {
		var $form = $("#thisForm");
		$.ajax({
			type:'post',
			url:'user/changeRole',
			data:$('#thisForm').serialize(),
			dataType:'html',
			success:function(data){
				if(data>0){
					alert("成功");
					close_layer();
					window.location.reload();
				}else{
					alert("失败");
				}
			}
			
		});
		
	});

//编辑用户
function edit(id){
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.open({
			title: '编辑',
			type: 2,
			area: ['600px', '450px'],
			shade: 0.5,
			maxmin: true,
			content: 'userEdit?id='+id
		});
	});
}
// function setGuard(id,guardNo){
// 		$('#popup_div2 [name="id"]').val(id);
// 		if(guardNo!=null&&guardNo!=''&&guardNo!='null'){
// 			$('#popup_div2 [name="guardNo"]').val(guardNo);
// 		}
//
// 		layui.use('layer', function() {
// 				var layer = layui.layer;
// 				layer.open({
// 					title : '门禁设置',
// 					area : [ '400px', '200px' ],
// 					type : 1,
// 					content : $('#popup_div2')
// 				});
// 			});
// 	}
//   $("#submit2").click(function() {
// 		var $form = $("#thisForm2");
// 		var guardNo=$("#guardNo").val();
// 		var reg=/^\d{4}$/;
// 		if(reg.test(guardNo)){
// 			$.ajax({
// 				type:'post',
// 				url:'user/setGuardNo',
// 				data:$('#thisForm2').serialize(),
// 				dataType:'html',
// 				success:function(data){
// 					if(data>0){
// 						alert("成功");
// 						close_layer();
// 						window.location.reload();
// 					}else{
// 						alert("失败");
// 					}
// 				}
//
// 			});
// 		}else{
// 			alert("请输入4位数字");
// 		}
// 	});
	function validate(reg,val){
		var reg=new RegExp(reg);
		if(reg.test(val)){
			return true;
		}
		return false;
	}
function setGuard(userId){
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.open({
			title: '编辑',
			type: 2,
			area: ['600px', '450px'],
			shade: 0.5,
			maxmin: true,
			content: 'userGuardSet?userId='+userId
		});
	});
}
//关闭弹出层
function close_layer() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.closeAll();
	});
}
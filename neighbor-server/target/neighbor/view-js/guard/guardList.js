var cxt = $("input#cxt").val();

$(function() {

	$('#itemListTable').DataTable({
		"ajax": {
			"url": cxt + "/backend/listGuard",
			"dataSrc": "data"
		},
		"columns": [{
				"title": "ID",
				"data": "id",
				"width": "10%",
			},
			{
				"title": "发布时间",
				"data": "createDate",
				"width": "10%",
				"render": function(data, type, full) {
					return timeFormat(data);
				}
			},
			{
				"title": "小区",
				"data": "communityId",
				"width": "15%",
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
			// {
			// 	"title": "类型",
			// 	"data": "guardType",
			// 	"width": "10%",
			// 	"render": function(data, type, full) {
			// 		var typeName = ["公共大门", "楼栋"];
			// 		return typeName[data];
			// 	}
			// },
			{
				"title": "门禁名称",
				"data": "guardName",
				"width": "15%"
			},
			{
				"title": "编号",
				"data": "guardNo",
				"width": "15%"
			},
			{
				"title": "操作",
				"data": "id",
				"render": function(data, type, full) {
					let html='<button type="button" class="btn bg-orange margin" onclick="editGuard(' + data +
						')">编辑</button>';
						html+='<button type="button" class="btn bg-red margin" onclick="deleteGuard(' + data +
						')">删除</button>'
					return html;
				}
			},
		],

		'paging': true,
		'lengthChange': false,
		'searching': true,
		'ordering': true,
		'info': true,
		'autoWidth': false,
		"aaSorting": [
			[0, "desc"]
		],
		"oLanguage": {
			"sUrl": "Chinese.json"
		}
	});
})


function deleteGuard(id) {
	$.ajax({
		url: cxt + "/backend/deleteGuard",
		type: 'post',
		data: {
			'id': id
		},
		success: function(data) {
			if (data >0) {
				alert("删除成功");
				window.location.reload();
			} else
				alert("删除失败");
		}
	});
}
function editGuard(id){
	layui.use('layer', function() {
				var layer = layui.layer;
				layer.open({
					title: '编辑',
					type: 2,
					area: ['600px', '450px'],
					shade: 0.5,
					maxmin: true,
					content: 'guardEdit?id='+id
				});
			});
}
//弹出层
$(".btn_add").click(function() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.open({
			title: '新增',
			type: 2,
			area: ['600px', '450px'],
			shade: 0.5,
			maxmin: true,
			content: 'guardAdd'
		});
	});
});
//关闭弹出层
function close_layer() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.closeAll();
	});
}

function newNotice() {

	var title = $('#inputTitle').val().replace(/\s+/g, "");
	var info = $('#inputInfo').val();
	var author = $('#inputAuthor').val().replace(/\s+/g, "");
	var type = $('#type').val();

	if (title.length == 0) {
		alert('请填写标题');
		return;
	} else if (info.length == 0) {
		alert('请填写内容');
		return;
	} else if (author.length == 0) {
		alert('请填写发布者');
		return;
	} else if (type == 9) {
		alert('请选择发布类型');
		return;
	}
	var files;
	if (type == 2) {
		files = document.getElementById('uploadPic').files;
		if (files.length == 0) {
			alert('请选择上传图片');
			return;
		}
		var form = new FormData(),
			url = '/neighbor/business/uploadRes',
			file = files[0],
			name = Date.now(),
			ext = file.name.substring(file.name.length - 3);
		form.append('file', file);
		form.append('userId', 'admin');
		form.append('type', '9');
		form.append('format', ext);
		form.append('name', name.toString());
		console.log(file)
		fetch(url, {
			method: 'POST',
			body: form
		}).then(function(response) {
			console.log(response);
			if (response.status >= 200 && response.status < 300) {
				$.ajax({
					url: cxt + "/backend/addNotice",
					type: 'post',
					data: {
						'title': title,
						'author': author,
						'info': info,
						'type': type,
						'picUrl': name + "_admin_9." + ext
					},
					success: function(data) {
						if (data == true) {
							alert("添加成功");
							window.location.reload();
						} else
							alert("添加失败");
					}
				});
			} else {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		});
	} else {
		$.ajax({
			url: cxt + "/backend/addNotice",
			type: 'post',
			data: {
				'title': title,
				'author': author,
				'info': info,
				'type': type,
			},
			success: function(data) {
				if (data == true) {
					alert("添加成功");
					window.location.reload();
				} else
					alert("添加失败");
			}
		});
	}
}

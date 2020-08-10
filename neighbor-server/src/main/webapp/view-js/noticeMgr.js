var cxt = $("input#cxt").val();

$(function() {

	$('#itemListTable').DataTable({
		"ajax": {
			"url": cxt + "/backend/listNotice",
			"dataSrc": "data"
		},
		"columns": [{
				"title": "ID",
				"data": "id"
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
				"title": "类型",
				"data": "type",
				"width": "6%",
				"render": function(data, type, full) {
					var typeName = ["通知", "公告", "首页轮播"];
					return typeName[data];
				}
			},
			{
				"title": "标题",
				"data": "title",
				"width": "8%"
			},
			{
				"title": "内容",
				"data": "info"
			},
			{
				"title": "图片",
				"data": "image",
				"render": function(data, type, full) {
					return '<image src="https://wx.xmblyc.com/neighbor-res/res//swiper/' + data +
						'" width="100px" height="50px"/>';
				}
			},
			{
				"title": "发布者",
				"data": "author",
				"width": "6%"
			},
			{
				"title": "显示状态",
				"data": "status",
				"width": "10%", //宽度
				"render": function(data, type, full) {
					if(data==0){
						return '隐藏'
					}else{
						return '显示'
					}
				}
			},
			{
				"title": "操作",
				"data": "id",
				"width": "13%",
				"render": function(data, type, row,full) {
					var html=''
					if (row.status == 0)
						html += '<button type="button" class="btn bg-red margin" onclick="changeStatus(' + data +
						', 1)">显示</button>';
					else
						html += '<button type="button" class="btn bg-red margin" onclick="changeStatus(' + data +
						', 0)">隐藏</button>';
					html+='<button type="button" class="btn bg-orange margin" onclick="deleteNotice(' + data + ')">删除</button>';
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


function deleteNotice(id) {

	$.ajax({
		url: cxt + "/backend/deleteNotice",
		type: 'post',
		data: {
			'id': id
		},
		success: function(data) {
			if (data == true) {
				alert("删除成功");
				window.location.reload();
			} else
				alert("删除失败");
		}
	});
}
function changeStatus(id, status) {
	$.ajax({
		url: cxt + "/backend/changeNoticeStatus",
		type: 'post',
		data: {
			'id': id,
			'status': status
		},
		success: function(data) {
			if (data >0) {
				alert("操作成功");
				window.location.reload();
			} else
				alert("操作失败");
		}
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
		console.log(file);
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

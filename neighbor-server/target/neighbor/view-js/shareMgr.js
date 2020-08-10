var cxt = $("input#cxt").val();

$(function() {




	$('#itemListTable').DataTable({
		"ajax": {
			"url": cxt + "/backend/listShare",
			"dataSrc": "data"
		},
		fnDrawCallback: function(table) {
			//点击显示大图
			var colorbox_params = {
				closeButton: false,
				scalePhotos: true,
				scrolling: false,
				maxWidth: '800px',
				onOpen: function() {
					document.body.style.overflow = 'hidden';
				},
				onClosed: function() {
					document.body.style.overflow = 'auto';
				},
				onComplete: function() {
					$.colorbox.resize();
				}
			};
			$('#itemListTable [data-rel="colorbox"]').colorbox(colorbox_params);
		},
		"columns": [{
				"title": "ID",
				"width": "2%",
				"data": "id"
			},
			{
				"title": "图片",
				"data": "images",
				"width": "12%", //宽度
				"render": function(data, type, full) {
					var pics = data.split(",");
					var pre = 'http://wx.xmblyc.com/neighbor-res/res/';
					var html = '';
					for (var pic of pics) {
						html += '<a href="' + pre + pic + '" data-rel="colorbox"><image src="' + pre + pic +
							'" width="50px" height="50px" /></a>'
					}
					return html;
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
				"title": "发布时间",
				"data": "createDate",
				"width": "10%",
				"render": function(data, type, full) {
					return timeFormat(data);
				}
			},
			{
				"title": "是否置顶",
				"data": "isTop",
				"width": "10%", //宽度
				"render": function(data, type, full) {
					if(data==0){
						return '未置顶'
					}else{
						return '置顶'
					}
				}
			},
			{
				"title": "状态",
				"data": "status",
				"width": "10%", //宽度
				"render": function(data, type, full) {
					if(data==0){
						return '未审核'
					}else{
						return '已通过'
					}
				}
			},
			{
				"title": "操作",
				"data": "id",
				"width": "25%", //宽度
				"render": function(data, type, row, full) {
					var html = ''
					if (row.isTop == 0)
						html += '<button type="button" class="btn bg-red margin" onclick="changeTopStatus(' + data +
						', 1)">置顶</button>';
					else
						html += '<button type="button" class="btn bg-red margin" onclick="changeTopStatus(' + data +
						', 0)">取消置顶</button>';
					if (row.status == 0)
						html += '<button type="button" class="btn bg-red margin" onclick="changeStatus(' + data +
							', 1)">通过</button>';
					else
						html += '<button type="button" class="btn bg-red margin" onclick="changeStatus(' + data +
							', 0)">冻结</button>';
						html+='<button type="button" class="btn bg-orange margin" onclick="deleteShare(' + data + ')">删除</button>';
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
	})
})


function deleteShare(id) {

	$.ajax({
		url: cxt + "/backend/deleteShare",
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
function changeTopStatus(id, isTop) {
	$.ajax({
		url: cxt + "/backend/changeShareTop",
		type: 'post',
		data: {
			'id': id,
			'isTop': isTop
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
function changeStatus(id, status) {
	$.ajax({
		url: cxt + "/backend/changeShareStatus",
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

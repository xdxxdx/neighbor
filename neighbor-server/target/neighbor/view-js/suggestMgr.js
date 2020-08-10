var cxt = $("input#cxt").val();


$(function () {

    $('#userListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listSuggest",
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
        "columns": [
            {"title" : "ID", "data": "id" },
            { "title" : "提交时间", "data": "createDate" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            {
                "title" : "头像",
                "data": "user.avatarUrl",
                "render": function (data, type, full) {
                    return '<image src="' + data + '" width="50px" height="50px"/>';}
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
				"title": "类别",
				"data": "type",
				"width": "10%",
				"render": function(data, type, full) {
					if (data == 0) {
						return '报事报修'
					} else {
						return '意见建议'
					} 
				}
			},
            { "title" : "昵称", "data": "user.nickName" },
            { "title" : "手机号", "data": "user.mobile" },
            { "title" : "标题", "data": "title" },
            { "title" : "内容", "data": "info" },
        ],

        'paging'      : true,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : true,
        "aaSorting" : [[0, "desc"]],
        "oLanguage": {
            "sUrl": "Chinese.json"
        }
    })
})


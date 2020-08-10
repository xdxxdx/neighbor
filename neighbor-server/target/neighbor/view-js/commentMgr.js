var cxt = $("input#cxt").val();

$(function () {




    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listComment",
            "dataSrc": "data"
        },
        "columns": [
            {"title" : "ID", "width": "4%", "data": "id" },
            {
                "title" : "发布者头像",
                "data": "user.avatarUrl","width": "8%",
                "render": function (data, type, full) {
                    return '<image src="' + data + '" width="50px" height="50px"/>';}
            },
            { "title" : "发布者昵称", "data": "user.nickName","width": "8%" },
            { "title" : "发布时间", "data": "createDate","width": "10%" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            { "title" : "内容", "data": "info"},
            {"title" : "操作", "data": "id","width": "5%",
                "render": function (data, type, full) {return '<button type="button" class="btn bg-orange margin" onclick="deleteShare(' + data + ')">删除</button>';}
            },
        ],
        'paging'      : true,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : false,
        "aaSorting" : [[0, "desc"]],
        "oLanguage": {
            "sUrl": "Chinese.json"
        }
    })
})


function deleteShare(id) {

    $.ajax({
        url: cxt + "/backend/deleteComment",
        type: 'post',
        data: {'id': id},
        success: function (data) {
            if (data == true) {
                alert("删除成功");
                window.location.reload();
            }else
                alert("删除失败");
        }
    });
}


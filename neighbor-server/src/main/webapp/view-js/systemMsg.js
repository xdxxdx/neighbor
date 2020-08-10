var cxt = $("input#cxt").val();

$(function () {

    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listSystemMsg",
            "dataSrc": "data"
        },
        "columns": [
            { "title" : "ID", "data": "id" },
            { "title" : "发布时间", "data": "createDate","width": "10%" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            { "title" : "标题", "data": "title","width": "8%" },
            { "title" : "内容", "data": "info"},
            {"title" : "操作", "data": "id",
                "render": function (data, type, full) {return '<button type="button" class="btn bg-orange margin" onclick="deleteNotice(' + data + ')">删除</button>';}
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
    });


})


function deleteNotice(id) {

    $.ajax({
        url: cxt + "/backend/deleteSystemMsg",
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


function newMessage() {

    var title = $('#inputTitle').val().replace(/\s+/g,"");
    var info = $('#inputInfo').val();

    if (title.length == 0)
    {
        alert('请填写标题');
        return;
    }
    else if (info.length == 0)
    {
        alert('请填写内容');
        return;
    }

    $.ajax({
        url: cxt + "/backend/addSystemMsg",
        type: 'post',
        data: {
            'title': title,
            'info': info
        },
        success: function (data) {
            if (data == true) {
                alert("添加成功");
                window.location.reload();
            }else
                alert("添加失败");
        }
    });
}



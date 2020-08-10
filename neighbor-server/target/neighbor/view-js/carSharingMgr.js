var cxt = $("input#cxt").val();

$(function () {

    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listCarSharing",
            "dataSrc": "data"
        },
        "columns": [
            {"title" : "ID", "width": "2%", "data": "id" },
            { "title" : "出发点", "data": "startpoint","width": "8%" },
            { "title" : "目的地", "data": "destination"},
            { "title" : "发布时间", "data": "createDate","width": "10%" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            { "title" : "出发时间", "data": "departTime","width": "10%" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            { "title" : "车牌号", "data": "carnum"},
            { "title" : "座位数", "data": "seat"},
            { "title" : "发布人", "data": "user.nickName"},
            // {"title" : "操作", "data": "id",
            //     "render": function (data, type, full) {return '<button type="button" class="btn bg-orange margin" onclick="deleteShare(' + data + ')">删除</button>';}
            // },
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
        url: cxt + "/backend/deleteCarSharing",
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


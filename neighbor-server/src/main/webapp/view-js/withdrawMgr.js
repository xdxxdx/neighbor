var cxt = $("input#cxt").val();

$(function () {
    $('#userListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listWithdraw",
            "dataSrc": "data"
        },
        "columns": [
            {"title" : "ID", "data": "id" },
            // {
            //     "title" : "头像",
            //     "data": "user.avatarUrl",
            //     "render": function (data, type, full) {
            //         return '<image src="' + data + '" width="50px" height="50px"/>';}
            // },
            { "title" : "姓名", "data": "realName" },
            { "title" : "申请日期", "data": "createDate" ,
                "render": function (data, type, full) {return timeFormat(data);}},
            { "title" : "提现爱心币", "data": "heartPoint" },
            { "title" : "提现金额", "data": "amount" },
            { "title" : "银行", "data": "bankname" },
            { "title" : "银行卡号", "data": "bankcard" },
            { "title" : "支行", "data": "subbranch" },
            {
                "title" : "操作",
                "data": "id",
                "render": function (data, type, row, full) {
                    if (row.state == 0)
                        return '<button type="button" class="btn bg-orange margin" style="height: 25px;padding:0 10px 0 10px;margin:0;" onclick="remit(' + data + ')">确认汇款</button>';
                    else
                        return '';
                }
            },
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

function remit(id) {
    $.ajax({
        url: cxt + "/backend/doWithdraw",
        type: 'post',
        data: {'id': id},
        success: function (data) {
            if (data == true) {
                alert("操作成功");
                window.location.reload();
            }else
                alert("操作失败");
        }
    });
}



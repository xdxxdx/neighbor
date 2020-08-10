var cxt = $("input#cxt").val();


$(function () {

    $.ajax({
        url: cxt + "/backend/getTotalAmount",
        type: 'get',
        success: function (data) {
            if (data.success) {
                $('#income').html(data.data.income);
                $('#withdraw').html(data.data.withdraw);
            }
        }
    });

    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listAmountdetail",
            "dataSrc": "data"
        },
        "columns": [
            {"title": "ID", "data": "id"},
            {
                "title": "创建时间",
                "data": "createDate",
                "render": function (data, type, full) {
                    return timeFormat(data);
                }
            },
            {
                "title": "完成时间", "data": "finishTime",
                "render": function (data, type, full) {
                    return timeFormat(data);
                }
            },
            {"title": "金额", "data": "amount"},
            {"title": "爱心币", "data": "heartPoint"},
            {
                "title": "类型", "data": "type",
                "render": function (data, type, full) {
                    return (data == 0) ? "充值" : "提现";
                }
            }
        ],

        'paging': true,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': true,
        "aaSorting" : [[0, "desc"]],
        "oLanguage": {
            "sUrl": "Chinese.json"
        }
    })
})


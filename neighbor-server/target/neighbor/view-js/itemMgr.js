var cxt = $("input#cxt").val();

$(function () {
    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listItem",
            "dataSrc": "data"
        },
        fnDrawCallback:function (table) {
            //点击显示大图
            var colorbox_params = {
                closeButton: false,
                scalePhotos: true,
                scrolling: false,
                maxWidth: '100%',
                maxHeight: '100%',
                onOpen: function () {
                    document.body.style.overflow = 'hidden';
                },
                onClosed: function () {
                    document.body.style.overflow = 'auto';
                },
                onComplete: function () {
                    $.colorbox.resize();
                }
            };
            $('#itemListTable [data-rel="colorbox"]').colorbox(colorbox_params);
        },
        "columns": [
            {"title" : "发布ID", "data": "id" },
            {"title" : "图片", "data": "mainImage",
                "render": function (data, type, full) {
                var pre = 'https://wx.icrat.cn/resources/neighbor/pic/';
                return '<a href="' + pre + data + '" data-rel="colorbox"><image src="' + pre + data + '" width="50px" height="50px"/></a>';}
            },
            { "title" : "名称", "data": "name" },
            { "title" : "一级类别", "data": "firstType",
                "render": function (data, type, full) {var first = ['吃', '用', '玩', '帮'];return first[data];}},
            { "title" : "二级类别",
                "render": function (data, type, row, full) {var second = [['美食DIY', '家乡味道'],['闲置赠送', '物品租赁', '二手买卖'],['旅游出行', '运动健身', '休闲娱乐'], ['资讯分享', '生活互助']];return second[row.firstType][row.secondType];}},
            { "title" : "支付方式", "data": "payType",
                "render": function (data, type, full) {var pay = ['爱心币', '在线支付', '免费分享'];return pay[data];}},
            { "title" : "过期时间", "data": "endTime" ,
                "render": function (data, type, full) {return (data < new Date().getTime()) ? '已过期' : timeFormat(data);}},
            { "title" : "价格", "data": "price" ,
                "render": function (data, type, row, full) {
                var res = '';
                switch (row.payType)
                {
                    case 0:res = "💗" + data;break;
                    case 1:res = "￥" + data;break;
                    case 2:res = "免费分享";break;
                }
                return res}},
            { "title" : "数量", "data": "num" },
            { "title" : "配送方式", "data": "deliverType" ,
                "render": function (data, type, full) {var deliver = ['自提', '送货上门', '自行约定'];return deliver[data];}},
            {"title" : "操作", "data": "id",
                "render": function (data, type, row, full) {
                    if (row.endTime > new Date().getTime() && row.num > 0)
                        return '<button type="button" class="btn bg-orange margin" onclick="down(' + data + ')">下架</button>';
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

function down(id) {
    $.ajax({
    url: cxt + "/item/downItem",
    type: 'post',
    data:{'id':id},
    success: function (data) {
        if (data == true) {
            alert("下架成功");
            window.location.reload();
        }else
            alert("下架失败");
    }
});

}


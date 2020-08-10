var cxt = $("input#cxt").val();
// $.ajax({
//     url: cxt + "/backend/listUser",
//     type: 'get',
//     success: function (data) {
//
//
//         if (data.success) {
//             var tab = $('#datatable1');//绑定表格id
//             for (i in data.data) {
//                 tab.html(tab.html() + "<tr class=\"gradeA\"><td>" + data.data[i].id + "</td><td>" + data.data[i].nickName +
//                     "</td><td>" + data.data[i].mobile + "</td><td>" + data.data[i].heartPoint + "</td><td>" + data.data[i].address + "</td></tr>");
//             }
//             for (i in data.data) {
//                 tab.html(tab.html() + "<tr class=\"gradeA\"><td>" + data.data[i].id + "</td><td>" + data.data[i].nickName +
//                     "</td><td>" + data.data[i].mobile + "</td><td>" + data.data[i].heartPoint + "</td><td>" + data.data[i].address + "</td></tr>");
//             }
//             tab.bootstrapTable('refresh', data.data);
//         } else {
//
//         }
//     }
// });

//
//
//alert("111");
test2();

function test2() {
    $('#datatable1').dataTable( {


        aaData: [
                  {
                        "engine":   "Trident",
                        "browser":  "Internet Explorer 4.0",
                        "platform": "Win 95+",
                        "version":  4,
                        "grade":    "X",
                        "test" : "123"
                      },
                  {
                        "engine":   "Trident",
                        "browser":  "Internet Explorer 5.0",
                        "platform": "Win 95+",
                        "version":  5,
                        "grade":    "C",
                      "test" : "456"
                      }
                ],
        columns: [
            { "mData": "engine" },
            { "mData": "browser" },
            { "mData": "platform" },
            { "mData": "version" },
            { "mData": "grade" },
        ]
        // aoColumns: [
        //     { "sTitle": "Engine",   "mData": "engine" },
        //   { "sTitle": "Browser",  "mData": "browser" },
        //   { "sTitle": "Platform", "mData": "platform" },
        //   { "sTitle": "Version",  "mData": "version" },
        //   { "sTitle": "Grade",    "mData": "grade" }
        // ]
        // "oLanguage": {
        //     "sProcessing": "处理中...",
        //     "sLengthMenu": "显示 _MENU_ 项结果",
        //     "sZeroRecords": "没有匹配结果",
        //     "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        //     "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        //     "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        //     "sInfoPostFix": "",
        //     "sSearch": "搜索:",
        //     "sUrl": "",
        //     "sEmptyTable": "表中数据为空",
        //     "sLoadingRecords": "载入中...",
        //     "sInfoThousands": ",",
        //     "oPaginate": {
        //         "sFirst": "首页",
        //         "sPrevious": "上页",
        //         "sNext": "下页",
        //         "sLast": "末页"
        //     },
        //     "oAria": {
        //         "sSortAscending": ": 以升序排列此列",
        //         "sSortDescending": ": 以降序排列此列"
        //     }
        // }
    } );
}


function test1() {

    $('#datatable1').dataTable({

        // autoWidth: false, //禁用自动调整列宽
        // stripeClasses: ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
        // processing: true, //隐藏加载提示,自行处理
        // serverSide: true, //启用服务器端分页
        // searching: false, //禁用原生搜索
        // orderMulti: false, //启用多列排序
        // order: [], //取消默认排序查询,否则复选框一列会出现小箭头　
        //"pagingType": "full_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
        //"bProcessing" : true, //DataTables载入数据时，是否显示‘进度’提示
        //"bServerSide" : true, //是否启动服务器端数据导入
        //"bStateSave" : true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态
        //"bJQueryUI" : true, //是否使用 jQury的UI theme
        //"bPaginate" : true,// 分页按钮
        "bFilter": false,// 搜索栏
        //"bLengthChange" : true,// 每行显示记录数
        //"iDisplayLength" : 10,// 每页显示行数
        //"bSort" : false,// 排序
        //"bInfo" : true,// Showing 1 to 10 of 23 entries 总记录数没也显示多少等信息
        //"sScrollY" : 450, //DataTables的高
        //"sScrollX" : 820, //DataTables的宽
        //"aLengthMenu" : [10, 30, 50], //更改显示记录数选项
        //"iDisplayLength" : 10, //默认显示的记录数
        //"bAutoWidth" : false, //是否自适应宽度 //"bScrollInfinite" : false, //是否启动初始化滚动条
        //"bScrollCollapse" : true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
        //"bPaginate" : true, //是否显示（应用）分页器
        //"bInfo" : true, //是否显示页脚信息，DataTables插件左下角显示记录数
        //"sPaginationType" : "full_numbers", //详细分页组，可以支持直接跳转到某页
        //"bSort" : true, //是否启动各个字段的排序功能
        //"aaSorting" : [[1, "asc"]], //默认的排序方式，第2列，升序排列

        "oLanguage": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },

    });
}



// $("#datatable1").dataTable({
//     lengthMenu: [10, 20, 30, 40],//定义在每页显示记录数的select中显示的选项。
//     lengthChange: false,
//     processing: true,//是否显示表格加载状态，在数据量大的时候需要
//     destroy: true,//允许销毁替换，在表格重新查询时，可以自动销毁以前的data
//     paging: true,//分页
//     serverSide: true,//开启后端分页
//     height: 500,
//     pagingType: "full_numbers",//分页样式的类型
//     ordering: false,//是否启用排序
//     searching: false,//搜索
//     ajax: {
//         url: cxt + "/backend/listUser",
//
//         success :function(result){
//             alert("11111");
//         }
//     },
//     language: {
//         url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Chinese.json'
//     },
//
//     columns: [//定义行数据字段
//         {'data': 'id'},
//         {'data': 'nickName'},
//         {'data': 'mobile'},
//         {'data': 'heartPoint'},
//         {'data': 'address'}
//     ],
//     columnDefs: [//自定义处理行数据，和行样式
//         {"width": "3%", "targets": 0},
//         {"width": "4%", "targets": 1},
//         {"width": "4%", "targets": 2},
//         {"width": "6%", "targets": 3},
//         {"width": "6%", "targets": 4}]
// });

var userType = $("body").attr("userType");
var bar = "#xdx_bar";
if (userType == 'merchant') {
    bar = "#xdx_bar_merchant";
}
var table;
$(function () {
    //级联
    $("#cityId").remoteChained("#countryId", "/city/cityJsonByCountryId");
    setTimeout(function () {
        $("#cityId").prepend("<option value=''>请选择</option>");
        $("#cityId").val('');
    }, 500);
    //国家变化
    $("#countryId").change(function () {
        setTimeout(function () {
            $("#cityId").prepend("<option value=''>请选择</option>");
            $("#cityId").val('');
        }, 500);
    })
    //弹出层
    $(".btn_add").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                title: '新增',
                type: 2,
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: '/house/add'
            });
        });

    });
    //layui表格
    layui.use('table', function () {
        table = layui.table;
        table.render({
            elem: '#xdx_grid',
            autoSort: false,//禁用
//				height : 315,
            id: 'xdx_id',
            url: './list' //数据接口
            ,
            //自定义排序
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                , groups: 4 //只显示 4 个连续页码
                , first: false //不显示首页
                , last: false //不显示尾页

            },
//				  initSort: {
//				    field: 'creatTime' //排序字段，对应 cols 设定的各字段名
//				    ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
//				  },
            cols: [[ //表头
                {
                    field: 'houseType',
                    title: '房产类型',
                    width: '8%',
                    templet: function (item) {
                        if (item.houseType == 1) {
                            return "新房";
                        } else if (item.houseType == 2) {
                            return "二手房";
                        } else if (item.houseType == 3) {
                            return "楼花"
                        }
                    }
                },

                {
                    field: 'projectCode',
                    title: '项目编码',
                    width: '8%',
                }, {
                    field: 'projectName',
                    title: '项目名',
                    width: '10%',
                }, {
                    field: 'status',
                    title: '状态',
                    width: '8%',
                    templet: function (item) {
                        if (item.status == 1) {
                            return "通过";
                        } else if (item.status == 0) {
                            return "未通过";
                        }
                    }
                }, {
                    field: 'proTypeName',
                    title: '物业类型',
                    width: '8%',
                }, {
                    field: 'totalPriceCh',
                    title: '总价',
                    width: '8%',
                    sort: true,
                    templet: function (item) {
                        return "￥" + item.totalPriceCh + "万元";
                    }
                }, {
                    field: 'useArea',
                    title: '使用面积',
                    width: '8%',
                    sort: true,
                    templet: function (item) {
                        return item.useArea + "m²";
                    }
                }, {
                    field: 'countryName',
                    title: '国家',
                    width: '8%',
                }, {
                    field: 'cityName',
                    title: '城市',
                    width: '8%',
                }, {
                    field: 'serviceFee',
                    title: '平台抽佣',
                    width: '8%',
                }, {
                    field: 'isRecommend',
                    title: '是否推荐',
                    width: '6%',
                    templet: function (item) {
                        if (item.isRecommend == 1) {
                            return "是";
                        } else if (item.isRecommend == 0) {
                            return "否";
                        }
                    }
                }, {
                    field: 'isIndex',
                    title: '是否好房必抢',
                    width: '6%',
                    templet: function (item) {
                        if (item.isIndex == 1) {
                            return "是";
                        } else if (item.isIndex == 0) {
                            return "否";
                        }
                    }
                }, {
                    field: 'buildTime',
                    title: '建造时间',
                    width: '10%',
                    sort: true,
                }, {
                    field: 'deliverTime',
                    title: '交房时间',
                    width: '10%',
                    sort: true,
                }, {
                    fixed: 'right',
                    title: '操作',
                    width: 250,
                    align: 'center',
                    toolbar: bar
                }]]
        });
        //监听工具条
        table.on('tool(xdx_filter)', function (obj) {
            var data = obj.data;
            if (obj.event == 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
                var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值
                alert(checkStatus.data) //获取选中行的数据
            } else if (obj.event == 'del') {
                layer.confirm('真的删除行么', function (index) {
                    $.ajax({
                        type: 'post',
                        url: './hidden?houseId=' + data.houseId,
                        data: $('#thisForm').serialize(),
                        dataType: 'html',
                        success: function (data) {
                            if (data > 0) {
                                alert("成功");
                                obj.del();
                                layer.close(index);
                            } else {
                                alert("失败");
                            }
                        }
                    });
                });
            } else if (obj.event == 'edit') {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.open({
                        title: '编辑',
                        type: 2,
                        area: ['100%', '100%'],
                        shade: 0.5,
                        maxmin: true,
                        content: './edit?houseId=' + data.houseId
                    });
                });
//				var param = {houseId:data.houseId};
//				$.open_page("/house/edit", param);
            } else if (obj.event === 'video') {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.open({
                        title: '视频',
                        type: 2,
                        area: ['600px', '450px'],
                        shade: 0.5,
                        maxmin: true,
                        content: './video?houseId=' + data.houseId
                    });
                });
            } else if (obj.event === 'examine') {
                $('#popup_div [name="projectCode"]').val(data.projectCode);
                $('#popup_div [name="status"]').val(data.status);
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.open({
                        title: '审核',
                        area: ['400px', '400px'],
                        type: 1,
                        content: $('#popup_div')
                    });
                });
            }
        });
        //监听排序
        table.on('sort(xdx_filter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            //驼峰转下划线
            let sortname = $.toLine(obj.field);
            let sortorder = obj.type;
            console.log(this); //当前排序的 th 对象

            //尽管我们的 table 自带排序功能，但并没有请求服务端。
            //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
            table.reload('xdx_id', {
                initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
                , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                    sortname: sortname //排序字段
                    , sortorder: sortorder //排序方式
                }
            });
        });
        //查询事件
        $("#btn_search").on('click', function () {
            search();
        })
    });
});

//关闭弹出层
function close_layer() {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.closeAll();
    });
}

//查询
var search_current_page = function () {
    table.reload('xdx_id', {
        where: { // 设定异步数据接口的额外参数，任意设
            countryId: $("#countryId").val(),
            cityId: $("#cityId").val(),
            projectCode: $("#projectCode").val(),
            projectName: $("#projectName").val(),
            totalPriceCh: $("#totalPriceCh").val(),
            useArea: $("#useArea").val(),
            downPayRatio: $("#downPayRatio").val(),
            isRecommend: $("#isRecommend").val(),
            isIndex: $("#isIndex").val(),
            merchantId: $("#merchantId").val(),
        },
        page: {
            curr: $(".layui-laypage-curr em:nth-child(2)").text()
            // 重新从第 1 页开始
        }
    });
};
//查询
var search = function () {
    table.reload('xdx_id', {
        where: { //设定异步数据接口的额外参数，任意设
            countryId: $("#countryId").val(),
            cityId: $("#cityId").val(),
            projectCode: $("#projectCode").val(),
            projectName: $("#projectName").val(),
            totalPriceCh: $("#totalPriceCh").val(),
            useArea: $("#useArea").val(),
            downPayRatio: $("#downPayRatio").val(),
            isRecommend: $("#isRecommend").val(),
            isIndex: $("#isIndex").val(),
            merchantId: $("#merchantId").val(),
        }
        , page: {
            curr: 1 //重新从第 1 页开始
        }
    });
};
var lock = false;
$("#submit1").click(function () {

    if (lock) {
        return false;
    }
    lock = true;
    var $form = $("#thisForm");
    $.ajax({
        type: 'post',
        url: '/house/examine',
        data: $('#thisForm').serialize(),
        dataType: 'html',
        success: function (data) {
            if (data > 0) {
                alert("成功");
                window.parent.close_layer();
                search_current_page();//刷新父页面
            } else {
                alert("失败");
            }
            lock = false;
        }


    });

});



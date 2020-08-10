var cxt = $("input#cxt").val();
var provinceList = [];
var cityList = [];
var areaList = [];


$(function () {
//Initialize Select2 Elements
    $('.select2').select2();
    $.fn.modal.Constructor.prototype.enforceFocus = function () {};

    $.ajax({
        url: cxt + "/business/getProvinces",
        type: 'get',
        success: function (data) {
            if (data) {
                var select = document.getElementById("province");
                provinceList = data;
                provinceList.forEach(p=> {
                    select.add(new Option(p.province, p.id));
                });

            }else
                alert("获取数据出错！");
        }
    });


    $(".select2").on("select2:select",function(e){
        var selected = e.currentTarget;
        var sid = selected.id;
        switch (sid)
        {
            case 'province':
                var index = selected.selectedIndex; // 选中索引
                //var text = selected.options[index].text; // 选中文本
                //var value = selected.options[index].value; // 选中值
                //console.log(text + value);
                $.ajax({
                    url: cxt + "/business/getCitiesByProvinceId",
                    type: 'get',
                    data: {
                        id : provinceList[index - 1].provinceid
                    },
                    success: function (data) {
                        if (data) {
                            var select = document.getElementById("city");
                            cityList = data;
                            select.options.length = 0;
                            select.add(new Option('请选择', '0'));
                            cityList.forEach(p=> {
                                select.add(new Option(p.city, p.id));
                            });
                            select = document.getElementById("area");
                            select.options.length = 0;
                            select.add(new Option('请选择', '0'));
                        }else
                            alert("获取数据出错！");
                    }
                });

                break;
            case 'city':
                var index = selected.selectedIndex; // 选中索引
                //var text = selected.options[index].text; // 选中文本
                //var value = selected.options[index].value; // 选中值
                //console.log(text + value);
                $.ajax({
                    url: cxt + "/business/getAreasByCityId",
                    type: 'get',
                    data: {
                        id : cityList[index - 1].cityid
                    },
                    success: function (data) {
                        if (data) {
                            var select = document.getElementById("area");
                            areaList = data;
                            areaList.forEach(p=> {
                                select.add(new Option(p.area, p.id));
                            });
                        }else
                            alert("获取数据出错！");
                    }
                });
                break;
        }
    })
    $('#itemListTable').DataTable({
        "ajax": {
            "url": cxt + "/backend/listCommunity",
            "dataSrc": "data"
        },
        "columns": [
            { "title" : "ID", "data": "id" },
            { "title" : "小区名称", "data": "name" },
            { "title" : "省份", "data": "area.area"},
            { "title" : "城市", "data": "province.province"},
            { "title" : "区/县", "data": "city.city"},
            {"title" : "操作", "data": "id",
                "render": function (data, type, full) {return '<button type="button" class="btn bg-orange margin" onclick="deleteCommunity(' + data + ')">删除</button>';}
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
    });


})


function deleteCommunity(id) {

    $.ajax({
        url: cxt + "/backend/deleteCommunity",
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


function newCommunity() {
    var name = $('#inputName').val().replace(/\s+/g,"");
    var provinceId = $('#province').val();
    var cityId = $('#city').val();
    var areaId = $('#area').val();
    if (name.length == 0)
    {
        alert('请填写小区名称');
        return;
    }
    else if (provinceId == 0)
    {
        alert('请选择省份');
        return;
    }
    else if (cityId == 0)
    {
        alert('请选择城市');
        return;
    }
    else if (areaId == 0)
    {
        alert('请选择区/县');
        return;
    }
    $.ajax({
        url: cxt + "/backend/addCommunity",
        type: 'post',
        data: {
            'name': name,
            'provinceId': provinceId,
            'cityId': cityId,
            'areaId': areaId,
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



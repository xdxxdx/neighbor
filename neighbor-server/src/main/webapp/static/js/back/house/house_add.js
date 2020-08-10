let type = $("#type").val();
$(function () {
    //级联
    $("#cityId").remoteChained("#countryId", "/city/cityJsonByCountryId");
    var cityId = $("#cityId").attr("cityId");
    var cityName = $("#cityId").attr("cityName");
    if (cityId != null && cityId != '') {
        setTimeout(function () {
            $("#cityId").prepend("<option value='" + cityId + "'>" + cityName + "</option>");
            $("#cityId").val(cityId);
        }, 500);
    }
    setTimeout(function () {
        $("#cityId").append("<option value='-1'>其他</option>");
    }, 500);
    $("#countryId").change(function () {
        setTimeout(function () {
            $("#cityId").append("<option value='-1'>其他</option>");
        }, 500);
    })
    var E = window.wangEditor; //这里的id为<div id="editor"中的id.
    var editor = new E('#editor'); // 配置服务器端地址,也就是controller的请求路径，不带项目路径，前面没有/
    editor.customConfig.uploadImgServer = '/wangUpload';//配置属性名称，绑定请求的图片数据 //controller会用到，可以随便设置，但是一定要与controller一致
    editor.customConfig.uploadFileName = 'wangUploadName';
    //创建编辑器
    editor.create();
    // var editor2 = new E('#editor2'); // 配置服务器端地址,也就是controller的请求路径，不带项目路径，前面没有/
    // editor2.customConfig.uploadImgServer = '/wangUpload';//配置属性名称，绑定请求的图片数据 //controller会用到，可以随便设置，但是一定要与controller一致
    // editor2.customConfig.uploadFileName = 'wangUploadName';
    // //创建编辑器
    // editor2.create();
    if (type == 2) {
        editor.txt.html($(".temp").html());
        // editor2.txt.html($(".temp2").html())
    }
    // var lock = false;
    $("#submit1").click(function () {
        // if (lock) {
        //     return false;
        // }
        // lock = true;
        $("#detail").val(editor.txt.html());
        // $("#advantage").val(editor2.txt.html());
        var checkArr = []; //选中的数组
        var checkStr; //选中的数组的字符串形式，用逗号隔开
        $(".sui-tag li.tag-selected").each(function () {
            var _this = $(this);
            var tagId = _this.data("tagId");
            checkArr.push(tagId);
        });
        checkStr = checkArr.join(",");
        $("#tags").val(checkStr);
        console.log(checkStr);
        $("#thisForm").validate({
            success: function () {
                ajax();
            },
            fail: function () {
                alert("请检查是否所有表单都填写正确")
            }
        })
    })

})


function ajax() {

    $.ajax({
        type: 'post',
        url: './save',
        cache: false,
        data: new FormData($('#thisForm')[0]),
        processData: false,
        contentType: false,
        dataType: 'html',
        success: function (data) {
            lock = false;
            if (data > 0) {
                alert("成功");
                window.parent.close_layer();
                window.parent.search_current_page();//刷新父页面
            } else {
                alert("失败")
            }

        }
    });

}

//点击tag时间
$(".sui-tag").on("click", "li", function () {
    var _this = $(this);
    _this.toggleClass("tag-selected")
})

let type=$("#type").val();
$(function(){
	var E = window.wangEditor; //这里的id为<div id="editor"中的id.
	var editor1 = new E('#editor1'); // 配置服务器端地址,也就是controller的请求路径，不带项目路径，前面没有/
	editor1.customConfig.uploadImgServer = '/wangUpload';//配置属性名称，绑定请求的图片数据 //controller会用到，可以随便设置，但是一定要与controller一致 
	editor1.customConfig.uploadFileName = 'wangUploadName'; 
	//创建编辑器
	editor1.create();
	if(type==2){
		editor1.txt.html($(".temp1").html());
	}
	$("#submit1").click(function(){
	$("#detail").val(editor1.txt.html());
	$("#thisForm").validate({
	    success: function() {
	      ajax();
	    },
	    fail:function(){
	    	alert("请检查是否所有表单都填写正确")
	    }
	 })
	})

})
function ajax(){
	  $.ajax({
                type : 'post',
                url : './save',
                cache: false,
                data: new FormData($('#thisForm')[0]),
                processData: false,
                contentType: false,
                dataType : 'html',
                success : function(data) {
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

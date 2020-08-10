$(function(){
	var limit_num=1;
	var img_num=$("body").attr("img-num");
	if(img_num!=null&&img_num!=''){
		limit_num=img_num;
	}
	var del_url='';
	if($("body").attr("del-url")!=null&&$("body").attr("del-url")!=''&&$("body").attr("del-url")!='undefined'){
		del_url=$("body").attr("del-url");
	}
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击.file文本框触发*/
	$(document).on(
				'change',
				'.file',
				function(){
		var $file= $(this);//指代这个input type=file元素
		var file =$file[0];//取得input type=file对象的第一个元素
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲div.z_photo元素
		var fileList = file.files; //获取的图片文件
		var current_num = imgContainer.find(".z_file").length;//当前数量，以section.z_file来表示（其实包含了那个尚未上传图片的加号的section)
		if(current_num > limit_num ){
			alert("超过指定的上传图片数目");  //因为current_num包含了尚未上传图片的那个section,所以此处用>,而不是>=.
		}else{
			validateUp(file);//验证图片的合法性
			var fileObject=file.files[0];//取得file对象
			for(var i = 0;i<fileList.length;i++){
			 var imgUrl = window.URL.createObjectURL(fileObject);//预览图片的路径
			 var $section = $file.parent();//取得input file的父级section
			 $section.addClass("loading");
			 if ($file.attr('t') != 'c'){
			 	//如果t=c则表示这个input是已经有上传过图片的，t!=c则表示是加号的input，带加号的input被点击后需要给他加上一个删除标记，
			 	var $img0 = $("<img class='close-upimg'>").on("click",function(event){
//				    event.preventDefault();
//					event.stopPropagation();
					$(".works-mask").show();
					delParent = $(this).parent();//delParent指的是删除标记所在的section.z_file
				});   
				$img0.attr("src","./static/imgUpload/img/a7.png").appendTo($section);
			 }
				var $img = $section.find('.add-img');
		     	console.log($img);
		     	$img.attr("src",imgUrl);//不管带没有带加号的，都需要将原来的预览图片替换为新上传的预览图片路径
//		     	var $input=$section.find('.file');
//		     	$input.attr("name","upload");
		   }
		}
		setTimeout(function(){
             $file.parent().removeClass("loading");
		 },450);
		if(current_num <limit_num){
				//如果还没满数
				if ($file.attr('t') != 'c'&&$file.attr('s')!='single') {
					//且本次上传的图片所点击的是加号，则需要在动态新增一个
					$file.parents(".z_photo").append($file.parents(".z_photo").parent().find(
												'.templ').html());
				}
		}
		$file.attr('t', 'c');//标记该input已经是上传过了，从加号变为已上传。
	});
	
	
   //监听点击删除标记事件
    $(".z_photo").delegate(".close-upimg","click",function(){
     	  $(".works-mask").show();
     	  delParent = $(this).parent();//当前删除标记的父元素，即section class="z_file fl"
	});
	//确定删除事件	
	$(".wsdel-ok").click(function(){
		var attach_id=delParent.attr("attach_id");
		$(".works-mask").hide();
		var numUp = delParent.parent().find(".close-upimg").length;//带有删除标记的的section的个数
		var z_file_num=delParent.parent().find(".z_file").length;//当前z_photo upimg-div总的section.z_file
		if(numUp==z_file_num){
			//如果二者相等，说明所有的input都已被上传过图片，则当前页面没有带加号的input，所以需要手动添加
			delParent.parent().append(delParent.parent().parent().find(
												'.templ').html());
		}
		 delParent.remove();
		 //执行实际数据库删除的代码
		 if(attach_id!=null&&attach_id!=''&&attach_id!='undefined'){
	 		$.ajax({
					type:'post',
					url:del_url+attach_id,
					dataType:'html',
					success:function(data){
						if(data>0){
							console.log(data);
						}else{
						}
					}
				});
		 }
	});
	
	$(".wsdel-no").click(function(){
		$(".works-mask").hide();
	});
		
		function validateUp(files){
			var arrFiles = [];//替换的文件数组
			for(var i = 0, file; file = files[i]; i++){
				//获取文件上传的后缀名
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 类型符合，可以上传
							if (file.size >= defaults.fileSize) {
								alert(file.size);
								alert('您这个"'+ file.name +'"文件大小过大');	
							} else {
								// 在这里需要判断当前所有文件中
								arrFiles.push(file);	
							}
						}else{
							alert('您这个"'+ file.name +'"上传类型不符合');	
						}
					}else{
						alert('您这个"'+ file.name +'"没有类型, 无法识别');	
					}
			}
			return arrFiles;
		}
})

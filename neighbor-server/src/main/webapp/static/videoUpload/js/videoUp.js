$(".viedo-up").on('change','input',function(){
	var _this=$(this);
	var fileVal=_this.val();
	var fileName=fileVal.substring(fileVal.lastIndexOf("\\")+1);
	var fileType=fileName.substring(fileName.lastIndexOf(".")+1);
	if(fileType!='mp4'){
		alert("请上传MP4类型的视频");
		_this.val("");
		return;
	}else{
		  //判断浏览器
		  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
		  var token='';
		  var fileSize = 0;
		  if(isIE && !this.files){
		  	 //获得上传文件的绝对路径   
		  	 var filePath = this.value;
		  	 var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
		  	 var file = fileSystem.GetFile(filePath);
		  	 fileSize = file.Size;
		  }else{
		  	fileSize = this.files[0].size;
		  }
		  var size=fileSize/1024/1024;
		  if(size>100){
		  	alert("视频大小不要超过100M");
		  	_this.val("");
		  	return;
		  }else{
		  	var current='<div class="current-video" >当前选中：'+fileName+'</div>';
		  	_this.parent().parent().parent().find(".current-video").remove();
		  	_this.parent().parent().parent().append(current);
		  }
	}
	console.log(fileName);
	console.log(fileType);
});
$(".change_video").on("click",function(){
	$(this).prev().click();
})

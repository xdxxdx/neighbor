mui.init();
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
	
$.ajax({
	type : 'get',
	url : '/jsoncommodityClass.js',
	dataType : 'json',
	success : function(json) {
		var i = 0, m = json.length;
		for (; i < m; i++) {
			html.push('<a class="mui-control-item" href="#content' + json[i].topClassId + '">' +json[i].topClassName + '</a>');
		}
		controls.innerHTML = html.join('');
		html = [];
		for (i = 0; i < m; i++) {
			html.push('<div id="content' + json[i].topClassId + '" class="mui-control-content"><div class="second_class_content">');
			n = json[i].secondClassList.length;
			for (j = 0; j < n; j++) {
				html.push('<div class="second_class_title" classid="' + json[i].secondClassList[j].secondClassId);
				html.push('"> '+ json[i].secondClassList[j].secondClassName + '<em>进入专区</em></div>');
				html.push('<div class="second_class_body mui-clearfix">');
				var o = json[i].secondClassList[j].thirdClassList.length;
				if(o == 0){
					html.push('<div class="second_class_item" classid="'+json[i].secondClassList[j].secondClassId+'"><img onerror="this.src=\'/WechatImages/Q200dimg.jpg\'" src="/' + json[i].secondClassList[j].appPhotoSrc + '"/><h5 class="mui-ellipsis-2">' + json[i].secondClassList[j].secondClassName + '</h5></div>');
				}else{
					for(k = 0;k < o;k++){
						html.push('<div class="second_class_item" classid="'+json[i].secondClassList[j].thirdClassList[k].secondClassId+'"><img onerror="this.src=\'/WechatImages/Q200dimg.jpg\'" src="/' + json[i].secondClassList[j].thirdClassList[k].appPhotoSrc + '"/><h5 class="mui-ellipsis-2">' + json[i].secondClassList[j].thirdClassList[k].secondClassName + '</h5></div>');
					}
				}
				
				html.push('</div>');
			}
			html.push('</div></div>');
		}
		contents.innerHTML = html.join('');
		controls.querySelector('.mui-control-item').classList.add('mui-active');
		contents.querySelector('.mui-control-content').classList.add('mui-active');
	}
})
	
mui('body').on('tap','.second_class_item',function(){
	location.href = '/wechatRealCommoditySecColumn?classId=' + $(this).attr('classid');
});
mui('body').on('tap','.second_class_title',function(){
	location.href = '/wechatRealCommoditySecColumn?classId=' + $(this).attr('classid');
});
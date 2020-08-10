mui.init();
if (window.location.hash != '' && window.location.hash != null) {
	location.hash = '';
}

$.ajax({
    type : 'get',
    url : '/getGarbageJson?pagesize=0',
    dataType : 'json',
    success : function(json) {
    	for(var gi in json.Rows){
    		var option = '<option value="' + json.Rows[gi].garbageName + '">' + json.Rows[gi].garbageName + '</option>';
    		$('#RubbishBackground_select').append(option);
    	}
    	$('#RubbishBackground_select').append('<option value="其他">其他</option>');
    }
})

$.ajax({
    type : 'get',
    url : '/wechatGarbageCategory',
    dataType : 'json',
    success : function(json) {
    	for(var gi in json.garbageCategory){
    		var garbage = json.garbageCategory[gi];
    		
    		var listDom = '<div class="RubbishBackgroundClassList" hash="rubbishClass_' + garbage.categoryId;
    		listDom += '"><img src="../RubbishImg/RubbishHome_' + garbage.categoryId + '.jpg"></div>';
    		$('#rubblsh_class_list_scroll').append(listDom);
    		
    		var garbageDom = '<div class="hash_controller RubbishClassPage" id="rubbishClass_' + garbage.categoryId;
    		garbageDom += '"><div class="yipin_wrapper_have_foot_nav yipin_classArray_wraper"><div class="RubbishClassPage_backgrooundImg"><img src="../RubbishImg/RubbishHead_' + garbage.categoryId;
    		garbageDom += '.jpg"></div><div class="mui-content mui-row mui-fullscreen"><div class="mui-col-xs-3"><div id="segmentedControls_' + garbage.categoryId;
    		garbageDom += '" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"></div></div><div id="segmentedControlContents_'+ garbage.categoryId;
    		garbageDom += '" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;"><div id="item1" class="mui-control-content mui-active"></div><div id="item2" class="mui-control-content"></div><div id="item3" class="mui-control-content"></div></div></div>';
    		garbageDom += '</div></div>';
    		$('body').append(garbageDom);
    		
    		var controls = document.getElementById("segmentedControls_" + garbage.categoryId );
    		var contents = document.getElementById("segmentedControlContents_" + garbage.categoryId);
    		var html = [];
    		var i = 0,
    			j = 1,
    			m = garbage.subCategoryList.length; //左侧选项卡数量+1
    		for(; i < m; i++) {
    			html.push('<a class="mui-control-item" href="#subCategoryId' + garbage.categoryId + '_' + garbage.subCategoryList[i].subCategoryId + '">' + garbage.subCategoryList[i].subCategoryName + '</a>');
    		}
    		controls.innerHTML = html.join('');
    		html = [];
    		var pushDom = '<div class="RubbishClassPage_AllClass_Title" style="margin:10px 10px 0 10px;"><a style="background:#efeff4;">全部分类</a><div></div></div><div class="control_allClass"><div class="control_itemClass" style="background: #0092da" hash="rubbishClass_1">可回收物</div><div class="control_itemClass" style="background: #00923e" hash="rubbishClass_2">厨房垃圾</div><div class="control_itemClass" style="background: #ed951a" hash="rubbishClass_3">其他垃圾</div><div class="control_itemClass" style="background: #b13501" hash="rubbishClass_4">有害垃圾</div></div>'
    		for(i = 0; i < m; i++) {
    			html.push('<div id="subCategoryId' + garbage.categoryId + '_' + garbage.subCategoryList[i].subCategoryId + '" class="mui-control-content"><ul class="mui-table-view">');
    			for(j = 0; j < garbage.subCategoryList[i].garbageList.length; j++) {
    				html.push('<li class="mui-table-view-cell garbage_name_item">' + garbage.subCategoryList[i].garbageList[j].garbageName + '</li>');
    			}
    			html.push('</ul>' + pushDom + '</div>');
    		}
    		contents.innerHTML = html.join('');
    		controls.querySelector('.mui-control-item').classList.add('mui-active');
    		contents.querySelector('.mui-control-content').classList.add('mui-active');
    		
    		mui('.rubblsh_class_list_wrapper,.rubblsh_result_wrapper').scroll({
    			indicators: false, //是否显示滚动条
    		});
    	}
    }
})

mui('body').on('tap','.RubbishBackgroundClassList',function(){
	var hash = $(this).attr('hash');
	location.hash =  hash;
});

mui('body').on('tap','.control_itemClass',function(){
	var hash = $(this).attr('hash');
	location.hash =  hash;
});

mui('body').on('tap','.garbage_name_item',function(){
	var garbageName = $(this).text();
	getGarbageInfo(garbageName);
});

mui('body').on('tap','.RubbishBackgroundSearch_inputBtn',function(){
	var garbageName = $('.RubbishBackgroundSearch_input').val();
	garbageName != '' ? getGarbageInfo(garbageName) : mui.alert('请输入需要搜索的垃圾名字','提示')
});

mui('body').on('tap','.RubbishResultNo_btn',function(){
	var garbageName = $('#noResultEm').text();
	$.ajax({
	    type : 'get',
	    url : '/garbageSubmitInfoSave?garbageName=' + garbageName,
	    dataType : 'html',
	    success : function(data) {
	    	data == 1 ? mui.alert('垃圾信息提交成功，登记分类后会通知您','恭喜你') : mui.alert('提交失败','警告');
	    },
	    error : function(e){
	    	 mui.alert('提交失败!','警告');
	    }
	})
});

mui('body').on('tap','.ahref',function(){
	location.href = $(this).attr('ahref');
});

mui('body').on('tap','.RubbishClassPage_AllClass_Item',function(){
	var hash = $(this).attr('hash');
	location.hash =  hash;
});

$('#RubbishBackground_select').change(function(){
	var garbageName = $('#RubbishBackground_select').val();
	if(garbageName == ''){
		$('.RubbishBackgroundContent').text('选择垃圾名称');
		location.hash = '';
		return false;
	}
	if(garbageName == '其他'){
		if($('body').hasClass('mui-ios')){
			mui.prompt('','请输入你要搜索的垃圾','其他垃圾',['确定','取消'],function(e) {if(e.index == 0){$('.RubbishBackgroundSearch_input').val(e.value);getGarbageInfo(e.value);}}) 
		}
		$('.RubbishBackgroundSearch_input').focus();
		return false;
	}
	$('.RubbishBackgroundContent').text(garbageName);
	getGarbageInfo(garbageName);
})

$(window).bind('hashchange', function() {
	var hash = window.location.hash;
	if(hash == ''){
		$('.RubbishBackgroundContent').text('选择垃圾名称');
		$('#RubbishBackground_selectForm')[0].reset();
	}
	$('.hash_controller').hide();
	$(hash).show();
});

function getGarbageInfo(gn){
	$('.RubbishResultPage em').text(gn);
	$.ajax({
	    type : 'get',
	    url : '/wechatSearchCategory?garbageName=' + gn,
	    dataType : 'json',
	    success : function(json) {
	    	if(json.Total != 0){
	    		$('#RubbishResultPage .RubbishResultPageBody img').attr('src','../RubbishImg/RubbishResult_' + json.Rows[0].categoryId +'.png');
	    		mui('#RubbishResultPage_wrapper').scroll().scrollTo(0,0,100);
		    	location.hash =  'RubbishResultPage';
	    	}else{
	    		mui('#RubbishResultPage_noResult_wrapper').scroll().scrollTo(0,0,100);
	    		location.hash =  'RubbishResultPage_noResult';
	    	}
	    	$('.RubbishBackgroundSearch_input').val('');
	    	$('#RubbishBackground_selectForm')[0].reset();
	    	$('.RubbishBackgroundContent').text('选择垃圾名称');
	    }
	})
}
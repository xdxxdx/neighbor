mui('#selectMenuScroll').scroll();

mui('body').on('tap','.wechat-select-menu-btn',function(){
	var menuListObj = {};
	menuListObj.menuList = [];
	$('.wechat-menu-switch').each(function(){
		var _this = $(this);
		if(_this.hasClass('mui-active')){
			var menuObj = {};
			menuObj.commodityClassId = _this.data('commodityClassId');
			menuObj.commodityClassName = _this.data('commodityClassName');
			menuListObj.menuList.push(menuObj);
		}
	})
	$.ajax({
		type : 'post',
		url : '/wxAddCustomMenu?menu=' + encodeURIComponent(JSON.stringify(menuListObj)),
		dataType : 'html',
		success : function(data) {
			if(data = 0){
				mui.alert('保存失败，请下次再试','逸品生活');
			}else{
				mui.alert('定制成功，下次访问可体验定制菜单的神奇效果','逸品生活');
			}
		},
		error : function(){
			mui.alert('保存失败，请下次再试','逸品生活');
		},
		complete : function(){
			$('.wechat-select-menu').remove();
		}
	})
})
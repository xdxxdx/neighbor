var count = 1;
var pagesize = 10;
//pullupRefresh();
mui.init();
var gallery = mui('#slider');
gallery.slider({
	interval : 5000

});
mui('.y_scroll_wp').scroll({
	scrollX: true,
	scrollY: false,
	indicators: false,
});

mui('#selectMenuScroll').scroll({indicators: false});
mui('.x_scroll_wp').scroll({ indicators: false});
mui('.ch_wechat_crowdFound_cfprogressbar').each(function() {
	mui(this).progressbar({ progress: $(this).attr('data-progress') }).show();
})
mui('.custiomized_class_icon').on('tap' , '.custiomized_icon' ,function(){
	var curl = '/wechatRealCommoditySecColumn?classId=' + $(this).attr('cid');
	window.location.href = curl;
	_czc.push(['_trackEvent','非标商品','进入分类',$(this).attr('cid'),$('body').attr('uid'),'1']);
	//cnzz 事件统计，点击事件，商品类型，动作事件，分类Id，用户id，无意义
});

mui('.custiomized_class_icon').on('tap' , '.coffee_icon' ,function(){
	window.location.href = '/wechatCoffeeList';
	_czc.push(['_trackEvent','逸品咖啡馆','由首页进入逸品咖啡馆',$(this).attr('cid'),$('body').attr('uid')]);
	//cnzz 事件统计，点击事件，商品类型，动作事件，分类Id，用户id，无意义
});

var i=0;
function pulldownRefresh() {
	var table = document.body.querySelector('.mui-table-view');
	var cells = document.body.querySelectorAll('.mui-table-view-cell');
	for (var i = cells.length, len = i + 3; i < len; i++) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell';
		li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
		table.insertBefore(li, table.firstChild);
	}
	mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
	
}

mui('#customized_bd').on('tap','.customized_info',function(){
	var cid = $(this).attr('cid');
	window.location.href = './wechatRealCommodityDetail?realCommodityId=' + cid;
	_czc.push(['_trackEvent','非标商品','查看商品详情',cid,$('body').attr('uid'),'1']);
	//cnzz 事件统计，点击事件，商品类型，动作事件，商品Id，用户id，无意义
});

mui('body').on('tap' , '.ahref',function(){
	location.href = $(this).attr('ahref');
});

mui(document).imageLazyload({
	placeholder: '/WechatImages/Q200dimg.jpg'
});

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

mui('body').on('tap','#loadMoreGuessLike',function(){
	location.href='/wxGussULike'
})

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

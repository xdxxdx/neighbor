var count = 1;
var sortString = '&sortname=sort_num1&sortorder=desc';
var pagesize = 10;
var classid = GetQueryString('classId');
if(classid == '' || classid == null ){
	location.href = '/wxCommodityColumn' ;
}else{
	$('.select_screen_tb').find('.select_screen_tbcell').each(function(){
		var obj = $(this)
		var scid = obj.attr('cid');
		var scn = obj.text();
		if(classid == scid){
			obj.addClass('selected_screen_tbcell')
			document.title = scn + ' — 合智千安';		
		}
	})
}
mui.init({
	pullRefresh : {
		container : '#customized_scroll',

		up : {
			contentrefresh : '正在加载...',
			contentnomore : '没有更多商品了',
			callback : pullupRefresh
		}
	}
})
var gallery = mui('.mui-slider');
gallery.slider({
	interval : 5000
// 自动轮播周期，若为0则不自动播放，默认为0；
});
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators : false, // 是否显示滚动条
});

var offCanvasInner = document.querySelector('.mui-inner-wrap');
offCanvasInner.addEventListener('drag', function(event) {
	event.stopPropagation();
});

mui('.screen_nav_classlist').on('tap', '#li_screen_show', function() {
	mui('.mui-off-canvas-wrap').offCanvas().show();
	getLocation();
});
mui('.screen_btn').on('tap', '.sc_sbtn', function() {
	mui('.mui-off-canvas-wrap').offCanvas().close();
});

mui('.select_screen_tb').on('tap', '#hand_location', function() {
	$('#local_city').text('定位中...');
	getLocation();
});

mui('.select_screen_tb').on('tap', '.select_screen_tbcell',function(){
	count = 1;
	$(this).siblings().removeClass('selected_screen_tbcell');
	$(this).addClass('selected_screen_tbcell');
	scn = $(this).text();
	var pcid = $(this).attr('cid');
	mui('.mui-off-canvas-wrap').offCanvas().close();
	if($(this).hasClass('select_screen_tbcell_main')){
		$.ajax({
			type : 'get',
			url : '/commodityClass/commodityClassJsonByParentId?parentClassId=' + pcid,
			dataType : 'json', 
			success : function(json) {
				$('.select_screen_sec .select_screen_tbcell').remove();
				for(var ci in json.classList){
					var selHtml = '<div class="select_screen_tbcell" cid="' + json.classList[ci].commodityClassId + '">' + json.classList[ci].commodityClassName + '</div>';
					$('.select_screen_sec').append(selHtml);
				}
			}
		})
	}
	
	document.title = scn + ' — 合智千安';
	var $body = $('body');
	var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
	$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
	classid = $(this).attr('cid');
	count = 1;
	$('#customized_bd').find('.customized_goods').remove();
	mui('#customized_scroll').pullRefresh().enablePullupToRefresh();
	if (mui.os.plus) {
		mui.plusReady(function() {
			setTimeout(function() {
				mui('#customized_scroll').pullRefresh().pullupLoading();
			}, 1000);

		});
	} else {
		mui.ready(function() {
			mui('#customized_scroll').pullRefresh().pullupLoading();
		});
	};
	mui('#customized_scroll').pullRefresh().scrollTo(0,0,100);
});

mui('.customized_bd').on('tap','.customized_info',function(){
	var cid = $(this).attr('cid');
	window.location.href = '/wxCommodityDetail?realCommodityId=' + cid;
	//_czc.push(['_trackEvent','非标商品','查看商品详情',cid,$('body').attr('uid'),'1']);
	//cnzz 事件统计，点击事件，商品类型，动作事件，商品Id，用户id，无意义
});

mui('body').on('tap','#sortComprehensive',function(){
	count = 1;
	$('.screen_nav_classlist li').not(this).removeClass('screen_nav_selected').removeClass('screen_nav_selected_up').removeClass('screen_nav_selected_down');
	$(this).addClass('screen_nav_selected').addClass('screen_nav_selected_up');
	sortString = '&sortname=sort_num1&sortorder=desc';
	$('.customized_goods').remove();
	pullupRefresh();
})

mui('body').on('tap','#sortPrice',function(){
	count = 1;
	$('.screen_nav_classlist li').not(this).removeClass('screen_nav_selected').removeClass('screen_nav_selected_up').removeClass('screen_nav_selected_down');
	$(this).addClass('screen_nav_selected');
	if($(this).hasClass('screen_nav_selected_down')){
		$(this).removeClass('screen_nav_selected_down').addClass('screen_nav_selected_up');
		sortString = '&sortname=promotion_price&sortorder=desc';
	}else{
		$(this).removeClass('screen_nav_selected_up').addClass('screen_nav_selected_down');
		sortString = '&sortname=promotion_price&sortorder=asc';
	}
	
	$('.customized_goods').remove();
	pullupRefresh()
})

mui('body').on('tap','#sortTime',function(){
	count = 1;
	$('.screen_nav_classlist li').not(this).removeClass('screen_nav_selected').removeClass('screen_nav_selected_up').removeClass('screen_nav_selected_down');
	$(this).addClass('screen_nav_selected');
	if($(this).hasClass('screen_nav_selected_down')){
		$(this).removeClass('screen_nav_selected_down').addClass('screen_nav_selected_up');
		sortString = '&sortname=create_time&sortorder=desc';
	}else{
		$(this).removeClass('screen_nav_selected_up').addClass('screen_nav_selected_down');
		sortString = '&sortname=create_time&sortorder=asc';
	}
	$('.customized_goods').remove();
	pullupRefresh()
})

mui('body').on('tap','.parent-menu-list',function(){
	if(!$(this).next().length){
		return false;
	}
	var mcid = $(this).data('cid');
	var wxurl= $(this).data('wxurl');
	if(wxurl != null && wxurl != ''){
		location.href = wxurl;
	}else{
		location.href = '/wxCommoditySecColumn?classId=' + mcid;
	}
})


function pullupRefresh() {
	//_czc.push(['_trackEvent','非标商品','列表滑动的次数',$('body').attr('un'),$('body').attr('uid'),count]);
	//cnzz 事件统计，点击事件，商品类型，动作事件，商品Id，用户id，无意义
	$.ajax({
		type : 'get',
		url : '/wxCommodityListAjax?page=' + count + sortString + '&pagesize='
				+ pagesize + '&classId=' + classid,
		dataType : 'json',
		async : false , 
		success : function(json) {
			if(count == 1 || count ==''){
				$('.scroll_tips').remove();
			}
			
			document.title = json.className + ' — 合智千安';
			shareTitle = json.className + ' — 合智千安';
			shareLink = 'http://www.xmhzqa.com/wxCommoditySecColumn?classId=' + json.topClassId;
			$('.customized_head-img img').attr('src','/static/img/wechat/yipin_wchat_home_class.png')
			var $body = $('body');
			var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
			$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
			
			$('.customized_parent-menu .parent-menu-list').remove();
			$('.customized_parent-menu .parent-menu-em').remove();
			if(json.parentCommodityClass.length > 1){
				for(var pi in json.parentCommodityClass){
					if(pi > 0){
						var speceHtml = '<em class="parent-menu-em">/</em>';
						$('.customized_parent-menu').append(speceHtml);
					}
					var menuHtml = '<a class="parent-menu-list" data-cid="'+json.parentCommodityClass[pi].commodityClassId;
					menuHtml += '" data-wxurl="'+json.parentCommodityClass[pi].wxUrl;
					menuHtml += '">' + json.parentCommodityClass[pi].commodityClassName;
					menuHtml += '</a>';
					$('.customized_parent-menu').append(menuHtml);
					
				}
			}
			
			 var len = json.commodityList.length
			 if(len==0){
				 $('#customized_bd').append('<div class="scroll_tips">-&nbsp;当前分类下没有产品&nbsp;-</div>');
			 }
			 for(var i = 0;i < len ; i++){
				 var li = document.createElement('div');
				 li.className = 'customized_goods';
				 li.innerHTML = '<div class="customized_info" cid="' + json.commodityList[i].realCommodityId +'"><div class="customized_goods_adiv"><img src="/static/img/wechat/Q200dimg.jpg"><img class="real_customized_img" src="/'+json.commodityList[i].columnPicture + '"></div><p class="customized_name"><i class="red_level">热销</i>'+json.commodityList[i].realCommodityName+'</p><div class="customized_num"><a class="customized_price"><i>￥</i>'+json.commodityList[i].promotionPrice+'</a><a class="customized_buyer">'+ (json.commodityList[i].saleVolume + json.commodityList[i].increment)+'人付款</a></div></div>';
				 var bd = document.body.querySelector('#customized_bd');
				 bd.appendChild(li);
			 };
		  	if(len<10 ||len==0 || len==null){
			 	mui('#customized_scroll').pullRefresh().disablePullupToRefresh();
			 }
		  	if(len>0){
		  		shareImgUrl = '/' + json.commodityList[0].columnPicture
		   		shareInit();
		  	}
		   
		}
	})
	mui('#customized_scroll').pullRefresh().endPullupToRefresh(false);
	count = count + 1;
}

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#customized_scroll').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#customized_scroll').pullRefresh().pullupLoading();
	});
}
// -------------------定位-----------------//
function myFun(result) {
	var cityName = result.name;
	console.log(cityName)
	$('#local_city').text(cityName);
}

var getLocation = function() {
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
$(function(){
	$('body').on('tap', '.ahref', function() {
		var _this = this;//原生
		var url = $(_this).attr('href');
		console.log(url);
		location.href=url;
	});
})

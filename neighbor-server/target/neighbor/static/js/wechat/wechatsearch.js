var count = 1;
var pagesize = 10;
var keyword = $('.logo_header_search_input').text();
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
	$('.select_screen_tb').find('.select_screen_tbcell').removeClass('selected_screen_tbcell');
	$(this).addClass('selected_screen_tbcell');
	scn = $(this).text();
	document.title = scn + ' — 逸品生活';
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
})

mui('.customized_bd').on('tap','.customized_info',function(){
	var cid = $(this).attr('cid');
	window.location.href = '/wxCommodityDetail?realCommodityId=' + cid;
})

function pullupRefresh() {
	$.ajax({
		type : 'get',
		url : '/wxSearchListAjax?page=' + count + '&pagesize='
				+ pagesize + '&searchWord=' + keyword,
		dataType : 'json',
		async : false , 
		success : function(json) {
			 if($('.scroll_tips').length <= 0 ){
				 var notips = '<div class="scroll_tips">-&nbsp;找不到该类商品&nbsp;-</div>';
				 $('#search_bd').append(notips);
			 }
			 var len = json.searchList.length
			 for(var i = 0;i < len ; i++){
				 var li = document.createElement('div');
				 li.className = 'customized_goods';
				 li.innerHTML = '<div class="customized_info" cid="' + json.searchList[i].realCommodityId +'"><div class="customized_goods_adiv"><img src="/static/img/wechat/Q200dimg.jpg"><img class="real_customized_img" src="http://www.xmhzqa.com/'+json.searchList[i].columnPicture + '"></div><p class="customized_name"><i class="red_level">热销</i>'+json.searchList[i].realCommodityName+'</p><div class="customized_num"><a class="customized_price"><i>￥</i>'+json.searchList[i].promotionPrice+'</a><a class="customized_buyer">' + (json.searchList[i].saleVolume + json.searchList[i].increment) + '人付款</a></div></div>';
				 var bd = document.body.querySelector('#search_bd');
				 bd.appendChild(li);
			 };
			 if(len<10 ||len==0 || len==null){
			 mui('#customized_scroll').pullRefresh().disablePullupToRefresh();
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
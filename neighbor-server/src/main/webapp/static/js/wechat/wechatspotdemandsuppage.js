var count = 1;
var pagesize = 10;
var classid = GetQueryString('classId');
if(classid == '' || classid == null ){
	location.href = '/wechatRealCommodityColumn' ;
}else{
	$('.select_screen_tb').find('.select_screen_tbcell').each(function(){
		var obj = $(this)
		var scid = obj.attr('cid');
		var scn = obj.text();
		if(classid == scid){
			obj.addClass('selected_screen_tbcell')
			document.title = scn + ' — 逸品生活';		
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

mui('#spot_bd').on('tap','.spot_need',function(){
	if(loginCheck() == false){
		dialog();
	}else{
		var sid = $(this).find('.spot_info').attr('sid');
		window.location.href = './wechatSpotOrder?spotSupplyId=' + sid;
	}
});
mui('#spot_bd').on('tap','.spot_give',function(){
	if(loginCheck() == false){
		dialog();
	}else{
		if($('body').attr('sid') == ''){
			mui('.investmentAdv').popover('toggle');
		}else{
			var sid = $(this).find('.spot_info').attr('sid');
			window.location.href = './wechatSpotBid?spotDemandId=' + sid;
		}
	}
	
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
	$('#spot_bd').find('.spot_listbd ').remove();
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
	window.location.href = './wechatRealCommodityDetail?realCommodityId=' + cid;
})

function pullupRefresh() {
	$.ajax({
		type : 'get',
		url : '/wechatSpotDemAndSupList?page=' + count + '&pagesize='
				+ pagesize + '&classId=' + classid,
		dataType : 'json',
		async : false , 
		success : function(json) {
			var len = json.spotAndDemandList.length
			 for(var i = 0;i < len ; i++){
				 var li = document.createElement('div');
				 json.spotAndDemandList[i].type == 1 ? li.className = 'spot_listbd spot_need' : li.className = 'spot_listbd spot_give';
				 var span_in = json.spotAndDemandList[i].type == 1 ?  '<span>'+json.spotAndDemandList[i].userName+'</span><span>'+json.spotAndDemandList[i].contacter+'</span>' : '<span>个人</span><span>'+json.spotAndDemandList[i].userName+'</span>';
				 var price_in = json.spotAndDemandList[i].type == 1 ? '<p class="spot_num_info">可供数量:<em class="num_info">'+json.spotAndDemandList[i].amount+'<i>'+json.spotAndDemandList[i].unit+'</i></em><em class="price_info">'+json.spotAndDemandList[i].price+'<i>元/'+json.spotAndDemandList[i].unit+'</i></em></p>' : '<p class="spot_num_info">需求数量:<em class="num_info">'+json.spotAndDemandList[i].amount+'<i>'+json.spotAndDemandList[i].unit+'</i></em></p>';
				 var btn_text = json.spotAndDemandList[i].type == 1 ? '抢购' : '报价';
				 var time_in = json.spotAndDemandList[i].createTime.substring(0,10).replace(/-/g,'/');
				 li.innerHTML = '<div class="spot_info clearfix" sid="'+json.spotAndDemandList[i].Id +'"><div class="spot_info_pic"><img src="http://wonyen.com/'+json.spotAndDemandList[i].defaultPicture+'"></div><div class="spot_info_tips"><h3 class="spot_title_info">' + json.spotAndDemandList[i].spotCommodityName + span_in + '</h3><p class="spot_intro_info">'+json.spotAndDemandList[i].spec+'</p>'+price_in+'</div></div><div class="spot_btn_area"><h3 class="spot_time_area">'+time_in+'</h3><div class="spot_botton_area">'+btn_text+'</div></div>';
				 var bd = document.body.querySelector('#spot_bd');
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
function loginCheck(){
	var loginStatus = false;
	$('body').attr('uid') == ''? loginStatus = false : loginStatus = true;
	return loginStatus;
}
function dialog(){
	var btnArray = ['我再看看','立即登录'];
	mui.confirm('亲~先登录哦~', '逸品生活', btnArray, function(e) {
		if (e.index == 1) {
			location.href = '/weChatLogin';
		}
	});
}
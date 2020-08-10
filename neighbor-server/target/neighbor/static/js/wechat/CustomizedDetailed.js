mui.init({
	pullRefresh: {
		container: '.real_comment_scroll',
		up: {
			contentrefresh: '正在加载评论 ',
			contentnomore:'没有更多评论了',
			auto:true,
			callback: pullupRefresh
		}
	}
})
var geolocation = new BMap.Geolocation();  
var gc = new BMap.Geocoder();  
var introducerId=$('body').attr('introducerId');//推荐人Id
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
   else
	   return null;
}
//根据ip获取运费
$.ajax({
	type : 'get',
	url : '/wxFreightByIp?realCommodityId=' + $('body').attr('cid'),
	dataType : 'json',
	success : function(json) {
		$('#addressFreight').text((json.freight == '0' ? '包邮' : (json.freight + '元')));
		$('#toAddress').text(json.city);
	}
});
count = 1;
pagesize = 10;
tX = 0;
tY = 0;
var CustomSerArr = ['天逸|2716416353','采文|2338587025'];
var cW = document.body.clientWidth;
var imgLazyloadApi = mui(document).imageLazyload({
	placeholder: '/WechatImages/Q200dimg.jpg'
});
var specLength = 0;
var specIsDelLength=0;
$('#spec_select').find('li').each(function(){
	specLength+= 1;
	if($(this).hasClass('specIsDel')){
		specIsDelLength += 1;
	}
})

if(specIsDelLength >= specLength){
	$('#set_shopcart').hide();
	$('#buy_now').hide();
	$('.shop_service.spec_selected').hide();
	$('#buy_no').show();
	$('.shop_service.spec_selected').removeAttr('id');
	$('.shop_service.spec_selected em').text('已售罄');
}
mui.previewImage();

mui('.real_commodity_scroll').scroll({
	indicators : false,
	scrollY : true,
	deceleration : 0.0005,
});

mui('.shop_relate_commodity_wrapper').scroll({
	indicators: false, 
	scrollY: false,
 	scrollX: true, 
});

mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

mui('#sliderSegmentedControl').on('tap','a',function(){
	setTimeout(function() {mui('.real_commodity_scroll').scroll().refresh();},50)
	
});

mui('.guess_append').on('tap','.customized_info',function(){
	location.href = '/wxCommodityDetail?realCommodityId=' + $(this).attr('cid');
});
mui('body').on('tap','#IntoShop',function(){
	location.href = '/wxShop?merchantId=' + $('body').attr('mid');
});
mui('body').on('tap','#more_popover a',function(){
	location.href = $(this).attr('href');
});
$(function() {
	if(introducerId!=null&&introducerId!=''&&introducerId!=undefined){
		console.log("xxx"+introducerId);
		$.ajax({
			type : 'get',
			url : '/wxRecommendAjax?introducer=' + introducerId,
			dataType : 'html',
			success : function(json) {
				console.log("success");
			}
		});
	}
	$('.img_outblock').find('img').height(cW);
	$('#item1mobile').find('input').removeAttr('style');
	$('#item1mobile').find('img').removeAttr('style');
	$('#item1mobile').find('a').each(function(){
		var _this = $(this);
		var temphref = _this.attr('href');
		if(temphref.indexOf('wonyen') < 0){
			_this.removeAttr('href');
		}
	});
	$('#item1mobile').find('div').removeAttr('style');
	$('#item1mobile').find('img').css('width','100%');
	$('#item1mobile').find('table').removeAttr('width');
	$('#item1mobile').find('table').css('width','100%');
	$('#item1mobile').find('div').removeAttr('div').removeAttr('id');
	$('#item1mobile').find('img').attr('data-preview-src','').attr('data-preview-group','2');
	$('#item1mobile').find('embed').each(function(){
		if($(this).attr('src').indexOf('swf')>-1){
			$(this).remove();
		}
	})
	$('#item1mobile').find('video').css('width','100%').css('height','auto');
	imgLazyloadApi.addElements();
	
	mui('.real_body').on('tap', '#select_spec', function() {
		$('body').attr('ss','0');
		mui('#popover').popover('toggle');
	});

	mui('#popover').on('tap', '#spec_close', function() {
		mui('#popover').popover('toggle');
		if($('#select_spec').attr('sel') == 0){
			$('#spec_select').find('li').removeAttr('id');
		}
	});

	mui('.backnobgc').on('tap','#more_action_btn',function(){
		mui('#more_popover').popover('toggle');
		$('.mui-backdrop').css('background','rgba(0, 0, 0, 0)');
	});
	
	mui('.backnobgc').on('tap','.shop_cart',function(){
		location.href='/wxMyShoppingCart';
	});
	
	mui('.backnobgc').on('tap','#goback',function(){
		var rUrl = document.referrer;
		var referrerpathname = rUrl.replace('http://' + window.location.hostname+':'+window.location.port,''); //获得来源页的pathname
		rUrl == '' || referrerpathname == '/wxLogin'? location.href='/wxIndex' : history.go(-1);
	});
	
	//点击对应规格的事件
	mui('#spec_select').on('tap', 'li', function() {
		if(!$(this).hasClass('specIsDel')){
			$('#spec_select').find('li').removeAttr('id');
			$(this).attr('id', 'selected_spec');
			var op = $(this).attr('data-price');
			var pp = $(this).attr('data-promotionprice');
			var si = $(this).attr('data-specid');
			var sn = $(this).text();
			$('#seled_pp').text('￥' + pp)
			$('#sed_spec_name').addClass('has_selected').text(sn);
			$('#sed_spec_num').text($('#select_buynum').val() + '件');
			$('.s_Originalprice').text(op);	
		}
	});
	//点击加入购物车按钮
	mui('footer').on('tap', '#set_shopcart', function() {
		setshopcart();
		//_czc.push(['_trackEvent','非标商品','加入购物车',$('.c_title_word').html(),$('body').attr('uid'),$('body').attr('cid')]);
		//cnzz 事件统计，点击事件，商品类型，动作事件，商品名称，用户id，商品id
	});
	//点击立即购买
	mui('footer').on('tap', '#buy_now', function() {
		buynow();
		//_czc.push(['_trackEvent','非标商品','购买',$('.c_title_word').html(),$('body').attr('uid'),$('body').attr('cid')]);
		//cnzz 事件统计，点击事件，商品类型，动作事件，商品名称，用户id，商品id
	});
	//详情页点击评论区，进入评论列表页。
	mui('.real_body').on('tap' , '.simple_evaluate',function(){
		mui('#comment_popover').popover('toggle');
	})
	//点击评论列表页的返回按钮，关闭评论列表页
	mui('#comment_popover').on('tap' , '#comment_popover_btn' , function(){
		mui('#comment_popover').popover('toggle');
	});
	//点击撰写评论页的返回按钮，回到评论列表页
	mui('#sentcmt_popover').on('tap' , '#close_sentcmt_btn' , function(){
		mui('#comment_popover').popover('toggle');
	});
	//点击评论列表页的评论按钮，进入撰写评论页面
//	mui('#comment_popover').on('tap' , '#edit_comment_btn' , function(){
//		if($('body').attr('uid') == ''){
//			var btnArray = ['我再看看','立即登录'];
//			mui.confirm('登录后才可以评价商品哦', '逸品生活', btnArray, function(e) {
//				if (e.index == 1) {
//					location.href = '/weChatLogin';
//				}
//			});
//		}else{
//			mui('#sentcmt_popover').popover('toggle');
//		}
//		
//	});
	//点击撰写评论页的发送按钮，发送评论到服务器
//	mui('#sentcmt_popover').on('tap' , '#sent_comment_btn' , function(){
//		var cc = $('#cmt_content').val();
//		if(cc == ''){
//			mui.alert('客官，您好歹写点东西啊(＞﹏＜)','逸品生活',function(){});
//		}else{
//			$.ajax({
//				type : 'get',
//				url : '/bbsReply?pid='  + $('body').attr('pid') + '&message=' + cc,
//				dataType : 'json',
//				success : function(json) {
//					if(json.result == '1') {location.href = window.location.href + '&time=' + Date.parse(new Date());}else{mui.alert('评论失败','逸品生活')};
//				}
//			})
//		}
//	});
	//选完规格后的确定按钮
	mui('#popover').on('tap', '#dt_buy_btn', function() {
		if($('#selected_spec').length < 1){
			mui('#popover').popover('toggle');
			mui.toast('亲~您还没有选择规格呢！');
		}else{
			console.log($('body').attr('ss'))
			var sn = $('#selected_spec').text();
			var bn = $('#select_buynum').val();
			$('#select_spec').find('em').text('已选: "'+sn + '" ' + bn + '件');
			$('#select_spec').attr('sel','1')
			mui('#popover').popover('toggle');
			if($('body').attr('ss') == 0){
			}else if($('body').attr('ss') == 1){
				setshopcart();
			}else if($('body').attr('ss') == 2){
				mui.toast('正在处理订单');
				buynow();
			}
		};	
	});
	//关注或者取消关注商品
	mui('footer').on('tap', '#collect_action', function() {
		if($('body').attr('uid') == ''){
			var btnArray = ['我再看看','立即登录'];
			mui.confirm('登录后才可以关注商品哦', '逸品生活', btnArray, function(e) {
				if (e.index == 1) {
					location.href = '/wxLogin';
				}
			});
		}else{
			if($('#collect_action').attr('cs') == 0){
				$.ajax({
					type : 'get',
					url : '/wxCommodityCollect?merchantId=' + $('body').attr('mid') + '&commodityId=' + $('body').attr('cid'),
					dataType : 'html',
					success : function(data) {
						$('#collect_action').removeClass('no_collect');
						$('#collect_action').find('a').text('已关注');
						$('#collect_action').attr('cs','1');
						mui.toast('宝贝感谢你的关注');
					}
				});
				//_czc.push(['_trackEvent','非标商品','收藏',$('.c_title_word').html(),$('body').attr('uid'),$('body').attr('cid')]);
				//cnzz 事件统计，点击事件，商品类型，动作事件，商品名称，用户id，商品id
			}else if($('#collect_action').attr('cs') == 1){
				$.ajax({
					type : 'get',
					url : '/wxCancelCommotityCollect?commodityId=' + $('body').attr('cid'),
					dataType : 'html',
					success : function(data) {
						$('#collect_action').addClass('no_collect');
						$('#collect_action').find('a').text('关注');
						$('#collect_action').attr('cs','0');
						mui.toast('亲~失去了关注，宝贝很伤心');
					}
				});
				//_czc.push(['_trackEvent','非标商品','取消收藏',$('.c_title_word').html(),$('body').attr('uid'),$('body').attr('cid')]);
				//cnzz 事件统计，点击事件，商品类型，动作事件，商品名称，用户id，商品id
			}
		}
	});
	//进入客服工具
	mui('footer').on('tap' , '#CustomerService' , function(){
		if($('body').attr('accountMode') == 2){
			location.href = '/mobileVisitor';
			mui.toast('正在转接客服，请稍候！');
		}else{
			var btnArray = ['算了', '去完善'];
			mui.confirm('完善资料，以便下次进入商城可以收到客服回复', '温馨提示', btnArray, function(e) {
				if (e.index == 1) {
					location.href = '/wxLogin';
				} else {
					location.href = '/wxMobileVisitor';
					mui.toast('正在转接客服，请稍候！');
				}
			})
		}
	});
	
	mui('.real_body').on('tap' , '.ahref' , function(){
		location.href = $(this).attr('href');
	});
	//详情页点击评论按钮，进入评论撰写页面
//	mui('.simple_evaluate').on('tap','.write_cmt',function(){
//		mui('#sentcmt_popover').popover('toggle');
//		return false;
//	});
	//详情页评论先截取两条
	bbsReply($('body').attr('tid'),1,2,1);
	//猜你喜欢商品
	$.ajax({
		type : 'get',
		url : '/wxGuessULikeAjax',
		dataType : 'json',
		success : function(json) {
			for(var i in json.commodityList){
				var guess = json.commodityList[i];
				var guessHtml = '<div class="customized_goods"><div class="customized_info" cid="' + guess.realCommodityId;
				guessHtml += '"><div class="customized_goods_adiv"><img class="real_customized_img" src="/' + guess.columnPicture.replace('.','M.');
				guessHtml += '"></div><p class="customized_name"><i class="red_level">推荐</i>' + guess.realCommodityName;
				guessHtml += '</p><div class="customized_num"><a class="customized_price"><i>￥</i>' + guess.promotionPrice;
				guessHtml += '</a><a class="customized_buyer">' + (parseInt(guess.saleVolume) + parseInt(guess.realCommodityId) + 500);
				guessHtml += '人付款</a></div></div></div>';
				$('.guess_append').append(guessHtml);
			}
			imgLazyloadApi.addElements();
		}
	});
	//返回首页按钮拖拽事件
	mui('body').on('drag','.back_yipinhome_icon',function(e){
		var oX = this.offsetLeft;
		var oY = this.offsetTop;
		var topY = tY + e.detail.deltaY;
		var rightX = tX + e.detail.deltaX;
		$(this).css('top',topY < 0 ? 0 : topY > (document.body.clientHeight  - 110) ? document.body.clientHeight  - 110 : topY);
		$(this).css('left',rightX < 0 ? 0 : rightX > (document.body.clientWidth  - 60) ? document.body.clientWidth  - 60 : rightX);
	});
	
	mui('body').on('dragstart','.back_yipinhome_icon',function(e){
		tX = this.offsetLeft;
		tY = this.offsetTop;
	});
	
	mui('body').on('dragend','.back_yipinhome_icon',function(e){
		var topY = tY + e.detail.deltaY;
		var rightX = tX + e.detail.deltaX;
		rightX < document.body.clientWidth/2 ? $(this).css('left',0) : $(this).css('left',document.body.clientWidth  - 60);
	});

	mui('body').on('tap','.back_yipinhome_icon',function(){
		location.href = '/wxIndex';
	});
})

//立即购买
function buynow(){
	buyfun();
}

function buyfun(){
	if($('#select_spec').attr('sel') == 0){//尚未选择规格
		$('body').attr('ss','2');//立即购买的标识
		setdefault();
		mui('#popover').popover('toggle');
	}else{//已经选择了规格
		tobuy();
	}
}

function tobuy(){
	var si = $('#selected_spec').attr('data-specid');
	var bn = $('#select_buynum').val();
	var cid = $('body').attr('cid');
	if($('body').attr('uid') != ''){
		$('#f_sid').val(si);
		$('#f_cn').val(bn);	
		$('#ro').submit();		
	}else{
		localStorage.setItem('specid', si);
		localStorage.setItem('buynum', bn);
		localStorage.setItem('cid', cid);
		location.href = '/wxLogin?nextUrl=wxOrderConfirm';
	}
}
//加入购物车
function setshopcart(){
	if($('body').attr('uid') == ''){
		var btnArray = ['我再看看','立即登录'];
		mui.confirm('登录后才可以放进购物车哦', '逸品生活', btnArray, function(e) {if (e.index == 1) {location.href = '/wxLogin';}})
	}else{
		if($('#select_spec').attr('sel') == 0){//还未选择规格
			$('body').attr('ss','1');
			setdefault();
			mui('#popover').popover('toggle');
		}else{//已选择规格
			var si = $('#selected_spec').attr('data-specid');
			var cid = $('body').attr('cid');
			var bn = $('#select_buynum').val();
			$.ajax({
				type : 'get',
				url : '/wxShoppingCartAdd?specId=' + si + '&realCommodityId=' + cid + '&commodityNum=' + bn,
				dataType : 'html',
				success : function(data) {
					mui.toast('宝贝已放入购物车');
					$('#select_spec').attr('sel', '0');
				}
			})
		}
	}
}
//选择默认规格商品
function setdefault(){
	var def = $('#spec_select').find('ul').find('li:not(".specIsDel")').eq(0);
	def.attr('id', 'selected_spec');
	var op = def.attr('data-price');
	var pp = def.attr('data-promotionprice');
	var si = def.attr('data-specid');
	var sn = def.text();
	$('#seled_pp').text('￥' + pp)
	$('#sed_spec_name').addClass('has_selected').text(sn);
	$('#sed_spec_num').text($('#select_buynum').val() + '件');
	$('.s_Originalprice').text(op);
	
	var sn = $('#selected_spec').text();
	var bn = $('#select_buynum').val();
	$('#select_spec').find('em').text('已选: "'+sn + '" ' + bn + '件');
	$('#select_spec').attr('sel','1')
}
//评论列表
function bbsReply(tid,page,pagesize,type){
	if(tid != ''){
		$('.simple_evaluate').show();
		$.ajax({
			type : 'get',
			url : '/commodityComment4Page?tid=' + tid + '&page=' + page + '&pagesize=' + pagesize,
			dataType : 'json',
			success : function(json) {
				switch(type)
				{
				case 1:
				  replyBase(json);
				  break;
				case 2:
				  nextPage(json)
				  break;
				default:
				 bbsReload(json);
				}
			}
		})
	}
}

function replyBase(o){
	$('body').attr('pid',o.firstpid);
	$('.reply_count').text(o.count - 1 < 0 ? 0 : o.count - 1);
	for(var i in o.postList){
		var replyItem = o.postList[i];
		if(replyItem.first != 1){
			console.log(replyItem.wonyenface)
			var htmlList = '<div class="one_evaluate"><div class="evaluate_athor"><img data-lazyload="' + (replyItem.wonyenface == null ? 'http://www.wonyen.com/uploadFiles/android_picture/picimg.png' : 'http://www.wonyen.com/UploadFiles/' + replyItem.wonyenface);
			htmlList += '"><div class="evaluate__athor_name">' + replyItem.author;
			htmlList += '</div></div><div class="co_ones_content">' + replyItem.message;
			htmlList += '</div></div>';
			$('.bbsReply_appendArea').append(htmlList);
		}
	}
	imgLazyloadApi.addElements();
}

function nextPage(o){
	for(var i in o.postList){
		var replyItem = o.postList[i];
		if(replyItem.first != 1){
			console.log(replyItem.wonyenface)
			var htmlList = '<div class="real_comment_item"><div class="evaluate_athor"><img src="' + (replyItem.wonyenface == null ? 'http://www.wonyen.com/uploadFiles/android_picture/picimg.png' : 'http://www.wonyen.com/UploadFiles/' + replyItem.wonyenface);
			htmlList += '"><div class="evaluate__athor_name">' + replyItem.author;
			htmlList += '</div></div><div class="co_ones_content">' + replyItem.message;
			htmlList += '</div></div>';
			$('.commentList_appendArea').append(htmlList);
		}
	}
	if(o.postList.length < 10){
		mui('.real_comment_scroll').pullRefresh().endPullupToRefresh(true);
	}else{
		mui('.real_comment_scroll').pullRefresh().endPullupToRefresh(false);
	}
	mui('.real_comment_scroll').scroll().refresh();
	count += 1;
}

function pullupRefresh(){
	bbsReply($('body').attr('tid'),count,pagesize,2)
}

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
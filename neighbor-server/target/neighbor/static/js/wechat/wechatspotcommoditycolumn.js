var num_r = /^\d+(\.\d+)?$/;
mui.init();
var cc = $('body').attr('cc');
$('.spot_sub_taber').each(function(){
	console.log($(this).attr('cc'))
	if($(this).attr('cc') == cc){
		$(this).addClass('spot_sub_taber_active');
	}
});

var viewApi = mui('#app').view({
	defaultPage : '#ssc_home'
});
var view = viewApi.view;

var oldBack = mui.back;
mui.back = function() {
	if (viewApi.canBack()) { // 如果view可以后退，则执行view的后退
		viewApi.back();
	} else { // 执行webview后退
		oldBack();
	}
};

mui('.das_foot_btn').on('tap','.das_foot_btn_cancel',function(){
	mui.back();
});

mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005, 
	indicators : false, 
});
mui('.ssp_data_scroll_wrapper').scroll({
	deceleration : 0.0003, 
	indicators : false, 
	bounce: false, 
});


mui('.das_foot_btn').on('tap','.scc_demand_page_submit',function(){
	var formDom = $('#'+$(this).attr('formid'));
	var ajax_option = {
			url : "/spotDemandSave",
			type : "post",
			dataType : 'html',
			success : function(data) {
				data == 1 ? mui.alert('发布采购信息成功！','恭喜你',function(){formDom[0].reset();mui.back();}) : mui.alert('发布失败了！','对不起');
			}
		};
	formDom.find('input.dasmust').val() != '' && num_r.test(formDom.find('#demandAmount').val()) ? formDom.ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写采购信息');	
});

mui('.das_foot_btn').on('tap','.scc_supply_page_submit',function(){
	var formDom = $('#'+$(this).attr('formid'));
	console.log(formDom)
	var ajax_option = {
			url : "/spotSupplySave",
			type : "post",
			dataType : 'html',
			success : function(data) {
				data == 1 ? mui.alert('发布供给信息成功！','恭喜你',function(){formDom[0].reset();mui.back();}) : mui.alert('发布失败了！','对不起');
			}
		};
	console.log(formDom.find('input.dasmust').val())
	formDom.find('input.dasmust').val() != '' && num_r.test(formDom.find('#canBeSold').val()) ? formDom.ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写供货信息');	
});

mui('.ssp_demandsup_btn').on('tap','.ssp_no_suserid',function(){
	mui.toast('您还不是供货商，没有权限供货');
});

mui('.spot_sub_tab').on('tap','.spot_sub_taber',function(){
	$('.spot_sub_taber').removeClass('spot_sub_taber_active');
	$(this).addClass('spot_sub_taber_active');
	location.href= '/wechatSpotCommodityColumn?spotClassId=' + $(this).attr('cc');
});
//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
view.addEventListener('pageBeforeShow', function(e) {
	console.log(e.detail.page.id + ' beforeShow');
	var _this = $('#' + e.detail.page.id);
	document.title = _this.attr('pagetitle');
	var $body = $('body');
	var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
	$iframe.on('load',function() {setTimeout(function() {$iframe.off('load').remove();}, 0);}).appendTo($body);
	
});

view.addEventListener('pageShow', function(e) {
	// console.log(e.detail.page.id + ' show');
});

view.addEventListener('pageBeforeBack', function(e) {
	// console.log(e.detail.page.id + ' beforeBack');
});

view.addEventListener('pageBack', function(e) {
	// console.log(e.detail.page.id + ' back');
});

var timestamp = Date.parse(new Date());
var par = $('#sinajs').attr('par');
$.ajax({
	type : 'get',
	url : 'http://hq.sinajs.cn/?_=' + timestamp  + '&list=' + par,
	dataType : 'script',
	async : false,
	success : function(response) {
		var parArr =  par.split(',');
		for (var i in parArr){
			parArr[i] = 'hq_str_' + parArr[i];
			var sinadata = eval(parArr[i]);
			if(sinadata != ''){
				var dataArr = sinadata.split(',');
				var datalist = '<div class="ssp_data_row ssp_data_rowtop"><div class="ssp_data_code">' + dataArr[0] + '</div><div class="ssp_data_price">' + dataArr[9] + '</div><div class="ssp_data_settlement">' + upanddown(dataArr[8] , dataArr[10]) +'</div></div>'
				$('#dataArea').append(datalist);
			}
		}
	}
});

function upanddown(n,m){
	var r = (n-m)/m*100;
	r = r.toFixed(2)
	var rl = r < 0 ? r == -100 ? '0' : '<span class="ssp_price_down">' + Math.abs(r) + '</span>' : '<span class="ssp_price_up">' + r + '</span>';
	return rl;
}
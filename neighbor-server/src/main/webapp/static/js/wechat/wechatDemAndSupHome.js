var num_r = /^\d+(\.\d+)?$/;
if($('body').attr('res') == '0'){
	mui.alert('您还未切换为逸品帐号用户，或未绑定手机号','无法继续操作',function(){
		$('body').append('<div style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		location.href='/wechatAccountManager';
	});
};
mui.init();
// 初始化单页view
var viewApi = mui('#app').view({
	defaultPage : '#setting'
});
mui('.mui-scroll-wrapper').scroll();
var view = viewApi.view;
// 处理view的后退与webview后退
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

mui('body').on('change', '.dasccn', function() {
	selectclassid($(this).val(),$(this).parents('.mui-page'));
});


mui('.das_foot_btn').on('tap','#supply_page_submit',function(){
	var ajax_option = {
			url : "/spotSupplySave",
			type : "post",
			dataType : 'html',
			success : function(data) {
				data == 1 ? mui.alert('发布供给信息成功！','恭喜你',function(){$('#supply_form')[0].reset();location.replace('/wechatSpotHome');}) : mui.alert('发布失败了！','对不起');
			}
		};
	$('#supply_form').find('input.dasmust').val() != '' && num_r.test($('#canBeSold').val()) ? $('#supply_form').ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写供货信息')	
});

mui('.das_foot_btn').on('tap','#demand_page_submit',function(){
	var ajax_option = {
			url : "/spotDemandSave",
			type : "post",
			dataType : 'html',
			success : function(data) {
				data == 1 ? mui.alert('发布采购信息成功！','恭喜你',function(){$('#demand_form')[0].reset();location.replace('/wechatSpotHome');}) : mui.alert('发布失败了！','对不起');
			}
		};
	$('#demand_form').find('input.dasmust').val() != '' && num_r.test($('#demandAmount').val()) ? $('#demand_form').ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写采购信息')	
});


$('.dasccn').each(function(){
	selectclassid($(this).val(),$(this).parents('.mui-page'));
});

function selectclassid(i,o){
	i = i.split(',')[0];
	o.find('.dasscn').find('option').remove();
	$.ajax({
		type : 'get',
		url : '/spotCommodityJsonByClassId?classId=' + i,
		dataType : 'json',
		async : false,
		success : function(json) {
			var jl = json.spotCommodityList.length;
			if (jl == 0) {
			} else {
				var optionlist = '';
				for (var i = 0; i < jl; i++) {
					optionlist = optionlist + '<option value="'+ json.spotCommodityList[i].spotCommodityId + ','+ json.spotCommodityList[i].spotCommodityName+ '">'+ json.spotCommodityList[i].spotCommodityName+ '</option>'
				}
				o.find('.dasscn').append(optionlist);
			}
		},
		error : function() {
		}
	})
}
// 监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
// 第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
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
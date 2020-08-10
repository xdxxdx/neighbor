mui.init();
mui('body').on('tap','.ahref',function() {
	var href = $(this).attr('href');
	href == '' || href == undefined ? mui.alert('敬请期待！', '逸品生活',function() {}) : location.href = href;
});
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators : false, // 是否显示滚动条
});

$.ajax({
    type : 'get',
    url : '/report',
    dataType : 'json',
    success : function(json) {
    	$('#report_res').attr('data-tooltip',json.reportType == undefined ? '未评测' : json.reportType);
    }
})
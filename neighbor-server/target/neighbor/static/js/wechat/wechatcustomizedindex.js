mui.init();
if($('body').attr('ib') != '1'){
	mui.alert('您的资料不完善，请完善您的资料','无法继续操作',function(){
		$('body').append('<div style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		location.href='/wechatGoBind';
	});
}else if($('body').attr('am') != '2'){
	mui.alert('请切换为逸品生活帐号，方可提交定制信息','无法继续操作',function(){
		$('body').append('<div style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		location.href='/wechatAccountManager';
	});
}else if($('body').attr('ct') == '2'){
	if($('body').attr('si') == ''){
		$('body').append('<div id="o_zz" style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		if(localStorage.getItem('merchantApply') == null){
			mui.alert('您还不是卖家，正在为您转跳开店申请页面','开店中...',function(){
				$('#open_store').show();
				$('#o_zz').remove();
			});
		}else{
			$('.words_tips_comment').text('您已经提交开店申请，请耐心等候审核，谢谢！')
			$('.tips_block').show();
			$('#o_zz').remove();
		}
		
	}
};
var phone_r = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
mui('.das_foot_btn').on('tap','.cus_foot_btn_submit',function(){
	var classname = $('#input_cccn').val();
	$('#cccn').val('-1,' + classname); 
	var ajax_option = {
			url : '/customizedSave',
			type : "post",
			dataType : 'html',
			success : function(data) {
				data == 1 ? mui.alert('定制成功了！','恭喜你',function(){$('#customized_from')[0].reset();location.replace('/wechatRealCommodityColumn');}) : mui.alert('发布失败了！','对不起');
			},
			error : function(){
				mui.alert('发布失败了！请完整填写表单','对不起');
			}
		};
	$('#customized_from').find('input.dasmust').val() != '' ? $('#customized_from').ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写供货信息')	
});

mui('.das_foot_btn').on('tap','.open_foot_btn_submit',function(){
	var mphone = $('#merchantApplyPhone').val();
	var ajax_option = {
			url : '/merchantApplySave',
			type : 'post',
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					$('#open_store').hide();
					localStorage.setItem('merchantApply', Date.parse(new Date()));
					$('.tips_block').show();
				}else{
					mui.alert('申请失败了！','对不起');
				}
			},
			error : function(){
				mui.alert('申请失败了！请完整填写表单','对不起');
			}
		};
	if (!phone_r.test(mphone)) {
	      mui.alert('请输入正确的联系方式');
	 }else{
		 $('.simple_store').find('input').val() != '' && $('.simple_store').find('textarea').val() != '' ? $('#simple_store').ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写供货信息')	 
	 }
	
});

mui('.das_related_documents').on('tap','p',function(){
	location.href = $(this).attr('link');
});
mui.init();
if($('body').attr('ib') != '1'){
	mui.alert('您的帐号不安全，请绑定手机号码','无法继续操作',function(){
		$('body').append('<div style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		location.href='/wechatGoBind';
	});
}else if($('body').attr('am') != '2'){
	mui.alert('请切换为逸品生活帐号，方可提交定制信息','无法继续操作',function(){
		$('body').append('<div style="position: absolute;top:0;left:0;width:100%;height:100%;background:#efeff4;z-index:500;"></div>');
		location.href='/wechatAccountManager';
	});
}
var num_r = /^\d+(\.\d+)?$/;
var phone_r = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
mui('.das_foot_btn').on('tap','.cfs_foot_btn_submit',function(){
	var cphone = $('#crowdFundApplyphone').val();
	var ajax_option = {
			url : '/crowdFundApplySave',
			type : 'post',
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					$('.tips_block').show();
				}else{
					mui.alert('申请失败了！','对不起');
				}
			},
			error : function(){
				mui.alert('申请失败了！请完整填写表单','对不起');
			}
		};
	if (!phone_r.test(cphone)) {
	      mui.alert('请输入正确的联系方式');
	 }else{
		 $('.crowdfundform').find('input.crowdFundName').val() != '' && $('.crowdfundform').find('input.contacter').val() != '' && $('.crowdfundform').find('input.phone').val() != '' && $('.crowdfundform').find('textarea').val() != '' ? $('#crowdfundform').ajaxSubmit(ajax_option) : mui.toast('请完整准确的填写供货信息')	 
	 }
	
});
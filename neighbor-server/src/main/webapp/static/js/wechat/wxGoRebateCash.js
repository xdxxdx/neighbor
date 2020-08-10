mui.init();
var tempMoney = '';
var reg = /^[0-9]{1}\d*(\.\d{1,2})?$/;
$('#money').keyup(function() {
	var money = $(this).val();
	var maxMoney = $(this).data('maxMoney');
	if (money == '') {
		$('.receivable_btn').removeClass('receivable_btn_ok');
		tempMoney = '';
		return false;
	}
	var newMoney = money.replace(/[^\d.]/g, "");
	if (newMoney == '') {
		$(this).val(tempMoney);
		return false;
	}
	var newMoney = money.replace(/^\./g, '');
	if (newMoney == '') {
		$(this).val(tempMoney);
		return false;
	}
	var newMoney = money.replace(/\.{2,}/g, '.');
	if (newMoney == '') {
		$(this).val(tempMoney);
		return false;
	}
	tempMoney = money;
	if (tempMoney == '' || tempMoney * 100 > maxMoney * 100) {
		$('.receivable_btn').removeClass('receivable_btn_ok');
	} else {
		$('.receivable_btn').addClass('receivable_btn_ok');
	}
})

mui('body').on('tap','#balanceAll',function(){
	var balanceAllMoney = $(this).data('balanceMoney');
	$('#money').val(balanceAllMoney);
})

mui('body').on('tap','.receivable_btn_ok',function(){
	$('#money').blur();
	var money = $('#money').val();
	if(!reg.test(money) || money*100 == 0){
		return false;
	}
	var btnArray = ['取消', '转入'];
	mui.confirm('您即将申请将'+$('#money').val()+'元转入到账户余额', '操作提示', btnArray, function(e) {
		if (e.index == 1) {
			$('.receivable_btn').removeClass('receivable_btn_ok');
			$.ajax({
		        type: 'post',
		        url: '/wxRebateCashSave?rebateCash.cashMoney=' + $('#money').val(),
		        dataType: 'html',
		        success: function(data){
		        	if(data == 1){
		        		mui.alert('您申请装入余额已成功\n系统将自动转入帐号余额','恭喜',function(){
		        			location.replace('/wechatMyRecommender');	
		        		})
		        	}else if(data == -1){
		        		$('.receivable_btn').addClass('receivable_btn_ok');
		        		mui.alert('可转入的余额不足','抱歉');
		        	}else{
		        		$('.receivable_btn').addClass('receivable_btn_ok');
		        		mui.alert('转入余额失败，请重试','抱歉');
		        	}
		        },
		        error:function(){
		        	$('.receivable_btn').addClass('receivable_btn_ok');
		        	mui.alert('数据异常，请稍后重试','抱歉')
		        }
		    });
		} else {
			$('.receivable_btn').addClass('receivable_btn_ok');
			return false;
		}
	})
})
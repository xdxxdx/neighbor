mui.init();
var tempMoney = '';
var reg = /^[0-9]{1}\d*(\.\d{1,2})?$/;
mui.alert('请向逸品生活相关工作人员\n确认消费金额', '温馨提示', function() {
	$('#money').focus();
	$('.receivable_btn').removeClass('receivable_btn_ok');
})
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
mui('body').on('tap','.receivable_btn_ok',function(){
	$('#money').blur();
	var money = $('#money').val();
	if(!reg.test(money) || money*100 == 0){
		return false;
	}
	var btnArray = ['取消', '支付'];
	mui.confirm('您即将支付\n<strong style="font-size:26px;color:#FF621F">'+$('#money').val()+'元</strong>\n成功后展示给工作人员', '消费提示', btnArray, function(e) {
		if (e.index == 1) {
			$('.receivable_btn').removeClass('receivable_btn_ok');
			var fee = {};
			fee.fee = $('#money').val();
			$.ajax({
		        type: 'post',
		        url: '/wxOffineLineConsumeCallBack',
		        data: fee,
		        dataType: 'html',
		        success: function(data){
		        	if(data>0){
		        		$('.receivable_btn').removeClass('receivable_btn_ok');
		        		tempMoney = '';
		            	$('#money').val();
		            	location.href = '/wxOffineLineConsumeDetail?depositConsumeId=' + data;
		        	}else{
		        		$('.receivable_btn').addClass('receivable_btn_ok');
		        		mui.alert('支付失败，请确认余额是否充足','抱歉');
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
$(function() {
	$('body').on('click', '.goods-item', function() {
		$("li.active").removeClass("active");
		var _this = $(this);//原生
		_this.toggleClass("active");
	});
	//支付
	$("body").on("click",".recharge-btn",function(){
		var choice_li=$(".goods-list li.active");//当前选中的级别
		if(choice_li.length>0){
			var needPay=choice_li.attr("need-pay");
			var minGoodsMoney=$("body").attr("minGoodsMoney");//当前的级别
			if(needPay-minGoodsMoney<0){
					alert("您选择的款项不足，请选择更高的级别")
					return false;
			}
			console.log("minGoodsMoney is "+minGoodsMoney+",needPay "+needPay);
			$.ajax({
				type : 'get',
				url : './rechargeSave?rechargeMoney='+needPay,
				dataType : 'json',
				async : false,
				success : function(data) {
					if(data.result>0){
						var orderId=data.orderId;
						layui.use('layer', function() {
							var layer = layui.layer;
							layer.confirm('订单保存成功，去支付？', function(index) {
								location.href="./rechargePay?orderId="+orderId;
							});
						});
					}else{
						alert("订单保存失败");
					}
				}
			})
		}else{
			mui.alert("请选择货款");
		}
	})
})

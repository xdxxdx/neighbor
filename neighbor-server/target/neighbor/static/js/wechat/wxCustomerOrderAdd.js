mui.init();
mui('.mui-scroll-wrapper').scroll();
var time = 1518074163;
mui('body').on('tap', '.customer-check-btn', function() {
	var commodityJson = [];
	var noNullNum = 0;
	$('input.required').each(function() {
				var _this = this;
				if ($(_this).val() == '') {
					noNullNum++;
				}
			})
	console.log(noNullNum)
	$('.commodity-gift').each(function() {
		var _this = this;
		var obj = {};
		obj.commodityNum = $(_this).find('input.mui-input-numbox').val();
		obj.commodityId = $(_this).find('input.mui-input-numbox')
				.data('commodityId');
		if (obj.commodityNum > 0) {
			commodityJson.push(obj);
		}
	})
	var commodity = $('#commodity').val();
	var dataJson = $('#customerOrderBase').serializeObject()
	dataJson['customerOrder.commodityJson'] = JSON.stringify(commodityJson);
	dataJson['customerOrder.otherCommodity'] = commodity;
	if (commodityJson.length == 0 && commodity == '') {
		mui.alert('必须选择寄送商品或者填写自定义寄送商品');
	} else {
		if (noNullNum > 0) {
			mui.alert('请完整填写寄送信息')
		} else {
			if (!(/^1[34578]\d{9}$/.test($('#phone').val()))) {
				mui.alert("手机号码有误，请重填");
			} else {
				$.ajax({
					type : 'GET',
					url : '/wxCustomerOrderSave',
					data : dataJson,
					success : function(data) {
						if (data == 1) {
							mui.alert('操作成功','提示',function(){
								location.href = '/wxCustomerOrderHome'
							});
						} else {
							mui.alert('操作失败');
						}
					},
					error : function() {
						mui.alert('蛤！操作失败！')
					}
				})
			}

		}
	}
})

mui('body').on('tap', '.customer-order-edit', function() {
	var _this = this;
	var customerOrderId = $(_this).data('customerOrderId');
	location.href = '/wxCustomerOrderAdd?customerOrder.customerOrderId='
			+ customerOrderId;
})
mui('body').on('tap', '#newOrder', function() {
			var _this = this;
			var customerOrderId = $(_this).data('customerOrderId');
			location.href = '/wxCustomerOrderAdd';
		})

mui('body').on('tap', '.customer-order-delete', function() {
	var _this = this;
	var customerOrderId = $(_this).data('customerOrderId');
	var btnArray = ['算了', '确定'];
	mui.confirm('删除后将不可恢复哦', '删除提示', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
						type : 'GET',
						url : '/customerOrderHidden?customerOrder.customerOrderId='
								+ customerOrderId,
						success : function(data) {
							if (data == 1) {
								$('#customerOrderId' + customerOrderId)
										.remove();
							} else {
								alert('删除失败！')
							}
						},
						error : function() {
							alert('蛤！删除失败！')
						}
					})
		}

	})
})

mui('body').on('tap', '.customer-order-pass', function() {
			var _this = this;
			var customerOrderId = $(_this).data('customerOrderId');
			passCustomerOrder('', customerOrderId);
		})

mui('body').on('change', '#selectAll', function() {
			var selectAll = this.checked ? true : false;
			console.log(selectAll)
			if (selectAll) {
				$('.selectItem').prop('checked', 'checked')
			} else {
				$('.selectItem').removeProp('checked');
			}
		})

mui('body').on('change', '.selectItem', function() {
			var isSelectedNum = 0;
			$('.selectItem').each(function() {
						if (!this.checked) {
							isSelectedNum++;
						}
					})
			if (isSelectedNum == 0) {
				$('#selectAll').prop('checked', 'checked')
			} else {
				$('#selectAll').removeProp('checked');
			}
		})

mui('body').on('tap', '.order-pass-btn', function() {
			var selectAll = $('#selectAll')[0].checked ? true : false;
			if (selectAll) {
				passCustomerOrder('all', '');
			} else {
				var orderIdArray = [];
				$('.selectItem').each(function() {
							if (this.checked) {
								orderIdArray.push($(this)
										.data('customerOrderId'));
							}
						})
				if (orderIdArray.length > 0) {
					passCustomerOrder('', orderIdArray + '');
				}
			}
		})

mui('body').on('tap', '#backToHomeRefresh', function() {
			location.href = '/wxCustomerOrderHome?time=' + time;
		})
		
mui('body').on('tap', '.deposit-log-pass', function(e) {
	var depositLogId = $(this).data('depositLogId');
	e.detail.gesture.preventDefault(); 
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入审核通过留言', '不填也可', '通过审核', btnArray, function(e) {
		if (e.index == 1) {
			sendExamineDeposit(depositLogId,1,e.value);
		} 
	})
})	

mui('body').on('tap', '.deposit-log-reject', function(e) {
	var depositLogId = $(this).data('depositLogId');
	e.detail.gesture.preventDefault(); 
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入驳回审核留言', '不填也可', '驳回审核', btnArray, function(e) {
		if (e.index == 1) {
			sendExamineDeposit(depositLogId,-1,e.value);
		} 
	})
})

mui('body').on('tap','#examineHistory',function(){
	location.href = '/wxUnExamineDeposit';
	
})
		
function sendExamineDeposit(depositLogId,examineResult,note){
	$.ajax({
		type : 'POST',
		url : '/depositExamine',
		data:{
			'depositExamine.depositLogId':depositLogId,
			'depositExamine.examineResult':examineResult,
			'depositExamine.note':note
		},
		success : function(data) {
			if(data == 1){
				mui.alert('余额处理审核成功','余额审核',function(){
				$('#unExamineDeposit' + depositLogId).remove();
				})
			}else if(data == -1){
				mui.alert('您没有审核的权限','余额审核')
			}else{
				mui.alert('审核处理失败了','余额审核')
			}					
		},
		error : function() {
			mui.alert('审核处理莫名的失败了','余额审核')
		}
	})
}

function passCustomerOrder(type, idStr) {
	var btnArray = ['取消', '通过'];
	mui.confirm('通过后，我们将会对您的订单进行处理，且不能取消', '通过提示', btnArray, function(e) {
				if (e.index == 1) {
					$.ajax({
								type : 'GET',
								url : '/wxCustomerOrderExamine?customerOrders='
										+ idStr + '&type=' + type + '&time'
										+ time,
								success : function(data) {
									if (data == 1) {
										mui.alert('通过成功，正在刷新','提示',function(){
											location.reload();
										});
										
									} else if (data == -1) {
										mui.alert('您无权限处理');
									} else {
										alert('通过失败！')
									}
								},
								error : function() {
									alert('蛤！通过失败！')
								}
							})
				}

			})
}

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
	return o;
};
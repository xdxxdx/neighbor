mui.init();
localStorage.removeItem('orderJson');
localStorage.removeItem('referrerUrl');
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://www.wonyen.com/wechatPayU';
var style = '<style id="addStyle">.mui-popup-backdrop.mui-active{z-index:9999}</style>';
var modifyAid;
var cityPicker3 = new mui.PopPicker({
	layer: 3
});
$.get('/json/address.json', function(json) {
	var cityData3 = json;
	cityPicker3.setData(cityData3);
	cityPicker3.pickers[0].setSelectedValue('350000', 100);
	cityPicker3.pickers[1].setSelectedValue('350200', 100);
	cityPicker3.pickers[2].setSelectedValue('350205', 100);
})

// var rURL = 'http://www.wonyen.com';
mui('#order_scroll_init').scroll();
mui('#coupon_scroll').scroll();
mui('#address_scroll').scroll();



$(function() {
	var total_fee = $('.money_to_pay em').attr("tMoney");//需付款总金额
	var total_score= $('.money_to_pay em').attr("tScore");//需支付总积分

	mui('body').on('tap', '#default_address_area', function() {
			mui('#address_popover').popover('toggle');
	});

	mui('#address_popover').on('tap', '#backtoorder', function() {
		// $('#address_form')[0].reset();
		mui('#address_popover').popover('toggle');
	});

	mui('#address_popover').on('tap', '#address_ok', function() {
		var aid;
		$('.address_list_input:checked').each(function() {
			aid = $(this).val();
		});
		if (aid == '' || aid == undefined) {
			mui.alert('请选择地址', '逸品生活');
			return false;
		};
		var consignee_name = $('#al_' + aid).find('.consignee_name').find('em').text();
		var consignee_tel = $('#al_' + aid).find('.consignee_tel').text();
		var consignee_address = $('#al_' + aid).find('.consignee_address').find('em').text();
		$('#default_address').attr('daid', aid);
		$('#pa_info').val(aid);
		$('#default_address').find('.consignee_name').find('em').text(consignee_name);
		$('#default_address').find('.consignee_tel').text(consignee_tel);
		$('#default_address').find('.consignee_address').find('em').html('').append(consignee_address);

		mui('#address_popover').popover('toggle');
		$('.no_address_tips').hide();
	});

	mui('#address_popover').on('tap', '.new_address_list_btools_edit', function() {
		var aid = $(this).attr('aid');
		var consignee_name = $('#al_' + aid).find('.consignee_name').find('em').text();
		var consignee_tel = $('#al_' + aid).find('.consignee_tel').text();
		var consignee_address = $('#al_' + aid).find('.consignee_address').find('em').text();
		var ca = consignee_address.split(/[省市区]/);

		$('#pickUpAddress_consignee').val(consignee_name);
		$('#pickUpAddress_consigneePhone').val(consignee_tel);
		$('#address_area').val(ca[0] + '省 ' + ca[1] + '市 ' + ca[2] + '区');
		$('#pickUpAddress_detail').val(ca[3].replace(/\s/g, ''))
		$('#province').val(ca[0].replace(/\s/g, '') + '省');
		$('#city').val(ca[1].replace(/\s/g, '') + '市');
		$('#district').val(ca[2].replace(/\s/g, '') + '区');

		$('#change_h1').text('修改收货地址');
		$('#type').val('2');
		$('#addressId').val(aid);
		var defaultTextDom = $(this).prev('.new_address_list_btools_setdefault');
		if (defaultTextDom.hasClass('new_address_list_btools_iddefault')) {
			$('#set_default_switch').addClass('mui-active');
		} else {
			$('#set_default_switch').removeClass('mui-active');
		}
		mui('#changeaddress_popover').popover('toggle');

	});

	mui('#address_popover').on('tap', '.new_address_list_btools_delete', function() {
		var a = $(this).attr('aid');
		upActive();
		if ($('#al_' + a).find('input.address_list_input').prop('checked') || $('.new_address_list_oc').length < 2) {
			mui.alert('选中的地址是不可以被删除的哦', '逸品生活');
			return false;
		}

		var btnArray = ['取消', '确定'];
		mui.confirm('是否删除该地址!', '逸品生活', btnArray, function(e) {
			if (e.index == 1) {
				$.ajax({
					type: 'get',
					url: '/pickUpAddressDelete?pickUpAddress.addressId=' + a,
					dataType: 'html',
					success: function(data) {
						data == 1 ? $('#al_' + a).remove() : mui.alert('删除失败', '逸品生活');
						mui('#address_scroll').scroll().reLayout();
					},
					error: function(e) {
						mui.alert('出错了\n' + e, '逸品生活');
					}
				})
			}
		})
	});

	mui('#address_popover').on('tap', '#add_new_change', function() {
		$('#change_h1').text('添加收货地址');
		$('#type').val('1');
		$('#addressId').val('');
		mui('#changeaddress_popover').popover('toggle');

	});


	mui('#changeaddress_popover').on('tap', '#cencel_change', function() {
		mui('#changeaddress_popover').popover('toggle');
		mui('#address_popover').popover('toggle');
	});

	mui('#changeaddress_popover').on('tap', '#address_area', function() {
		$('input').blur();
		$('.mui-poppicker').css('z-index', '1001')
		cityPicker3.show(function(items) {
			var input_area = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			$('#address_area').val(input_area);
			$('#province').val((items[0] || {}).text);
			$('#city').val((items[1] || {}).text);
			$('#district').val((items[2] || {}).text);
		});
		$('.mui-backdrop').each(function() {
			if (!$(this).hasClass('mui-active')) {
				$(this).css('z-index', '1000');
			}
		});
	});

	mui('#changeaddress_popover').on('tap', '#save_ok', function() {
		if ($('#province').val() == '') {
			return false;
		}
		upActive();
		var status = $('#set_default_switch').hasClass('mui-active') ? '1' : '0';
		var ajaxURL = $('#addressId').val() == '' ? './pickUpAddressSave' : './pickUpAddressSave';
		$('#isDefault').val(status);
		var ajax_option = {
			url: ajaxURL,
			type: 'post',
			dataType: 'html',
			success: function(data) {
				if (data > 0) {
					modifyAid = data;
					$('#save_address_form')[0].reset();
					mui('#address_popover').popover('toggle');
					$('#address_form').getAddressList();
				} else {
					mui.alert('保存地址失败失败！', '逸品生活');
				}
			},
			error: function(e) {
				mui.alert('出错了\n' + e, '逸品生活');
			}
		}
		$('#save_address_form').ajaxSubmit(ajax_option);
	});
	mui('.pay_footer').on('tap', '#confirm_to_save', function() {
		if ($('body').attr('bind') != 1) {
			mui.alert('该订单包含余额需完善资料后方可购买', '提醒', function() {
				location.href = '/wechatAccountManager';
			});
			return false;
		}
		$('#pa_info').val($('#pa_info').val() == '-2' ? '-2' : ($('#default_address').attr('daid') == '' ? '-1' : $('#default_address').attr('daid')));//地址
		$('#os_leaveWord').val($('#leaveWordTemp').val());//留言
		var isActive = total_fee==0?false:document.getElementById('useBalance').classList.contains('mui-active');//使用余额按钮是否开启
		var btnArray = ['取消', '支付'];
		var ajax_option = {
			url: './scoreExchangeSave',
			type: 'post',
			dataType: 'json',
			beforeSend: function () {
				$('.wechat-wait-dialog').show();
			},
			success: function(json) {
				if (json.result != 1) {
					mui.alert('订单提交失败', '逸品生活');
				} else {
					var orderId=json.orderIdStr;//订单号
					if(total_fee==0){
						//访问积分兑换成功的回调
							$.ajax({
							type: 'get',
							url: '/scoreExchangeCallBack?orderStr=' + orderId,
							dataType: 'json',
							beforeSend: function () {
								$('.wechat-wait-dialog').show();
							},
							success: function(json) {
								//积分支付
								if (json.result > 0) {
									mui.alert('积分兑换成功', '逸品生活');
									location.href = '/wxScoreOrderDetail?realOrderId=' + json.realOrderId;
								} else {
									if (json.result == '-1') {
										mui.alert('积分不足，支付失败\n($ _ $)', '逸品生活');
									} else {
										mui.alert('支付失败', '逸品生活');
									}
								}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								mui.alert('当前网络不稳定，请重启wifi或更换4G网络', '逸品生活');
							},
							complete: function () {
								$('.wechat-wait-dialog').hide();
        						$('.confirm_to_pay').attr('id', 'confirm_to_save');
    						}
						})
						return;
					}
					if (isActive) {
						//余额支付
						$.ajax({
							type: 'get',
							url: '/wxOnlineConsumeCallBack?orderStr=' + orderId + '&deposit=' + parseInt(parseFloat(total_fee) * 100),
							dataType: 'json',
							beforeSend: function () {
								$('.wechat-wait-dialog').show();
							},
							success: function(json) {
								//余额支付
								if (json.result > 0) {
									location.href = '/wxOffineLineConsumeDetail?depositConsumeId=' + json.result + '&realOrderId=' + json.realOrderId;
								} else {
									if (json.result == '-1') {
										mui.alert('余额不足~支付失败\n($ _ $)', '逸品生活');
									} else {
										mui.alert('支付失败', '逸品生活');
									}

								}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								mui.alert('当前网络不稳定，请重启wifi或更换4G网络', '逸品生活');
							},
							complete: function () {
								$('.wechat-wait-dialog').hide();
        						$('.confirm_to_pay').attr('id', 'confirm_to_save');
    						}
						})
					} else {
						//微信支付
						var isWx = $('body').data('isWx');
						
						if(isWeiXin()){
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + orderId + '#wechat_redirect';
							
						}else{
							$.ajax({
								type: 'get',
								url: '/wechatPayH5?realOrderIdStr=' + orderId,
								dataType: 'html',
								beforeSend: function () {
									$('.wechat-wait-dialog').show();
								},
								success: function(payUrl) {
									location.href = payUrl + '&redirect_url=' + encodeURI('http://www.wonyen.com/wechatMyRealOrder')
								}
							})
						}
						
					}

				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$('.wechat-wait-dialog').hide();
        		$('.confirm_to_pay').attr('id', 'confirm_to_save');
				mui.alert('当前网络不稳定，请重启wifi或更换4G网络', '逸品生活');
			}
		};
		mui.confirm('您即将使用' +(total_fee==0?'积分兑换':(isActive == true ? '余额支付' : '微信支付'))  + '\n<strong style="font-size:26px;color:#FF621F">' + (total_fee!=0?total_fee + '元 ':'')+total_score+'积分</strong>', '消费提示', btnArray, function(e) {
			if (e.index == 1) {
				if ($('#pa_info').val() == '' || $('#pa_info').val() == undefined || $('#pa_info').val() == null || $('#pa_info').val() == '-1') {
					mui.alert('您还没有填写收货地址，交易成功后请记得完善地址哦', '逸品生活', function() {
						$('.confirm_to_pay').attr('id', 'confirm_to_stop');
						$('#os_form').ajaxSubmit(ajax_option);
					});
				} else {
					$('.confirm_to_pay').attr('id', 'confirm_to_stop');
					$('#os_form').ajaxSubmit(ajax_option);
				}
			} else {
				$('.confirm_to_pay').attr('id', 'confirm_to_save');
			}
		})

		// mui('#payload_popover').popover('toggle');
		// $('#os_form').ajaxSubmit(ajax_option);
	});

	mui('#address_popover').on('tap', '.new_address_list_btools_setdefault', function() {
		var _this = $(this);
		upActive();
		if (!_this.hasClass('new_address_list_btools_iddefault')) {
			$.ajax({
				type: 'get',
				url: '/defaultPickUpAddress?addressId=' + _this.attr('aid'),
				dataType: 'html',
				success: function(data) {
					mui.alert('已设置该地址为默认地址', '逸品生活', function() {
						$('#address_form').getAddressList();
					});
				},
				error: function(e) {
					mui.alert('出错了\n' + e, '逸品生活');
				}
			})
		}
	});

	mui('body').on('tap', '.coupon_item', function() {
		$(this).find('.coupon_select').click();
		console.log($(this).find('.coupon_select'))
	})

	// mui('body').on('tap','.money_to_pay',function(){
	// mui('#payways_popover').popover('toggle');
	// })

})

$.fn.extend({
	getAddressList: function() {
		var _this = $(this);
		$.ajax({
			type: 'get',
			url: '/pickUpAddressJson',
			dataType: 'json',
			success: function(json) {
				_this.find('.new_address_list_oc').remove();
				var addressList = json.pickUpAddressList;
				for (var i in addressList) {
					var alist = '<div class="new_address_list_oc" id="al_' + addressList[i].addressId;
					alist += '"><div class="mui-slider-handle"><div class="default_address mui-radio mui-table-cell md_address"><div class="consignee_baseinfo"><span class="consignee_name">收件人：<em>' + addressList[i].consignee;
					alist += '</em></span> <span class="consignee_tel">' + addressList[i].consigneePhone;
					alist += '</span></div><div class="consignee_address">收货地址：<em>' + addressList[i].province + '&nbsp;' + addressList[i].city + '&nbsp;' + addressList[i].district + '&nbsp;' + addressList[i].detail;
					alist += '</em></div><div class="consignee_location"><input name="radio1" type="radio" class="address_list_input" ' + (addressList[i].isDefault == 1 ? 'checked="checked"' : '') + ' value="' + addressList[i].addressId;
					alist += '"></div></div></div><div class="new_address_list_btools"><a class="new_address_list_btools_setdefault' + (addressList[i].isDefault == 1 ? ' new_address_list_btools_iddefault' : '') + '" aid="' + addressList[i].addressId;
					alist += '">' + (addressList[i].isDefault == 1 ? '默认地址' : '设为默认') + '</a>' + (addressList[i].isDefault != 1 ? '<a class="new_address_list_btools_delete" aid="' + addressList[i].addressId + '">删除</a>' : '') + '<a class="new_address_list_btools_edit ' + (addressList[i].isDefault == 1 ? 'new_address_list_btools_only_edit' : '') + '" aid="' + addressList[i].addressId + '">编辑</a></div></div>';
					_this.append(alist);
				}
				if (modifyAid > 0) {
					var defDom = $('#al_' + modifyAid);
					defDom.find('input.address_list_input').prop('checked', 'true');
					var domH = defDom.position().top;
					var scrollH = $('#address_scroll').height();
					var contentH = $('#address_form').height();
					mui('#address_scroll').scroll().reLayout();
					if (domH < contentH - scrollH) {
						mui('#address_scroll').scroll().scrollTo(0, -domH, 1);
					} else {
						mui('#address_scroll').scroll().scrollToBottom(2);

					}

				}
			},
			error: function(e) {

			}
		})
	}
});

function upActive() {
	$('body').find('#addStyle').remove();
	$('body').append(style);
}

function toDecimal2(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

function calTotal() {
	var allTotal = $('#giveMoney').attr('pMoney') * 100;
	$('.fixed_tabing_ffre').each(function() {
		allTotal = allTotal + parseInt($(this).attr('ffre')) * 100;
	})
	return toDecimal2(allTotal / 100);
}

var bindAndroidScroll = function(that) { // that 输入框  
		if (mui.os.android || (mui.os.ios && mui.os.version.split('.')[0] * 1 === 7)) {
			setTimeout(function() {
				that.scrollIntoViewIfNeeded()
			}, 500)
		}
	}

$('body').on('tap', 'input', function(e) {
	bindAndroidScroll(this);
});

$('body').on('tap', '.toDeposit', function() {
	localStorage.orderJson = $('#gm_form').serialize();
	localStorage.referrerUrl = '/wechatRealOrderComfirm';
	location.href = '/wechatDeposit?depositMonoy=' + $(this).attr('check-money') * 100;

})

function calDepositMoney(s) {
	var oldMoney = $('#orderToMoney').data('money');
	var oldScore = $('#usedScore').val();
	var newMoney = s ? oldMoney * 100 - oldScore : oldMoney * 100;
	if (newMoney <= 0) {
		$('#canDeposit').hide();
		$('#canUseBalance').show();
		$('#useBalance').addClass('mui-active');
	} else {
		$('#useBalance').removeClass('mui-active');
		$('#canDeposit').show();
		$('#canUseBalance').hide();

	}
	$('#orderToMoney em').text(newMoney / 100);
	$('#orderToMoney').attr('check-money', newMoney / 100);
	return newMoney;
}

function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	} 
} 

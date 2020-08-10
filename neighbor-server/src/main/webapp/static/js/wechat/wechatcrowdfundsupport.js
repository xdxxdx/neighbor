mui.init();
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://www.wonyen.com/wechatPayCrowdFund';
var style = '<style id="addStyle">.mui-popup-backdrop.mui-active{z-index:9999}</style>';
var modifyAid;
var cityPicker3 = new mui.PopPicker({layer: 3});
var totelscore = 0;
cityPicker3.setData(cityData3);
cityPicker3.pickers[0].setSelectedValue('350000', 100);
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
$(function() {
	$('.order_list_money').each(function(){
		var _this = $(this);
		var integral = _this.attr('integral');
		if(integral != undefined){
			var money = _this.text().replace('￥','');
			totelscore = totelscore + integral*money
		}
	});
	
	totelscore = Math.round(totelscore);
	
	if(totelscore != 0){
		$('.no_bind_tips_tabing em').text(totelscore + '点');
		$('.money_to_pay i').text('(积分:' + totelscore + ')')
	}
	 
	mui('body').on('tap', '.no_bind_tips_tabing', function() {
		var fh = $('#os_form').html();
		sessionStorage.setItem('bindReturnForm', fh);
		sessionStorage.setItem('bindReturnAction', window.location.pathname);
		location.href = '/wechatGoBind';
	});

	mui('#coupon_popover').on('tap', '#popover_title_cloose', function() {
		mui('#coupon_popover').popover('toggle');
	});

	mui('body').on('tap', '#default_address_area', function() {
		mui('#address_popover').popover('toggle');
	});

	mui('#address_popover').on('tap', '#backtoorder', function() {
		// $('#address_form')[0].reset();
		mui('#address_popover').popover('toggle');
	});
	
	mui('.agreement_close').on('tap', 'a', function() {
		mui('#agreement_popover').popover('toggle');
	});

	mui('#address_popover').on('tap','#address_ok',function() {
		var aid;
		$('.address_list_input:checked').each(function() {aid = $(this).val();});
		if(aid == '' || aid == undefined){mui.alert('请选择地址','逸品生活');return false;};
		var consignee_name = $('#al_' + aid).find('.consignee_name').find('em').text();
		var consignee_tel = $('#al_' + aid).find('.consignee_tel').text();
		var consignee_address = $('#al_' + aid).find('.consignee_address').find('em').text();
		$('#default_address').attr('daid', aid);
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
		$('#pickUpAddress_detail').val(ca[3].replace(/\s/g,''))
		$('#province').val(ca[0].replace(/\s/g,'') + '省');
		$('#city').val(ca[1].replace(/\s/g,'') + '市');
		$('#district').val(ca[2].replace(/\s/g,'') + '区');
		
		$('#change_h1').text('修改收货地址');
		$('#type').val('2');
		$('#addressId').val(aid);
		mui('#changeaddress_popover').popover('toggle');
		
	});
	
	mui('#address_popover').on('tap', '.new_address_list_btools_delete', function() {
		var a = $(this).attr('aid');
		upActive();
		if($('#al_'+ a).find('input.address_list_input').prop('checked') || $('.new_address_list_oc').length < 2){
			mui.alert('选中的地址是不可以被删除的哦','逸品生活');
			return false;
		}
		
		var btnArray = ['取消', '确定'];	
		mui.confirm('是否删除该地址!', '逸品生活', btnArray, function(e) {
			if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/pickUpAddressDelete?pickUpAddress.addressId=' + a,
				dataType : 'html',
				success : function(data) {
					data == 1 ? $('#al_'+ a).remove() : mui.alert('删除失败','逸品生活');	
					mui('#address_scroll').scroll().reLayout();
				},
				error: function(e) { 
					mui.alert('出错了\n'+e,'逸品生活'); 
					} 
				})
			} 
		})
	});
	
	mui('#address_popover').on('tap', '#add_new_change',function(){
		$('#change_h1').text('添加收货地址');
		$('#type').val('1');
		$('#addressId').val('');
		mui('#changeaddress_popover').popover('toggle');
		
	});
	
	mui('#changeaddress_popover').on('tap', '#cencel_change',function(){
		mui('#changeaddress_popover').popover('toggle');
		mui('#address_popover').popover('toggle');
	});
	
	mui('.checkbox_tabing').on('tap', '#agreement_words',function(){
		mui('#agreement_popover').popover('toggle');
		return false;
	});
	
	mui('#changeaddress_popover').on('tap', '#address_area',function(){
		$('input').blur();
		$('.mui-poppicker').css('z-index','1001')
		cityPicker3.show(function(items) {
			var input_area = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			$('#address_area').val(input_area);
			$('#province').val((items[0] || {}).text);
			$('#city').val((items[1] || {}).text);
			$('#district').val((items[2] || {}).text);
		});
		$('.mui-backdrop').each(function(){
			if(!$(this).hasClass('mui-active')){
				$(this).css('z-index','1000');
			}
		});
	});
	
	mui('#changeaddress_popover').on('tap', '#save_ok',function(){
		upActive();
		var status = $('#set_default_switch').hasClass('mui-active') ? '1' : '0';
		var ajaxURL = $('#addressId').val() == '' ? '/pickUpAddressSave' : '/pickUpAddressSave';
		$('#isDefault').val(status);
		var ajax_option = {
				url : ajaxURL,
				type : 'post',
				dataType : 'html',
				success : function(data) {
					if(data > 0){
						modifyAid = data;
						$('#save_address_form')[0].reset();
						mui('#address_popover').popover('toggle');
						$('#address_form').getAddressList();
					}else{
						 mui.alert('保存地址失败失败！','逸品生活');
					}
				},
				error : function(e){
					mui.alert('出错了\n'+e,'逸品生活'); 
				}
			}
			$('#save_address_form').ajaxSubmit(ajax_option);
	});
	mui('.pay_footer').on('tap','#confirm_to_save',function(){
		$('#puaid').val($('#default_address').attr('daid'));
		var ajax_option = {
				url : '/crowdFundSupportSave',
				type : 'post',
				dataType : 'json',
				success : function(json) {
					if(json.result == 0){
						mui.alert('众筹支持失败','逸品生活');
					}else{
						var orderID = json.crowdFundSupport.orderId;
						window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + orderID + '#wechat_redirect';
					}
				},
				error: function(e) { 
					mui.alert('出错了\n'+e,'逸品生活'); 
				} 
		};
		if($('#puaid').val() == '' || $('#puaid').val() == undefined || $('#puaid').val() == null){
			mui.alert('请填写地址');
		}else{
			mui('#payload_popover').popover('toggle');
			$('#cf_form').ajaxSubmit(ajax_option);
		}
	});
	
	mui('#address_popover').on('tap', '.new_address_list_btools_setdefault', function() {
		var _this = $(this);
		upActive();
		if(!_this.hasClass('new_address_list_btools_iddefault')){
			$.ajax({
				type : 'get',
				url : '/defaultPickUpAddress?addressId=' + _this.attr('aid'),
				dataType : 'html',
				success : function(data) {
					mui.alert('已设置该地址为默认地址','逸品生活',function(){$('#address_form').getAddressList();});
				},
				error: function(e) { 
					mui.alert('出错了\n'+e,'逸品生活'); 
				} 
			})
		}
	});
	
	mui('.checkbox_tabing').on('change', '#iagreement', function() {
		this.checked ? $('.confirm_to_pay').attr('id','confirm_to_save') : $('.confirm_to_pay').attr('id','confirm_to_noagree');
	});
})



$.fn.extend({          
	getAddressList:function() {            
         var _this = $(this);
         $.ajax({
				type : 'get',
				url : '/pickUpAddressJson',
				dataType : 'json',
				success : function(json) {
					_this.find('.new_address_list_oc').remove();
					var addressList = json.pickUpAddressList; 
					for(var i in addressList){
						var alist = '<div class="new_address_list_oc" id="al_' + addressList[i].addressId;
						alist += '"><div class="mui-slider-handle"><div class="default_address mui-radio mui-table-cell md_address"><div class="consignee_baseinfo"><span class="consignee_name">收件人：<em>' + addressList[i].consignee;
						alist += '</em></span> <span class="consignee_tel">' + addressList[i].consigneePhone;
						alist += '</span></div><div class="consignee_address">收货地址：<em>' + addressList[i].province + '&nbsp;' + addressList[i].city + '&nbsp;' + addressList[i].district + '&nbsp;' + addressList[i].detail; 
						alist += '</em></div><div class="consignee_location"><input name="radio1" type="radio" class="address_list_input" ' +  (addressList[i].isDefault == 1 ? 'checked="checked"' : '') + ' value="' + addressList[i].addressId;
						alist += '"></div></div></div><div class="new_address_list_btools"><a class="new_address_list_btools_setdefault' + (addressList[i].isDefault == 1 ? ' new_address_list_btools_iddefault' : '') + '" aid="' + addressList[i].addressId;
						alist += '">' + (addressList[i].isDefault == 1 ? '默认地址' : '设为默认') + '</a>' + (addressList[i].isDefault != 1 ? '<a class="new_address_list_btools_delete" aid="' + addressList[i].addressId + '">删除</a>' : '') + '<a class="new_address_list_btools_edit ' + (addressList[i].isDefault == 1 ? 'new_address_list_btools_only_edit' : '') + '" aid="' + addressList[i].addressId + '">编辑</a></div></div>';
						_this.append(alist);
					}
					if(modifyAid > 0){
						var defDom = $('#al_' + modifyAid);
						defDom.find('input.address_list_input').prop('checked','true');
						var domH = defDom.position().top;
						var scrollH = $('#address_scroll').height();
						var contentH = $('#address_form').height();
						mui('#address_scroll').scroll().reLayout();
						if(domH < contentH - scrollH){
							mui('#address_scroll').scroll().scrollTo(0,-domH,1);
						}else{
							mui('#address_scroll').scroll().scrollToBottom(2);
					          
						}
						
					}
				},
				error: function(e) { 
					
				} 
			})
     }       
});     


function upActive(){
	$('body').find('#addStyle').remove();
	$('body').append(style);
}

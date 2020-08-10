var style = '<style id="addStyle">.mui-popup-backdrop.mui-active{z-index:9999}</style>';
var cityPicker3 = new mui.PopPicker({layer: 3});
cityPicker3.setData(cityData3);
cityPicker3.pickers[0].setSelectedValue('350000', 100);
mui.init({
	pullRefresh : {
		container : '#address_scroll',
		down : {
			contentdown : '下拉可以刷新',
			contentover : '释放立即刷新',
			contentrefresh : '正在刷新...',
			callback : pullupRefresh,
			auto : true,
		}
	}
});

mui('body').on('tap','.use_the_address',function(){
	var postObj = {};
	postObj.pickUpAddressId = $('.address_list_input:checked').val();
	postObj.realOrderId=$('body').attr('oid');
	$.ajax({
		type : 'post',
		url : '/wxSetOrderAddress',
		dataType : 'html',
		data:postObj,
		success : function(data) {
			if(data > 0){
				mui.alert('完善地址成功\n正在返回我的订单','逸品生活',function(){location.href = '/wxMyOrder'}); 
			}else{
				mui.alert('完善地址出错了','逸品生活'); 
			}
			
		},
		error: function(e) { 
			mui.alert('出错了\n'+e,'逸品生活'); 
			} 
		})
})

mui('body').on('tap', '.new_address_list_btools_edit', function() {
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

mui('#changeaddress_popover').on('tap', '#cencel_change',function(){
	mui('#changeaddress_popover').popover('toggle');
	mui('#address_popover').popover('toggle');
});

mui('body').on('tap', '#add_new_change',function(){
	$('#change_h1').text('添加收货地址');
	$('#type').val('1');
	$('#addressId').val('');
	mui('#changeaddress_popover').popover('toggle');
	
});

mui('body').on('tap', '#save_ok',function(){
	upActive();
	var status = $('#set_default_switch').hasClass('mui-active') ? '1' : '0';
	var ajaxURL = $('#addressId').val() == '' ? './wxPickUpAddressSave' : './wxPickUpAddressSave';
	$('#isDefault').val(status);
	var ajax_option = {
			url : ajaxURL,
			type : 'post',
			dataType : 'html',
			success : function(data) {
				if(data > 0){
					modifyAid = data;
					$('#save_address_form')[0].reset();
					mui('#changeaddress_popover').popover('toggle');
					pullupRefresh();
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

mui('body').on('tap', '.new_address_list_btools_delete', function() {
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
			url : '/wxPickUpAddressDelete?addressId=' + a,
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

mui('body').on('tap', '.new_address_list_btools_setdefault', function() {
	var _this = $(this);
	upActive();
	if(!_this.hasClass('new_address_list_btools_iddefault')){
		$.ajax({
			type : 'get',
			url : '/wxDefaultPickUpAddress?addressId=' + _this.attr('aid'),
			dataType : 'html',
			success : function(data) {
				mui.alert('已设置该地址为默认地址','逸品生活',function(){pullupRefresh();});
			},
			error: function(e) { 
				mui.alert('出错了\n'+e,'逸品生活'); 
			} 
		})
	}
});

function pullupRefresh() {
	$.ajax({
		type : 'get',
		url : '/wxPickUpAddressAjax',
		dataType : 'json',
		success : function(json) {
			$('.append_area div').remove();
			for ( var ai in json.pickUpAddressList) {
				var pickUpAddress = json.pickUpAddressList[ai];
				$('.append_area').append(splitHtml(pickUpAddress,ai))
			}
			mui('#address_scroll').pullRefresh().endPulldownToRefresh();

		}
	});
}

function splitHtml(obj,ai) {
	if(ai == 0){
		var checked = ' checked="checked"';
	}else{
		var checked = ' '
	}
	if(obj.isDefault == 1){
		var footContent = '<a class="new_address_list_btools_setdefault new_address_list_btools_iddefault" aid="'+obj.addressId+ '">默认地址</a>'; 
		footContent = footContent + '<a class="new_address_list_btools_edit new_address_list_btools_only_edit" aid="'+obj.addressId+ '">编辑</a>';
	}else{
		var footContent = '<a class="new_address_list_btools_setdefault" aid="'+obj.addressId+ '">设为默认</a>'; 
		footContent = footContent + '<a class="new_address_list_btools_delete" aid="'+obj.addressId+'">删除</a>' 
		footContent = footContent + '<a class="new_address_list_btools_edit" aid="'+obj.addressId+ '">编辑</a>';
	}
	var addressArea = obj.province + '&nbsp;' + obj.city + '&nbsp;' + obj.district + '&nbsp;' + obj.detail
	var html = '<div class="new_address_list_oc" id="al_' + obj.addressId;
	html = html + '"><div class="mui-slider-handle"><div class="default_address';
	html = html + ' mui-radio mui-table-cell md_address"><div class="consignee_baseinfo"><span class="consignee_name">收件人：<em>'+obj.consignee;
	html = html + '</em></span> <span class="consignee_tel">'+obj.consigneePhone;
	html = html + '</span></div><div class="consignee_address">收货地址：<em>'+addressArea;
	html = html + '</em></div><div class="consignee_location"><input name="radio1" type="radio" class="address_list_input"'+ checked +' value="'+obj.addressId;
	html = html + '"></div></div></div><div class="new_address_list_btools">'+footContent+'</div></div>';
	return html;
}

function upActive(){
	$('body').find('#addStyle').remove();
	$('body').append(style);
}

document.body.addEventListener('touchmove', function(e) {
	e.preventDefault();
})
mui.init()
var referrer = document.referrer;
$(function() {

})

function Num(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ''); // 验证第一个字符是数字而不是
	obj.value = obj.value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
	obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$',
			'.');
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
	if(obj.value - obj.attributes['data-max-input'].value > 0){
		obj.value = obj.attributes['data-max-input'].value;
	}
}

mui('.OfferBug_foot').on('tap','.supply_nac_active',function(){
	var ajax_option = {
			url : './spotBidSave',
			type : 'post',
			dataType : 'html',
			success : function(data) {
				data == '1' ?mui.alert('报价成功，请耐心等待。','逸品生活',function(){window.location.href=referrer})  : mui.alert('出错了~','逸品生活');
			}
		}
		var spl = 0;
		$('#spotbid').find('input').each(function() {if ($(this).val() == '') {spl = spl + 1;}});
		spl > 0 ? mui.alert('请认真填写所有内容') : $('#spotbid').ajaxSubmit(ajax_option);
});
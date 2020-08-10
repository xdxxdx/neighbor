mui.init();
var dd = new Date();
var dt = $('#birthday').val();
countHobby();
var birthPicker = new mui.DtPicker({
	'type':'date',
	'value':dt,
	beginDate: new Date(dd.getFullYear() - 30,  dd.getMonth(), dd.getDate()),
	endDate: new Date(dd.getFullYear(), dd.getMonth() , dd.getDate()),
}); 

mui('.mui-scroll-wrapper').scroll({
	 indicators: false,
});

//mui('body').on('tap' , '#BI_head',function(){
//	$('#head_img_input').click()
//});

$('#head_img_input').change(function(){
	var $file = $(this);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $('#upload_img');
     if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL .createObjectURL(fileObj.files[0]);
        $img.attr('src', dataURL);
    }
    else 
    {
        dataURL = $file.val();
        var imgObj = document .getElementById('upload_img');
        imgObj.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
        imgObj.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = dataURL;
    }
});

mui('body').on('shown', '#sex_actionsheet', function(e) {
	$('input').blur();
});

mui('body').on('tap', '#sex_actionsheet ul.sex_sheet li>a', function() {
	var _this = $(this);
	$('input').blur();
	mui('#sex_actionsheet').popover('toggle');
	$('#sex_input').val(_this.text());
	$('#sex_codet').val(_this.attr('sex'));
})

mui('body').on('tap', '#birth_target',function(){
	$('input').blur();
	birthPicker.show(function(items){
		$('#birthday').val(items.text);
	});
});

mui('body').on('tap', '#telphone_target',function(){
	$('input').blur();
	mui.toast('请前往 帐号与安全 中修改手机号');
});

mui('body').on('tap', '#username_target',function(){
	$('input').blur();
	mui.toast('会员名作为登录名 ，不可以修改');
});

mui('body').on('tap', '#save_baseinfo_btn',function(){
	$('input').blur();
	countHobby();
	var ajax_option = {
			url : '/baseInfoUpdateSave',
			type : 'post',
			dataType : 'html',
			success : function(data) {
				if(data == 1){
					mui.toast('个人资料修改成功，正在返回账号设置');
					location.replace('/wechatAccountManager');
				}else{
					mui.toast('个人资料修改失败');
				}
			}
	};
	$('#baseinfo_form').ajaxSubmit(ajax_option);
});

mui('#hobby_tab').on('tap', '.hobby_block ',function(){
	var _this = $(this);
	_this.hasClass('choiced0') ? _this.removeClass('choiced0').addClass('choiced1') :  _this.removeClass('choiced1').addClass('choiced0');
	countHobby()
	
});

function countHobby(){
	var hobbyArray = [];
	var hobbyTips = [];
	var hobbySum = $('.hobby_block').length;
	var hobbyChoiced = $('.choiced1').length
	$('.choiced1').each(function(){
		hobbyArray.push($(this).data('classid'));
		hobbyTips.push($(this).text());;
	});
	$('#hobby_tips').text(hobbyChoiced == hobbySum ? '全部' : hobbyChoiced == 0 ? '未填写' : hobbyTips.toString());
	$('#hobbyId').val(hobbyArray.toString());
}
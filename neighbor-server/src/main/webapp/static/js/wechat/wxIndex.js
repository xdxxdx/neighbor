(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d4f4f8f1b869f305168bf0f2e2b1d3df";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
mui.init();
(function($) {
	$(".mui-scroll-wrapper").scroll({
		//bounce: false,//滚动条是否有弹力默认是true
		//indicators: false, //是否显示滚动条,默认是true 
	});
})(mui);

$(function() {
	$('#repair-now').click(function() {
		mui('#body_scroll').scroll().scrollToBottom(100);
	});

	var style = '<style id="addStyle">.mui-popup-backdrop.mui-active{z-index:9999}</style>';
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	cityPicker3.pickers[0].setSelectedValue('350000', 100);
	mui('body').on('tap', '#address_area', function() {
			$('input').blur();
			$('.mui-poppicker').css('z-index', '1001')
			cityPicker3.show(function(items) {
				var input_area = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				$('#address_area input').val(input_area);
				$('#provinceCode').val((items[0] || {}).value);
				$('#cityCode').val((items[1] || {}).value);
				$('#districtCode').val((items[2] || {}).value);
			});
			$('.mui-backdrop').each(function() {
				if(!$(this).hasClass('mui-active')) {
					$(this).css('z-index', '1000');
				}
			});
		});
})
$('body').on('tap', '#submit1', function() {
			if($('#thisForm').find('input.must').val() != ''){
				if($.isPoneAvailable($("#phone").val())){
					 $.ajax({
		            type : 'post',
		            url : 'h5RepairSave',
		            data : $('#thisForm').serialize(),
		            dataType : 'html',
		            success : function(data) {
		                if (data > 0) {            
		                    mui.alert('申请成功,后续会有工作人员联系您','房屋小哥',function(){$("#thisForm")[0].reset();})
		                } else {
		                    mui.alert('申请失败，手机号码为必填项','房屋小哥')
		                }
		            }
		        });
				}else{
					 mui.alert('请输入正确的电话号码','房屋小哥')
				}
				 
			}else{
				 mui.alert('请完整填写信息','房屋小哥')
			}
		});
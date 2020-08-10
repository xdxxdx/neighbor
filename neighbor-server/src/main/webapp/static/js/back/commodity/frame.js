if (typeof ($('#merchantId').val()) != 'undefined' &&  $('.RC_edit').length <= 0) {
	sentmid($('#merchantId').val());
} else if (typeof ($('#merchantclassId').attr('minmc')) != 'undefined') {
	sentmid($('#merchantclassId').attr('minmc'));
} else {}

$('.border_table').on('click', '.additem', function() {
	$(this).parent().parent().parent().append($('.temps').html());
})

$('.border_table').on('click', '.removeitem', function() {
	console.log($(this).parent().parent().parent().find('.td_c').length)
	if ($(this).parent().parent().parent().find('.td_c').length != 1) {
		$(this).parent().parent().remove();
	}
	if($(this).attr('specid')){
		$.ajax({
			type : 'get',
			url : '/commodity/specDelete?specId=' + $(this).attr('specid'),
			dataType : 'json',
			async : false,
			success : function(json) {}
		})
	}

})

$(document).on('click', '.uploadImageLook', function() {
	$(this).prev().click();

})

$(document).on('click', '.deleteimg', function() {
	var oj = $(this)
	var pid = $(this).attr('photoid');
	$.ajax({
		type : 'get',
		url : '/commodity/attachDelete?photoId=' + pid,
		dataType : 'html',
		async : false,
		success : function(data) {
			oj.parent('div').remove();
			if ($('.nodefault').length == 0) {
				// alert($('#addimgs').html());
				$('#more_def').append($('#addimgs').html())
			}

		},
		error : function() {
		}
	})
})
$(document)
		.on(
				'change',
				'.fileimg',
				function() {
					var $file = $(this);
					var fileObj = $file[0];
					console.log(fileObj)
					var windowURL = window.URL || window.webkitURL;
					var dataURL;
					var $img = $file.next().find('img');

					if (fileObj && fileObj.files && fileObj.files[0]) {
						dataURL = windowURL.createObjectURL(fileObj.files[0]);
						$img.attr('src', dataURL);
						
					} else {
						dataURL = $file.val();
						var imgObj = $img;
						imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
						imgObj.filters
								.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
						
					}
					
					
					
					
					if ($file.attr('mul') != undefined) {
						var mul = $file.attr('mul');
						mulnum = mul.replace('mul', '');
						var inputmun = $file.parent().parent().find('.fileimg').length;
						if (inputmun < parseInt(mulnum)) {
							console.log(inputmun)
							if ($file.attr('t') != 'c') {
								$file.parent().parent().append(
										$file.parent().parent().parent().find(
												'.templ').html());
							}
						}
					}
					$file.attr('t', 'c');
					if($img.attr('id') == 'nativeImg'){
						$('#nativeImg').css('width','auto');
						
					}
					$('#tips').hide();
					$('#showtips').show();
				})

				
$('.nav-tabs').find('li').click(function() {
	$(this).parent('.nav-tabs').find('li').removeClass('active');
	var tbid = '#' + $(this).attr('class');
	$(this).addClass('active');
	$('#thisForm').find('table.form_table').hide();
	$(tbid).show();
})


$('#merchantId').change(function() {
	sentmid($(this).val());
})

function getImg(){
	
}

function sentmid(m) {
	m = m.split(',')[0];
	$('#merchantclassId').find('option').remove();
	$
			.ajax({
				type : 'get',
				url : '/merchantCommodityClass/merchantCommodityClassByMerchantId?merchantId=' + m,
				dataType : 'json',
				async : false,
				success : function(json) {
					var ml = json.length;
					if (ml == 0) {
						$('#merchantclassId').hide();
						$('#noma').html('').append('该商户没有设置分类，请联系商户添加');
					} else {
						$('#merchantclassId').show();
						$('#noma').html('').append('若找不到需要的分类，请联系商户')
						var optionlist = '';
						for (var i = 0; i < ml; i++) {
							optionlist = optionlist
									+ '<option value="'
									+ json[i].merchantCommodityClassId
									+ ','
									+ json[i].merchantCommodityClassName
									+ '">'
									+ json[i].merchantCommodityClassName
									+ '</option>'
						}
						$('#merchantclassId').append(optionlist);
					}

				},
				error : function() {
				}
			})
}

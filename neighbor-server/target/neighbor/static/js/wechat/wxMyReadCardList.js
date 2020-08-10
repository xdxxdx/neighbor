var timeQrCode = '';
var sendQrCode = 0;
mui.init();
mui('.mui-scroll-wrapper').scroll();
mui('body').on('tap', '.read-card-able', function(e) {
			var _this = $(this);
			var _readCardClass = _this.find('.read-card-class');
			var className = _readCardClass.attr('class');
			var styleClass = className.replace('read-card-class ', '');

			createQrCode(_this.data('cardId'));
			$('.read-card-dialog').attr('card-id', _this.data('cardId'));
			// timeQrCode =
			// setInterval(function(){getQrCodeStatus(_this.data('cardId'))},2000);

			$('.read-card-dialog-title em').text(_this.data('cardTitle'))
			$('.read-card-dialog-number').text(splitNumber(_this
					.data('cardNumber')))
			$('.read-card-dialog').addClass(styleClass);
			$('.read-card-dialog').fadeIn();
		})
mui('body').on('tap', '.read-card-dialog-close em', function() {
	$('.read-card-dialog').hide();
	sendQrCode = 0;
	$('.read-card-dialog-qrcode-area')
			.removeClass('read-card-dialog-qrcode-disable');
	$('.read-card-dialog-qrcode-tips').hide();
	// clearTimeout(timeQrCode);
	$('.read-card-dialog').removeAttr('class')
			.attr('class', 'read-card-dialog');
})

function createQrCode(id) {
	$('.read-card-dialog-qrcode-area').html('');
	$('.read-card-dialog-qrcode-area').qrcode({
		render : 'canvas',
		typeNumber : -1,
		text : 'http://www.wonyen.com/readCardUse?_='
				+ ((Date.parse(new Date())) / 1000) + '&userReadCardId=' + id,
		width : $('#readCardQrCode').width(),
		height : $('#readCardQrCode').height(),
		colorDark : '#000000',
		colorLight : '#ffffff',
		correctLevel : 1,
		typeNumber : -1
	})
}

function splitNumber(n) {
	var a = (n + '').split('').reverse();
	var split = a[0] + a[1] + a[2] + a[3];
	split += ' ' + a[4] + a[5] + a[6] + a[7];
	split += ' ' + a[8] + a[9] + a[10] + a[11];
	split += '-' + a[12];
	return split;
}

function getQrCodeStatus(id) {

	$.ajax({
				url : '/?id=' + id,
				timeout : 2000,
				type : 'post',
				dataType : 'data',
				beforeSend : function() {
					$('.read-card-dialog-qrcode-area')
							.removeClass('read-card-dialog-qrcode-disable');
					$('.read-card-dialog-qrcode-tips').hide();
					sendQrCode = sendQrCode + 1;
				},
				success : function(data) {

				},
				complete : function() {// 完成响应
					if (sendQrCode >= 30) {
						sendQrCode = 0;
						$('.read-card-dialog-qrcode-area')
								.addClass('read-card-dialog-qrcode-disable');
						$('.read-card-dialog-qrcode-tips').fadeIn();
						clearTimeout(timeQrCode);
						console.log('过期');
					}
				}
			});

}
mui('body').on('tap', '.read-card-dialog-qrcode-tips', function() {
	$('.read-card-dialog-qrcode-area')
			.removeClass('read-card-dialog-qrcode-disable');
	$('.read-card-dialog-qrcode-tips').hide();
	createQrCode($('.read-card-dialog').attr('card-id'));
	// timeQrCode =
	// setInterval(function(){getQrCodeStatus($('.read-card-dialog').attr('card-id'))},2000);
	sendQrCode = 0;
})
mui('body').on('tap', '.read-card-use-btn', function() {
	var _this = $(this);
	var _card = _this.parents('.read-card');
	var cardId = _card.data('cardId');
	$('.read-card-use-title h4 i').text(_card.data('cardTitle'));
	$('.read-card-use-title em').text(splitNumber(_card.data('cardNumber')));
	$('#readView li').remove();
	$.ajax({
		url : '/readCardRecordAjax?userReadCardId=' + cardId,
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			for (var i in json.recordList) {
				var record = json.recordList[i];
				var html = '<li class="mui-table-view-cell"><div class="mui-table"><div class="mui-table-cell mui-col-xs-12"><h4 class="mui-ellipsis-2">在逸品绘本馆使用本卡一次</h4><h5>时间：';
				html += record.createTime
				html += '</h5></div></div></li>';
				$('#readView').append(html);
			}
			$('#readView').scroll();
		}
	});

	mui('#readCardUsePopover').popover('toggle');
	return false;
})

mui('body').on('tap', '.read-card-close-popover', function() {
	mui('#readCardUsePopover').popover('toggle');

})
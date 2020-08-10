mui.init();
var devicemotionStatus = 1;
var count = 0;
document.onreadystatechange = subSomething;// 当页面加载状态改变的时候执行这个方法.
function subSomething() {
	if (document.readyState == 'complete') {
		setTimeout('luckInit()', 3000);
		setTimeout('luckThen()', 20000);
	}
}

if ($('body').data('draw') == 1) {
	if (window.DeviceMotionEvent) {
		var speed = 25;
		var x = y = z = lastX = lastY = lastZ = 0;
		window.addEventListener('devicemotion', function() {
					var acceleration = event.accelerationIncludingGravity;
					x = acceleration.x;
					y = acceleration.y;
					if (Math.abs(x - lastX) > speed
							|| Math.abs(y - lastY) > speed) {
						if (devicemotionStatus == 1) {
							ajaxLuck();
						}

					}
					lastX = x;
					lastY = y;
				}, false);
	} else {
		$('#luckTitleTip').text('点击袋子 抽大奖');

	}
	mui('body').on('tap', '.luck-draw-start', function() {
				ajaxLuck();
			})

}else{
	mui.alert('抽奖活动还没有开始', '很抱歉', function() {location.href = '/wechatMyRealOrder'})
}

function ajaxLuck() {
	devicemotionStatus = 0;
	$.ajax({
				type : 'get',
				url : '/lottery?realOrderId=' + GetQueryString('realOrderId'),
				dataType : 'json',
				async : false,
				success : function(json) {
					if (json.is_lottery == 0) {
						$('.luck-draw-start').addClass('luck-draw-hide');
						$('.luck-draw-end').addClass('luck-draw-show');
						if (json.drawPrize.isFree == 1) {
							mui.alert('谢谢参与，欢迎再次购买', '很抱歉', function() {
										location.href = '/wxMyLuckDetail '
									})
						} else {
							mui.alert('获得价值￥' + json.drawPrize.faceValue + '的'
											+ json.drawPrize.luckPrizeName
											+ '一份', '恭喜您', function() {
										location.href = '/wxMyLuckDetail '
									})
						}
					} else {
						mui.alert('一个订单只能参与一次抽奖哦', '很抱歉', function() {
									location.href = '/wxMyLuckDetail '
								})
					}
				}
			})
}

function luckInit() {
	devicemotionStatus == 1;
	$('.luck-load').remove();
}

function luckThen() {
	$('#luckTitleTip').text('点击袋子 抽大奖');
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

var opts = {
	lines : 9,
	length : 0,
	width : 10,
	radius : 15,
	corners : 1,
	rotate : 0,
	color : '#fff',
	speed : 1.5,
	trail : 60,
	shadow : false,
	hwaccel : false,
	className : 'spinner',
	zIndex : 2e9,
	top : 'auto',
	left : 'auto'

};

var target = document.getElementById('luck-loader');

var spinner = new Spinner(opts).spin(target);

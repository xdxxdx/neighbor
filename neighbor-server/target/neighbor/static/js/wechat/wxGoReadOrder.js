var fullNum = 30;
var isToday = '0';
var date = new Date();
var timeIntervalStatus = 'all';
var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
var dataStamp = Date.parse(new Date(dateStr));
var nextDate = getNextMonth(dateStr);
var beginDateArr = [ date.getFullYear(), (date.getMonth() + 1), date.getDate() ];
var nextDateArr = [ nextDate.split('/')[0], nextDate.split('/')[1], nextDate.split('/')[2] ];
if (date.getHours() > 11) {
	timeIntervalStatus = 'pm';
}

mui.init();

mui('body').on('tap', '#selectAm', function() {
	if ($('#goReadTable').attr('disable') == 'disable') {
		mui.alert('周天闭馆休整，不可以报名哦', '很抱歉');
		return false;
	}

	if ($('#amRemainingTd').attr('overdue') == 'overdue') {
		mui.alert('您已经错过该时段的报名了', '很抱歉');
	} else {
		if ($('#amRemainingTd').attr('size') < fullNum) {
			if ($('#amRemainingTd').attr('choiced') > 0) {
				mui.alert('您已经报名该时段了，请选择其他时段', '很抱歉');
			} else {
				var amPm = $(this).attr('amPm');
				var amPmText = $(this).text();
				$('#openTimeInterval').text('已预约时段：' + amPmText);
				$('#amPm').val(amPm);
				mui('#timeIntervalPopover').popover('toggle');
			}
		} else {
			mui.alert('该时段报名人数已满，请选择其他时段', '很抱歉');
		}
	}
})

mui('body').on('tap', '#selectPm', function() {
	if ($('#goReadTable').attr('disable') == 'disable') {
		mui.alert('周一闭馆休整，不可以报名哦', '很抱歉');
		return false;
	}

	if ($('#pmRemainingTd').attr('overdue') == 'overdue') {
		mui.alert('您已经错过该时段的报名了', '很抱歉');
	} else {
		if ($('#pmRemainingTd').attr('size') < fullNum) {
			if ($('#pmRegistrationTd').attr('choiced') > 0) {
				mui.alert('您已经报名该时段了，请选择其他时段', '很抱歉');
			} else {
				var amPm = $(this).attr('amPm');
				var amPmText = $(this).text();
				$('#openTimeInterval').text('已预约时段：' + amPmText);
				$('#amPm').val(amPm);
				mui('#timeIntervalPopover').popover('toggle');
			}
		} else {
			mui.alert('该时段报名人数已满，请选择其他时段', '很抱歉');
		}
	}
})

mui('body').on('tap', '.cancel-action', function() {
	mui('#timeIntervalPopover').popover('toggle');
})

mui('body').on('tap', '.calendar-complete', function() {
	$('body').removeClass('calendar-locked');
	$('#calendar-bg-calenderDom').removeClass('calendar-bg-up').removeClass('calendar-bg-delay');
	$('.calendar-block').removeClass('calendar-block-mask-up').removeClass('calendar-block-action-none');
	 
})

mui('body').on('tap', '#openTimeInterval', function() {
	if ($('.go-read-schedule').is(':visible')) {
		mui('#timeIntervalPopover').popover('toggle');
	}
})

mui('body').on('tap', '#isGo', function() {
	var phone = $('#phone').val();
	if (!(/^1[34578]\d{9}$/.test(phone))) {
		mui.alert('手机号码有误', '请重试');
		return false;
	}

	if ($('#orderName').val() == '' || $('#orderDate').val() == '' || $('#amPm').val() == '') {
		mui.alert('请完整填写预约信息', '请重试');
		return false;
	}

	$.ajax({
		type : 'post',
		url : '/wxReadOrderSave',
		data : $('#readerForm').serialize(),
		dataType : 'html',
		success : function(data) {
			mui.alert('您已预约成功，稍后将有短信通知', '恭喜你', function() {
				location.href = '/wxMyReadOrderList';
			});
		}
	})
})

new Calendar({
	clickTarget : 'openCalender',
	container : 'calenderDom',
	angle : 14,
	isMask : true, // 是否需要弹层
	beginTime : beginDateArr, // 如空数组默认设置成1970年1月1日开始,数组的每一位分别是年月日。
	endTime : nextDateArr, // 如空数组默认设置成次年12月31日,数组的每一位分别是年月日。
	recentTime : beginDateArr, // 如空数组默认设置成当月1日,数组的每一位分别是年月日。
	isSundayFirst : true, // 周日是否要放在第一列
	isShowNeighbor : false, // 是否展示相邻月份的月尾和月头
	isToggleBtn : true, // 是否展示左右切换按钮
	isChinese : true, // 是否是中文
	monthType : 0, // 0:1月, 1:一月, 2:Jan, 3: April
	canViewDisabled : true, // 是否可以阅读不在范围内的月份
	beforeRenderArr : [ {
		stamp : dataStamp,
		className : 'nowCurrent'
	} ],
	success : function(item, arr) {
		var selectTime = new Date(parseInt(item));
		var day = selectTime.getDay();

		var selectStr = selectTime.getFullYear() + '-' + (selectTime.getMonth() + 1) + '-' + selectTime.getDate() + ' ' + selectTime.getHours() + ':' + selectTime.getMinutes() + ':'
				+ selectTime.getSeconds();

		$.ajax({
			type : 'get',
			url : '/readOrderAjax?orderDate=' + selectStr,
			dataType : 'json',
			success : function(json) {
				$('#openTimeInterval').text('选择预约时段');
				$('#amPm').val('');
				var amRemainingNumber = fullNum - json.amSize;
				var pmRemainingNumber = fullNum - json.pmSize;

				if (day == 0) {
					$('#goReadTable').attr('disable', 'disable');
					$('#amRemainingTd').text('周天闭馆整理').removeAttr('overdue');
					$('#pmRemainingTd').text('周天闭馆整理');
					$('#amRegistrationTd').text('禁止预约');
					$('#pmRegistrationTd').text('禁止预约');
				}else{
					if(day == 6){
						$('#amRemainingTd').text('已满').attr('size', fullNum).removeAttr('overdue');
					}else {
						if (timeIntervalStatus == 'pm' && item == dataStamp) {
							$('#amRemainingTd').text('已过期').attr('overdue', 'overdue');
						} else {
							$('#amRemainingTd').text(amRemainingNumber < 1 ? '已满' : '剩余' + amRemainingNumber + '名（共' + fullNum + '名）').attr('size', json.amSize).removeAttr('overdue');
						}
					}
					
					$('#goReadTable').removeAttr('disable');
					$('#pmRemainingTd').text(pmRemainingNumber < 1 ? '已满' : '剩余' + pmRemainingNumber + '名（共' + fullNum + '名）').attr('size', json.pmSize);
					$('#amRegistrationTd').text(json.amChoiced == 0 ? '未报名' : '已报名').attr('choiced', json.amChoiced);
					$('#pmRegistrationTd').text(json.pmChoiced == 0 ? '未报名' : '已报名').attr('choiced', json.pmChoiced);
				} 

				$('#orderDate').val(selectStr);
				$('.selectedCurrent').removeClass('selectedCurrent');
				$('.calenderDom-item-' + item).addClass('selectedCurrent');
				$('#openCalender').text('选择预约日期：' + selectStr.split(' ')[0].replace('-', '年').replace('-', '月') + '日');
				$('.schedule-title').text(selectStr.split(' ')[0].replace('-', '年').replace('-', '月') + '日绘本馆预约情况')
				$('.go-read-schedule').show();

			}
		})
	},
	switchRender : function(year, month, cal) {

	}
});

function checkPhone() {
	var phone = document.getElementById('phone').value;
	if (!(/^1[34578]\d{9}$/.test(phone))) {
		alert("手机号码有误，请重填");
		return false;
	}
}

/** 
 * 获取下一个月 
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2017/10/13 
 */      
function getNextMonth(date) {  
            var arr = date.split('/');  
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);  
            days = days.getDate(); //获取当前日期中的月的天数  
            var year2 = year;  
            var month2 = parseInt(month) + 1;  
            if (month2 == 13) {  
                year2 = parseInt(year2) + 1;  
                month2 = 1;  
            }  
            var day2 = day;  
            var days2 = new Date(year2, month2, 0);  
            days2 = days2.getDate();  
            if (day2 > days2) {  
                day2 = days2;  
            }  
            if (month2 < 10) {  
                month2 = '0' + month2;  
            }  
          
            var t2 = year2 + '/' + month2 + '/' + day2;  
            return t2;  
        }  
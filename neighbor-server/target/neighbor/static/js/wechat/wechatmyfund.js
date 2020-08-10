mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005,
	indicators: false,
});

var parserDate = function(date) {
	var t = Date.parse(date);
	if(!isNaN(t)) {
		return new Date(Date.parse(date.replace(/-/g, "/")));
	} else {
		return new Date();
	}
};

var formatDate_YMD = function(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
};
var formatDate_MD = function(date) {
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return m + '-' + d;
};

var formatDate_split = function(data){
	var data_a = data.split(' ')[0].split('-');
	return data_a[1] + '-' + data_a[2];
}

if(reportJson != '{}') {
	var rep = JSON.parse(reportJson);
	$('.risk_tips').attr('id','hasRiskReport');
	$('.risk_tips strong').text(rep.reportType);
	$('.risk_tips i').attr('pcresurl',rep.detailReport);
	$('.fund_res_head_type').text(rep.reportType);
	$('#p_income').text(rep.tagList[3].optionContent);
	$('#p_returns').text(rep.tagList[1].optionContent);
	$('#p_percent').text(rep.tagList[4].optionContent);
	$('.fund_res_head_otherinfo_script_cont .mui-scroll').text(rep.reportDescription);
	$('.em_d_name em').text($('.em_d_name em').text());
	$('.rep_detaile_content').append(commnetPart1.replace('{{$username}}',$('.em_d_name em').text()));
	$('.rep_detaile_content').append(commnetPart2);
	$('.rep_detaile_content').append(eval($('#hasRiskReport i').attr('pcresurl').replace('yipin_home/fund/','').replace('.html','')));
	$('.rep_detaile_content').append(commnetPart3);
}else{
	$('.risk_tips').html('').append('您还未完成风控评测。<a>点击参与<i class="mui-icon mui-icon-arrowright"></a>').attr('id','noRiskReport');
}
var businessName;
var ico = JSON.parse(incomeJson);
if(ico.fundMainList != '') {
	var icon_fml = ico.fundMainList;
	var icon_fml1 = ico.incomeLogList1;
	businessName = icon_fml[0].businessName;
	$('.fund_report_name strong').text(icon_fml[0].businessName);
	$('.fund_report_time').text(formatDate_YMD(parserDate(icon_fml[0].settleTime)));
	$('.fund_report_weekRoseMoney').text(icon_fml1[0].incomeValue);
	$('#startNet').text(icon_fml1[0].startNet);
	$('#newNet').text(icon_fml1[0].newNet);
	$('#weekRiseRate').text(icon_fml1[0].weekRiseRate + '%');
	$('#newUnitNet').text(icon_fml1[0].newUnitNet);
	$('#sumIncome').text(icon_fml1[0].sumIncome);
	$('#sumNet').text(icon_fml1[0].sumNet);
	$('#sumUnitNet').text(icon_fml1[0].sumUnitNet);

	var nVal = [];
	var dVal = [];
	for(var i in icon_fml1) {
		nVal.push(icon_fml1[i].weekRiseRate);
		dVal.push(formatDate_split(icon_fml1[i].evaluateTime));
	}

	dVal = dVal.reverse();
	dVal.unshift(formatDate_MD(parserDate(ico.startTime)));
	nVal = nVal.reverse();
	nVal.unshift(0);
	var data_val1 = [0, 0, 0, 0, 0, 0, 0];
	var option = {
		backgroundColor: '#fff',
		grid: {
			left: 10,
			top: '10%',
			bottom: 20,
			right: 20,
			containLabel: true
		},
		tooltip: {
			show: true,
			backgroundColor: '#384157',
			borderColor: '#384157',
			borderWidth: 1,
			formatter: '截止{b}<br>本周周增长率为{c}%',
			extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
		},
		legend: {
			right: 10,
			top: 7,
			data: ['周增长率'],
			textStyle: {
				color: '#5c6076',
				fontSize : '10'
			}
		},
		title: {
			text: businessName,
			x: 'center',
			textStyle: {
				color: '#5c6076',
				fontSize :'16'
			}
		},
		xAxis: {
			data: dVal,
			boundaryGap: false,
			axisLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#5c6076'
				}
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			name : '周增长率',
			nameTextStyle :{
				color : '#5c6076',
				fontSize :'10'
			},
			ayisLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#5c6076'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#2e3547'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#384157'
				}
			}
		},

		series: [{
			type: 'bar',
			name: 'linedemo',

			tooltip: {
				show: false
			},
			animation: false,
			barWidth: 1.4,
			hoverAnimation: false,
			data: dVal,
			itemStyle: {
				normal: {
					color: '#f17a52',
					opacity: 0.6,
					label: {
						show: false
					}
				}
			}
		}, {
			type: 'line',
			name: '周增长率',
			animation: false,
			symbol: 'circle',

			hoverAnimation: false,
			data: data_val1,
			itemStyle: {
				normal: {
					color: '#e44856',
					opacity: 0,
				}
			},
			lineStyle: {
				normal: {
					width: 1,
					color: '#384157',
					opacity: 1
				}
			}
		}, {
			type: 'line',
			name: 'linedemo',
			smooth: true,
			symbolSize: 10,
			animation: false,
			lineWidth: 1.2,
			hoverAnimation: false,
			data: nVal,
			symbol: 'circle',
			itemStyle: {
				normal: {
					color: '#e44856',
					shadowBlur: 40,
					label: {
						show: true,
						position: 'top',
						textStyle: {
							color: '#e44856',

						}
					}
				}
			},
			areaStyle: {
				normal: {
					color: '#e44856',
					opacity: 0.08
				}
			}

		}]
	};
	var myChart = echarts.init(document.getElementById('fund_chats'));
	myChart.setOption(option);
}else{
	$('.fund_hide').hide();
}

$('body').on('tap','#hasRiskReport',function(){
	mui('#fund_res_popover').popover('toggle');
});

$('body').on('tap','.fund_res_btn',function(){
	mui('#fund_res_popover').popover('toggle');
});

$('body').on('tap','#noRiskReport',function(){
	location.href='http://www.ifncn.com:8083/ifncnProduct/appRiskIndex?userId=' + $('body').attr('uid');
})
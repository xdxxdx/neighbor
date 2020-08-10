count = 1;
pagesize = 10;
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://www.wonyen.com/wechatPayCrowdFund';
mui.init({
	pullRefresh : {
		container : '#crowdfund_pullrefresh',
		down : {
			callback : pulldownRefresh,
			auto : false,
			contentdown : '下拉刷新',// 可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover : "释放立即刷新",// 可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh : "正在刷新...",// 可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		},
		up : {
			height : 50,// 可选.默认50.触发上拉加载拖动距离
			auto : true,// 可选,默认false.自动上拉加载一次
			contentrefresh : "正在加载...",// 可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore : '没有更多了',// 可选，请求完毕若没有更多数据时显示的提醒内容；
			callback : pullupRefresh
		// 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});
mui('.mui-scroll-wrapper').scroll({
	deceleration : 0.0005,
	indicators : false,
});
mui('#segmentedControl').on('tap', 'a', function() {
	$('.append_area>div').remove();
	setTimeout(function() {
		mui('#crowdfund_pullrefresh').pullRefresh().pulldownLoading();
	}, 100);

});

mui('body').on(
		'tap',
		'.gotopay',
		function() {
			var oid = $(this).parents('.crowdFund_card').attr('oid');
			window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + oid  + '#wechat_redirect';
					+ '#wechat_redirect';
			return false;
		});

mui('body').on('tap', '.ahref', function() {
	$(this).attr('href') != '' ? location.href = $(this).attr('href') : mui.alert('敬请期待', '谢谢');
	return false;
});

mui('body').on('tap','.bottom-tips-cloose',function(){
	$('.bottom-tips').fadeOut();
	return false;
})

mui('body').on('tap','.bottom-tips',function(){
	location.href = '/wechatMyRealOrder';
	return false;
})

function pulldownRefresh() {
	count = 1;
	var ajaxUrl = $('#segmentedControl').find('.mui-active').attr('href');
	$
			.ajax({
				type : 'get',
				url : ajaxUrl + '?page=' + count,
				dataType : 'json',
				success : function(json) {
					$('.append_area>div').remove();
					switch (ajaxUrl) {
					case '/wechatMySupportCrowdFund':
						var le = support(json);
						break;
					case '/wechatMyFollowCrowdFund':
						var le = follow(json);
						break;
					default:
						var le = sponsor(json);
					}
					mui('#crowdfund_pullrefresh').pullRefresh().endPulldownToRefresh();
					mui('#crowdfund_pullrefresh').pullRefresh().refresh(true);
					if (le < 10) {
						mui('#crowdfund_pullrefresh').pullRefresh().endPullupToRefresh(true);
						$('.mui-pull-bottom-pocket').removeClass('mui-block').removeClass('mui-visibility');
					} else {
						mui('#crowdfund_pullrefresh').pullRefresh().endPullupToRefresh(false);
					}
					count = count + 1;
				},
				error : function() {
					$('.append_area>div').remove();
					var nullTips = '<div class="nullTips_icon"><svg class="iconsvg nullTips_fullwidth" aria-hidden="true"><use xlink:href="#icon-yingyongtubiaoxinhaodiaoxian"></use></svg><h3>信号不佳~出错了</h3></div>';
					$('.append_area').append(nullTips);
					mui('#crowdfund_pullrefresh').pullRefresh().endPulldownToRefresh();
				},
				complete : function() {
					mui('#crowdfund_pullrefresh').scroll().refresh();
				}
			});
}

function pullupRefresh() {
	var ajaxUrl = $('#segmentedControl').find('.mui-active').attr('href');
	$
			.ajax({
				type : 'get',
				url : ajaxUrl + '?page=' + count,
				dataType : 'json',
				success : function(json) {
					switch (ajaxUrl) {
					case '/wechatMySupportCrowdFund':
						var le = support(json);
						break;
					case '/wechatMyFollowCrowdFund':
						var le = follow(json);
						break;
					default:
						var le = sponsor(json);
					}
					if (le < 10) {
						mui('#crowdfund_pullrefresh').pullRefresh().endPullupToRefresh(true);
					} else {
						mui('#crowdfund_pullrefresh').pullRefresh().endPullupToRefresh(false);
					}
					mui('#crowdfund_pullrefresh').pullRefresh().endPulldownToRefresh();
					count = count + 1;
				},
				error : function() {
					var nullTips = '<div class="nullTips_icon"><svg class="iconsvg nullTips_fullwidth" aria-hidden="true"><use xlink:href="#icon-yingyongtubiaoxinhaodiaoxian"></use></svg><h3>信号不佳~出错了</h3></div>';
					$('.append_area').append(nullTips);
					mui('#crowdfund_pullrefresh').pullRefresh().endPulldownToRefresh();
				},
				complete : function() {
					mui('#crowdfund_pullrefresh').scroll().refresh();
				}
			});
}

function support(json) {
	var list = json.mySupportCrowdFundList;
	if (list.length == 0) {
		var nullTips = '<div class="nullTips_icon"><svg class="iconsvg nullTips_fullwidth" aria-hidden="true"><use xlink:href="#icon-kulian"></use></svg><h3>您还没有参与的拼团</h3></div>';
		$('.append_area').append(nullTips);
	}
	for ( var i in list) {
		var stutusFilter = '';
		if (list[i].crowdFundStatus == 2) {
			var crowdFundStatus = '<a class="mui-card-link crowdFund_day">拼团成功</a>';
		} else {
			if (list[i].crowdFundStatus == -1) {
				stutusFilter = ' crowdFund_faild';
				var crowdFundStatus = '<a class="mui-card-link crowdFund_day">拼团失败</a>';
			} else {
				var crowdFundStatus = '<a class="mui-card-link crowdFund_day">剩余天数：' + list[i].restDay + '</a>'
			}
		}

		var pay = '';
		if (list[i].isPay == 0 && list[i].crowdFundStatus == 1) {
			pay = '<a class="mui-card-link crowdFund_opt gotopay">付款</a>'
		} else if (list[i].isPay == -1 || list[i].isPay == -2) {
			pay = '<a class="mui-card-link crowdFund_refund">退款中</a>'
		} else if (list[i].isPay == 1) {
			pay = '<a class="mui-card-link crowdFund_ing">拼团中</a>'
		}
		var child = '<div class="mui-card crowdFund_card ahref' + stutusFilter;
		child = child + '" oid="' + list[i].orderId;
		child = child + '" href="/wxMyCrowdFundSupportDetail?crowdFundSupportId=' + list[i].crowdFundSupportId;
		child = child + '"><div class="mui-card-header crowdFund_card_header"><span class="crowdFund_card_header_order">订单号：' + list[i].orderId;
		child = child + '</span><span class="crowdFund_card_header_time">' + list[i].createTime;
		child = child
				+ '</span></div><div class="mui-card-content crowdFund_content"><div class="mui-card-content-inner crowdFund_cardinner"><div class="crowdFund_cardimg"><img src="http://www.wonyen.com/'
				+ list[i].rewardPicture;
		child = child + '" /></div></div><div class="crowdFund_cardintro"><p class="rw_title  mui-ellipsis-2">' + (list[i].crowdFundType == 0 ? '【众筹】' : '【拼团】') + list[i].rewardDescription;
		child = child + '</p><p class="mui-progressbar crowdfunding_bar progressbar_red" data-progress="' + ((list[i].currenttMoney / list[i].moneyAmount) * 100).toFixed(2);
		child = child + '"><span></span></p><p class="rw_paret"><span class="rw_bar_num">完成度：' + ((list[i].currenttMoney / list[i].moneyAmount) * 100).toFixed(2);
		child = child + '%</span> <span class="rw_pay_num RMB_sign">' + (list[i].supportMoney + list[i].freight);
		child = child + '</span></p></div></div><div class="mui-card-footer crowdFund_foot_tools">' + crowdFundStatus;
		child = child + pay + ' </div></div>';
		$('.append_area').append(child);
	}
	mui('.crowdfunding_bar').each(function() {
		mui(this).progressbar({
			progress : this.getAttribute("data-progress")
		}).show();
	});

	return list.length
}

function follow(json) {
	var list = json.myFollowCrowdFundList;
	if (list.length == 0) {
		var nullTips = '<div class="nullTips_icon"><svg class="iconsvg nullTips_fullwidth" aria-hidden="true"><use xlink:href="#icon-meiyouquanxian"></use></svg><h3>您还没有关注的拼团</h3></div>';
		$('.append_area').append(nullTips);
	}
	for ( var i in list) {
		var itemHtml = '<div class="cfs_item ahref" href="/wechatCrowdFundDetail?crowdFundId=' + list[i].crowdFundId;
		itemHtml = itemHtml + '"><div class="cfs_defaultimg"><img src="http://wonyen.com/' + list[i].columnPicture;
		itemHtml = itemHtml + '"></div><div class="cfs_title mui-ellipsis-2">' + (list[i].crowdFundType == 0 ? '【众筹】' : '【拼团】') + list[i].projectName;
		itemHtml = itemHtml + '</div><div class="cfs_title_completionDegree">' + ((list[i].allSupportMoney / list[i].moneyAmount) * 100).toFixed(2);
		itemHtml = itemHtml + '</div><div class="cfs_title_ProgressBar"><div class="cfs_title_ProgressBarNow" style="width:' + ((list[i].allSupportMoney / list[i].moneyAmount) * 100).toFixed(2);
		itemHtml = itemHtml + '%;"></div></div><div class="cfs_title_BaseInfo"><div class="cfs_title_BaseInfo_item"><i class="iconfont">&#xe63b;</i>' + list[i].allSupportNum;
		itemHtml = itemHtml + '</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_center"><i class="iconfont">&#xe63a;</i>' + list[i].allSupportMoney;
		itemHtml = itemHtml + '</div><div class="cfs_title_BaseInfo_item cfs_title_BaseInfo_right">' + crowdFundStatus(list[i].crowdFundStatus) + '</div></div></div>';
		$('.append_area').append(itemHtml);
	}

	return list.length
}

function sponsor(json) {
	var list = json.mySponsorCrowdFundList;
	if (list.length == 0) {
		var nullTips = '<div class="nullTips_icon"><svg class="iconsvg nullTips_fullwidth" aria-hidden="true"><use xlink:href="#icon-meiyousousuojieguo"></use></svg><h3>您还没有发起拼团</h3></div>';
		$('.append_area').append(nullTips);
	}

	for ( var i in list) {
		var itemHtml = '<div class="mui-card crowdFund_card ahref" href="/wechatCrowdFundDetail?crowdFundId=' + list[i].crowdFundId;
		itemHtml += '"><div class="mui-card-header mui-card-media sponsor_img" style="background-image:url(/' + list[i].indexPicture;
		itemHtml += ')"></div><div class="mui-card-content"><div class="mui-card-content-inner sponsor_inner"><p style="color: #333;">项目名称：' + (list[i].crowdFundType == 0 ? '【众筹】' : '【拼团】')
				+ list[i].projectName;
		itemHtml += '</p><p class="mui-progressbar crowdfunding_bar progressbar_red" data-progress="' + ((list[i].allSupportMoney / list[i].moneyAmount) * 100).toFixed(2);
		itemHtml += '"><span></span></p><p class="rw_paret"><span class="rw_bar_num">完成度：' + ((list[i].allSupportMoney / list[i].moneyAmount) * 100).toFixed(2);
		itemHtml += '%</span><span class="rw_status ">' + crowdFundStatus(list[i].crowdFundStatus) + '</span></p></div></div></div>';
		$('.append_area').append(itemHtml);
	}
	mui('.crowdfunding_bar').each(function() {
		mui(this).progressbar({
			progress : this.getAttribute("data-progress")
		}).show()
	});
	return list.length;
}

function crowdFundStatus(s) {
	switch (s) {
	case 0:
		return '预热中'
		break;
	case 1:
		return '拼团中'
		break;
	case 2:
		return '拼团成功'
		break;
	case -1:
		return '拼团失败'
		break;
	default:
		return '已退款'
	}
}
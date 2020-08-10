	$(function() {
		var count = 1;
		var sortString = '&sortname=sort_num1&sortorder=desc';
		var pagesize = 10;
		var classid = 21;
		var scoreSpan='';
		//		mui('.mui-scroll-wrapper').scroll();
		mui.init({
			pullRefresh : {
				container : '#customized_scroll',
				up : {
					contentrefresh : '正在加载...',
					contentnomore : '',
					callback : pullupRefresh
				}
			}
		})
		function pullupRefresh() {
			$.ajax({
						type : 'get',
						url : '/wxScoreExchangeListAjax?page=' + count
								+ sortString + '&pagesize=' + pagesize
								+ '&scoreSpan=' + scoreSpan,
						dataType : 'json',
						async : false,
						success : function(json) {
							if(count == 1 || count ==''){
								$('.scroll_tips').remove();
							}
							mui('#customized_scroll').pullRefresh().refresh(true);
							var len = json.commodityList.length
							if (len== 0) {
								$('#customized_bd')
										.append(
												'<div class="scroll_tips">-&nbsp;当前积分范围下没有产品</div>');
							}
							var ul = '<ul class="mui-table-view score-table-view score-ul"></ul>';
							var bd = $("#customized_bd");
							bd.append(ul);
							for (var i = 0; i < len; i++) {
								//var li = document.createElement('li');
								//								li.className='mui-table-view-cell mui-media';
								//								li.innerHTML='<a href="javascript:;"> <img class="mui-media-object mui-pull-left score-img" src="http://www.wonyen.com/uploadFiles/CommodityColumnPhoto/1517295843732l.jpg">'
								//										+ '<div class="mui-media-body"><div class="score-commodity">【素氏新米】五常稻花香新米 2.5kg/袋</div><div class="score-value"><span>12090</span>积分</div><div class="market-value">市场参考价：108.00元</div></div></a>';
								var commodity=json.commodityList[i];
								var li = '<li class="mui-table-view-cell mui-media ahref" data-url="/wxScoreExchangeDetail?scoreCommodity.scoreCommodityId='+commodity.scoreCommodityId+'"><a href="javascript:;"> <img class="mui-pull-left score-img" src="http://www.wonyen.com/'+commodity.columnPicture+'">'
										+ '<div class="mui-media-body"><div class="score-commodity">'+commodity.realCommodityName+'</div><div class="score-value"><span>'+commodity.needScore+'</span>积分'+(commodity.price!=0?('+<span>'+commodity.price+'</span>元'):'')+'</div><div class="market-value">市场参考价：'+commodity.marketPrice+'元</div></div></a></li>'
								$('ul.score-ul').append(li);
							};
							if (len < 10 || len == 0 || len == null) {
								mui('#customized_scroll').pullRefresh()
										.endPullupToRefresh(true);
							} else {
								mui('#customized_scroll').pullRefresh()
										.endPullupToRefresh(false);
							}
						}
					})

			count = count + 1;
		}
		if (mui.os.plus) {
			mui.plusReady(function() {
				setTimeout(function() {
					mui('#customized_scroll').pullRefresh().pullupLoading();
				}, 1000);

			});
		} else {
			mui.ready(function() {
				mui('#customized_scroll').pullRefresh().pullupLoading();
			});
		}
		var picker = new mui.PopPicker();
		picker.setData([ {
			value : '0',
			text : '全部'
		}, {
			value : '1',
			text : '0-999'
		}, {
			value : '2',
			text : '1000-1999'
		}, {
			value : '3',
			text : '2000-2999'
		}, {
			value : '4',
			text : '3000-3999'
		}, {
			value : '5',
			text : '4000-1000000'
		} ]);
		$('body').on('tap', 'a.a-filter', function() {
			picker.show(function(item) {
				console.log(item[0].text);
				count=1;//查询后置为1
				scoreSpan=item[0].text;//参数
				$('.customized_bd ul').remove();
				$('#customized_bd div').remove();
				pullupRefresh();
			})
		});
		$('body').on('tap', '.ahref', function() {
			var _this = this;//原生
			var url = $(_this).data('url');
			console.log(url);
			location.href=url;
		});
	})
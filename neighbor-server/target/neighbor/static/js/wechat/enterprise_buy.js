	$(function() {
		var count = 1;
		var sortString = '&enterprise_buy=sort_num1&sortorder=desc';
		var pagesize = 10;
		var priceSpan='';
		mui('.mui-scroll-wrapper').scroll();
//		mui.init({
//			pullRefresh : {
//				container : '#customized_scroll',
//				up : {
//					contentrefresh : '正在加载...',
//					contentnomore : '',
//					callback : pullupRefresh
//				}
//			}
//		})
//		function pullupRefresh() {
//			$.ajax({
//						type : 'get',
//						url : '/enterprisBuyAjax?priceSpan=' + priceSpan,
//						dataType : 'json',
//						async : false,
//						success : function(json) {
//							if(count == 1 || count ==''){
//								$('.scroll_tips').remove();
//							}
//							mui('#customized_scroll').pullRefresh().refresh(true);
//							var employee_len = json.employeeWelfare.length;//员工福利
//							var enterprise_len=json.enterpriseGift.length;//企业礼品
//							if (employee_len== 0) {
//								$('#customized_bd_employee')
//										.append(
//												'<div class="scroll_tips">-&nbsp;当前价格范围范围下没有员工福利哦</div>');
//							}
//							if (enterprise_len== 0) {
//								$('#customized_bd_enterprise')
//										.append(
//												'<div class="scroll_tips">-&nbsp;当前价格范围范围下没有企业礼品哦</div>');
//							}
//							var employee_bd=$('#customized_bd_employee');
//							for(var i=0;i<employee_len;i++){
//								var employee_commodity=json.employeeWelfare[i];
//								var commodtidy_div=	'<div class="customized_goods"><div class="customized_info" cid="'+employee_commodity.realCommodityId+'"><div class="customized_goods_adiv"><img src="../WechatImages/Q200dimg.jpg"><img class="real_customized_img" src="'+employee_commodity.columuPicture+'"></div>';
//									commodtidy_div+='<p class="customized_name"><i class="red_level">热销</i>'+employee_commodity.realCommodityName+'</p><div class="customized_num"><a class="customized_price"><i>￥</i>'+employee_commodity.promotionPrice+'</a><a class="customized_buyer">'+(employee_commodity.saleVolume+employee_commodity.increment)+'人付款</a></div></div></div>';
//									employee_bd.append(commodtidy_div);
//							}
//							var enterprise_bd=$('#customized_bd_enterprise');
//							for(var j=0;j<enterprise_len;j++){
//								var enterprise_commodity=json.enterpriseGift[j];
//								var commodtidy_div=	'<div class="customized_goods"><div class="customized_info" cid="'+enterprise_commodity.realCommodityId+'"><div class="customized_goods_adiv"><img src="../WechatImages/Q200dimg.jpg"><img class="real_customized_img" src="'+enterprise_commodity.columuPicture+'"></div>';
//									commodtidy_div+='<p class="customized_name"><i class="red_level">热销</i>'+enterprise_commodity.realCommodityName+'</p><div class="customized_num"><a class="customized_price"><i>￥</i>'+enterprise_commodity.promotionPrice+'</a><a class="customized_buyer">'+(enterprise_commodity.saleVolume+enterprise_commodity.increment)+'人付款</a></div></div></div>';
//									enterprise_bd.append(commodtidy_div);
//							}
//							if (len < 10 || len == 0 || len == null) {
//								mui('#customized_scroll').pullRefresh()
//										.endPullupToRefresh(true);
//							} else {
//								mui('#customized_scroll').pullRefresh()
//										.endPullupToRefresh(false);
//							}
//						}
//					})
//
//		}
//		if (mui.os.plus) {
//			mui.plusReady(function() {
//				setTimeout(function() {
//					mui('#customized_scroll').pullRefresh().pullupLoading();
//				}, 1000);
//
//			});
//		} else {
//			mui.ready(function() {
//				mui('#customized_scroll').pullRefresh().pullupLoading();
//			});
//		}
		var picker = new mui.PopPicker();
		picker.setData([ {
			value : '0',
			text : '全部'
		}, {
			value : '1',
			text : '0-100'
		}, {
			value : '2',
			text : '100-300'
		}, {
			value : '3',
			text : '300-500'
		}, {
			value : '4',
			text : '500-100000'
		}]);
		$('body').on('tap', 'a.a-filter', function() {
			picker.show(function(item) {
				console.log(item[0].text);
				count=1;//查询后置为1
				priceSpan=item[0].text;//参数
//				$('.customized_bd .customized_goods').remove();
//				$('.customized_bd .customized_goods').remove();
//				pullupRefresh();
				location.href="wxEnterpriseBuy?priceSpan="+priceSpan;
			})
		});
		$('body').on('tap', '.ahref', function() {
			var _this = this;//原生
			var url = $(_this).data('url');
			console.log(url);
			location.href=url;
		});
		$('body').on('tap','#submit1',function(){
			$("#category_hidden").val("-1,"+$("#category").val());
			if($('#thisForm').find('input.dasmust').val() != ''){
				  $.ajax({
		            type : 'post',
		            url : 'customizedSave',
		            data : $('#thisForm').serialize(),
		            dataType : 'html',
		            success : function(data) {
		                if (data > 0) {            
		                    mui.alert('定制成功,后续会有工作人员联系您','逸品生活',function(){$("#thisForm")[0].reset();})
		                } else {
		                    mui.alert('定制失败，请完整填写表单','逸品生活')
		                }
		            }
		        });
			}else{
				 mui.alert('定制失败，请完整填写表单','逸品生活')
			}
			
		});
	})
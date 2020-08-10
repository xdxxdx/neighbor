var table;
var orderRight=$("body").attr("order_right");
$(function() {
		// 弹出层
	$(".btn_add").click(function() {
		location.href="./add";
	});
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			// height : 315,
			id: 'xdx_id',
			url : './list' // 数据接口
			,
			toolbar : '#xdx_top_bar'
			// 自定义排序
			,
			page : { // 支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
				layout : [ 'limit', 'count', 'prev', 'page', 'next', 'skip' ] // 自定义分页布局
				// ,curr: 5 //设定初始在第 5 页
				,
				groups : 8 // 只显示 4个连续页码
				,
				first : false // 不显示首页
				,
				last : false
			// 不显示尾页

			},
			// initSort: {
			// field: 'creatTime' //排序字段，对应 cols 设定的各字段名
			// ,type: 'desc' //排序方式 asc: 升序、desc: 降序、null: 默认排序
			// },
			cols : [ [ // 表头
			{
				field : 'orderId',
				title : '订单编号',
				width : '10%'
			}, {
				field : 'createTime',
				title : '下单时间',
				width : '10%'
			}, {
				field : 'fullAddress',
				title : '地址',
				width : '15%'
			}, {
				field : 'phone',
				title : '电话',
				width : '7%',
				templet: function(item) {
	                if (orderRight== 0) {
	                    return "1**********";
	                } else {
	                	return item.phone;
	                }
	                
	            }
			},{
				field : 'price',
				title : '估价',
				width : '7%'
			}, {
				field : 'repairClassName',
				title : '服务类别',
				width : '5%'
			}, {
				field : 'detail',
				title : '详情',
				width : '15%'
			},{
				field : 'examineStatus',
				title : '审核状态',
				width : '6%',
				templet: function(item) {
	                if (item.examineStatus == 0) {
	                    return "未审核/未通过";
	                } else if(item.examineStatus == 1) {
	                    return "审核通过";
	                } else if(item.orderStatus == -1) {
	                    return "审核未通过";
	                } 
	            }
			}, {
				field : 'status',
				title : '订单状态',
				width : '6%',
				templet: function(item) {
	                if (item.status == 0) {
	                    return "未接单";
	                } else if(item.status == 1) {
	                    return "已接单";
	                } else if(item.status == 2) {
	                    return "进行中";
	                } else if(item.status == 3) {
	                    return "已完成";
	                } else if(item.status == -1) {
	                    return "已取消";
	                } else if(item.status == -2) {
	                    return "已删除";
	                } else if(item.status == -3) {
	                    return "异常";
	                } 
	            }
			},{
				field : 'source',
				title : '来源',
				width : '6%',
				templet: function(item) {
	                if (item.source == 1) {
	                    return "小程序";
	                } else if(item.source == 2) {
	                    return "官网";
	                } else if(item.source == 3) {
	                    return "手动填入";
	                } else if(item.source == 4) {
	                    return "专属订单";
	                } else if(item.source == 5) {
	                    return "400订单";
	                }  else if(item.source == 6) {
	                    return "市场订单";
	                } 
	            }
			},{
				field : 'note',
				title : '备注',
				width : '10%'
			}, {
				fixed : 'right',
				title : '操作',
				width : '300',
				align : 'center',
				toolbar : '#xdx_bar'
			} ] ]
		});
		table.on('checkbox(test)', function(obj) {
			console.log(obj.checked); // 当前是否选中状态
			console.log(obj.data); // 选中行的相关数据
			console.log(obj.type); // 如果触发的是全选，则为：all，如果触发的是单选，则为：one
		});
		// 监听头工具栏
		table.on('toolbar(test)', function(obj) {
			var checkStatus = table.checkStatus(obj.config.id);
			switch (obj.event) {
			case 'getCheckData':
				var data = checkStatus.data;
				layer.alert(JSON.stringify(data));// json转为String
				break;
			case 'getCheckLength':
				var data = checkStatus.data;
				layer.msg('选中了：' + data.length + ' 个');
				break;
			case 'isAll':
				layer.msg(checkStatus.isAll ? '全选' : '未全选');
				break;
			};
		});
		// 监听工具条
		table.on('tool(test)', function(obj) {
			if(orderRight==1){
			var data = obj.data;
			  if (obj.event === 'examine') {
				$('#popup_div [name="repairId"]').val(data.repairId);
				$('#popup_div [name="examineStatus"]').val(data.examineStatus);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '审核',
							area : [ '400px', '300px' ],
							type : 1,
							content : $('#popup_div')
						});
					});
			}else if(obj.event==="status"){
				$('#popup_div2 [name="repairId"]').val(data.repairId);
				$('#popup_div2 [name="status"]').val(data.status);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '接单状态',
							area : [ '400px', '300px' ],
							type : 1,
							content : $('#popup_div2')
						});
					});
			}
			  else if(obj.event === 'del'){
					layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type:'post',
						url:'./hidden?repairId='+data.repairId,
						data:$('#thisForm').serialize(),
						dataType:'html',
						success:function(data){
							if(data>0){
								alert("成功");
								obj.del();
								layer.close(index);
								search();//重新查询
							}else{
								alert("失败");
							}
						}
					});
					
				});
			}else if(obj.event=="edit"){
				var param = {repairId:data.repairId};
				$.open_page("/repair/edit", param);
			}
//			else if(obj.event=="setReceipt"){
//				layer.confirm('真的设为已接单么', function(index) {
//					$.ajax({
//						type : 'post',
//						url : './setReceipt?repairId=' + data.repairId,
//						data : $('#thisForm').serialize(),
//						dataType : 'html',
//						success : function(data) {
//							if (data > 0) {
//								alert("成功");
//								layer.close(index);
//								search_current_page();//重新查询
//							} else {
//								alert("失败");
//							}
//						}
//					});
//
//				});
//			}else if(obj.event=="setUnReceipt"){
//				layer.confirm('真的设为未接单么', function(index) {
//					$.ajax({
//						type : 'post',
//						url : './setUnReceipt?repairId=' + data.repairId,
//						data : $('#thisForm').serialize(),
//						dataType : 'html',
//						success : function(data) {
//							if (data > 0) {
//								alert("成功");
//								layer.close(index);
//								search_current_page();//重新查询
//							} else {
//								alert("失败");
//							}
//						}
//					});
//					});
//			}
			else if(obj.event=="log"){
					layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title: '日志',
							type: 2,
							area: ['600px', '450px'],
							shade: 0.5,
							maxmin: true,
							content: './log?repairId='+data.repairId
						});
					});
			}
			}else{
				alert("您无此权限");
			}
		
		});

		// 查询事件
		$("#btn_search").on('click', function() {
			search();
		})
	});
});
// 关闭弹出层
function close_layer() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.closeAll();
	});
}
// 查询
var search_current_page = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			cityCode : $("#cityCode").val(),
			status : $("#status").val(),
			examineStatus:$("#examineStatus").val(),
			orderId:$("#orderId").val(),
			phone : $("#phone").val(),
			customerName : $("#customerName").val(),
			startCreateTime : $("#startCreateTime").val(),
			endCreateTime : $("#endCreateTime").val(),
			soruce : $("#source").val(),
			repairClassId:$("#repairClassId").val(),
			masterId:$("#masterId").val(),
		},
		page : {
			curr : $(".layui-laypage-curr em:nth-child(2)").text()
		// 重新从第 1 页开始
		}
	});
};
// 从第一页开始查询
var search = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			cityCode : $("#cityCode").val(),
			status : $("#status").val(),
			examineStatus:$("#examineStatus").val(),
			orderId:$("#orderId").val(),
			phone : $("#phone").val(),
			customerName : $("#customerName").val(),
			startCreateTime : $("#startCreateTime").val(),
			endCreateTime : $("#endCreateTime").val(),
			soruce : $("#source").val(),
			repairClassId:$("#repairClassId").val(),
			masterId:$("#masterId").val(),
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
    $('#cityName').autocomplete({
        serviceUrl: '/address/cityJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
//        $("#selection-ajax1").html('您选择了'+suggestion.value);
          console.log(suggestion.data.cityCode)
          $('[name="cityCode"]').val(suggestion.data.cityCode);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
//        $('#selection-ajax1').html('若无则不选择');
        }
    });
    //师傅名称
       $('#masterName').autocomplete({
        serviceUrl: '/master/masterJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
//        $("#selection-ajax1").html('您选择了'+suggestion.value);
          console.log(suggestion.data.cityCode)
          $('[name="masterId"]').val(suggestion.data.masterId);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
//        $('#selection-ajax1').html('若无则不选择');
        }
    });
    $("body").on("click","#clean",function(){
    	 $('[name="cityCode"]').val('');
    	  $('[name="cityName"]').val('');
    })
     $("body").on("click","#clean-master",function(){
    	 $('[name="masterName"]').val('');
    	  $('[name="masterId"]').val('');
    })
	$("#submit1").click(function() {
		var $form = $("#thisForm");
			$.ajax({
				type:'post',
				url:'/repair/examineStatus',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						search_current_page();//刷新父页面
					}else{
						alert("失败");
					}
				}
				
			});
	});
	$("#submit2").click(function() {
		var $form = $("#thisForm2");
			$.ajax({
				type:'post',
				url:'/repair/status',
				data:$('#thisForm2').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						search_current_page();//刷新父页面
					}else{
						alert("失败");
					}
				}
				
			});
	});


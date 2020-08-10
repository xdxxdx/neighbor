var table;
$(function() {
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			// height : 315,
			id: 'xdx_id',
			url : './consumeList' // 数据接口
			,
			toolbar : '#xdx_top_bar'
			// 自定义排序
			,
			page : { // 支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
				layout : [ 'limit', 'count', 'prev', 'page', 'next', 'skip' ] // 自定义分页布局
				// ,curr: 5 //设定初始在第 5 页
				,
				groups : 4 // 只显示 4个连续页码
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
				field : 'realOrderId',
				title : '订单编号',
				width : '5%'
			}, {
				field : 'userName',
				title : '用户名',
				width : '10%',
			},{
				field : 'merchantName',
				title : '商户',
				width : '8%',
			},{
				field : 'consignee',
				title : '收货人',
				width : '8%',
			},{
				field : 'orderStatus',
				title : '订单状态',
				width : '10%',
				templet: function(item) {
	                if (item.orderStatus == 0) {
	                    return "待付款";
	                } else if(item.orderStatus == 1) {
	                    return "已付款，待发货";
	                } else if(item.orderStatus == 1) {
	                    return "已付款，待发货";
	                } else if(item.orderStatus == 2) {
	                    return "已发货，待确认收货";
	                } else if(item.orderStatus == 3) {
	                    return "已收货，待评价";
	                } else if(item.orderStatus == 4) {
	                    return "已评价";
	                }else if(item.orderStatus == -1) {
	                    return "申请退货组";
	                }else if(item.orderStatus == -2) {
	                    return "已取消";
	                }else if(item.orderStatus == -3) {
	                    return "已回收";
	                }
	            }
			},{
				field : 'subject',
				title : '订单信息',
				width : '12%',
			},{
				field : 'totalFee',
				title : '总价',
				width : '5%',
			},{
				field : 'totalFee',
				title : '总价',
				width : '5%',
			}, {
				field : 'score',
				title : '积分抵扣',
				width : '5%',
			},   {
				field : 'couponValue',
				title : '优惠券抵扣',
				width : '5%',
			}, {
				field : 'freight',
				title : '运费',
				width : '5%',
			},  {
				field : 'note',
				title : '备注',
				width : '10%',
				sort : true
			}, {
				field : 'createTime',
				title : '创建时间',
				width : '10%',
				sort : true
			},{
				field : 'payTime',
				title : '支付时间',
				width : '10%',
				sort : true
			}, {
				fixed : 'right',
				title : '操作',
				width : '250',
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
			var data = obj.data;
			if (obj.event === 'delivery') {
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.open({
						title : '发货',
						type : 2,
						area : [ '70%', '60%' ],
						shade : 0.5,
						maxmin : true,
						content : './goDeliver?realOrderId=' + data.realOrderId
					});
				});
			} else if (obj.event === 'detail') {
				// layer.alert('编辑行：<br>' + JSON.stringify(data))
					var param = {'realOrderId':data.realOrderId};
					$.open_page("./detail", param);
			} else if (obj.event === 'note') {
				console.log(data.realOrderId+","+data.note);
				$('#popup_div [name="realOrderId"]').val(data.realOrderId);
				$('#popup_div [name="note"]').val(data.note);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '备注',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div')
						});
					});
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
			realOrderId : $("#realOrderId").val(),
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
			realOrderId : $("#realOrderId").val(),
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
	$("#submit1").click(function() {
		var $form = $("#thisForm");
			$.ajax({
				type:'post',
				url:'./note',
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
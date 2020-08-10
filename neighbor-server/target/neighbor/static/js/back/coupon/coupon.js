var table;
$(function() {
	// 弹出层
	$(".btn_add").click(function() {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title : '新增',
				type : 2,
				area : [ '600px', '650px' ],
				shade : 0.5,
				maxmin : true,
				content : '/coupon/add'
			});
		});
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
				type : 'checkbox',
				fixed : 'left'
			}, {
				field : 'couponId',
				title : '优惠券编号',
				width : '5%'
			}, {
				field : 'couponCode',
				title : '优惠券码',
				width : '10%',
			},{
				field : 'couponValue',
				title : '面值',
				width : '8%',
			},{
				field : 'consumeAmount',
				title : '最低消费',
				width : '8%',
			},{
				field : 'startTime',
				title : '起始时间',
				width : '12%',
			},{
				field : 'endTime',
				title : '终止时间',
				width : '12%',
			}, {
				field : 'couponType',
				title : '适用场景',
				width : '10%',
				templet: function(item) {
	                if (item.couponType == 2) {
	                    return "全体可领";
	                } else if(item.couponType == 1) {
	                    return "派发给个人";
	                }
	            }
			}, {
				field : 'couponStatus',
				title : '状态',
				width : '10%',
				templet: function(item) {
	                if (item.couponStatus == 1) {
	                    return "可用";
	                } else if(item.couponStatus == -1){
	                    return "已过期";
	                }else{
	                	return "未审核";
	                }
	            }
			}, {
				field : 'note',
				title : '备注',
				width : '10%',
				sort : true
			}, {
				field : 'createTime',
				title : '创建时间',
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
			case 'expire':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些优惠券设为过期吗', function(index) {
						for ( var i in data) {
							var couponlId = data[i].couponId;
							$.ajax({
								type : 'post',
								url : './expire?couponlId=' + couponlId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								}
							});
						}
						layer.alert("成功");
						layer.close(index);
						search_current_page();
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			};
		});
		// 监听工具条
		table.on('tool(test)', function(obj) {
			var data = obj.data;
			if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type : 'post',
						url : './hidden?couponId=' + data.couponId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								obj.del();
								layer.close(index);
								// search();//重新查询
							} else {
								alert("失败");
							}
						}
					});

				});
			} else if (obj.event === 'edit') {
				// layer.alert('编辑行：<br>' + JSON.stringify(data))
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.open({
						title : '编辑',
						type : 2,
						area : [ '600px', '650px' ],
						shade : 0.5,
						maxmin : true,
						content : './edit?couponId=' + data.couponId
					});
				});
			} else if (obj.event === 'pass') {
				layer.confirm('真的启用这条优惠券么', function(index) {
					$.ajax({
						type : 'post',
						url : './pass?couponId=' + data.couponId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								layer.close(index);
								search_current_page();//重新查询
							} else {
								alert("失败");
							}
						}
					});

				});
			} else if (obj.event === 'draw') {
				//向个人用户派发优惠券
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
			merchantId : $("#merchantId").val(),
			couponStatus:$("#couponStatus").val(),
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
			merchantId : $("#merchantId").val(),
			couponStatus:$("#couponStatus").val(),
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};

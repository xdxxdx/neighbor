var table;
$(function() {
	// 弹出层
	$(".btn_add").click(function() {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title : '新增',
				type : 2,
				area : [ '600px', '450px' ],
				shade : 0.5,
				maxmin : true,
				content : '/agentCommodity/add'
			});
		});
	});
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#xdx_grid',
			// height : 315,
			id : 'xdx_id',
			url : './list' // 数据接口
			,
			// 自定义排序
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
				field : 'agentCommodityName',
				title : '商品名',
				width : 150
			}, {
				field : 'agentCommodityCode',
				title : '商品码',
				width : 150
			}, {
				field : 'cityAgentPrice',
				title : '市级代理价',
				width : 150
			}, {
				field : 'seniorDealerPrice',
				title : '高级经销商价',
				width : 150
			}, {
				field : 'juniorDealerPrice',
				title : '初级经销商价',
				width : 180
			}, {
				field : 'updateTime',
				title : '最后修改时间',
				width : 180
			}, {
				fixed : 'right',
				title : '操作',
				width : 180,
				align : 'center',
				toolbar : '#xdx_bar'
			} ] ]
		});
		// 监听工具条
		table.on('tool(xdx_filter)', function(obj) {
			var data = obj.data;
			if (obj.event === 'detail') {
				layer.msg('ID：' + data.id + ' 的查看操作');
				var checkStatus = table.checkStatus('idTest'); // test即为基础参数id对应的值
				alert(checkStatus.data) // 获取选中行的数据
			} else if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type : 'post',
						url : './hidden?agentCommodityId='
								+ data.agentCommodityId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								obj.del();
								layer.close(index);
								search();// 重新查询
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
						area : [ '600px', '450px' ],
						shade : 0.5,
						maxmin : true,
						content : './edit?agentCommodityId='
								+ data.agentCommodityId
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
var search = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			adminName : $("#commodityName").val()
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};

var search_current_page = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			agentTypeName : $("#agentName").val(),
			agentType : $("#agentType").val()
		},
		page : {
			curr : $(".layui-laypage-curr em:nth-child(2)").text()
		// 重新从第 1 页开始
		}
	});
};

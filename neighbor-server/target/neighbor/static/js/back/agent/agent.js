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
				content : '/agent/add'
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
				field : 'agentTypeName',
				title : '代理类别',
				width : '10%'
			}, {
				field : 'agentName',
				title : '代理名称',
				width : '10%'
			}, {
				field : 'phone',
				title : '手机',
				width : '10%'
			}, {
				field : 'goodsMoney',
				title : '货款',
				width : '10%'
			}, {
				field : 'balance',
				title : '余额',
				width : '10%'
			}, {
				field : 'parentAgentName',
				title : '上级',
				width : '10%'
			}, {
				field : 'introduceAgentName',
				title : '介绍人',
				width : '10%'
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
			case 'resetPwd':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的重置登录密码么', function(index) {
						for ( var i in data) {
							var agentId = data[i].agentId;
							$.ajax({
								type : 'post',
								url : './resetPwd?agentId=' + agentId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								}
							});
						}
						layer.alert("重置成功");
						layer.close(index);
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			case 'resetPayPwd':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的重置登录密码么', function(index) {
						for ( var i in data) {
							var agentId = data[i].agentId;
							$.ajax({
								type : 'post',
								url : './resetPwd?agentId=' + agentId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error:function(){
									
								}
							});
						}
						layer.alert("重置成功");
						layer.close(index);
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			}
			;
		});
		// 监听工具条
		table.on('tool(test)', function(obj) {
			var data = obj.data;
			if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type : 'post',
						url : './hidden?agentId=' + data.agentId,
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
						area : [ '600px', '450px' ],
						shade : 0.5,
						maxmin : true,
						content : './edit?agentId=' + data.agentId
					});
				});
			} else if (obj.event === 'resetPwd') {
				layer.confirm('真的重置登录密码么', function(index) {
					$.ajax({
						type : 'post',
						url : './resetPwd?agentId=' + data.agentId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								layer.close(index);
							} else {
								alert("失败");
							}
						}
					});

				});

			} else if (obj.event === 'resetPayPwd') {
				layer.confirm('真的重置登录密码么', function(index) {
					$.ajax({
						type : 'post',
						url : './resetPayPwd?agentId=' + data.agentId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							if (data > 0) {
								alert("成功");
								layer.close(index);
							} else {
								alert("失败");
							}
						}
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
			agentTypeName : $("#agentName").val(),
			agentType : $("#agentType").val()
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
			agentTypeName : $("#agentName").val(),
			agentType : $("#agentType").val()
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
$("body").on("click", ".btn-more", function() {
	var _this = $(this);
	_this.parent().find(".more-btn-wrap").toggle();
})

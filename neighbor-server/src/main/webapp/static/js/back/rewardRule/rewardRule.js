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
				content : '/rewardRule/add'
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
				field : 'ruleName',
				title : '规则名称',
				width : '20%'
			}, {
				field : 'agentTypeName',
				title : '被介绍者',
				width : '10%'
			}, {
				field : 'introduceAgentTypeName',
				title : '介绍者',
				width : '10%'
			}, {
				field : 'toAgentTypeName',
				title : '介绍给谁',
				width : '10%'
			}, {
				field : 'ruleType',
				title : '奖励方法',
				width : 150,
                sort : true,
                templet: function(item) {
                    if (item.ruleType == 1) {
                        return "按比例抽取";
                    } else{
                    	return "一次奖励";
                    }
                }
            },{
				field : 'ruleRate',
				title : '奖励比例',
				width : '10%'
			}, {
				field : 'ruleOnce',
				title : '一次性奖励',
				width : '10%'
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
		// 监听工具条
		table.on('tool(test)', function(obj) {
			var data = obj.data;
			if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type : 'post',
						url : './hidden?ruleId=' + data.ruleId,
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
						content : './edit?ruleId=' + data.ruleId
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
			agentType : $("#agentType").val(),
			introduceAgentType : $("#introduceAgentType").val()
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
			agentType : $("#agentType").val(),
			introduceAgentType : $("#introduceAgentType").val()
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

var table;
$(function() {
	// 弹出层
	$(".btn_add").click(function() {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title : '新增',
				type : 2,
				area : [ '80%', '80%' ],
				shade : 0.5,
				maxmin : true,
				content : '/article/add'
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
				field : 'articleType',
				title : '文章类别',
				width : '10%',
				templet: function(item) {
	                if (item.articleType == "repairCase") {
	                    return "案例";
	                } else if (item.articleType == "repairGuide"){
	                    return "教程";
	                }
	            }
			},{
				field : 'guideCategoryName',
				title : '指南类别',
				width : '10%'
			}, {
				field : 'articleTitle',
				title : '文章标题',
				width : '14%'
			},  {
				field : 'status',
				title : '显示状态',
				width : '10%',
				templet: function(item) {
	                if (item.status == 1) {
	                    return "显示";
	                } else{
	                    return "不显示";
	                }
	            }
			}, {
				field : 'isVideo',
				title : '视频文章',
				width : '10%',
				templet: function(item) {
	                if (item.isVideo == 1) {
	                    return "是";
	                } else if (item.isVideo == 0){
	                    return "否";
	                }
	            }
			},{
				field : 'dailyCase',
				title : '每日案例',
				width : '10%',
				templet: function(item) {
	                if (item.dailyCase == 1) {
	                    return "是";
	                } else if (item.dailyCase == 0){
	                    return "否";
	                }
	            }
			},{
				field : 'h5Index',
				title : 'h5首页',
				width : '10%',
				templet: function(item) {
	                if (item.h5Index == 1) {
	                    return "是";
	                } else if (item.h5Index == 0){
	                    return "否";
	                }
	            }
			},{
				field : 'articleUrl',
				title : '跳转地址',
				width : '10%'
			}, {
				field : 'readNum',
				title : '阅读数',
				width : '8%'
			},{
				field : 'sortNum',
				title : '优先级',
				width : '8%'
			},{
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
			
			};
		});
		// 监听工具条
		table.on('tool(test)', function(obj) {
			var data = obj.data;
			if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type : 'post',
						url : './hidden?articleId=' + data.articleId,
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
						area : [ '80%', '80%' ],
						shade : 0.5,
						maxmin : true,
						content : './edit?articleId=' + data.articleId
					});
				});
			} else if (obj.event === 'showStatus') {
				layer.confirm('真的要显示这篇文章？', function(index) {
					$.ajax({
						type : 'post',
						url : './showStatus?articleId=' + data.articleId,
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
			} else if (obj.event === 'hideStatus') {
				layer.confirm('真的要隐藏这篇文章吗？', function(index) {
						$.ajax({
						type : 'post',
						url : './hideStatus?articleId=' + data.articleId,
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
			}else if(obj.event === 'sortNum'){
				$('#priority_div [name="articleId"]').val(data.articleId);
				$('#priority_div [name="sortNum"]').val(data.sortNum);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '优先级',
							area : [ '300px', '200px' ],
							type : 1,
							content : $('#priority_div')
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
			articleTitle : $("#articleTitle").val(),
			status:$("#status").val(),
			isVideo:$("#isVideo").val(),
			articleType:$("#articleType").val(),
			guideCategory:$("#guideCategory").val()
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
			articleTitle : $("#articleTitle").val(),
			status:$("#status").val(),
			isVideo:$("#isVideo").val(),
			articleType:$("#articleType").val(),
			guideCategory:$("#guideCategory").val()
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
	$("#submit1").click(function() {
		var $form = $("#thisForm");
		var priority=$('#priority_div [name="sortNum"]').val();
		var flag=$.is_NaN(priority);
		console.log(flag);
		if(flag){
			$.ajax({
				type:'post',
				url:'./sortNum',
				data:$('#thisForm').serialize(),
				dataType:'html',
				success:function(data){
					if(data>0){
						alert("成功");
						window.parent.close_layer();
						window.parent.search_current_page();//刷新父页面
					}else{
						alert("失败");
					}
				}
				
			});
		}else{
			alert("请填入整数");
			return false;
		}
	});
var table;
$(function() {
	// 弹出层
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			// height : 315,
			id: 'xdx_id',
			url : '/scoreDetail/list?userId='+$("#userId").val() // 数据接口
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
				field : 'score',
				title : '积分',
				width : '10%',
			}, {
				field : 'details',
				title : '获取/消耗原因',
				width : '30%'
			}, {
				field : 'createDate',
				title : '时间',
				width : '20%',
				sort : true
			}] ]
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
			case 'statusShow':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些轮播设为显示吗', function(index) {
						for ( var i in data) {
							var carouselId = data[i].carouselId;
							$.ajax({
								type : 'post',
								url : './statusShow?carouselId=' + carouselId,
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
			case 'statusHidden':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些轮播设为隐藏吗', function(index) {
						for ( var i in data) {
							var carouselId = data[i].carouselId;
							$.ajax({
								type : 'post',
								url : './statusHidden?carouselId=' + carouselId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error:function(){
									
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
						url : './hidden?carouselId=' + data.carouselId,
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
						content : './edit?carouselId=' + data.carouselId
					});
				});
			} else if (obj.event === 'sortNum') {
				$('#priority_div [name="carouselId"]').val(data.carouselId);
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
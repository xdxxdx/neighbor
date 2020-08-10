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
				content : '/carousel/add'
			});
		});
	});
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			autoSort: false,//禁用
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
				field : 'carouselName',
				title : '轮播名称',
				width : '10%'
			},  {
				field : 'showStatus',
				title : '显示状态',
				width : '10%',
				templet: function(item) {
	                if (item.showStatus == 1) {
	                    return "显示";
	                } else{
	                    return "隐藏";
	                }
	            }
			}, {
				field : 'showPlace',
				title : '显示位置',
				width : '10%',
				templet: function(item) {
	                if (item.showPlace == 1) {
	                    return "首页";
	                } else if (item.showPlace == 2){
	                    return "海外业主区";
	                }else if (item.showPlace == 3){
	                    return "增值服务区";
	                }
	            }
			},{
				field : 'destinationUrl',
				title : '跳转地址',
				width : '10%'
			}, {
				field : 'photoSrc',
				title : '图片地址',
				width : '10%'
			},{
				field : 'sortNum',
				title : '优先级',
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
			}
		});
	//监听排序
	table.on('sort(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		  //驼峰转下划线
		  let sortname=$.toLine(obj.field);
		  let sortorder=obj.type;
		  console.log(this); //当前排序的 th 对象
		 
		  //尽管我们的 table 自带排序功能，但并没有请求服务端。
		  //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
		  table.reload('xdx_id', {
		    initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
		    ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
		      sortname: sortname //排序字段
		      ,sortorder: sortorder //排序方式
		    }
		  });
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
			carouselName : $("#carouselName").val(),
			showStatus:$("#showStatus").val(),
			showPlace:$("#showPlace").val(),
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
			carouselName : $("#carouselName").val(),
			showStatus:$("#showStatus").val(),
			showPlace:$("#showPlace").val(),
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
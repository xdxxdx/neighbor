var table;
$(function() {
		// 弹出层
	$(".btn_add").click(function() {
		location.href="./add";
	});
	$("#districtCode").remoteChained("#cityCode", "/address/districtJsonByCityCode");
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
				field : 'realName',
				title : '真实名称',
				width : '8%'
			}, {
				field : 'wxNickName',
				title : '微信昵称',
				width : '10%'
			}, {
				field : 'phone',
				title : '手机',
				width : '10%'
			}, {
				field : 'userLevelName',
				title : '级别',
				width : '10%'
			}, {
				field : 'createTime',
				title : '注册时间',
				width : '15%'
			}, {
				field : 'city',
				title : '服务区域',
				width : '10%',
				templet: function(item) {
	               return item.city+item.district
	            }
			},  {
				field : 'status',
				title : '状态',
				width : '10%',
				templet: function(item) {
	                if (item.status == 0) {
	                    return "默认";
	                } else if(item.status == 1){
	                    return "审核中";
	                }else if(item.status == 2){
	                	return "已通过";
	                }else if(item.status == -1){
	                	return "已冻结";
	                }
	            }
			},{
				field : 'receiptStatus',
				title : '维修接单',
				width : '10%',
				templet: function(item) {
	                if (item.receiptStatus == 0) {
	                    return "不可接单";
	                } else if(item.receiptStatus == 1){
	                    return "可接单";
	                }
	            }
			}, {
				field : 'jobStatus',
				title : '招工接单',
				width : '10%',
				templet: function(item) {
	                if (item.jobStatus == 0) {
	                    return "不可接单";
	                } else if(item.jobStatus == 1){
	                    return "可接单";
	                }
	            }
			},{
				fixed : 'right',
				title : '操作',
				width : '360',
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
			}
			;
		});
		// 监听工具条
		table.on('tool(test)', function(obj) {
			var data = obj.data;
			  if (obj.event === 'level') {
				$('#popup_div [name="userId"]').val(data.userId);
				$('#popup_div [name="userLevel"]').val(data.userLevel);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '修改级别',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div')
						});
					});
			}else if(obj.event === 'examine'){
				$('#popup_div2 [name="userId"]').val(data.userId);
				$('#popup_div2 [name="status"]').val(data.status);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '修改状态',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div2')
						});
					});
			}else if(obj.event === 'receipt'){
				$('#popup_div3 [name="userId"]').val(data.userId);
				$('#popup_div3 [name="receiptStatus"]').val(data.receiptStatus);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '修改维修接单状态',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div3')
						});
					});
			}else if(obj.event === 'job'){
				$('#popup_div4 [name="userId"]').val(data.userId);
				$('#popup_div4 [name="jobStatus"]').val(data.jobStatus);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '修改招工接单状态',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div4')
						});
					});
				
			}else if(obj.event=="log"){
					layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title: '日志',
							type: 2,
							area: ['700px', '450px'],
							shade: 0.5,
							maxmin: true,
							content: './log?masterId='+data.userId
						});
					});
			}else if(obj.event=="edit"){
					var param = {masterId:data.userId};
					$.open_page("/master/edit", param);
			}
//			else if(obj.event=="frozen"){
//				layer.confirm('真的冻结师傅接单权限么', function(index) {
//					$.ajax({
//						type : 'post',
//						url : './frozen?userId=' + data.userId,
//						data : $('#thisForm').serialize(),
//						dataType : 'html',
//						success : function(data) {
//							if (data > 0) {
//								alert("成功");
//								search_current_page();
//								layer.close(index);
//							} else {
//								alert("失败");
//							}
//						}
//					});
//
//				});
//			}
//			else if(obj.event=='active'){
//				layer.confirm('真的审核师傅通过吗', function(index) {
//					$.ajax({
//						type : 'post',
//						url : './pass?userId=' + data.userId,
//						data : $('#thisForm').serialize(),
//						dataType : 'html',
//						success : function(data) {
//							if (data > 0) {
//								alert("成功");
//								search_current_page();
//								layer.close(index);
//							} else {
//								alert("失败");
//							}
//						}
//					});
//
//				});
//			}
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
			status : $("#status").val(),
			realName : $("#realName").val(),
			districtCode : $("#districtCode").val(),
			repairClassId : $("#repairClassId").val(),
			phone:$("#phone").val(),
			phone:$("#userLevel").val(),
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
			status : $("#status").val(),
			realName : $("#realName").val(),
			districtCode : $("#districtCode").val(),
			repairClassId : $("#repairClassId").val(),
			phone:$("#phone").val(),
			phone:$("#userLevel").val(),
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
			url:'/master/level',
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
		$("#submit3").click(function() {
		var $form = $("#thisForm3");
		$.ajax({
			type:'post',
			url:'/master/receiptStatus',
			data:$('#thisForm3').serialize(),
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
	$("#submit4").click(function() {
		var $form = $("#thisForm4");
		$.ajax({
			type:'post',
			url:'/master/jobStatus',
			data:$('#thisForm4').serialize(),
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
			url:'/master/status',
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

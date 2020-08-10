var table;
$(function() {
		var initClass = $('#classId').find('option').eq(0).val();
	var intiCid = initClass.split(',')[0];
	var intiCname = initClass.split(',')[1];
	$('#sndclassId').attr('tp', intiCid);
	$.ajax({
		type : 'get',
		url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
				+ intiCid,
		dataType : 'json',
		success : function(json) {
			$('#sndclassId option').remove();
			$('#sndclassId').append(
					'<option value="' + intiCid + ',' + intiCname + '">'
							+ intiCname + '</option>');
			for ( var ci in json.classList) {
				var option = '<option value="'
						+ json.classList[ci].commodityClassId + ','
						+ json.classList[ci].commodityClassName + '">|-'
						+ json.classList[ci].commodityClassName + '</option>';
				$('#sndclassId').append(option);
			}

		}
	});

	$('#classId')
			.change(
					function() {
						var v = $(this).val();
						var cid = v.split(',')[0];
						var cname = v.split(',')[1];
						$
								.ajax({
									type : 'get',
									url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
											+ cid,
									dataType : 'json',
									success : function(json) {
										$('#sndclassId option').remove();
										$('#sndclassId').attr('tp', cid);
										$('#sndclassId').append(
												'<option value="' + cid + ','
														+ cname + '" temp="1">'
														+ cname + '</option>');
										for ( var ci in json.classList) {
											var option = '<option value="'
													+ json.classList[ci].commodityClassId
													+ ','
													+ json.classList[ci].commodityClassName
													+ '">|-'
													+ json.classList[ci].commodityClassName
													+ '</option>';
											$('#sndclassId').append(option);
										}

										var vt = $('#sndclassId')
												.find('option').eq(0).val();
										var cidt = vt.split(',')[0];
										var cnamet = vt.split(',')[1];
										$('#trdclassId option').remove();
										$('#trdclassId').append(
												'<option value="' + cidt + ','
														+ cnamet + '">'
														+ cnamet + '</option>');
										$
												.ajax({
													type : 'get',
													url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
															+ cidt,
													dataType : 'json',
													success : function(json) {
														$('#trdclassId option')
																.remove();
														$('#trdclassId')
																.append(
																		'<option value="'
																				+ cidt
																				+ ','
																				+ cnamet
																				+ '">'
																				+ cnamet
																				+ '</option>');
														for ( var ct in json.classList) {
															var option = '<option value="'
																	+ json.classList[ct].commodityClassId
																	+ ','
																	+ json.classList[ct].commodityClassName
																	+ '">|-'
																	+ json.classList[ct].commodityClassName
																	+ '</option>';
															$('#trdclassId')
																	.append(
																			option);
														}
													}
												})
									}
								})

					});

	$('#sndclassId')
			.change(
					function() {
						var v = $(this).val();
						var cid = v.split(',')[0];
						var cname = v.split(',')[1];
						if ($(this).attr('tp') == cid) {
							$('#trdclassId option').remove();
							$('#trdclassId').append(
									'<option value="' + cid + ',' + cname
											+ '">' + cname + '</option>');
							return false;
						}

						$('#trdclassId option').remove();
						$('#trdclassId').append(
								'<option value="' + cid + ',' + cname + '">'
										+ cname + '</option>');
						$.ajax({
									type : 'get',
									url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
											+ cid,
									dataType : 'json',
									success : function(json) {
										$('#trdclassId option').remove();
										$('#trdclassId').append(
												'<option value="' + cid + ','
														+ cname + '">' + cname
														+ '</option>');
										for ( var ci in json.classList) {
											var option = '<option value="'
													+ json.classList[ci].commodityClassId
													+ ','
													+ json.classList[ci].commodityClassName
													+ '">|-'
													+ json.classList[ci].commodityClassName
													+ '</option>';
											$('#trdclassId').append(option);
										}
									}
								})

					})
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			// height : 315,
			id : 'xdx_id',
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
			},{
				field : 'examineStatus',
				title : '状态',
				width : '6%',
				templet: function(item) {
	                if (item.examineStatus == 0) {
	                    return "未审核";
	                } else if(item.examineStatus == 1) {
	                    return "上架";
	                }else if(item.examineStatus == -1) {
	                    return "下架";
	                }
	            }
			}, {
				field : 'realCommodityCode',
				title : '商品码',
				width : '15%'
			}, {
				field : 'realCommodityName',
				title : '商品名称',
				width : '15%'
			}, {
				field : 'price',
				title : '价格',
				width : '6%'
			}, {
				field : 'promotionPrice',
				title : '促销价',
				width : '6%'
			}, {
				field : 'saleVolume',
				title : '销量',
				width : '6%'
			}, {
				field : 'increment',
				title : '增量',
				width : '6%'
			}, {
				field : 'sortNum',
				title : '优先级1',
				width : '5%'
			}, {
				field : 'sortNum1',
				title : '优先级2',
				width : '5%'
			}, {
				field : 'sortNum2',
				title : '优先级3',
				width : '5%'
			}, {
				field : 'sortNum3',
				title : '优先级4',
				width : '5%'
			}, {
				field : 'firstLevel',
				title : '一级返佣%',
				width : '6%'
			}, {
				field : 'secondLevel',
				title : '二级返佣%',
				width : '6%'
			} ] ]
		});
		table.on('checkbox(test)', function(obj) {
			var realCommodityId = obj.data.realCommodityId;
			if(obj.checked){
			$.ajax({
						type : 'post',
						url : './choice?commodityId='
								+ realCommodityId,
						data : $('#thisForm').serialize(),
						dataType : 'html',
						success : function(data) {
							alert("选择成功");
						}
					});
			}else{
				$.ajax({
					type : 'post',
					url : './unChoice?commodityId='
							+ realCommodityId,
					data : $('#thisForm').serialize(),
					dataType : 'html',
					success : function(data) {
						alert("放弃成功");
					}
				});
			}
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
			case 'up':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的上架这些商品吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$
									.ajax({
										type : 'post',
										url : './up?realCommodityId='
												+ realCommodityId,
										data : $('#thisForm').serialize(),
										dataType : 'html',
										success : function(data) {
										}
									});
						}
						layer.alert("上架成功");
						layer.close(index);
						search_current_page();//刷新父页面
					});
				} else {
					alert("请选择至少一行");
				}
				break;
			case 'down':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的下架这些商品吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$.ajax({
								type : 'post',
								url : './down?realCommodityId='
										+ realCommodityId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error : function() {

								}
							});
						}
						layer.alert("下架成功");
						layer.close(index);
						search_current_page();//刷新父页面
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			case 'new':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些商品设为新品吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$.ajax({
								type : 'post',
								url : './new?realCommodityId='
										+ realCommodityId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error : function() {

								}
							});
						}
						layer.alert("设为新品成功");
						layer.close(index);
						search_current_page();//刷新父页面
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			case 'cancelNew':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些商品取消新品吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$.ajax({
								type : 'post',
								url : './cancelNew?realCommodityId='
										+ realCommodityId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error : function() {

								}
							});
						}
						layer.alert("取消新品成功");
						layer.close(index);
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			case 'promotion':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些商品设为促销吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$.ajax({
								type : 'post',
								url : './promotion?realCommodityId='
										+ realCommodityId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error : function() {

								}
							});
						}
						layer.alert("设为促销成功");
						layer.close(index);
					});

				} else {
					alert("请选择至少一行");
				}
				break;
			case 'cancelPromotion':
				var data = checkStatus.data;
				var length = data.length;
				if (length > 0) {
					layer.confirm('真的将这些商品取消促销吗', function(index) {
						for ( var i in data) {
							var realCommodityId = data[i].realCommodityId;
							$.ajax({
								type : 'post',
								url : './cancelPromotion?realCommodityId='
										+ realCommodityId,
								data : $('#thisForm').serialize(),
								dataType : 'html',
								success : function(data) {
								},
								error : function() {

								}
							});
						}
						layer.alert("取消促销成功");
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
						url : './hidden?realCommodityId=' + data.realCommodityId,
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
				var param = {realCommodityId:data.realCommodityId};
				$.open_page("/commodity/edit", param);
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

			} else if (obj.event === 'sortNum') {
				$('#priority_div [name="realCommodityId"]').val(data.realCommodityId);
				$('#priority_div #sortType').attr("sortNum",data.sortNum);
				$('#priority_div #sortType').attr("sortNum1",data.sortNum1);
				$('#priority_div #sortType').attr("sortNum2",data.sortNum2);
				$('#priority_div #sortType').attr("sortNum3",data.sortNum3);
				var sortType=$('#priority_div #sortType').val();
				$('#priority_div [name="sortNum"]').val($('#priority_div #sortType').attr(sortType));
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '优先级',
							area : [ '300px', '200px' ],
							type : 1,
							content : $('#priority_div')
						});
					});
			}else if(obj.event==='increment'){
				$('#increment_div [name="realCommodityId"]').val(data.realCommodityId);
				$('#increment_div [name="increment"]').val(data.increment);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '增量',
							area : [ '300px', '200px' ],
							type : 1,
							content : $('#increment_div')
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
			realCommodityName : $("#realCommodityName").val(),
			className : $("#trdclassId").val(),
			examineStatus : $("#examineStatus").val()
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
			realCommodityName : $("#realCommodityName").val(),
			className : $("#trdclassId").val(),
			examineStatus : $("#examineStatus").val()
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
$("#sortType").change(function(){
	var _this=$(this);
	var type=_this.val();//
	var sortNum=_this.attr(type);
	console.log(sortNum);
	$('#priority_div [name="sortNum"]').val(sortNum);
})
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
	$("#submit2").click(function() {
		var $form = $("#thisForm2");
		var priority=$('#increment_div [name="increment"]').val();
		var flag=$.is_NaN(priority);
		console.log(flag);
		if(flag){
			$.ajax({
				type:'post',
				url:'./increment',
				data:$('#thisForm2').serialize(),
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

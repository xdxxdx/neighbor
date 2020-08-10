var table;
$(function() {
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
			},{
				field : 'orderId',
				title : '订单号',
				width : '10%'
			}, {
				field : 'agentName',
				title : '代理名称',
				width : '10%'
			}, {
				field : 'rechargeMoney',
				title : '充值货款',
				width : '10%'
			},{
				field : 'status',
				title : '状态',
				width : '8%',
                sort : true,
                templet: function(item) {
                    if (item.status == 0) {
                        return "未支付";
                    } else if(item.status == 1) {
                        return "已支付，未划转";
                    }else if(item.status == 2){
                    	return "已划转";
                    }
                }
            }, {
				field : 'payTime',
				title : '支付时间',
				width : '12%'
			}, {
				field : 'transferTime',
				title : '划转时间',
				width : '12%'
			}, {
				field : 'note',
				title : '详情',
				width : '15%'
			},{
				fixed : 'right',
				title : '操作',
				width : '15%',
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
			if (obj.event === 'transfer') {
				layer.confirm('真的要划拨货款吗？', function(index) {
					$.ajax({
						type : 'post',
						url : './transfer?goodsRechargeId=' + data.goodsRechargeId,
						data : $('#thisForm').serialize(),
						dataType : 'json',
						success : function(data) {
							if (data.result > 0) {
								alert(data.msg);
								layer.close(index);
								search_current_page();//重新查询
							} else {
								alert(data.msg);
								layer.close(index);
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
			agentId : $("#agentId").val(),
			status:$("#status").val(),
			hasSub:$("#hasSub").is(":checked")?1:0
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
			agentId : $("#agentId").val(),
			status:$("#status").val(),
			hasSub:$("#hasSub").is(":checked")?1:0
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
    $('#agentName').autocomplete({
        serviceUrl: '/agent/allAgentJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
//          $("#selection-ajax").html('您选择了'+suggestion.value);
          console.log(suggestion.data.agentId)
          $('[name="agentId"]').val(suggestion.data.agentId);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
//          $('#selection-ajax').html('您未选择，若无则填无');
          $('[name="agentId"]').val("");
        }
    });

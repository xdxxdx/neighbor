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
				field : 'agentName',
				title : '代理名称',
				width : '10%'
			}, {
				field : 'balance',
				title : '本次资金流水',
				width : '10%'
			},{
				field : 'type',
				title : '资金划拨类型',
				width : '15%',
                sort : true,
                templet: function(item) {
                    if (item.type == 1) {
                        return "下级代理/经销商充值货款";
                    } else if(item.type == 2) {
                        return "终端客户确认收货";
                    }else if(item.type == 3){
                    	return "推荐获取奖励";
                    }else if(item.type == 4){
                    	return "支付推荐者奖励";
                    }else if(item.type == 5){
                    	return "提现成功";
                    }
                }
            },{
				field : 'reason',
				title : '备注',
				width : '20%'
			},  {
				field : 'transferTime',
				title : '划拨时间',
				width : '12%'
			}, {
				field : 'rechargeId',
				title : '对应货款编号',
				width : '12%'
			},{
				field : 'orderId',
				title : '对应订单编号',
				width : '12%'
			} ] ]
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
			hasSub:$("#hasSub").is(":checked")?1:0
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};
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

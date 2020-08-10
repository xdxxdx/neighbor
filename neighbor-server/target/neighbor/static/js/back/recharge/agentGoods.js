var table;
$(function() {
	$(".btn_add").click(function(){
		location.href="./goRecharge";
	})
	// layui表格
	layui.use('table', function() {
		table = layui.table;
		table.render({
			elem : '#demo',
			// height : 315,
			id: 'xdx_id',
			url : './agentRechargeList' // 数据接口
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
			} ] ]
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
			agentId : $("#agentId").val(),
			status:$("#status").val();
			hasSub:$("#hasSub").is(":checked")?1:0
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
};

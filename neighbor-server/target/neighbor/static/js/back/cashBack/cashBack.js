var table;
$(function(){
	//layui表格
	layui.use('table', function() {
			table = layui.table;
			table.render({
				elem : '#xdx_grid',
				autoSort: false,//禁用
//				height : 315,
				id: 'xdx_id',
				url : './list' //数据接口
				,
				//自定义排序
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			      layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
			      //,curr: 5 //设定初始在第 5 页
			      ,groups: 4 //只显示 4 个连续页码
			      ,first: false //不显示首页
			      ,last: false //不显示尾页
			      
			   },
//				  initSort: {
//				    field: 'creatTime' //排序字段，对应 cols 设定的各字段名
//				    ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
//				  },
				cols : [ [ //表头
				 {
					field : 'userNo',
					title : '申请用户',
					width : '10%',
					sort:true
				},
				 {
					field : 'applyMoney',
					title : '申请金额',
					width : '10%',
					sort:true
				},
				 {
					field : 'applyTime',
					title : '申请时间',
					width : '10%',
					sort:true
				},
				{
				field : 'status',
				title : '审核状态',
				width : '10%',
				templet: function(item) {
	                if (item.status == 1) {
	                    return "已兑现";
	                } else if(item.status == 0){
	                    return "未审核";
	                }else if(item.status == -1){
	                	return "已拒绝"
	                }
	            }
				},
				 {
					field : 'bankName',
					title : '开户行',
					width : '10%',
					sort:true
				},
				 {
					field : 'bankCode',
					title : '银行卡',
					width : '10%',
					sort:true
				},
				 {
					field : 'accountName',
					title : '户名',
					width : '10%',
					sort:true
				},
				 {
					field : 'adminName',
					title : '处理人',
					width : '15%',
					sort:true
				},
				{
					field : 'backTime',
					title : '兑现时间',
					width : '10%',
					sort : true,
				},
			{
				field : 'isSend',
				title : '短信',
				width : '10%',
				templet: function(item) {
	                if (item.isSend == 1) {
	                    return "已发送";
	                } else{
	                    return "未发送";
	                }
	            }
			},{
					fixed : 'right',
					title : '操作',
					width : 230,
					align : 'center',
					toolbar : '#xdx_bar'
				} ] ]
			});
		//监听工具条
		table.on('tool(xdx_filter)', function(obj) {
			var data = obj.data;
			if (obj.event == 'detail') {
				layer.msg('ID：' + data.id + ' 的查看操作');
				var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值
				alert(checkStatus.data) //获取选中行的数据
			} else if (obj.event == 'cash') {
				if(data.status<0){
					alert("已拒绝的提现请求，无法再兑现")
				}else{
					layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title: '兑现',
							type: 2,
							area: ['60%', '80%'],
							shade: 0.5,
							maxmin: true,
							content: './cash?cashBackId='+data.cashBackId
						});
					});
				}
			}else if(obj.event=='reject'){
				if(data.status>0){
					alert("已兑现的提现请求，无法再拒绝");
				}else{
					$('#popup_div [name="cashBackId"]').val(data.cashBackId);
					$('#popup_div [name="rejectReason"]').val(data.rejectReason);
					layui.use('layer', function() {
							var layer = layui.layer;
							layer.open({
								title : '拒绝',
								area : [ '400px', '400px' ],
								type : 1,
								content : $('#popup_div')
							});
						});
				}
				
			}else if(obj.event=='sms'){
				layer.confirm('确认发送短信？', function(index) {
					if(data.status>0){
						$.ajax({
							type:'post',
							url:'./sms?cashBackId='+data.cashBackId,
							data:$('#thisForm').serialize(),
							dataType:'json',
							success:function(data){
								if(data.result>0){
									alert(data.msg);
									layer.close(index);
								}else{
									alert(data.msg);
								}
							}
						});
					}else{
						alert("这笔提现申请尚未兑现，请先兑现后再发送短信提醒")
						layer.close(index);
					}
					
				});
			}
		});
		//监听排序
		table.on('sort(xdx_filter)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
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
		  //查询事件
		  $("#btn_search").on('click',function(){
		  	search();
		  })
	});
});
//关闭弹出层
function close_layer(){
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.closeAll();
		});
}
var search_current_page = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			 userNo: $("#userNo").val(),
			 status: $("#status").val(),
			 isSend: $("#isSend").val(),
			 phone:$("#phone").val(),
		},
		page : {
			curr : $(".layui-laypage-curr em:nth-child(2)").text()
		// 重新从第 1 页开始
		}
	});
};
//查询
var search = function(){
   table.reload('xdx_id', {
	  where: { //设定异步数据接口的额外参数，任意设
	     userNo: $("#userNo").val(),
		 status: $("#status").val(),
		 isSend: $("#isSend").val(),
		 phone:$("#phone").val(),
	  }
	  ,page: {
	    curr: 1 //重新从第 1 页开始
	  }
	});
  };
    $("#submit1").click(function() {
		var $form = $("#thisForm");
		$.ajax({
			type:'post',
			url:'/cashBack/reject',
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




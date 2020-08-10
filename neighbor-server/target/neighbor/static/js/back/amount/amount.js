var table;
$(function(){
	//弹出层
	$(".btn_add").click(function(){
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title: '新增',
				type: 2,
				area: ['600px', '450px'],
				shade: 0.5,
				maxmin: true,
				content: 'floorAdd'
			});
		});
	});
	//layui表格
	layui.use('table', function() {
			table = layui.table;
			table.render({
				elem : '#xdx_grid',
//				height : 315,
				id: 'xdx_id',
				url : 'amountList' //数据接口
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
					field : 'realName',
					title : '业主姓名',
					width : 150
				}, {
						field : 'type',
						title : '类别',
						width : '10%',
						templet: function(item) {
							if (item.type == 0) {
								return "充值";
							} else if(item.type==1){
								return "提现";
							}else if(item.type==2){
								return "赠送";
							}else if(item.type==3){
								return "受赠";
							}else if(item.type==4){
								return "使用";
							}else if(item.type==5){
								return "收入";
							}else if(item.type==6){
								return "签到";
							}
						}
					},{
						field : 'finishTime',
						title : '获取/使用时间',
						width : '15%',
						templet: function(item) {
							return timeFormat(item.finishTime);
						}
					},{
						field : 'heartPoint',
						title : '爱心币',
						width : 150
					}] ]
			});
		//监听工具条
		table.on('tool(xdx_filter)', function(obj) {
			var data = obj.data;
			if (obj.event == 'detail') {
				layer.msg('ID：' + data.id + ' 的查看操作');
				var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值
				alert(checkStatus.data) //获取选中行的数据
			} else if (obj.event == 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type:'post',
						url:'floorDel?id='+data.id,
						data:$('#thisForm').serialize(),
						dataType:'html',
						success:function(data){
							if(data>0){
								alert("成功");
								obj.del();
								layer.close(index);
							}else{
								alert("失败");
							}
						}
					});
				});
			} else if (obj.event == 'edit') {
//				layer.alert('编辑行：<br>' + JSON.stringify(data))
				layui.use('layer', function() {
							var layer = layui.layer;
							layer.open({
								title: '编辑',
								type: 2,
								area: ['600px', '450px'],
								shade: 0.5,
								maxmin: true,
								content: 'floorEdit?id='+data.id
							});
						});
			}else if(obj.event=='room'){
				window.parent.toRoomMgr(data.id);
			}
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
//查询
var search_current_page = function() {
	table.reload('xdx_id', {
		where : { // 设定异步数据接口的额外参数，任意设
			type: $("#type").val(),
			 realName: $("#realName").val()
		},
		page : {
			curr : $(".layui-laypage-curr em:nth-child(2)").text()
		// 重新从第 1 页开始
		}
	});
};
var search = function(){
   table.reload('xdx_id', {
	  where: { //设定异步数据接口的额外参数，任意设
		  type: $("#type").val(),
		  realName: $("#realName").val()
	  }
	  ,page: {
	    curr: 1 //重新从第 1 页开始
	  }
	});
  };




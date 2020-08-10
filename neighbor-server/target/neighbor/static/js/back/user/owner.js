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
				url : './ownerList' //数据接口
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
					title : '会员编号',
					width : '10%',
				},
				{
					field : 'wxNickName',
					title : '微信昵称',
					width : '10%',
				},
				{
					field : 'phone',
					title : '电话',
					width : '10%',
				},
				{
					field : 'levelName',
					title : '等级',
					width : '10%',
				},
				{
					field : 'partnerStatus',
					title : '合伙人状态',
					width : '8%',
					templet: function(item) {
						 if(item.partnerStatus == 0) {
		                    return "未申请";
		              	}else if(item.partnerStatus == 1) {
		                    return "合伙人（申请中）";
		                }else if(item.partnerStatus == 2){
		                	return "合伙人";
		                }
		             }
				},
				{
					field : 'ownerStatus',
					title : '业主状态',
					width : '8%',
					templet: function(item) {
						if(item.ownerStatus == 0) {
		                    return "未申请";
		              	}else if(item.ownerStatus == 1) {
		                    return "海外业主（申请中）";
		                }else if(item.ownerStatus == 2){
		                	return "海外业主";
		                }
		             }
				},
				{
					field : 'bank',
					title : '开户行',
					width : '10%',
				},
				{
					field : 'bankNum',
					title : '银行账号',
					width : '10%',
				},
				{
					field : 'accountName',
					title : '户名',
					width : '10%',
				},
				{
					field : 'createTime',
					title : '注册时间',
					width : '15%',
					sort : true,
				}, {
					fixed : 'right',
					title : '操作',
					width : 150,
					align : 'center',
					toolbar : '#xdx_bar'
				}] ]
			});
		//监听工具条
		table.on('tool(xdx_filter)', function(obj) {
			var data = obj.data;
			if (obj.event == 'detail') {
				layui.use('layer', function() {
							var layer = layui.layer;
							layer.open({
								title: '用户详情',
								type: 2,
								area: ['700px', '650px'],
								shade: 0.5,
								maxmin: true,
								content: './detail?userId='+data.userId
							});
						});
			} else if(obj.event == 'examine'){
				$('#popup_div [name="userId"]').val(data.userId);
				$('#popup_div [name="ownerStatus"]').val(data.ownerStatus);
				layui.use('layer', function() {
						var layer = layui.layer;
						layer.open({
							title : '审核',
							area : [ '400px', '400px' ],
							type : 1,
							content : $('#popup_div')
						});
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
			 phone: $("#phone").val(),
			 ownerStatus:$("#ownerStatus").val(),
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
			 phone: $("#phone").val(),
			 ownerStatus:$("#ownerStatus").val(),
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
			url:'/user/ownerExamine',
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




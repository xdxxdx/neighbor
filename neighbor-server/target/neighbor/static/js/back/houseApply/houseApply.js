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
					field : 'phone',
					title : '用户电话',
					width : '10%',
					sort:true
				},
				{
					field : 'applyType',
					title : '申请类别',
					width : '10%',
					templet: function(item) {
		                if (item.applyType == 1) {
		                    return "出租房屋";
		                } else if(item.applyType == 2){
		                    return "转楼花";
		                }
		            }
				},
				{
					field : 'status',
					title : '状态',
					width : '10%',
					templet: function(item) {
		                if (item.status == 1) {
		                    return "已通过";
		                } else{
		                    return "未通过/未审核";
		                }
		            }
				},
				 {
					field : 'countryName',
					title : '国家',
					width : '10%',
				},
				 {
					field : 'cityName',
					title : '城市',
					width : '10%',
				},
				 {
					field : 'district',
					title : '州，县',
					width : '10%',
				},
				 {
					field : 'street',
					title : '街道门牌',
					width : '10%',
				},
				 {
					field : 'projectName',
					title : '项目名称',
					width : '10%',
					sort:true
				},
				{
					field : 'proTypeName',
					title : '户型',
					width : '10%',
					sort:true
				},
				{
					field : 'useArea',
					title : '面积',
					width : '10%',
					sort:true
				},
				{
					field : 'fee',
					title : '出租/转让价格',
					width : '10%',
					sort:true
				},
				{
					field : 'createTime',
					title : '申请时间',
					width : '10%',
					sort : true,
				},
				{
						fixed : 'right',
						title : '操作',
						width : 100,
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
			} else if(obj.event=='examine'){
				$('#popup_div [name="applyId"]').val(data.applyId);
				$('#popup_div [name="status"]').val(data.status);
				$('#popup_div [name="note"]').val(data.note);
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
			 status: $("#status").val(),
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
			url:'/houseApply/examine',
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




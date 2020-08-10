var table;
var listUrl=$("#listUrl").val();
if(listUrl==null||listUrl==""){
	listUrl="userList";
}
$(function(){
	//layui表格
	layui.use('table', function() {
			table = layui.table;
			table.render({
				elem : '#xdx_grid',
				autoSort: false,//禁用
//				height : 315,
				id: 'xdx_id',
				url : listUrl //数据接口
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
					field : 'id',
					title : '用户ID',
					width : '5%',
				},
				{
					field : 'nickName',
					title : '微信昵称',
					width : '5%',
				},
				{
					field : 'mobile',
					title : '电话',
					width : '8%',
				},
				{
					field : 'realName',
					title : '姓名',
					width : '10%',
				},
				{
					field : 'communityId',
					title : '小区',
					width : '10%',
					templet: function(item) {
						if(item.communityId!=0){
							return item.communityInfo.communityName;
						}else{
							return "未完善"
						}
					}
				},
				{
					field : 'floorId',
					title : '楼栋',
					width : '10%',
					templet: function(item) {
						if(item.floorId!=0){
							return item.floor.floorCode;
						}else{
							return "未完善"
						}
					}
				},
				{
					field : 'roomId',
					title : '房号',
					width : '10%',
					templet: function(item) {
						if(item.roomId!=0){
							return item.room.roomCode;
						}else{
							return "未完善"
						}
					}
				},
				{
					field : 'gender',
					title : '性别',
					width : '8%',
					templet: function(item) {
						 if(item.gender == 1) {
		                    return "男";
		              	}else{
		                	return "女";
		                }
		             }
				},
				{
					field : 'age',
					title : '年龄',
					width : '10%',
				},
				{
					field : 'heartPoint',
					title : '爱心币',
					width : '5%',
				},
				{
					field : 'role',
					title : '角色',
					width : '13%',
					templet: function(item) {
						if(item.role == "owner") {
							return "业主";
						}else{
							var role="";
							if(item.role == "propertyManager"){
								role= "小区物业管理";
							}else if(item.role == "TrxcManager"){
								role= "陶然新村物业管理";
							}else if(item.role == "TrgManager"){
								role= "陶然居物业管理";
							}else if(item.role == "DlxcManager"){
								role= "东篱新村物业管理";
							}
							if(item.isStaff==1){
								role=role+"(员工权限)";
							}
							return role;
						}
					}
				},
				{
					field : 'interest',
					title : '兴趣',
					width : '10%',
				},
				{
					field : 'education',
					title : '学历',
					width : '10%',
				},
				{
					field : 'state',
					title : '审核状态',
					width : '10%',
					templet: function(item) {
						if(item.state==0){
							return "已通过";
						}else if(item.state==1){
							return "已冻结";
						}else if(item.state==-1){
							return "未审核";
						}
					}
				},
				{
					field : 'guardInfo',
					title : '门禁信息',
					width : '10%',
				},
				{
					field : 'lastUpdateDate',
					title : '最后登录',
					width : '15%',
					sort : true,
					templet: function(item) {
						return timeFormat(item.lastUpdateDate);
					}
				},
				{
					field : 'lastIp',
					title : '最后登录Ip',
					width : '10%',

				},
				{
				fixed : 'right',
				title : '操作',
				width : 280,
				align : 'center',
				toolbar : '#xdx_bar'
			}] ]
			});
		//监听工具条
		table.on('tool(xdx_filter)', function(obj) {
			var data = obj.data;
			 if (obj.event == 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type:'post',
						url:'./hidden?merchantId='+data.merchantId,
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
								content: 'userEdit?id='+data.id
							});
						});
			}else if(obj.event == 'pass'){
				 $.ajax({
					 url: "changeUserState",
					 type: 'post',
					 data: {
						 'id': data.id,
						 'state': 0
					 },
					 success: function(data) {
						 if (data == true) {
							 alert("操作成功");
							 search_current_page();
						 } else
							 alert("操作失败");
					 }
				 });
			}else if(obj.event == 'unPass'){
				 $.ajax({
					 url: "changeUserState",
					 type: 'post',
					 data: {
						 'id': data.id,
						 'state': 1
					 },
					 success: function(data) {
						 if (data == true) {
							 alert("操作成功");
							 search_current_page();
						 } else
							 alert("操作失败");
					 }
				 });
			 } else if(obj.event == 'role'){
				 $('#popup_div [name="id"]').val(data.id);
				 $('#popup_div [name="role"]').val(data.role);
				 $('#popup_div [name="isStaff"]').val(data.isStaff);
				 layui.use('layer', function() {
					 var layer = layui.layer;
					 layer.open({
						 title : '角色设置',
						 area : [ '400px', '300px' ],
						 type : 1,
						 content : $('#popup_div')
					 });
				 });
			} else if(obj.event == 'exam'){
				 $('#popup_div2 [name="id"]').val(data.id);
				 $('#popup_div2 [name="state"]').val(data.state);
				 layui.use('layer', function() {
					 var layer = layui.layer;
					 layer.open({
						 title : '审核',
						 area : [ '400px', '200px' ],
						 type : 1,
						 content : $('#popup_div2')
					 });
				 });
			 }else if (obj.event == 'guardNo') {
//				layer.alert('编辑行：<br>' + JSON.stringify(data))
				 layui.use('layer', function() {
					 var layer = layui.layer;
					 layer.open({
						 title: '门禁设置',
						 type: 2,
						 area: ['600px', '450px'],
						 shade: 0.5,
						 maxmin: true,
						 content: 'userGuardSet?userId='+data.id
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
			userName: $("#userName").val(),
			communityId: $("#communityId").val(),
			isStaff: $("#isStaff").val(),
			state: $("#state").val(),
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
		  userName: $("#userName").val(),
		  communityId: $("#communityId").val(),
		  isStaff: $("#isStaff").val(),
		  state: $("#state").val(),
	  }
	  ,page: {
	    curr: 1 //重新从第 1 页开始
	  }
	});
  };
function changeState(id, state) {
	$.ajax({
		url: "/user/changeState",
		type: 'post',
		data: {
			'id': id,
			'state': state
		},
		success: function(data) {
			if (data == true) {
				alert("操作成功");
				layer.close(index);
			} else
				alert("操作失败");
		}
	});
};
$("#submit1").click(function() {
	var $form = $("#thisForm");
	$.ajax({
		type:'post',
		url:'user/changeRole',
		data:$('#thisForm').serialize(),
		dataType:'html',
		success:function(data){
			if(data>0){
				alert("成功");
				close_layer();
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
		url:'changeUserState',
		data:$('#thisForm2').serialize(),
		dataType:'html',
		success:function(data){
			if(data){
				alert("成功");
				close_layer();
				search_current_page();//刷新父页面
			}else{
				alert("失败");
			}
		}
	});

});




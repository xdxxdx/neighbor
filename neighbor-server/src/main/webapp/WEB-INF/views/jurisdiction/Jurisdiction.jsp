<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>权限选择</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!--layui-->
<link rel="stylesheet" href="./static/layui/css/layui.css">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/dist/css/AdminLTE.min.css">
<!--ztree-->
<link href="./static/zTree/css/zTreeStyle/zTreeStyle.css"
	rel="stylesheet">
<!--common.css-->
<link rel="stylesheet" href="./static/css/back/common.css">
<style type="text/css">
</style>

</head>

<body class="hold-transition skin-red sidebar-mini" roleId="${roleId}">
	<div class="box">
		<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">权限管理</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<input type="hidden" name="roleId" value="${roleId}">
				<input type="hidden" name="menuIds" id="menuIds">
				<div class="box-body">
					<div class="zTreeDemoBackground left">
						<ul id="treeDemo" class="ztree"></ul>
					</div>
				</div>
				<div class="box-footer">
					<div class="btn btn-default" onclick="{window.parent.close_layer();}" type="button">取消</div>
					<div class="btn bg-purple pull-right" type="button" id="submit1">提交</div>
				</div>
			</form>
		</div>

	</div>
	<!-- jQuery 3 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/jquery/dist/jquery.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/jquery-ui/jquery-ui.min.js"></script>
	<!-- Bootstrap 3.3.7 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- AdminLTE App -->
	<script src="./static/AdminLTE-2.4.2/dist/js/adminlte.min.js"></script>
	<!--layui-->
	<script type="text/javascript" src="./static/layui/layui.js"></script>
	<!--zTree-->
	<script src="./static/zTree/js/jquery.ztree.core.min.js"></script>
	<script src="./static/zTree/js/jquery.ztree.excheck.js"></script>
	<!-- page script -->
	<script>
		$(function() {
			var zNodes;
			var roleId = $("body").attr("roleId");
			$.ajax({
				type : 'get',
				url : 'roleJurisdictionTree?roleId=' +roleId,
				dataType : 'json',
				success : function(data) {
					zNodes = data;
					// 初始化树
					$.fn.zTree.init($("#treeDemo"), setting, zNodes);
					setCheck();
				},
				error : function(data) {
					alert(data);
				}
			})

			//		$("#py").bind("change", setCheck);
			//		$("#sy").bind("change", setCheck);
			//		$("#pn").bind("change", setCheck);
			//		$("#sn").bind("change", setCheck);
			$("#submit1").click(function() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				var nodes = zTree.getCheckedNodes(true);//获取选中的节点
				var menuIds='0';
				for (var i = 0; i < nodes.length; i++) {
					console.log(nodes[i].menuId + "," + nodes[i].menuName);
					menuIds=menuIds+","+nodes[i].menuId;
				}
				$("#menuIds").val(menuIds);
				//ajax模拟表单提交
				$.ajax({
					type:'post',
					url:'roleJurisdictionSave',
					data:$('#thisForm').serialize(),
					dataType:'html',
					success:function(data){
						if(data>0){
							alert("成功");
							window.parent.close_layer();
							//window.parent.location.reload();//刷新父页面
						}else{
							alert("失败");
						}
					}
					
				});
			})
		});
		var setting = {
			check : {
				enable : true
			},
			data : {
				//自定义主键及父级键
				simpleData : {
					enable : true,
					idKey : "menuId",
					pIdKey : "pMenuId",
					rootPId : null
				},
				//自定义显示的节点名称
				key : {
					name : "menuName",
				}
			}
		};

		var code;

		function setCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"), py = "p", sy = "s", pn = "p", sn = "s", type = {
				"Y" : py + sy,
				"N" : pn + sn
			};
			zTree.setting.check.chkboxType = type;
			showCode('setting.check.chkboxType = { "Y" : "' + type.Y
					+ '", "N" : "' + type.N + '" };');
		}
		function showCode(str) {
			if (!code)
				code = $("#code");
			code.empty();
			code.append("<li>" + str + "</li>");
		}
	</script>
</body>

</html>
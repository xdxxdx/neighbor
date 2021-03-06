<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>角色修改</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!--layui-->
<link rel="stylesheet" href="../static/layui/css/layui.css">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/Ionicons/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
   folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/dist/css/skins/_all-skins.min.css">
<!--验证-->
<link rel="stylesheet"
	href="./static/formvalidation/dist/css/formValidation.css">
<!--自定义css-->
<link rel="stylesheet" href="./static/css/back/common.css">
<style type="text/css">
</style>
</head>

<body class="hold-transition skin-red sidebar-mini">
		<div class="box ">
			<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">角色编辑</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<input type="hidden" name="type" value="2">
				<input type="hidden" name="roleId" value="${role.roleId}">
				<div class="box-body">
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">角色名称</label>
						<div class="div-layer-left">
							<input id="roleName" name="roleName" value="${role.roleName}" class="form-control"
								type="text" placeholder="请输入管理员账号">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="roleIntro">角色简介</label>
						<div class="div-layer-left">
							<textarea class="form-control" name="roleIntro" rows="3" placeholder="简介">${role.roleIntro}</textarea>
						</div>
					</div>
				</div>
				<div class="box-footer">
					<div class="btn btn-default" onclick="{window.parent.close_layer();}" type="button">取消</div>
					<div class="btn bg-purple pull-right" type="button" id="submit1">提交</div>
				</div>
			</form>
		</div>

	</div>
	<!-- ./wrapper -->

	<!-- jQuery 3 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/jquery/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.7 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- AdminLTE App -->
	<script src="./static/AdminLTE-2.4.2/dist/js/adminlte.min.js"></script>
	<!--layui-->
	<script src="./static/layui/layui.js"></script>
	<!--表单验证-->
	<script type="text/javascript"
		src="./static/formvalidation/vendor/jquery/jquery.min.js"></script>
	<script type="text/javascript"
		src="./static/formvalidation/vendor/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="./static/formvalidation/dist/js/formValidation.js"></script>
	<script type="text/javascript"
		src="./static/formvalidation/dist/js/framework/bootstrap.js"></script>
	<script type="text/javascript"
		src="./static/formvalidation/dist/js/language/zh_CN.js"></script>
	<!-- page script -->
	<script src="./static/js/back/role/role_add.js"></script>
</body>

</html>
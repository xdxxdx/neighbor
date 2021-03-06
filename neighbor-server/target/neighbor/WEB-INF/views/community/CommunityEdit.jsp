<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>新增</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta
			content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
			name="viewport">
	<!--layui-->
	<link rel="stylesheet" href="../static/layui/css/layui.css">
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet"
		  href="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/css/bootstrap.min.css">
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
<div class="box">
	<div class="lay-form">
		<div class="box-header with-border">
			<h3 class="box-title">新增</h3>
		</div>
		<form class="form-horizontal" id="thisForm">
			<input type="hidden" name="type" value="2">
			<input type="hidden" name="id" value="${communityInfo.id}">
			<div class="box-body">
				<div class="form-group">
					<label class="control-label label-layer-left" for="adminName">小区代号</label>
					<div class="div-layer-left">
						<input  name="communityId" value="${communityInfo.communityId}" disabled="disabled" class="form-control"
								type="text" placeholder="请输入小区代号，由技术人员添加">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label label-layer-left" for="adminName">小区名称</label>
					<div class="div-layer-left">
						<input  name="communityName" value="${communityInfo.communityName}" class="form-control"
								type="text" placeholder="请输入小区名称">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label label-layer-left" for="adminName">管理员公共区域门禁编号</label>
					<div class="div-layer-left">
						<input  name="adminGuard" value="${communityInfo.adminGuard}" class="form-control"
								type="text" placeholder="管理员公共区域门禁，四位数字">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label label-layer-left" for="adminName">业主公共区域门禁编号</label>
					<div class="div-layer-left">
						<input  name="ownerGuard" class="form-control" value="${communityInfo.ownerGuard}"
								type="text" placeholder="业主公共区域门禁，四位数字">
					</div>
				</div>
			</div>
			<div class="box-footer">
				<div class="btn btn-default btn-cancel" onclick="{window.parent.close_layer();}" type="button">取消</div>
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
<script src="./static/js/back/community/community_add.js"></script>
</body>
</html>
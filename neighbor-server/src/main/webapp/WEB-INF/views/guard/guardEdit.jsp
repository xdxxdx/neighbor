<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>门禁编辑</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
 <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">

    <!-- Select2 -->
    <link rel="stylesheet" href="bower_components/select2/dist/css/select2.min.css">
	<!--layui-->
	<link rel="stylesheet" href="layui/css/layui.css">
	<!--验证-->
	<link rel="stylesheet"
		href="formvalidation/dist/css/formValidation.css">
	<!--自定义css-->
	<link rel="stylesheet" href="css/common.css">
<style type="text/css">

</style>
</head>

<body class="hold-transition skin-red sidebar-mini">
		<div class="box">
			<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">门禁/楼栋编辑</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<input type="hidden" name="type" value="2">
				<input type="hidden" name="id" value="${guard.id}">
				<div class="box-body">
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">所属小区</label>
						<div class="div-layer-left">
							<select class="form-control" name="communityId" id="communityId">
									<option value="7763" <c:if test="${guard.communityId==7763}">selected</c:if>>陶然新村</option>
									<option value="7764" <c:if test="${guard.communityId==7764}">selected</c:if>>东篱新村</option>
									<option value="7765" <c:if test="${guard.communityId==7765}">selected</c:if>>陶然居</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">门禁类型</label>
						<div class="div-layer-left">
							<select class="form-control" name="guardType" id="guardType">
									<option value="0" <c:if test="${guard.guardType==0}">selected</c:if>>公共大门</option>
									<option value="1" <c:if test="${guard.guardType==1}">selected</c:if>>楼栋</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">大门/楼栋名称</label>
						<div class="div-layer-left">
							<input id="guardName" name="guardName" value="${guard.guardName}" class="form-control"
								type="text" placeholder="如B1#,请写清楚,且不要重复">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">编号</label>
						<div class="div-layer-left">
							<input id="guardNo" name="guardNo" value="${guard.guardNo}" class="form-control"
								type="text" placeholder="四位数字,如0001,0002,且不要重复">
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
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.7 -->
	<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- FastClick -->
	<script src="bower_components/fastclick/lib/fastclick.js"></script>
	<!--layui-->
		<script type="text/javascript" src="layui/layui.js"></script>
	<script src="view-js/util.js"></script>
	<!--表单验证-->
	<script type="text/javascript"
		src="formvalidation/vendor/jquery/jquery.min.js"></script>
	<script type="text/javascript"
		src="formvalidation/vendor/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="formvalidation/dist/js/formValidation.js"></script>
	<script type="text/javascript"
		src="formvalidation/dist/js/framework/bootstrap.js"></script>
	<script type="text/javascript"
		src="formvalidation/dist/js/language/zh_CN.js"></script>
	<!-- page script -->
	<script src="view-js/guard/guradAdd.js"></script>
</body>
</html>
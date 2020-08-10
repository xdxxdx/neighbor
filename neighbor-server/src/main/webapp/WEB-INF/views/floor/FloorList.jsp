<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>楼栋</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!--layui-->
<link rel="stylesheet" href="./static/layui/css/layui.css">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/bower_components/font-awesome/css/font-awesome.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet"
	href="./static/AdminLTE-2.4.2/dist/css/skins/skin-purple.css">
<!--自定义css-->
<link rel="stylesheet" href="./static/css/back/common.css">
</head>

<body class="hold-transition skin-purple sidebar-mini">
	<div class="wrapper">
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<!-- Main content -->
			<section class="content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-12">
						<div class="panel-body panel-body-padding-vert">
							<div class="box">
								<div class="panel-body">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6"
										style="padding-bottom: 2px">
										<div class="input-group">
											<div class="input-group-btn">
												<button type="button" class="btn btn-sm">所属小区</button>
											</div>
											<!-- /btn-group -->
											<select name="communityId" id="communityId" class="form-control" >
												<option value="">请选择</option>
												<c:forEach items="${communityList}" var="community">
													<option value="${community.communityId}">${community.communityName}</option>
												</c:forEach>
											</select>
										</div>
									</div>

									<div class="col-lg-3 col-xs-4 col-js-3"
										style="padding-bottom: 5px">
										<button type="button" id="btn_search" class="btn btn-default btn-sm">
											<span class="glyphicon glyphicon-search"></span> 查询
										</button>
										<button type="button" class="btn bg-purple btn-sm btn_add">
											<span class="glyphicon glyphicon-plus"></span> 新增
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--<div class="row">-->
					<div class="col-xs-12">
						<table id="xdx_grid" lay-filter="xdx_filter"></table>
					</div>
					<!--</div>-->
				</div>
			</div>
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
	</div>
	<!-- ./wrapper -->

	<!-- jQuery 3 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/jquery/dist/jquery.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/jquery-ui/jquery-ui.min.js"></script>
	<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
	<!-- Bootstrap 3.3.7 -->
	<script
		src="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- AdminLTE App -->
	<script src="./static/AdminLTE-2.4.2/dist/js/adminlte.min.js"></script>
	<!--layui-->
	<script type="text/javascript" src="./static/layui/layui.js"></script>
	<script src="./static/js/back/floor/floor.js"></script>
	<script type="text/html" id="xdx_bar">
	  <a class="btn btn-success btn-xs" lay-event="edit">编辑</a>
	  <a class="btn btn-danger btn-xs" lay-event="del">删除</a>
	  <a class="btn btn-info btn-xs" lay-event="room">房间管理</a>
	</script>
</body>
</html>
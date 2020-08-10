<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>密码修改</title>
		<!-- Tell the browser to be responsive to screen width -->
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<!--layui-->
		<link rel="stylesheet" href="./static/layui/css/layui.css">
		<!-- Bootstrap 3.3.7 -->
		<link rel="stylesheet" href="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<!-- Font Awesome -->
		<link rel="stylesheet" href="./static/AdminLTE-2.4.2/bower_components/font-awesome/css/font-awesome.min.css">
		<!-- Ionicons -->
		<link rel="stylesheet" href="./static/AdminLTE-2.4.2/bower_components/Ionicons/css/ionicons.min.css">
		<!-- Theme style -->
		<link rel="stylesheet" href="./static/AdminLTE-2.4.2/dist/css/AdminLTE.min.css">
		<link rel="stylesheet" href="./static/AdminLTE-2.4.2/dist/css/skins/skin-purple.css">
		<!--自定义css-->
		<link rel="stylesheet" href="./static/css/back/common.css">
		<style>
			.submit_ok{
				text-align: center;
			}
			ul.tag li{
				float:left;
				margin:5px 5px;
			}
			ul.tag li input{
				margin-right: 3px;
			}
			select.category{
				width: 200px;
				margin-top:5px;
			}
		</style>
	</head>

	<body class="hold-transition skin-purple sidebar-mini">
		<div class="wrapper">
			<!-- Content Wrapper. Contains page content -->
			<div class="content-wrapper">
				<!-- Content Header (Page header) -->
				<section class="content-header">
					<h1>
				管理员<small>密码修改</small>
			</h1>
					<ol class="breadcrumb">
						<li>
							<a href="#"><i class="fa fa-dashboard"></i> 首页</a>
						</li>
						<li class="active">管理员</li>
					</ol>
				</section>
				<!-- Main content -->
				<section class="content">
					<div class="container-fluid">
						<div class="row">
							<div class="col-xs-11">
								<form class="form-horizontal" id="thisForm">
									<input type="hidden" name="id" value="${account.id}">
									<div class="box-body">
										<div class="form-group">
											<label class="control-label label-layer-left-8" for="title">帐号</label>
											<div class="div-layer-left-80">
												<input name="email" class="form-control" value="${account.email}" disabled="disabled" type="text">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label label-layer-left-8" for="title">原密码</label>
											<div class="div-layer-left-80">
												<input name="oldPwd" class="form-control" name="oldPwd"  type="password">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label label-layer-left-8" for="title">新密码</label>
											<div class="div-layer-left-80">
												<input class="form-control" name="password"  type="password">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label label-layer-left-8" for="title">确认新密码</label>
											<div class="div-layer-left-80">
												<input name="confirmPwd" class="form-control" name="confirmPwd"  type="password">
											</div>
										</div>
									</div>
									<div class="submit_ok">
										<div class="btn btn-default" type="button" id="cancel">取消</div>
										<div class="btn bg-purple" type="button" id="submit1">提交</div>
									</div>
								</form>
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
		<script src="./static/AdminLTE-2.4.2/bower_components/jquery/dist/jquery.min.js"></script>
		<!-- Bootstrap 3.3.7 -->
		<script src="./static/AdminLTE-2.4.2/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<!-- AdminLTE App -->
		<script src="./static/AdminLTE-2.4.2/dist/js/adminlte.min.js"></script>
		<!--layui-->
		<script type="text/javascript" src="./static/layui/layui.js"></script>
		<script src="./static/js/back/common.js"></script>
		<script src="./static/js/back/admin/admin_pwd.js"></script>
	</body>
</html>
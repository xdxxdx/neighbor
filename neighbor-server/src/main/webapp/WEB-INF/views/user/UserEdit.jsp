<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>用户信息编辑</title>
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
	<!--验证-->
	<link rel="stylesheet"
		  href="./static/formvalidation/dist/css/formValidation.css">
	<!--common.css-->
	<link rel="stylesheet" href="./static/css/back/common.css">
<style type="text/css">

</style>
</head>

<body class="hold-transition skin-red sidebar-mini">
		<div class="box">
			<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">用户信息编辑</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<input type="hidden" name="id" value="${user.id}">
				<div class="box-body">
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">所属小区</label>
						<div class="div-layer-left">
							<select name="communityId" id="communityId" class="form-control" >
								<c:forEach items="${communityList}" var="community">
									<option value="${community.communityId}"<c:if test="${community.communityId==user.communityId}">selected</c:if>>${community.communityName}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">楼栋</label>
						<div class="div-layer-left">
							<select class="form-control" id="floorId" name="floorId" floorId="${user.floorId}" floorCode="${user.floor.floorCode}">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">房号</label>
						<div class="div-layer-left">
							<select class="form-control" id="roomId" name="roomId" roomId="${user.roomId}" roomCode="${user.room.roomCode}">
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">真实姓名</label>
						<div class="div-layer-left">
							<input name="realName" value="${user.realName}" class="form-control"
								   type="text" placeholder="真实姓名">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">会员卡编号</label>
						<div class="div-layer-left">
							<input name="cardNo" value="${user.cardNo}" class="form-control"
								type="text" placeholder="用户会员卡编号">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">年龄</label>
						<div class="div-layer-left">
							<input name="age" value="${user.age}" class="form-control"
								   type="text" placeholder="年龄">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">学历</label>
						<div class="div-layer-left">
							<input name="education" value="${user.education}" class="form-control"
								   type="text" placeholder="学历">
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
		<script src="./static/AdminLTE-2.4.2/dist/js/demo.js"></script>
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
		<!--级联-->
		<script src="./static/js/util/jquery.chained.remote.min.js"></script>
		<!-- page script -->
		<script src="./static/js/back/user/user_add.js"></script>
</body>
</html>
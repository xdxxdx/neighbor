<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>参数编辑</title>
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
	<!--图片上传-->
	<link rel="stylesheet"
		  href="./static/imgUpload/css/imgUpload.css">
<!--common.css-->
<link rel="stylesheet" href="./static/css/back/common.css">
<style type="text/css">
</style>
</head>

<body class="hold-transition skin-red sidebar-mini">
		<div class="box">
			<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">菜单编辑</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<input type="hidden" name="type" value="2">
				<input type="hidden" name="id" value="${param1.id}">
				<div class="box-body">
					<div class="form-group">
						<label class="control-label label-layer-left" for="floorCode">二维码有效时间</label>
						<div class="div-layer-left">
							<input name="lockTime" value="${param1.lockTime}" class="form-control"
								type="number" placeholder="请输入二维码有效时间,分钟">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="img">顺风车banner</label>
						<div class="div-layer-left">
							<!--<input id="img" name="upload" class="form-control"
                                   type="file" >-->
							<div class="img-box full">
								<section class=" img-section">
									<p class="up-p">图片：<span class="up-span">不超过500K</span></p>
									<!--<script type='text/jade' class="templ">
                                            <section class="z_file fl">
                                                    <img src="/static/imgUpload/img/a11.png" class="add-img">
                                                        <input type="file" name="upload"  class="file"/>
                                            </section>
                                    </script>-->
									<div class="z_photo upimg-div clear" >
										<section class="z_file fl">
											<c:choose>
												<c:when test="${not empty param1.carBanner}">
													<img src="${param1.carBanner}" class="add-img"/>
												</c:when>
												<c:otherwise><img src="./static/imgUpload/img/a11.png" class="add-img"></c:otherwise>
											</c:choose>
											<input type="file" name="upload1" id="file" class="file" value="" accept="image/jpg,image/jpeg,image/png,image/bmp" multiple />
										</section>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label label-layer-left" for="img">贴心管家banner</label>
						<div class="div-layer-left">
							<!--<input id="img" name="upload" class="form-control"
                                   type="file" >-->
							<div class="img-box full">
								<section class=" img-section">
									<p class="up-p">图片：<span class="up-span">不超过500K</span></p>
									<div class="z_photo upimg-div clear" >
										<section class="z_file fl">
											<c:choose>
												<c:when test="${not empty param1.houseBanner}">
													<img src="${param1.houseBanner}" class="add-img"/>
												</c:when>
												<c:otherwise><img src="./static/imgUpload/img/a11.png" class="add-img"></c:otherwise>
											</c:choose>
											<input type="file" name="upload2" id="file2" class="file" value="" accept="image/jpg,image/jpeg,image/png,image/bmp" multiple />
										</section>
									</div>
								</section>
							</div>
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
		<!--图片上传-->
		<script src="./static/imgUpload/js/imgUp.js"></script>
		<!--日期控件-->
		<script type="text/javascript"
				src="./static/My97DatePicker/WdatePicker.js"></script>
	<!-- page script -->
	<script src="./static/js/back/param/param_add.js"></script>
</body>

</html>
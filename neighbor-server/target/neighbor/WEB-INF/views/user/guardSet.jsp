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
	<!--多选框-->
	<link href="plugins/muti-select/css/ySelect.css" rel="stylesheet" type="text/css">


<style type="text/css">
	#current{
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
</head>

<body class="hold-transition skin-red sidebar-mini">
		<div class="box">
			<div class="lay-form">
			<div class="box-header with-border">
				<h3 class="box-title">门禁设置</h3>
			</div>
			<form class="form-horizontal" id="thisForm">
				<div class="box-body">
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">业主信息</label>
						<div class="div-layer-left">
							<input value="${user.nickName},${user.realName}，（手动添加需添加其所有门禁，包括注册时候的门禁）" class="form-control"
								   type="text"disabled="disabled">
						</div>
					</div>
					<input type="hidden" name="id" value="${user.id}">
					<input type="hidden" id="guardNo" name="guardNo" value="${user.guardNo}">
					<div class="form-group">
						<label class="control-label label-layer-left" for="adminName">所属小区</label>
						<div class="div-layer-left">
							<div class="container">
								<select id='m2' class="demo1" multiple="multiple" >
									<c:forEach items="${floorList}" var="floor">
										<option value="${floor.id}" >${floor.floorName}</option>
									</c:forEach>
								</select>
								<br/>
								<button id="current" class="btn btn-primary btn-sm">查看已选</button>
							</div>
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

<%--		<script src="plugins/muti-select/js/jquery-1.11.3.min.js"></script>--%>
<%--		<script src="plugins/muti-select/js/bootstrap.min.js"></script>--%>
		<script src="plugins/muti-select/js/ySelect.js"></script>
	<!-- page script -->
	<script src="view-js/user/guradSet.js"></script>
	<script>
		$(function() {
			// $('.demo').ySelect();
			$('.demo1').ySelect(
					{
						placeholder: '请先选择一些项目',
						searchText: '搜索',
						showSearch: true,
						numDisplayed: 4,
						overflowText: '已选中 {n}项',
						isCheck:false
					}
			);
			var currentGuard=$("#guardNo").val();
			var currentGuardArr=currentGuard.split(",");
			$(".fs-option").each(function(index,element){
				if(currentGuardArr.length>0){
					for(v of currentGuardArr){
						if(v==$(this).data('value')){
							$(this).addClass("selected");
						}
					}

				}

			});
			$("#current").click(function(){
				var result="";
				$(".fs-option").each(function(index,element){
					if($(this).hasClass("selected")){
						result= result+"   "+$(this).find(".fs-option-label").text();
					}

				});
				alert(result);
				return false;
			});

		});
	</script>
</body>
</html>
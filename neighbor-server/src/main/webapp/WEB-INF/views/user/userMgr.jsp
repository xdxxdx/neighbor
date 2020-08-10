<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018-11-24
  Time: 0:08
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="cxt" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
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

    <link media="screen" rel="stylesheet" href="plugins/colorbox-master/example4/colorbox.css" />
	<!--layui-->
	<link rel="stylesheet" href="layui/css/layui.css">
	<!--验证-->
	<link rel="stylesheet"
		href="formvalidation/dist/css/formValidation.css">
	<!--自定义css-->
	<link rel="stylesheet" href="css/common.css">
	<!--layui-->
	<link rel="stylesheet" href="layui/css/layui.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->


</head>
<body class="hold-transition skin-blue sidebar-mini" style="background: #ecf0f5">
<input type="hidden" id="cxt" value="${cxt}">

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="userListTable" class="table table-bordered table-hover">

                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->

                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->

</div>
	<div id="popup_div" class="popup_div" style="display: none;">
		<form id="thisForm" class="form-horizontal">
			<div class="box-body">
				<div class="form-group">
					<label class="control-label label-layer-left" for="priority">设置角色</label>
					<div class="div-layer-left">
						<input type="hidden" name="id">
						<select name="role" class="form-control">
							<option value='owner'>业主</option>
							<option value='propertyManager'>总管理员</option>
							<option value='TrxcManager'>陶然新村管理员</option>
							<option value='TrgManager'>陶然居管理员</option>
							<option value='DlxcManager'>东篱新村管理员</option>
						</select>
					</div>
				</div>
			</div>
			<div class="box-footer">
					<div class="btn btn-default btn-sm" type="button">取消</div>
					<div class="btn bg-blue btn-sm pull-right" type="button" id="submit1">提交</div>
			</div>
		</form>
	</div>
	<div id="popup_div2" class="popup_div" style="display: none;">
		<form id="thisForm2" class="form-horizontal">
			<div class="box-body">
				<div class="form-group">
					<label class="control-label label-layer-left" for="priority">设置门禁</label>
					<div class="div-layer-left">
						<input type="hidden" name="id">
						<input id="guardNo" name="guardNo" class="form-control"
							type="text" placeholder="选择门禁，可多选">
					</div>
				</div>
			</div>
			<div class="box-footer">
					<div class="btn btn-default btn-sm" type="button">取消</div>
					<div class="btn bg-blue btn-sm pull-right" type="button" id="submit2">提交</div>
			</div>
		</form>
	</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- DataTables -->
<script src="bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="bower_components/fastclick/lib/fastclick.js"></script>

<script src="plugins/colorbox-master/jquery.colorbox-min.js"></script>
<!--layui-->
<script type="text/javascript" src="layui/layui.js"></script>
<script src="view-js/util.js"></script>
<!--layui-->
<script type="text/javascript" src="layui/layui.js"></script>
<script src="view-js/util.js"></script>
<script src="view-js/user/userMgr.js"></script>

</body>
</html>

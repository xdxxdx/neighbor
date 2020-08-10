<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<header class="main-header">

	<!-- Logo -->
	<a href="/home" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
		<span class="logo-mini"><b>聚</b>龙</span> <!-- logo for regular state and mobile devices -->
		<span class="logo-lg"><b>聚龙</b>小镇管理平台</span>
	</a>
	<!-- Header Navbar: style can be found in header.less -->
	<nav class="navbar navbar-http://39.107.96.196/static-top ">
		<!-- Sidebar toggle button-->
		<a href="#" class="sidebar-toggle" data-toggle="push-menu"
			role="button"> <span class="sr-only">Toggle navigation</span>
		</a>

		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">

				<!-- User Account: style can be found in dropdown.less -->
				<li class="dropdown user user-menu"><a href="#"
					class="dropdown-toggle" data-toggle="dropdown"> <span class="hidden-xs">
							${account.trueName}
					</span>
				</a>
					<ul class="dropdown-menu">
						<!-- User image -->
						<li class="user-header">

							<p>
								${account.email}
							</p></li>
						<!-- Menu Body -->
						<!--<li class="user-body">
							<div class="row">
								<c:if test="${userType=='agent'}">
									<div class="col-xs-4 text-center">
										<a href="/agent/baseInfo">基本信息</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="/agent/payPwd">交易密码</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="/agent/bank">银行卡</a>
									</div>
								</c:if>
							</div> 
						</li>-->
						<!-- Menu Footer-->
						<li class="user-footer">
								<div class="pull-left">
									<a href="javascript:void(0);" onclick="pwdChange()" class="btn btn-default btn-flat">修改密码</a>
								</div>
								<div class="pull-right">
									<a href="logout" class="btn btn-default btn-flat">退出</a>
								</div>
							</li>
					</ul></li>
				<!-- Control Sidebar Toggle Button -->
				<li><a href="#" data-toggle="control-sidebar"><i
						class="fa fa-gears"></i></a></li>
			</ul>
		</div>
	</nav>
</header>

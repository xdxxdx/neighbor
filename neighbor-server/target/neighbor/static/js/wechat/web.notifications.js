var NotificationHandler = {
	isNotificationSupported: 'Notification' in window,
	isPermissionGranted: function() {
		return Notification.permission === 'granted';
	},
	requestPermission: function() {
		if(!this.isNotificationSupported) {
			console.log('Notification API 不被支持');
			return;
		}

		Notification.requestPermission(function(status) {
			console.log('当前通知状态: ' + (status == 'granted' ? '用户允许显示桌面通知' : '用户不允许或未授权显示桌面通知'));
			var permission = Notification.permission;
			//default 用户没有接收或拒绝授权 不能显示通知  
			//granted 用户接受授权 允许显示通知  
			//denied  用户拒绝授权 不允许显示通知  
			console.log('用户授权状态: ' + permission);
		});
	},
	showNotification: function(icon, title, content, evelFun, showFun, clickFun, closeFun) {
		if(!icon && icon == '0') {
			icon = './favicon.ico';
		}

		if(!title) {
			title = '新订单';
		}

		if(!content) {
			content = '您有新的订单,请及时处理！';
		}

		if(!evelFun) {
			evelFun = 'console.log("插件调用成功")';
		}

		if(!showFun) {
			showFun = 'console.log("Notification 展示成功");';
		}

		if(!clickFun) {
			clickFun = 'console.log("Notification 被点击");';
		}
		if(!closeFun) {
			closeFun = 'console.log("Notification 自动关闭");'
		}

		eval(evelFun);

		if(!this.isNotificationSupported) {
			console.log('Notification API 不被支持');
			return;
		}
		if(!this.isPermissionGranted()) {
			console.log('Notification 未被审批，正在询问浏览器！');
			return;
		}

		var n = new Notification(title, {
			icon: icon,
			body: content
		});

		n.onshow = function() {
			eval(showFun);
		};

		n.onclick = function() {
			eval(clickFun);
			n.close();
		};
		n.onerror = function() {
			NotificationHandler.requestPermission();
		};

		n.onclose = function() {
			eval(closeFun);
		};
	}
};
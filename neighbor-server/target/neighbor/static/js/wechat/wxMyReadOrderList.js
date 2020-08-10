mui.init();
mui('.mui-scroll-wrapper').scroll({});
mui('body').on('tap', '.mui-btn-danger', function() {
	var _this = $(this);
	var _parents = _this.parents('li');
	var id = _parents.attr('oid')
	var btnArray = [ '否', '是' ];
	mui.confirm('取消预约可能无法再次报名该时段哦', '小提示', btnArray, function(e) {
		if (e.index == 1) {
			$.ajax({
				type : 'get',
				url : '/wxReadOrderCancel?readOrder.readOrderId=' + id,
				data : $('#readerForm').serialize(),
				dataType : 'html',
				success : function(data) {
					if (data == 1) {
						_parents.remove();
					} else {
						mui.alert('取消预约失败，请重试', '很抱歉')
					}
				}
			})
		}
	})

})
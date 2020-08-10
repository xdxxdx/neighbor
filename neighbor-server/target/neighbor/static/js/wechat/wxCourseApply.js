	$(function() {
		mui('.mui-scroll-wrapper').scroll();
		$('body').on('tap', '#submit1', function() {
			if($('#thisForm').find('input.dasmust').val() != ''){
				  $.ajax({
		            type : 'post',
		            url : 'courseApplySave',
		            data : $('#thisForm').serialize(),
		            dataType : 'html',
		            success : function(data) {
		                if (data > 0) {            
		                    mui.alert('申请成功,后续会有工作人员联系您','逸品生活',function(){$("#thisForm")[0].reset();location.href='wxParentChildCourseDetail?courseId='+$("#courseId").val()})
		                } else {
		                    mui.alert('定制失败，手机号码为必填项','逸品生活')
		                }
		            }
		        });
			}else{
				 mui.alert('定制失败，手机号码为必填项','逸品生活')
			}
		});
	})
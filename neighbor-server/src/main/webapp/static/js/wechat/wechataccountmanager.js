mui.init();
mui('body').on('tap','#change4account',function(){
	$.ajax({
	      type : 'get',
	      url : '/changeAccountMode',
	      dataType : 'html',
	      success : function(data) {
	    	  if(data == 1){
	    		  location.href = '/wechatMyMall?ts=' + Date.parse(new Date());
	    	  }else{
	    		  alert('切换帐号失败','逸品生活');
	    	  }
	      }
	});
});

mui('body').on('tap','.ahref',function(){
	var href = $(this).attr('href');
	href == '' || href == undefined ? mui.alert('功能正在努力实现中，敬请期待','逸品生活') : location.href = href;
});

mui('body').on('tap','#login_out_accound',function(){
	var btnArray = ['否', '是'];
	mui.confirm('退出帐号后，您将失去重要的推荐信息哦', '亲~', btnArray, function(e) {
		if (e.index == 1) {
			mui.toast('正在退出当前帐号~');
			$.ajax({
			      type : 'get',
			      url : '/removeBindAccount?wxOpenId=' + $('body').attr('openid'),
			      dataType : 'html',
			      success : function(data) {
			    	  if(data == 1){
			    		  location.href = '/wechatMyMall?ts=' + Date.parse(new Date());
			    	  }else{
			    		  mui.alert('退出帐号失败','逸品生活');
			    	  }
			      },
			      error:function(){
			    	  mui.alert('退出帐号失败','逸品生活');
			      }
			});
		}
	})
});
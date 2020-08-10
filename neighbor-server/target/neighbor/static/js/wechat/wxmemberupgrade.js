mui.init();
mui('.mui-scroll-wrapper').scroll({
	indicators : false,
});
//if($('.space_account').length > 0 && $('body').attr('isbind') == 0){
//	mui.alert('请先绑定商城帐号，方可查看当前会员晋级。请先绑定帐号~','温馨提示',function(){
//		location.href = '/wechatGoBind?tourl=/wxMemberUpgrade';
//	});
//}else if($('.space_account').length > 0 && $('body').attr('accountmode') == 1){
//	mui.alert('您已经绑定商城帐号，请切换商城帐号方可查看会员晋级','温馨提示',function(){
//		$.ajax({
//		      type : 'get',
//		      url : '/changeAccountMode',
//		      dataType : 'html',
//		      success : function(data) {
//		    	  if(data == 1){
//		    		  mui.alert('切换商城帐号成功','恭喜',function(){
//		    			  location.href = '/wxMemberUpgrade?ts=' + Date.parse(new Date());
//		    		  });
//		    	  }else{
//		    		  mui.alert('切换帐号失败','逸品生活');
//		    	  }
//		      }
//		});
//	});
//}

mui('body').on('tap','.MemberRechargeBtn',function(){
	location.href = '/wechatDeposit';
});

mui('body').on('tap','.MemberLevelHead_userName',function(){
	location.href = '/wechatMyMall';
})

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
var shareTitle = $('#shareTitle').text();
var shareLink = 'http://www.wonyen.com/redirect.jsp?url=' + encodeURIComponent(decodeURIComponent($('#shareLink').text()));
var shareImgUrl = $('#shareImgUrl').text();
var shareDesc = $('#shareDesc').text();


wx.config({
    appId: 'wxc034ddcd6d10e418', // 必填，公众号的唯一标识
    timestamp: $('#timestamp').text(), // 必填，生成签名的时间戳
    nonceStr: $('#noncestr').text(), // 必填，生成签名的随机串
    signature: $('#signature').text(),// 必填，签名，见附录1
    jsApiList: ['scanQRCode','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
	//分享到朋友圈
	wx.onMenuShareTimeline({
	    title: shareTitle, 
	    link: shareLink, 
	    imgUrl: shareImgUrl, 
	    success: function () { 
	        
	    },
	    cancel: function () { 
	       
	    }
	});
	//分享给朋友
	wx.onMenuShareAppMessage({
	    title: shareTitle, 
	    desc: shareDesc, 
	    link: shareLink, 
	    imgUrl: shareImgUrl, 
	    type: 'link', 
	    success: function () { 
	    	$('.share_tips').hide();
	    },
	    cancel: function () { 
	       
	    }
	});
	//分享到QQ
	wx.onMenuShareQQ({
	    title: shareTitle, 
	    desc: shareDesc, 
	    link: shareLink, 
	    imgUrl: shareImgUrl, 
	    success: function () { 
	    	$('.share_tips').hide();
	    },
	    cancel: function () { 
	       
	    }
	});
	//分享到腾讯微博
	wx.onMenuShareWeibo({
	    title: shareTitle,
	    desc: shareDesc, 
	    link: shareLink, 
	    imgUrl: shareImgUrl, 
	    success: function () { 
	    	$('.share_tips').hide(); 
	    },
	    cancel: function () { 
	        
	    }
	});
	//分享到QQ空间
	wx.onMenuShareQZone({
	    title: shareTitle,
	    desc: shareDesc, 
	    link: shareLink, 
	    imgUrl: shareImgUrl, 
	    success: function () { 
	    	$('.share_tips').hide();
	    },
	    cancel: function () { 
	        
	    }
	});
});

wx.error(function(res){
    console.log("错误信息 === ");
    console.log(res);
});
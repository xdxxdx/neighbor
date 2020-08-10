var shareTitle = $('body').attr('un') + '为您推荐：逸品生活';
var shareLink = 'http://www.wonyen.com/wechatRecommendPage?introducer=' + $('body').attr('uid');
var shareImgUrl = 'http://www.wonyen.com/WechatImages/share_yinpin.png';
var shareDesc = '逸同分享  品质生活';

$('.img2canvas').each(function(){
	var imgHtml = document.getElementById('img4canvas');
	var canvas = $(this)[0];
	var ctx = canvas.getContext('2d');
	ctx.drawImage(imgHtml,0,0,300,158);	
});

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

var options = {
		render: 'canvas',  
        text: utf16to8(shareLink),  
        height: $('#recmmender_qr_area').height(),  
        width: $('#recmmender_qr_area').width(),  
        typeNumber: -1,         //计算模式  
        background: '#f7f7f7',  //背景颜色  
        foreground: '#000000',  //前景颜色  
        src: $('body').attr('userface')  
};

$('#recmmender_qr_area').empty().qrcode(options);

function utf16to8(str) { //转码  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for (i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if ((c >= 0x0001) && (c <= 0x007F)) {  
            out += str.charAt(i);  
        } else if (c > 0x07FF) {  
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
        } else {  
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
        }  
    }  
    return out;  
} 

function convertCanvasToImage(canvas) {  
    //新Image对象，可以理解为DOM  
    var image = new Image();  
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持  
    // 指定格式 PNG  
    image.src = canvas.toDataURL("image/png");  
    return image;  
}  

mui('body').on('tap','.recommender_share',function(){
	$('.share_tips').show();
});

mui('body').on('tap','.share_tips',function(){
	$('.share_tips').hide();
});

mui('body').on('tap','#CloserecommenderPopover',function(){
	mui('#recommender_popover').popover('toggle');
})
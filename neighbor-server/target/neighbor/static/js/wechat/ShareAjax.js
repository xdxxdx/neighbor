const jsUrl = $('#shareAjax').attr('src');

String.prototype.getQueryString = function(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = jsUrl.split('?')[1].match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

let shareTitle = jsUrl.getQueryString('shareTitle');
let shareDesc = jsUrl.getQueryString('shareDesc');
let shareImgUrl = jsUrl.getQueryString('shareImgUrl') ? jsUrl.getQueryString('shareImgUrl') : 'http://www.wonyen.com/WechatImages/yipin.png';
let shareLink = jsUrl.getQueryString('shareLink') ? jsUrl.getQueryString('shareLink') : window.location.href;
const auto = jsUrl.getQueryString('auto');
const dt = jsUrl.getQueryString('dt');

document.write('<script language="javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js?dt= ' + dt + '" > </script>');

const href = window.location.href;

const shareInit = function() {
	$.ajax({
		type : 'POST',
		url : '/wxShare?url=' + encodeURIComponent(href),
		datatype : 'json',
		success : function(cipherText) {
			wx.config({
				appId : 'wxc034ddcd6d10e418', // 必填，公众号的唯一标识
				timestamp : cipherText.timestamp, // 必填，生成签名的时间戳
				nonceStr : cipherText.noncestr, // 必填，生成签名的随机串
				signature : cipherText.signature,// 必填，签名，见附录1
				jsApiList : [ 'scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone' ]
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function() {
				// 分享到朋友圈
				wx.onMenuShareTimeline({
					title : shareTitle,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {

					},
					cancel : function() {

					}
				});
				// 分享给朋友
				wx.onMenuShareAppMessage({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					type : 'link',
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到QQ
				wx.onMenuShareQQ({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到腾讯微博
				wx.onMenuShareWeibo({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到QQ空间
				wx.onMenuShareQZone({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
			});

			wx.error(function(res) {
				console.log("错误信息 === ");
				console.log(res);
			});
		},
		errer : function(e) {
		}
	})
}

if(auto != 'none'){
	shareInit();
}

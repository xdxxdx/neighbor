mui.init();
var wx_AppID = 'wxc034ddcd6d10e418';
var rURL = 'http://www.wonyen.com/wechatPayDeposit';
pushHistory();
mui('body').on('tap','.depositBtn',function(){
	var money = $('#depositMoney').val();
	if(/^\d+(\.\d{1,2})?$/.test(money)){
		$.ajax({
			type: 'POST',
			url: '/depositLogSave',
			data: {'depositLog.deposit' : money},
			dataType: 'json',
			success:function(json){
				if(json.result == '1'){
					console.log(json.orderId);
					var oid = json.orderId;
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wx_AppID + '&redirect_uri=' + rURL + '&response_type=code&scope=snsapi_base&state=' + oid + '#wechat_redirect';
				}else{
					
				}
				
			},
			error:function(){
				
			}
		})
	}else{
		mui.alert('请输入正确的人民币格式','众筹云');
	}
});


function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

$('#depositMoney').val(getQueryString('depositMonoy')/100);
function pushHistory() {
        window.addEventListener('popstate', function(e) {
            self.location.reload();
        }, false);
        var state = {
            title : "",
            url : "#"
        };
        window.history.replaceState(state, "", "#");
    };
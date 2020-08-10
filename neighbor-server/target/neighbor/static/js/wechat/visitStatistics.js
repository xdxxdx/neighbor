$(function(){
	var origin = 'pc';
	if(is_weixn()==true) {
		origin = 'wechat';
	}
	$.getJSON("./visitCountStatistics?origin=" + origin);
})


function is_weixn(){ 
    var ua = navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i)=="micromessenger") { 
        return true; 
    } else { 
        return false; 
    } 
}

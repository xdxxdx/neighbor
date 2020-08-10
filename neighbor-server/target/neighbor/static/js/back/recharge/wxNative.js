 var wxurl=$("body").attr("wxurl");
$('.qrcode_box').qrcode({
	 width:238,
	 height:238,
	 correctLevel:0,
	 text:wxurl
});
 
 var ajaxR = setInterval('PayAjax()',2000);
 
 function PayAjax(){
	 $.ajax({
	      type : 'get',
	      url : '/realOrderStatus?orderIdStr=' + orderid,
	      dataType : "html",
	      success : function(data) {
	    	  if(data > 0){
	    		  clearInterval(ajaxR);
		    	  location.replace('/wechatNativeSuccess?realOrderIdStr=' + orderid);
	    	  }
	      }
	 })
 }
//模拟form表单提交打开新的页面
$.extend({
	open_page: function(url, param) {
		var form = '<form action="' + url + '"  target="_blank"  id="windowOpen" style="display:none">';
		for(var key in param) {
			form += '<input name="' + key + '" value="' + param[key] + '"/>';
		}
		form += '</form>';
		$('body').append(form);
		$('#windowOpen').submit();
		$('#windowOpen').remove();
	},
	is_NaN:function(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
	},
	timestampToTime:function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
   },
   timestampToDate:function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D;
   },
   // 判断是否为手机号
  isPoneAvailable: function (pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
  },
  // 判断是否为电话号码
  isTelAvailable: function (tel) {
    var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (!myreg.test(tel)) {
      return false;
    } else {
      return true;
    }
  },
  getCookie:function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	},
	// 下划线转换驼峰 
	toHump:function(name) {
		return name.replace(/\_(\w)/g, function(all, letter){ 
			return letter.toUpperCase(); 
		}); 
	}, 
	// 驼峰转换下划线
	toLine:function(name) {
		return name.replace(/([A-Z])/g,"_$1").toLowerCase(); 
	}

});
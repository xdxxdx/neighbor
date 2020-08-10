/**
 * jquery.validate相关扩展验证
 * @author Administrator
 */

//验证用户名       
jQuery.validator.addMethod("userNameCheck", function(value, element) {       
    return this.optional(element) || /^[a-zA-Z]\w{3,20}$/.test(value);       
}, "请输入以字母开头的4-20位字母或数字或下划线");

//字符验证       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
}, "只能包括中文字、英文字母、数字和下划线");  

//邮箱验证       
jQuery.validator.addMethod("isEmail", function(value, element) {       
    return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/.test(value);     
}, "请输入有效的邮箱格式");
		
//手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile = /(^(13|14|15|18)\d{9}$)/;     
    return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请输入有效的手机号码");       
     
//电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请输入有效的电话号码");   

jQuery.validator.addMethod("isTel2", function(value, element) {       
    var tel = /^(((400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?))$/;    //电话号码格式400或800号码 ,或010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请输入有效的电话号码"); 
  
//联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isPhone", function(value,element) {   
    var length = value.length;   
    var mobile = /(^(13|14|15|18)\d{9}$)|(^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$)/;    
    var tel = /^\d{3,4}-?\d{7,9}$/;   
    return this.optional(element) || (tel.test(value) || mobile.test(value));   
  
}, "请输入有效的联系电话");

//邮编验证   
jQuery.validator.addMethod("zipcode", function(value, element) {       
     
    return this.optional(element) || /^[0-9]{6}$/.test(value);
}, "请正确填写您的邮编");  

//身份证号
jQuery.validator.addMethod("idcard", function(value, element) {       
     
	 return this.optional(element) || /^\d{18}|\d{15}$/.test(value);
}, "请正确填写您的身份证号");  

//密码框格式验证：只能是数字、字母与下划线
jQuery.validator.addMethod("password2", function(value, element) {       
     
	return this.optional(element) || /^\w+$/.test(value);
}, "只能是数字、字母与下划线");  

 

//qq
jQuery.validator.addMethod("qq", function(value, element) {       
     
	return this.optional(element) || /^[1-9]\d{5,8}$/.test(value);
}, "请正确填写您的qq号");  


//手机
jQuery.validator.addMethod("phone2", function(value, element) {       
     
	 return this.optional(element) || /^(\+86)|(86)?1[3,5,8]{1}[0-9]{1}[0-9]{8}$/.test(value);
}, "请正确填写您的手机号"); 

//验证值小数位数不能超过两位
jQuery.validator.addMethod("decimal", function(value, element) {
var decimal = /^-?\d+(\.\d{1,2})?$/;
return this.optional(element) || (decimal.test(value));
}, "小数位数不能超过两位"); 


//汉字
jQuery.validator.addMethod("chcharacter", function(value, element) {
var tel = /^[\u4e00-\u9fa5]+$/;
return this.optional(element) || (tel.test(value));
}, "请输入汉字");

//字母数字
jQuery.validator.addMethod("alnum", function(value, element) {
return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包括英文字母和数字");



/**
* 身份证号码验证
*
*/
function isIdCardNo(num) {

var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
var parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2");
var varArray = new Array();
var intValue;
var lngProduct = 0;
var intCheckDigit;
var intStrLen = num.length;
var idNumber = num;
// initialize
if ((intStrLen != 15) && (intStrLen != 18)) {
return false;
}
// check and set value
for(i=0;i<intStrLen;i++) {
varArray[i] = idNumber.charAt(i);
if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
return false;
} else if (i < 17) {
varArray[i] = varArray[i] * factorArr[i];
}
}

if (intStrLen == 18) {
//check date
var date8 = idNumber.substring(6,14);
if (isDate8(date8) == false) {
return false;
}
// calculate the sum of the products
for(i=0;i<17;i++) {
lngProduct = lngProduct + varArray[i];
}
// calculate the check digit
intCheckDigit = parityBit[lngProduct % 11];
// check last digit
if (varArray[17] != intCheckDigit) {
return false;
}
}
else{ //length is 15
//check date
var date6 = idNumber.substring(6,12);
if (isDate6(date6) == false) {

return false;
}
}
return true;

}

//身份证号码验证 
jQuery.validator.addMethod("idcardno", function(value, element) {
return this.optional(element) || isIdCardNo(value); 
}, "请正确输入身份证号码");

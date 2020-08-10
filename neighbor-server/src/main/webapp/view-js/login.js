$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
    });

    loginInit();
});


var emailCookie;
var pwdCookie;
var cxt;

function loginInit() {

    if (errcode == 1)
        alert("用户名或密码错误");
    cxt = $("input#cxt").val();

    emailCookie = getCookie("email");
    pwdCookie = getCookie("pwd");

    var domain = $('#domain').val();
    localStorage.setItem("domain", domain);

    if (!(emailCookie == "")) { //如果有cookie
        $("input#inputEmail").val(emailCookie);
        $("input#inputPassword").val(pwdCookie);
        $("#rememberMeId").setAttribute("checked", true);
    }
}

function getCookie(key) {

    var name = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
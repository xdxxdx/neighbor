//-------------------密码强度插件-------------------//
//版本号1.1
//二〇一六年十月二十五日 16:18:10  完成插件整体架构  后续进入版本修改阶段
(function($) {
    var level, opts;
    var defaults = {
        strengthProperties: 'strongLevel',
        maxLength: 18,
        minLength: 6,
        callback: function(obj, level) {}
    };

    $.fn.pwStrength = function(options) {
        opts = $.extend(defaults, options);
        var _this = $(this);
        _this.keyup(function() {
            var pwd = _this.val();
            level = init(pwd);
            _this.attr(opts.strengthProperties, init(pwd));
            opts.callback(_this, level);
        })
    }

    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字 
        return 1;
        if (iN >= 65 && iN <= 90) //大写字母 
        return 2;
        if (iN >= 97 && iN <= 122) //小写 
        return 4;
        else return 8; //特殊字符 
    }
    //bitTotal函数 
    //计算出当前密码当中一共有多少种模式 
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
    //checkStrong函数 
    //返回密码的强度级别 
    function checkStrong(sPW) {
        if (sPW.length < opts.minLength || sPW.length > opts.maxLength) return 0; //密码太短 
        Modes = 0;
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式. 
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
    }
    //pwStrength函数 
    //当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色 
    function init(p) {
        p == null || p == '' ? S_level = 1 : S_level = checkStrong(p);
        return S_level < 3 ? S_level: '3';
    }

})(jQuery);
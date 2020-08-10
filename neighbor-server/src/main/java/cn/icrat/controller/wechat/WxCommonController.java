package cn.icrat.controller.wechat;

import cn.icrat.dao.base.DataResponse;
import cn.icrat.service.ParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WxCommonController {
    @Autowired
    private ParamService paramService;

    @RequestMapping("wxParam")
    public DataResponse wxParam(){
        return new DataResponse( paramService.getParam() );
    }
}

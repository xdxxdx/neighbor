package cn.icrat.controller.back;

import cn.icrat.service.SyslogService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
public class SyslogController {
    @Autowired
    private SyslogService syslogService;
    @RequestMapping("syslogMgr")
    public ModelAndView syslogHome(){
        return new ModelAndView("syslog/SyslogList");
    }
    @ResponseBody
    @RequestMapping("syslogList")
    public JSONObject syslogList(ParamModel pm) {
        pm.setSortname("id");
        pm.setSortorder("asc");
        Map<String, Object> map = syslogService.getDataMapByPm(pm);
        JSONObject jsonObject = JsonUtil.mapToJsonObject(map);
        return jsonObject;
    }
}

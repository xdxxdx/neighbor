package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.service.AmountDetailService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@Controller
public class AmountDetailController {
    @Autowired
    private AmountDetailService amountDetailService;

    @RequestMapping("amountMgr")
    public ModelAndView amountMgr(){
        ModelAndView mv=new ModelAndView("amount/AmountList");
        return mv;
    }

    @ResponseBody
    @RequestMapping("amountList")
    public JSONObject floorList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=amountDetailService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
}

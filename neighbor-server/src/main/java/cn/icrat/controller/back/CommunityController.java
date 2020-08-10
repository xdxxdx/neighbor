package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Role;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.JurisdictionService;
import cn.icrat.service.MenuService;
import cn.icrat.service.RoleService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class CommunityController {
    @Autowired
    private CommunityInfoService communityInfoService;
    @RequestMapping("communityMgr")
    public ModelAndView roleHome(){
        return new ModelAndView("community/CommunityList");
    }
    @RequestMapping("communityAdd")
    public ModelAndView communityAdd(){
        return new ModelAndView("community/CommunityAdd");
    }
    @RequestMapping("communityEdit")
    public ModelAndView communityEdit(Long id){
        CommunityInfo communityInfo=communityInfoService.getEntityById(id);
        ModelAndView mv=new ModelAndView("community/CommunityEdit");
        mv.addObject("communityInfo", communityInfo);
        return mv;
    }
    @ResponseBody
    @RequestMapping("communityList")
    public JSONObject communityList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=communityInfoService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("communitySave")

    public String communitySave(int type,CommunityInfo communityInfo){
        Integer result=communityInfoService.saveCommunityInfo(type,communityInfo)?1:0;
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("communityDel")
    public String communityHidden(CommunityInfo communityInfo){
        Integer result=communityInfoService.hiddenEntity(communityInfo)?1:0;
        return result.toString();
    }
}

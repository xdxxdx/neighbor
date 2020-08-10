package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Role;
import cn.icrat.service.*;
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
import java.util.List;
import java.util.Map;

@Controller
public class FloorController {
    @Autowired
    private CommunityInfoService communityInfoService;
    @Autowired
    private FloorService floorService;
    @RequestMapping("floorMgr")
    public ModelAndView floorMgr(){
        ModelAndView mv=new ModelAndView("floor/FloorList");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }
    @RequestMapping("floorAdd")
    public ModelAndView floorAdd(){
        ModelAndView mv=new ModelAndView("floor/FloorAdd");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }
    @RequestMapping("floorEdit")
    public ModelAndView floorEdit(Long id){
        Floor floor=floorService.getEntityById(id);
        ModelAndView mv=new ModelAndView("floor/FloorEdit");
        mv.addObject("floor", floor);
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }
    @ResponseBody
    @RequestMapping("floorList")
    public JSONObject floorList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=floorService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("floorSave")

    public String roleSave(int type,Floor floor){
        Integer result=floorService.saveEntity(type,floor)?1:0;
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("floorDel")
    public String floorDel(Floor floor){
        Integer result=floorService.hiddenEntity(floor);
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("floorByCode")
    public Map<String,Object>floorByCode(String floorCode,Long communityId){
        Floor floor=floorService.getFloorByCommunityIdAndCode(communityId,floorCode);
        Map<String, Object> maps = new HashMap<String, Object>();
        if (floor == null) {
            maps.put("valid", true);
        } else {
            maps.put("valid", false);
        }
        return maps;
    }
    @RequestMapping("floorJsonByCommunityId")
    @ResponseBody
    public JSONObject floorJsonByCommunityId(Long communityId){
        List<Floor>floorList=floorService.getFloorListByCommunityId(communityId);
        JSONObject jsonObject=new JSONObject();
        for(Floor floor:floorList){
            jsonObject.put(floor.getId(), floor.getFloorCode());
        }
        return jsonObject;
    }

}

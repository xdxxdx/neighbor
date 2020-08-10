package cn.icrat.controller.back;

import cn.icrat.anno.Syslog;
import cn.icrat.dao.entity.Role;
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

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Controller
public class RoleController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private JurisdictionService jurisdictionService;
    @Autowired
    private MenuService menuService;
    @RequestMapping("roleMgr")
    public ModelAndView roleHome(){
        return new ModelAndView("role/RoleList");
    }
    @RequestMapping("roleAdd")
    public ModelAndView roleAdd(){
        return new ModelAndView("role/RoleAdd");
    }
    @RequestMapping("roleEdit")
    public ModelAndView roleEdit(Long id){
        Role role=roleService.getRoleById(id);
        ModelAndView mv=new ModelAndView("role/RoleEdit");
        mv.addObject("role", role);
        return mv;
    }
    @ResponseBody
    @RequestMapping("roleList")
    public JSONObject roleList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=roleService.getRoleMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("roleSave")

    public String roleSave(int type,Role role){
        Integer result=roleService.saveRole(type, role)?1:0;
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("roleDel")
    public String roleHidden(Role role){
        Integer result=roleService.hiddenRole(role)?1:0;
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("roleByRoleName")
    public Map<String,Object>roleByRoleName(String roleName){
        Role role=roleService.getRoleByRoleName(roleName);
        Map<String, Object> maps = new HashMap<String, Object>();
        if (role == null) {
            maps.put("valid", true);
        } else {
            maps.put("valid", false);
        }
        return maps;
    }
    @RequestMapping("roleJurisdiction")
    public ModelAndView jurisdiction(int roleId){
        ModelAndView mv=new ModelAndView("jurisdiction/Jurisdiction");
        mv.addObject("roleId", roleId);
        return mv;
    }
    @ResponseBody
    @RequestMapping("roleJurisdictionTree")
    public JSONArray jurisdictionTree(int roleId){
        return jurisdictionService.getJurisdictionJsonByRoleId(roleId);
    }
    @ResponseBody
    @RequestMapping("roleJurisdictionSave")
    public String jurisdictionSave(int roleId,String menuIds){
        Integer result=jurisdictionService.saveJurisdiction(roleId, menuIds);
        return result.toString();
    }
}

package cn.icrat.controller.back;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;


import cn.icrat.dao.entity.Menu;
import cn.icrat.service.MenuService;
import cn.icrat.service.RoleService;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class MenuController {
    @Resource(name="menuService")
    private MenuService menuService;
    @Resource(name="roleService")
    private RoleService roleService;
    @RequestMapping("menuMgr")
    public ModelAndView menuHome(ParamModel pm){
        ModelAndView mv=new ModelAndView("menu/MenuList");
        mv.addObject("pm", pm);
        return mv;
    }
    @ResponseBody
    @RequestMapping(value = "/menuList", method = RequestMethod.GET)
    public List<Menu>menuList(ParamModel pm){
        List<Menu>menuList=menuService.getMenuList();
        return menuList;
    }
    @RequestMapping(value = "/menuAdd", method = RequestMethod.GET)
    public String menuAdd(){
        return "menu/MenuAdd";
    }
    @RequestMapping("menuEdit")
    public ModelAndView menuEdit(Long id){
        Menu menu=menuService.getMenuById(id);
        ModelAndView mv=new ModelAndView("menu/MenuEdit");
        mv.addObject("menu", menu);
//		List<Menu>parentMenuList=menuService.getRootMenuList();
//		mv.addObject("parentMenuList", parentMenuList);
        return mv;
    }
    @ResponseBody
    @RequestMapping("menuSave")
    public String menuSave(int type,Menu menu){
        Integer result=menuService.saveMenu(type, menu);
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("menu/del")
    public String menuDel(Menu menu){
        Integer result=menuService.deleteMenu(menu)?1:0;
        return result.toString();
    }
    @ResponseBody
    @RequestMapping("menuListByMenuType")
    public net.sf.json.JSONObject menuListByMenuType(int menuType,Long pMenuId){
//		Map<String,Object>maps=new HashMap<String, Object>();
        net.sf.json.JSONObject jsonObject=new net.sf.json.JSONObject();
        if(menuType==2){
            //主菜单
            List<Menu>parentMenuList=menuService.getRootMenuList();
            if(!parentMenuList.isEmpty()){
                if(pMenuId!=0){
                    Menu pMenu=menuService.getMenuById(pMenuId);
                    jsonObject.put("xdx0"+pMenu.getId(), pMenu.getMenuName());
                    for(Menu menu:parentMenuList){
                        if(menu.getId()!=pMenuId){
                            jsonObject.put("xdx1"+menu.getId(), menu.getMenuName());
                        }
                    }
                }else{
                    for(Menu menu:parentMenuList){
                        jsonObject.put("xdx0"+menu.getId(), menu.getMenuName());
                    }
                }

            }
        }else{
            jsonObject.put("", "无");
        }
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("menuNameOnly")
    public Map<String,Object>menuNameOnly(String menuName){
        Map<String,Object>map=new HashMap<String, Object>();
        Menu menu=menuService.getMenuByMenuName(menuName);
        if(menu==null){
            map.put("valid", true);
        }else{
            map.put("valid", false);
        }
        return map;
    }
    @ResponseBody
    @RequestMapping("menuTree")
    public JSONArray menuTree(Integer roleId){
//		List<Menu>menuTree1=menuService.getAllMenuListRecursion();
        JSONArray menuTree=menuService.getMenuByRole(roleId);
//		JSONArray menuTree=JSONArray.fromObject(menuTree1);
        return menuTree;
    }
    @ResponseBody
    @RequestMapping("menu/priority")
    public String menuPriority(Long menuId,int priority){
        Integer result=menuService.updatePriority(menuId, priority);
        return result.toString();
    }

}

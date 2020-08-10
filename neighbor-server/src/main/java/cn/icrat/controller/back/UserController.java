package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Guard;
import cn.icrat.dao.entity.User;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.FloorService;
import cn.icrat.service.UserService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private CommunityInfoService communityInfoService;
    @Autowired
    private FloorService floorService;


    // 用户管理
    @RequestMapping(value = "/userMgr", method = RequestMethod.GET)
    public ModelAndView userMgr() {
        ModelAndView mv=new ModelAndView("user/UserList");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }
    @ResponseBody
    @RequestMapping("userList")
    public JSONObject floorList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=userService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }

    //修改用户页面
    @RequestMapping(value = "userEdit", method = RequestMethod.GET)
    public ModelAndView userEdit(long id, Model model){
        ModelAndView mv=new ModelAndView( "user/UserEdit" );
        User user=userService.findUserById(id);
        model.addAttribute("user",user);
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }
    @RequestMapping(value = "/changeUserState", method = RequestMethod.POST)
    @ResponseBody
    public boolean changeState(Long id, int state) {
        return userService.changeState(id, state);
    }
    @RequestMapping(value = "/saveUser", method = RequestMethod.POST)
    @ResponseBody
    public Integer saveUser(User user){
        return userService.saveUser(user);
    }

    //用户门禁设置页面
    @RequestMapping(value = "/userGuardSet", method = RequestMethod.GET)
    public String userGuardSet(long userId,Model model){
        User user=userService.findUserById(userId);
        model.addAttribute("user",user);
        List<Floor> floorList=floorService.listFloorGroupBycommunity(user.getGuardNo());
        model.addAttribute("floorList", floorList);
        return "user/guardSet";
    }
    @RequestMapping(value = "/userSetGuardNo", method = RequestMethod.POST)
    @ResponseBody
    public Integer setGuardNo(User user){
        return userService.updateGuardNo(user);
    }

    // 未审核用户管理
    @RequestMapping(value = "/unExamUserMgr", method = RequestMethod.GET)
    public ModelAndView unExamUserMgr() {
        ModelAndView mv=new ModelAndView("user/UnExamUserList");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        mv.addObject( "listUrl","unExamUserList" );
        return mv;
    }
    @ResponseBody
    @RequestMapping("unExamUserList")
    public JSONObject unExamUserList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        pm.setState("-1");
        Map<String,Object> maps=userService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    // 已审核用户管理
    @RequestMapping(value = "/examedUserMgr", method = RequestMethod.GET)
    public ModelAndView unExamuserMgr() {
        ModelAndView mv=new ModelAndView("user/UnExamUserList");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        mv.addObject( "listUrl","examedUserList" );
        return mv;
    }
    @ResponseBody
    @RequestMapping("examedUserList")
    public JSONObject examedUserList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        pm.setState("0");
        Map<String,Object> maps=userService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }

    // 已冻结用户管理
    @RequestMapping(value = "/frozenUserMgr", method = RequestMethod.GET)
    public ModelAndView frozenUserMgr() {
        ModelAndView mv=new ModelAndView("user/UnExamUserList");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        mv.addObject( "listUrl","frozenUserList" );
        return mv;
    }
    @ResponseBody
    @RequestMapping("frozenUserList")
    public JSONObject frozenUserList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        pm.setState("1");
        Map<String,Object> maps=userService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }


}

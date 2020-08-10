package cn.icrat.controller.back;

import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Suggest;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.SuggestService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
public class SuggestController {
    @Autowired
    private SuggestService suggestService;
    @Autowired
    private CommunityInfoService communityInfoService;

    @RequestMapping("suggestMgr")
    public ModelAndView suggestMgr(HttpSession session){
        ModelAndView mv=new ModelAndView("suggest/SuggestList");
        Account account=(Account) session.getAttribute("account");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }

    @RequestMapping("suggestMgr2")
    public ModelAndView suggestMgr2(HttpSession session){
        ModelAndView mv=new ModelAndView("suggest/SuggestList2");
        Account account=(Account) session.getAttribute("account");
        List<CommunityInfo> communityList=communityInfoService.getAllCommunityList();
        mv.addObject("communityList",communityList);
        return mv;
    }

    @ResponseBody
    @RequestMapping("suggestList")
    public JSONObject suggestList(ParamModel pm,HttpSession session){
        pm=ParamModel.getSortedPm(pm);
        Account account=(Account) session.getAttribute("account");
        pm.setType( 0 );
        if(account!=null&&account.getCommunityId()>0){
            pm.setCommunityId( account.getCommunityId() );
        }
        Map<String,Object> maps=suggestService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }

    @ResponseBody
    @RequestMapping("suggestList2")
    public JSONObject suggestList2(ParamModel pm,HttpSession session){
        pm=ParamModel.getSortedPm(pm);
        Account account=(Account) session.getAttribute("account");
        pm.setType(1);
        if(account!=null&&account.getCommunityId()>0){
            pm.setCommunityId( account.getCommunityId() );
        }
        Map<String,Object> maps=suggestService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("suggestStatus")
    public Integer suggestStatus(Suggest suggest){
        return suggestService.updateStatus( suggest );
    }
}

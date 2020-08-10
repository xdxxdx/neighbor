package cn.icrat.controller;

import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.base.RestResponse;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.AmountDetail;
import cn.icrat.dao.entity.Guard;
import cn.icrat.dao.entity.Notice;
import cn.icrat.dao.entity.ShareInfo;
import cn.icrat.dao.entity.User;
import cn.icrat.service.BackendService;
import cn.icrat.service.BusinessService;
import cn.icrat.service.ItemService;
import cn.icrat.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;






import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/backend")
public class BackendController {

    @Autowired(required=true)
    private BackendService backendService;
    @Autowired(required=true)
    private UserService userService;

    @Autowired(required=true)
    private ItemService itemService;

    @Autowired(required=true)
    private BusinessService businessService;

    @RequestMapping(value = "/listUser", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse listUser(HttpSession session) {
        Account account=(Account) session.getAttribute("account");
        if(account!=null&&account.getCommunityId()>0){
            List items = userService.listUserByCommunityId(account.getCommunityId());
            return new DataResponse(items);
        }else{
            List users = userService.listUser();
            return new DataResponse(users);
        }

    }

    @RequestMapping(value = "/listItem", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse listItem() {
        List items = itemService.listItem();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/listShare", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse listShare() {
        List items = backendService.listShare();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/deleteShare", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteShare(Long id) {
        return backendService.deleteShare(id);
    }
    @RequestMapping(value = "/changeShareTop", method = RequestMethod.POST)
    @ResponseBody
    public Integer changeShareTop(ShareInfo shareInfo) {
        return backendService.updateShareTop(shareInfo);
    }

    @RequestMapping(value = "/changeShareStatus", method = RequestMethod.POST)
    @ResponseBody
    public Integer changeShareStatus(ShareInfo shareInfo){
        return backendService.updateShareStatus(shareInfo);
    }
    @RequestMapping(value = "/listWithdraw", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse listWithdraw() {
        List items = backendService.listWithdraw();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/doWithdraw", method = RequestMethod.POST)
    @ResponseBody
    public boolean doWithdraw(Long id) {
        return backendService.doWithdraw(id);
    }

    @RequestMapping(value = "/listSuggest", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse listSuggest(HttpSession session) {
    	Account account=(Account) session.getAttribute("account");
    	if(account!=null&&account.getCommunityId()>0){
    		List items = backendService.listSuggestByCommunityId(account.getCommunityId());
    		return new DataResponse(items);
    	}else{
    		List items = backendService.listSuggest();
    		return new DataResponse(items);
    	}
        
        
    }

    @RequestMapping(value = "/listCommunity", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listCommunity()
    {
        List items = backendService.listCommunity();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/addCommunity", method = RequestMethod.POST)
    @ResponseBody
    public boolean addCommunity(String name, Long provinceId, Long cityId, Long areaId)
    {
        return backendService.addCommunity(name, provinceId, cityId, areaId);
    }

    @RequestMapping(value = "/deleteCommunity", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteCommunity(Long id)
    {
        return backendService.deleteCommunity(id);
    }

    @RequestMapping(value = "/listAmountdetail", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listAmountdetail()
    {
        List items = backendService.listAmountdetail();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/getTotalAmount", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse getTotalAmount()
    {
        List items = backendService.listAmountdetail();
        Integer totalIncome = 0;
        Integer totalWithidraw = 0;
        for (int i = 0; i < items.size(); i++)
        {
            AmountDetail item = (AmountDetail)items.get(i);
            if (item.getType() == 0)
                totalIncome += item.getAmount();
            else
                totalWithidraw += item.getAmount();
        }
        Map map = new HashMap<String, Integer>();
        map.put("income", totalIncome);
        map.put("withdraw", totalWithidraw);

        return new DataResponse(map);
    }

    @RequestMapping(value = "/listNotice", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listNotice()
    {
        List items = backendService.listNotice();
        return new DataResponse(items);
    }

    @RequestMapping(value = "/addNotice", method = RequestMethod.POST)
    @ResponseBody
    public boolean addNotice(String title, String author, String info, Integer type, String picUrl)
    {
        return backendService.addNotice(title, author, info, type, picUrl);
    }

    @RequestMapping(value = "/deleteNotice", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteNotice(Long id)
    {
        return backendService.deleteNotice(id);
    }
    @RequestMapping(value = "/changeNoticeStatus", method = RequestMethod.POST)
    @ResponseBody
    public Integer changeNoticeStatus(Notice notice)
    {
        return backendService.updateNoticeStatus(notice);
    }

    /*
     * 评论
     * */
    @RequestMapping(value = "/listComment", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listComment()
    {
        return new DataResponse(backendService.listComment());
    }

    @RequestMapping(value = "/deleteComment", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteComment(Long id)
    {
        return backendService.deleteComment(id);
    }

    /*
     * 系统消息
     * */
    @RequestMapping(value = "/addSystemMsg", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendSystemMsg(String title, String info)
    {
        return businessService.addMessage(null, title, info, 0);
    }

    @RequestMapping(value = "/listSystemMsg", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listSystemMsg()
    {
        return new DataResponse(backendService.listSystemMsg());
    }


    @RequestMapping(value = "/deleteSystemMsg", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteSystemMsg(Long id)
    {
        return backendService.deleteSystemMsg(id);
    }

    /*
     * 顺风车管理
     * */
    @RequestMapping(value = "/listCarSharing", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listCarSharing()
    {
        return new DataResponse(backendService.listCarSharing());
    }


    @RequestMapping(value = "/deleteCarSharing", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteCarSharing(Long id)
    {
        return backendService.deleteCarSharing(id);
    }
    /*
     * 门禁管理
     **/
    @RequestMapping(value = "/listGuard", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse<Guard>listGuard(){
    	return new DataResponse (backendService.listGuard());
    }
    @RequestMapping(value = "/saveGuard", method = RequestMethod.POST)
    @ResponseBody
    public Object saveGuard(Integer type,Guard guard){
    	Object result=backendService.saveGuard(type, guard);
    	return result;
    }
	@ResponseBody
	@RequestMapping("/guardByName")
	public Map<String,Object>cityByName(String guardName,Long communityId){
		Guard guard=backendService.getGuardByCommunityIdAndName(communityId, guardName);
		Map<String, Object> maps = new HashMap<String, Object>();
		if (guard == null) {
			maps.put("valid", true);
		} else {
			maps.put("valid", false);
		}
		return maps;
	}
	@ResponseBody
	@RequestMapping("/deleteGuard")
	public Integer deleteGuard(Guard guard){
		return backendService.deleteGuard(guard);
	}

}

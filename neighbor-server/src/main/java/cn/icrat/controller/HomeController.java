package cn.icrat.controller;

import javax.servlet.http.HttpSession;

import cn.icrat.dao.base.RestResponse;
import cn.icrat.dao.entity.Guard;
import cn.icrat.dao.entity.User;
import cn.icrat.service.BackendService;

import cn.icrat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class HomeController {
	@Autowired(required = true)
	private BackendService backendService;
	@Autowired
	private UserService userService;





	@RequestMapping(value = "/itemMgr", method = RequestMethod.GET)
	public String itemMgr() {
		return "itemMgr";

	}

	@RequestMapping(value = "/shareMgr", method = RequestMethod.GET)
	public String shareMgr() {
		return "shareMgr";

	}

//	@RequestMapping(value = "/communityMgr", method = RequestMethod.GET)
//	public String communityMgr() {
//		return "communityMgr";
//
//	}

	@RequestMapping(value = "/reportMgr", method = RequestMethod.GET)
	public String reportMgr() {
		return "reportMgr";

	}

	@RequestMapping(value = "/withdrawMgr", method = RequestMethod.GET)
	public String withdrawMgr() {
		return "withdrawMgr";

	}

	@RequestMapping(value = "/noticeMgr", method = RequestMethod.GET)
	public String noticeMgr() {
		return "noticeMgr";

	}

//	@RequestMapping(value = "/suggestMgr", method = RequestMethod.GET)
//	public String suggestMgr() {
//		return "suggestMgr";
//
//	}

	@RequestMapping(value = "/commentMgr", method = RequestMethod.GET)
	public String commentMgr() {
		return "commentMgr";

	}

	@RequestMapping(value = "/systemMsg", method = RequestMethod.GET)
	public String systemMsg() {
		return "systemMsg";

	}

	@RequestMapping(value = "/carSharingMgr", method = RequestMethod.GET)
	public String carSharingMgr() {
		return "carSharingMgr";

	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "test";
	}

	@RequestMapping(value = "/guard", method = RequestMethod.GET)
	public String gurad() {
		return "guard/guardList";
	}

	@RequestMapping(value = "/guardAdd", method = RequestMethod.GET)
	public String guardAdd() {
		return "guard/guardAdd";
	}

	@RequestMapping(value = "/guardEdit", method = RequestMethod.GET)
	public String guardEdit(long id, Model model) {
		Guard guard = backendService.getGuardById(id);
		model.addAttribute("guard", guard);
		return "guard/guardEdit";
	}




}

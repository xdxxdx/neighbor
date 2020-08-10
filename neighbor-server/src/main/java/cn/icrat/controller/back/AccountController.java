package cn.icrat.controller.back;

import cn.icrat.anno.Syslog;
import cn.icrat.common.MD5Util;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Role;
import cn.icrat.service.AccountService;
import cn.icrat.service.RoleService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AccountController {
	private static final String uploadFile = "/uploadFile/userFace";
	@Autowired
	private AccountService accountService;
	@Autowired
	private RoleService roleService;

	@RequestMapping("treeData")
	public ModelAndView treeData() {
		ModelAndView mv = new ModelAndView("back/admin/TreeData");
		return mv;
	}

	@RequestMapping("accountMgr")
	public ModelAndView accountMgr() {
		ModelAndView mv = new ModelAndView("account/AdminList");
		List<Role> roleList = roleService.getAllRoleList();
		mv.addObject("roleList", roleList);
		return mv;
	}

	@RequestMapping("accountAdd")
	public ModelAndView accountAdd() {
		ModelAndView mv = new ModelAndView("account/AdminAdd");
		List<Role> roleList = roleService.getAllRoleList();
		mv.addObject("roleList", roleList);
		return mv;
	}

	@RequestMapping("accountEdit")
	public ModelAndView adminEdit(int id) {
		Account account = accountService.getAccountById(id);
		ModelAndView mv = new ModelAndView("account/AdminEdit");
		mv.addObject("account", account);
		List<Role> roleList = roleService.getAllRoleList();
		mv.addObject("roleList", roleList);
		return mv;
	}

	@ResponseBody
	@RequestMapping("accountList")
	public JSONObject accountList(ParamModel pm) {
		pm.setSortname("id");
		pm.setSortorder("asc");
		Map<String, Object> map = accountService.getAccountMapByPm(pm);
		JSONObject jsonObject = JsonUtil.mapToJsonObject(map);
		return jsonObject;
	}

	@ResponseBody
	@RequestMapping("accountSave")
	public String accountSave(int type, Account account) {
		Role role = roleService.getRoleById(account.getRoleId());
		account.setRoleName(role.getRoleName());
		Integer result = accountService.saveAccount(type, account);
		return result.toString();
	}

	@ResponseBody
	@RequestMapping("accountHidden")
	public String accountHidden(Account account) {
		Integer result = accountService.hiddenAccount(account);
		return result.toString();
	}

	// 判定用户名是否已使用
	@ResponseBody
	@RequestMapping("accountByName")
	public Map<String, Object> accountByName(String email) {
		Account account = accountService.getAccountByAccountName(email);
		Map<String, Object> maps = new HashMap<String, Object>();
		if (account == null) {
			maps.put("valid", true);
		} else {
			maps.put("valid", false);
		}
		return maps;
	}

	@RequestMapping("accountPwd")
	public ModelAndView accountPwd() {
		ModelAndView mv = new ModelAndView("account/AdminPwd");
		return mv;
	}

	@ResponseBody
	@RequestMapping("accountPwdChange")
	public Map<String, Object> accountPwdChange(Account account) {
		Map<String, Object> map = new HashMap<String, Object>();
		int result = 0;
		String msg = "";
		if (!account.getPassword().equals(account.getConfirmPwd())) {
			msg = "两次新密码不相同";
		} else {
			Account accountTmp = accountService.getAccountById(account.getId());
			if (accountTmp == null
					|| !accountTmp.getPassword().equals(MD5Util.MD5(MD5Util.MD5(accountTmp.getEmail())+account.getOldPwd()))) {
				msg = "原密码输入错误";
			} else {
				account.setPassword(MD5Util.MD5(MD5Util.MD5(accountTmp.getEmail())+account.getPassword()));
				if (accountService.savePwdChange(account) > 0) {
					msg = "修改密码成功";
					result = 1;
				} else {
					msg = "修改密码失败";
				}
			}
		}
		map.put("result", result);
		map.put("msg", msg);
		return map;
	}
	@ResponseBody
	@RequestMapping("accountResetPwd")
	public Integer acountResetPwd(Account account){
		account.setPassword(MD5Util.MD5(MD5Util.MD5(account.getEmail())+account.getPassword()));
		Integer result=accountService.savePwdChange(account);
		return result;
	}
}

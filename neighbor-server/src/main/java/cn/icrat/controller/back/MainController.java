package cn.icrat.controller.back;

import cn.icrat.service.AccountService;
import cn.icrat.service.BackendService;
import cn.icrat.service.RoleService;
import cn.icrat.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import sun.nio.ch.IOUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class MainController {
    @Autowired
    private AccountService accountService;

    @Autowired(required = true)
    private BackendService backendService;

    @RequestMapping("head")
    public ModelAndView head() {
        return new ModelAndView("common/Head");
    }

    @RequestMapping("side")
    public ModelAndView side() {
        return new ModelAndView("common/Side");
    }
    @RequestMapping("footer")
    public ModelAndView footer() {
        return new ModelAndView("common/Footer");
    }
    @RequestMapping(value = "/login")
    public String login(Model model) {
        return "login";
    }

    @RequestMapping(value = "/loginValid", method = RequestMethod.POST)
    public String loginValid(String email, String password,HttpSession session) {
        return backendService.login(email, password,session);
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate();// 清除session
        return "redirect:/login";
    }

}

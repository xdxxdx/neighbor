package cn.icrat.controller;

import cn.icrat.common.MD5Util;
import cn.icrat.dao.GameDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.UserDao;
import cn.icrat.dao.entity.Game;
import cn.icrat.dao.entity.Test;
import cn.icrat.dao.entity.User;
import cn.icrat.sensitivewd.WordFilter;
import cn.icrat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.Random;


@Controller
@RequestMapping("/tc")
public class TestController {
    @Resource
    private UserDao userDao;
    @Resource
    private TestDao testDao;

    @Resource
    private GameDao gameDao;

    @Autowired(required=true)
    private UserService userService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public String test() {
        return "test1";
    }



    @RequestMapping(value = "/updateUserByID", method = RequestMethod.GET)
    @ResponseBody
    public String updateUserByID() {
        User u = userDao.findUserByID(1);
        userDao.update(u);
        return "OK";
    }

    @RequestMapping(value = "/saveuser", method = RequestMethod.GET)
    @ResponseBody
    public String saveuser() {
        User u = new User();
        u.setNickName("123");
        userDao.save(u);
        return "OK";
    }

    @RequestMapping(value = "/savetest", method = RequestMethod.GET)
    @ResponseBody
    public String savetest() {
        Test t = new Test();
        t.setNickName("123");
        testDao.save(t);
        return "OK";
    }

    @RequestMapping(value = "/game", method = RequestMethod.GET)
    @ResponseBody
    public Object game(String mobile, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        if (mobile.length() != 11)
            return null;
        Game game = gameDao.findByProperty("mobile", mobile);
        if (game != null)
            return game;
        game = new Game();
        game.setMobile(mobile);
        Random rand =new Random(System.currentTimeMillis());
        int i = rand.nextInt(100) + 1;//1-100
        if (i > 95) {
            game.setGkey(MD5Util.MD5(mobile + i));
            game.setGstate(1);
        }
        else
        {
            game.setGkey("");
            game.setGstate(0);
        }
        gameDao.save(game);
        return game;
    }

}

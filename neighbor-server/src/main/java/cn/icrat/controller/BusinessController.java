package cn.icrat.controller;

import cn.icrat.common.InitHelper;
import cn.icrat.common.Util;
import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.base.RestResponse;
import cn.icrat.dao.entity.User;
import cn.icrat.sensitivewd.WordFilter;
import cn.icrat.sensitivewd.WordNode;
import cn.icrat.service.BusinessService;
import cn.icrat.service.ItemService;
import cn.icrat.service.UserService;
import cn.icrat.util.wx.CommonUtil;
import cn.icrat.util.wx.DateUtil;
import cn.icrat.util.wx.pay.PayMgr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/business")
public class BusinessController {

    private static PayMgr payMgr = new PayMgr();
    private static InitHelper initHelper = new InitHelper();

    @Autowired(required=true)
    private BusinessService businessService;

    @Autowired(required=true)
    private UserService userService;


    @RequestMapping(value = "/listItemsByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listItemsByOpenId(String openId, Integer pageIndex, boolean onlyUp) {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return new DataResponse(1, "用户不存在");
        PaginationResult pr = businessService.listItemsByUserId(user.getId(), pageIndex, onlyUp);
        return new DataResponse(pr);
    }

    @RequestMapping(value = "/checkEditItem", method = RequestMethod.GET)
    @ResponseBody
    public boolean checkEditItem(Long id) {

        //PaginationResult pr = businessService.listItemsByUserId(user.getId(), pageIndex, onlyUp);
        return false;
    }

    @RequestMapping(value = "/listBuyOrdersByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listBuyOrdersByOpenId(String openId, Integer pageIndex) {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return new DataResponse(1, "用户不存在");
        PaginationResult pr = businessService.listOrdersByUser(user, pageIndex);
        return new DataResponse(pr);
    }

    @RequestMapping(value = "/listSellOrdersByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listSellOrdersByOpenId(String openId, Integer pageIndex) {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return new DataResponse(1, "用户不存在");
        PaginationResult pr = businessService.listOrdersByItemUserId(user.getId(), pageIndex);
        return new DataResponse(pr);
    }

    @RequestMapping(value = "/listAmountDetailByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listAmountDetailByOpenId(String openId, Integer pageIndex) {

        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return new DataResponse(1, "用户不存在");
        return new DataResponse(businessService.listAmountDetailByUserId(user.getId(), pageIndex));
    }

    @RequestMapping(value = "/listItem", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listItem(Long userId, Integer firstType, Integer secondType, Integer pageIndex, String search, Long communityId) {
        return new DataResponse(businessService.listItem(userId, firstType, secondType, pageIndex, search, communityId));
    }

    @RequestMapping(value = "/addShare", method = RequestMethod.POST)
    @ResponseBody
    public DataResponse addShare(String title, String info, String picUrl, Long userId, Long communityId, Integer type) {
        return new DataResponse(businessService.addShare(title, info, picUrl, userId, communityId, type));
    }

    @RequestMapping(value = "/listShareInfo", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listShareInfo(Integer pageIndex, Long communityId, Integer type) {
        PaginationResult pr = businessService.listShareInfo(pageIndex, communityId, type);
        return new DataResponse(pr);
    }

    @RequestMapping(value = "/detailShareInfo", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse detailShareInfo(Long id) {
        return new DataResponse(businessService.detailShareInfo(id));
    }


    @RequestMapping(value = "/detailInfo", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse detailInfo(long id) {
        return new DataResponse(businessService.detailInfo(id));
    }

    @RequestMapping(value = "/recharge", method = RequestMethod.POST)
    @ResponseBody
    public DataResponse recharge(String openId, Integer amount)
    {
        return new DataResponse(businessService.recharge(openId, amount));
    }

    @RequestMapping(value = "/withDraw", method = RequestMethod.POST)
    @ResponseBody
    public DataResponse withDraw(String openId, Integer heartPoint, String bankcard, String bankname, String subbranch, String realName)
    {
        return new DataResponse(businessService.withDraw(openId, heartPoint, bankcard, bankname,  subbranch, realName));
    }

    @RequestMapping(value = "/addSuggest", method = RequestMethod.POST)
    @ResponseBody
    public boolean addSuggest(String openId, String title, String info,Long communityId,Integer type)
    {
        return businessService.addSuggest(openId, title, info,communityId,type);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    @RequestMapping(value = "/payment", method = RequestMethod.POST)
    @ResponseBody
    public String payment(String name, String id, String openId, int fee) {
        return payMgr.DoPay(name, id, openId, fee);
    }

    @RequestMapping(value = "/paymentFinish", method = RequestMethod.POST)
    @ResponseBody
    public RestResponse paymentFinish(String name, Long id, String openId, int fee, int num, boolean isHeartPoint){
        return businessService.paymentFinish(name, id, openId, fee, num, isHeartPoint);
    }

    @RequestMapping(value = "/sendHeartpoint", method = RequestMethod.POST)
    @ResponseBody
    public DataResponse sendHeartpoint(Long userId, Long targetId, Integer num){
        return new DataResponse(businessService.sendHeartpoint(userId, targetId, num));
    }


    @RequestMapping(value = "/uploadRes", method = RequestMethod.POST)
    @ResponseBody
    public String uploadRes(HttpServletRequest request, HttpServletResponse response){
        return businessService.uploadRes(request, response);
    }



    @RequestMapping(value = "/getProvinces", method = RequestMethod.GET)
    @ResponseBody
    public List getProvinces()
    {
        return businessService.getProvinces();
    }

    @RequestMapping(value = "/getCitiesByProvinceId", method = RequestMethod.GET)
    @ResponseBody
    public List getCitiesByProvinceId(String id)
    {
        return businessService.getCitiesByProvinceId(id);
    }

    @RequestMapping(value = "/getAreasByCityId", method = RequestMethod.GET)
    @ResponseBody
    public List getAreasByCityId(String id)
    {
        return businessService.getAreasByCityId(id);
    }

    @RequestMapping(value = "/getCommunityByAreaId", method = RequestMethod.GET)
    @ResponseBody
    public List getCommunityByAreaId(Long id)
    {
        return businessService.getCommunityByAreaId(id);
    }

    @RequestMapping(value = "/getPlaceEditDataByCommunityId", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse getPlaceEditDataByCommunityId(Long id)
    {
        return new DataResponse(businessService.getPlaceEditDataByCommunityId(id));
    }

    @RequestMapping(value = "/addAttention", method = RequestMethod.POST)
    @ResponseBody
    public Long addAttention(String openId, Integer type, Long targetId)
    {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return 0L;
        return businessService.addAttention(user.getId(), type, targetId);
    }

    @RequestMapping(value = "/delAttention", method = RequestMethod.GET)
    @ResponseBody
    public boolean delAttention(Long id)
    {
        return businessService.delAttention(id);
    }

    @RequestMapping(value = "/checkAttention", method = RequestMethod.GET)
    @ResponseBody
    public Long checkAttention(String openId, Integer type, Long targetId)
    {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return 0L;
        return businessService.checkAttention(user.getId(), type, targetId);
    }

    //关注列表
    @RequestMapping(value = "/listAttention", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listAttention(String openId, Integer type, Integer pageIndex)
    {
        User user = userService.findUserByOpenID(openId);
        if (user == null)
            return new DataResponse(1, "用户不存在");
        return new DataResponse((type == 0) ? businessService.listAttentionItem(user.getId(), pageIndex) : businessService.listAttentionUser(user.getId(), pageIndex));
    }


    //商品详情中显示点赞用户列表
    @RequestMapping(value = "/listLikeUser", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listLikeUser(Integer type, Long targetId)
    {
        return new DataResponse(businessService.listLikeUser(type, targetId));
    }

    //通知列表
    @RequestMapping(value = "/listNotices", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listNotices()
    {
        return new DataResponse(businessService.listNotices());
    }

    //首页轮播列表
    @RequestMapping(value = "/listSwiper", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listSwiper()
    {
        return new DataResponse(businessService.listSwiper());
    }


    /*
    * 评论
    * */
    @RequestMapping(value = "/listComment", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listComment(Integer type, Long targetId)
    {
        return new DataResponse(businessService.listComment(type, targetId));
    }

    @RequestMapping(value = "/addComment", method = RequestMethod.POST)
    @ResponseBody
    public boolean addComment(Long userId, Long targetId, Integer type, String info)
    {
        return businessService.addComment(userId, targetId, type, info);
    }

    /*
     * 顺风出行
     */
    @RequestMapping(value = "/addCarsharing", method = RequestMethod.POST)
    @ResponseBody
    public boolean addCarsharing(Long userId, Long departTime, String carnum, String startpoint, String destination, Integer seat, Integer type)
    {
        return businessService.addCarsharing(userId, departTime, carnum, startpoint, destination, seat, type);
    }

    @RequestMapping(value = "/listCarsharing", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listCarsharing(Integer pageIndex, String search, Integer type)
    {
        return new DataResponse(businessService.listCarsharing(pageIndex, search, type));
    }

    @RequestMapping(value = "/orderSeat", method = RequestMethod.POST)
    @ResponseBody
    public DataResponse orderSeat(Long userId, Integer num, Long carsharingId)
    {
        return new DataResponse(businessService.orderSeat(userId, num, carsharingId));
    }

    @RequestMapping(value = "/listOrderSeat", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listOrderSeat(Long userId, Integer pageIndex)
    {
        return new DataResponse(businessService.listOrderSeat(userId, pageIndex));
    }


    /*
    * 排行
     */
    @RequestMapping(value = "/communityRank", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse communityRank()
    {
        return new DataResponse(businessService.communityRank());
    }

    @RequestMapping(value = "/personalRank", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse personalRank(Long communityId, Long userId, String search)
    {
        return new DataResponse(businessService.personalRank(communityId, userId, search));
    }

    /*
     * 消息
     */
    @RequestMapping(value = "/addMessage", method = RequestMethod.POST)
    @ResponseBody
    public boolean addMessage(Long userId, String title, String info, Integer type)
    {
        return businessService.addMessage(userId, title, info, type);
    }

    @RequestMapping(value = "/listMessage", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse listMessage(Long userId, Integer type, Integer pageIndex)
    {
        return new DataResponse(businessService.listMessage(userId, type, pageIndex));
    }

    /*
     * 每日签到
     */
    @RequestMapping(value = "/daySign", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse daySign(Long userId)
    {
        return new DataResponse(businessService.daySign(userId));
    }
    /**
     * 重置时间
     * @return
     */
    @RequestMapping(value = "/resetTime", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse resetTime(){
    	String time=DateUtil.getDateFormatFromDate(new Date(),"yyMMddHHmmss");
    	return new DataResponse(time);
    	
    }
    /**
     * 失效时间
     * @return
     */
    @RequestMapping(value = "/expireTime", method = RequestMethod.GET)
    @ResponseBody
    public DataResponse expireTime(){
    	Calendar cld=Calendar.getInstance();
    	cld=DateUtil.getCalendarAfterMinutes(cld, 2);
    	String time=DateUtil.getDateFormatFromDate(cld.getTime(),"yyMMddHHmmss");
    	return new DataResponse(time);
    }
}

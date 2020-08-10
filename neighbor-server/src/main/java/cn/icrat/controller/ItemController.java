package cn.icrat.controller;


import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Item;
import cn.icrat.service.ItemService;
import cn.icrat.util.wx.pay.PayMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired(required=true)
    private ItemService itemService;



    @RequestMapping(value = "/saveOrUpdateItem", method = RequestMethod.POST)
    @ResponseBody
    public boolean saveOrUpdateItem(Long id, String name, Integer firstType, Integer secondType, Integer payType, Integer deliverIndex,
                           Integer num, String price, String info, String picUrl, Long userId, Integer stayTime, Long communityId) {
        return itemService.saveOrUpdateItem(id, name, firstType, secondType, payType, deliverIndex, num, price, info, picUrl, userId, stayTime, communityId);
    }


    @RequestMapping(value = "/downItem", method = RequestMethod.POST)
    @ResponseBody
    public boolean downItem(Long id) {
        return itemService.downItem(id);
    }



}

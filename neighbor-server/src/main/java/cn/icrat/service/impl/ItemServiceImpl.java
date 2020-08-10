package cn.icrat.service.impl;

import cn.icrat.common.Util;
import cn.icrat.dao.ItemDao;
import cn.icrat.dao.ItempicDao;
import cn.icrat.dao.entity.Item;
import cn.icrat.dao.entity.Itempic;
import cn.icrat.sensitivewd.WordFilter;
import cn.icrat.service.ItemService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;


@Service
public class ItemServiceImpl implements ItemService {

    @Resource
    private ItemDao itemDao;
    @Resource
    private ItempicDao itempicDao;


    @Override
    public boolean saveOrUpdateItem(Long id, String name, Integer firstType, Integer secondType, Integer payType, Integer deliverIndex,
             Integer num, String price, String info, String picUrl, Long userId, Integer stayTime, Long communityId)
    {
        Item item = new Item();
        item.setId(id);
        item.setName(WordFilter.doFilter(name));
        item.setFirstType(firstType);
        item.setSecondType(secondType);
        item.setPayType(payType);
        item.setDeliverType(deliverIndex);
        item.setNum(num);
        item.setPrice(new BigDecimal(price));
        item.setInfo(WordFilter.doFilter(info));
        item.setUserId(userId);
        item.setCreateDate(System.currentTimeMillis());
        item.setEndTime(item.getCreateDate() + stayTime * 3600000);
        item.setCommunityId(communityId);
        String[] pics = picUrl.split(",");
        item.setMainImage(pics[0]);
        itemDao.saveOrUpdate(item);
        if (id != 0)
        {
            List<Itempic> oldPics = itempicDao.findPicsByItemId(id);
            for (int i = 0; i < oldPics.size(); i++)
                itempicDao.delete(oldPics.get(i));
        }

        for (int i = 0; i < pics.length; i++) {
            Itempic itempic = new Itempic();
            itempic.setItemId(item.getId());
            itempic.setUrl(pics[i]);
            itempicDao.save(itempic);
        }
        return true;
    }


    @Override
    public boolean downItem(Long id)
    {
        Item item = itemDao.findItemById(id);
        item.setNum(0);
        item.setEndTime(0L);
        itemDao.update(item);
        return true;
    }

    @Override
    public List listItem()
    {
        return itemDao.loadAll();
    }






}

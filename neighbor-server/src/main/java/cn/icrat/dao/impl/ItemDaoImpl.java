package cn.icrat.dao.impl;

import cn.icrat.dao.ItemDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Item;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;


@Repository
public class ItemDaoImpl extends BaseDAOImpl<Item> implements ItemDao {

    @Override
    public PaginationResult listItem(Integer firstType, Integer secondType, Integer pageIndex, String search, Long communityId)
    {
        DetachedCriteria criteria = this.criteriaReady();
        if (search.length() > 0)
            criteria.add(Restrictions.like("name", search, MatchMode.ANYWHERE));
        criteria.add(Restrictions.eq("firstType", firstType));
        if (secondType != -1)
            criteria.add(Restrictions.eq("secondType", secondType));
        //long currentTime = System.currentTimeMillis();
        //criteria.add(Restrictions.gt("endTime", currentTime));
        //criteria.add(Restrictions.gt("num", 0));
        if (communityId != null && communityId != 0)
            criteria.add(Restrictions.eq("communityId", communityId));
        criteria.addOrder(Order.desc("lastUpdateDate"));
        return this.find(criteria, 50, pageIndex);
    }
    @Override
    public PaginationResult listItemByUserId(long userId, Integer pageIndex, boolean onlyUp)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("userId", userId));

        if (onlyUp) {
            criteria.add(Restrictions.gt("num", 0));
            long currentTime = System.currentTimeMillis();
            criteria.add(Restrictions.gt("endTime", currentTime));
        }
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public Item findItemById(long id) {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("id", id));
        return this.findOne(criteria);
    }
}

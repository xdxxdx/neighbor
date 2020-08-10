package cn.icrat.dao.impl;

import cn.icrat.dao.OrdersDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Orders;
import cn.icrat.dao.entity.User;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrdersDaoImpl extends BaseDAOImpl<Orders> implements OrdersDao {

    @Override
    public PaginationResult listOrdersByUser(User user, Integer pageIndex)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(Orders.class);
        criteria.add(Restrictions.eq("user", user));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public PaginationResult listOrdersByItemUserId(Long userId, Integer pageIndex)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(Orders.class);
        criteria.createAlias("item", "item");
        criteria.add(Restrictions.eq("item.userId", userId));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }
}

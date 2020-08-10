package cn.icrat.dao.impl;

import cn.icrat.dao.CarsharingDao;
import cn.icrat.dao.CarsharingOrdersDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.CriteriaReady;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Carsharing;
import cn.icrat.dao.entity.CarsharingOrders;
import cn.icrat.dao.entity.User;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarsharingOrdersDaoImpl extends BaseDAOImpl<CarsharingOrders> implements CarsharingOrdersDao {

    @Override
    public PaginationResult listOrderSeat(User user, Integer pageIndex) {

        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("user", user));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public PaginationResult listPublishSeat(User user, Integer pageIndex) {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.createAlias("carsharing", "carsharing");
        criteria.add(Restrictions.eq("carsharing.user", user));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public List<CarsharingOrders> getCarsharingOrderListByCarsharingId(Long carsharingId) {
        String sql="select * from CarsharingOrders where carsharingId="+carsharingId;
        return findTListBySql( sql );
    }
}

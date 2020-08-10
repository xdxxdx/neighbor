package cn.icrat.dao.impl;

import cn.icrat.common.Constant;
import cn.icrat.dao.MessageDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Message;
import cn.icrat.dao.entity.Test;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository
public class MessageDaoImpl extends BaseDAOImpl<Message> implements MessageDao {
    @Override
    public PaginationResult listMessage(Long userId, Integer type, Integer pageIndex)
    {
        DetachedCriteria criteria = this.criteriaReady();
        if (type != 0)
            criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("type", type));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, Constant.PageSize, pageIndex);
    }
}

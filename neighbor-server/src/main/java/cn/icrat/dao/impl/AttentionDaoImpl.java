package cn.icrat.dao.impl;

import cn.icrat.dao.AttentionDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Attention;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AttentionDaoImpl extends BaseDAOImpl<Attention> implements AttentionDao {

    @Override
    public PaginationResult listAttention(Long userId, Integer type, Integer pageIndex)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("type", type));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }
    @Override
    public  Attention checkAttention(Long userId, Integer type, Long targetId)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("type", type));
        criteria.add(Restrictions.eq("targetId", targetId));
        return this.findOne(criteria);
    }
    @Override
    public Integer countAttention(Integer type, Long targetId)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("type", type));
        criteria.add(Restrictions.eq("targetId", targetId));
        return this.count(criteria);
    }
    @Override
    public PaginationResult findLikeUser(Integer type, Long targetId)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("type", type));
        criteria.add(Restrictions.eq("targetId", targetId));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, 1);
    }
}

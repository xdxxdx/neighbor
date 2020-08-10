package cn.icrat.dao.impl;

import cn.icrat.dao.CommentDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Comment;
import cn.icrat.dao.entity.Test;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Target;
import java.util.List;

@Repository
public class CommentDaoImpl extends BaseDAOImpl<Comment> implements CommentDao {

    @Override
    public List findComments(Integer type, Long targetId)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("type", type));
        criteria.add(Restrictions.eq("targetId", targetId));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria);
    }
    @Override
    public List listComments()
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria);
    }
}

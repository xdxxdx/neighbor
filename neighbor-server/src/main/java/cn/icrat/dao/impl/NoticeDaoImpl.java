package cn.icrat.dao.impl;

import cn.icrat.dao.NoticeDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Notice;
import cn.icrat.dao.entity.Test;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NoticeDaoImpl extends BaseDAOImpl<Notice> implements NoticeDao {

    @Override
    public PaginationResult listNotices()
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("status",1));
        criteria.add(Restrictions.in("type", new Integer[]{0, 1}));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 2, 1);
    }

    @Override
    public PaginationResult listSwiper()
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("type", 2));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 5, 1);
    }

	@Override
	public Integer updateNoticeStatus(Notice notice) {
		String sql="update notice set status="+notice.getStatus()+" where id="+notice.getId();
		return updateBySql(sql);
	}

}

package cn.icrat.dao.impl;

import cn.icrat.dao.CommunityDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Areas;
import cn.icrat.dao.entity.Community;
import cn.icrat.dao.entity.Test;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommunityDaoImpl extends BaseDAOImpl<Community> implements CommunityDao {
    @Override
    public List findByArea(Areas area)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("area", area));
        return this.find(criteria);
    }
}

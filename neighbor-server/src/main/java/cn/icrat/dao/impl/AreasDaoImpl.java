package cn.icrat.dao.impl;

import cn.icrat.dao.AreasDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Areas;
import cn.icrat.dao.entity.Test;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AreasDaoImpl extends BaseDAOImpl<Areas> implements AreasDao {
    @Override
    public List findByCityId(String id)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("cityid", id));
        return this.find(criteria);
    }
}

package cn.icrat.dao.impl;

import cn.icrat.dao.CitiesDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Cities;
import cn.icrat.dao.entity.Test;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CitiesDaoImpl extends BaseDAOImpl<Cities> implements CitiesDao {
    @Override
    public List findByProvinceId(String id)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("provinceid", id));
        return this.find(criteria);
    }
}

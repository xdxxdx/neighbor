package cn.icrat.dao.impl;

import cn.icrat.dao.ItempicDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Itempic;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItempicDaoImpl extends BaseDAOImpl<Itempic> implements ItempicDao {

    @Override
    public List findPicsByItemId(long id)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("itemId", id));
        return this.find(criteria);
    }
}

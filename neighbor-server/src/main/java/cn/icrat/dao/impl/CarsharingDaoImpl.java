package cn.icrat.dao.impl;

import cn.icrat.dao.CarsharingDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Carsharing;
import cn.icrat.dao.entity.Test;
import cn.icrat.dao.entity.User;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarsharingDaoImpl extends BaseDAOImpl<Carsharing> implements CarsharingDao {

    @Override
    public PaginationResult listCarsharing(Integer pageIndex, String search, Integer type)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.gt("seat", 0));
        criteria.add(Restrictions.gt("departTime", System.currentTimeMillis()-1*60*60*1000));//当前时间12小时内的都可以看到
        criteria.add(Restrictions.eq("carsharingType", type));
        if (search.length() > 0)
            criteria.add(Restrictions.like("destination", search, MatchMode.ANYWHERE));
        criteria.addOrder(Order.asc("departTime"));
        return this.find(criteria, 50, pageIndex);
    }

    @Override
    public List listAllCarsharing()
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria);
    }
    @Override
    public List<Carsharing> listCarsharingByUser(Long userId)
    {
        String sql="select * from carsharing where seat>0 and departTime>"+(System.currentTimeMillis()-1*60*60*1000)+" and userId="+userId+" order by departTime desc";
        return findTListBySql(sql);
    }
    @Override
    public Integer deleteCarsharing(Long id){
        String sql="delete from carsharing where id="+id;
        return updateBySql( sql );
    }
}

package cn.icrat.dao.impl;

import cn.icrat.dao.AmountDetailDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.AmountDetail;
import cn.icrat.util.wx.MapUtil;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AmountDetailDaoImpl  extends BaseDAOImpl<AmountDetail> implements AmountDetailDao {

    @Override
    public PaginationResult listAmountDetailByUserId(Long userId, Integer pageIndex)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("userId", userId));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public List<AmountDetail> getListByParam(ParamModel pm) {
        String sql="select * from amountdetail where id is not null ";
        if(pm.getType()!=null&&!pm.getType().equals( "" )){
            sql+=" and type="+pm.getType();
        }
        sql+=" order by "+pm.getSortname()+" "+pm.getSortorder();
        return findTListBySql( sql, pm );
    }

    @Override
    public List<Map<String, Object>> getMListByPm(ParamModel pm) {
        String sql="select t1.id,t1.type,t1.userId,t1.amount,t1.heartPoint,t1.finishTime,t2.realName from amountdetail t1 inner join user t2 on t1.userId=t2.id ";
        if(pm.getType()!=null&&!pm.getType().equals( "" )){
            sql+=" and t1.type="+pm.getType();
        }
        if (pm.getRealName() != null && !pm.getRealName().equals( "" )) {
            sql+=" and t2.realName like '%"+pm.getRealName()+"%'";
        }
        sql+=" order by t1."+pm.getSortname()+" "+pm.getSortorder();
        List<Map<String,Object>>list= findMapListBySql( sql, pm );
        MapUtil.filterMapListNull( list );
        return list;
    }


    @Override
    public Integer getSizeByParam(ParamModel pm) {
        String sql="select count(t1.id) from amountdetail t1 inner join user t2 on t1.userId=t2.id ";
        if(pm.getType()!=null&&!pm.getType().equals( "" )){
            sql+=" and t1.type="+pm.getType();
        }
        if (pm.getRealName() != null && !pm.getRealName().equals( "" )) {
            sql+=" and t2.realName like '%"+pm.getRealName()+"%'";
        }
        return Integer.parseInt(getSigleColumnBySql( sql ).toString());
    }
}

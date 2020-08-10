package cn.icrat.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import cn.icrat.dao.GuardDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.CriteriaReady;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Guard;
@Repository
public class GuardDaoImpl extends BaseDAOImpl<Guard> implements GuardDao {

	@Override
	public List<Guard> getAllActiveGuardList() {
		DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("isDel", 0));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria);
	}

	/**
	 * 按分组来获取门禁内容
	 * @return
	 */
	public List<Guard>getGuardListGroupByCommunity(){
		String sql="select * from guard   where isDel=0 order by communityId, guardNo";
		return findTListBySql(sql);
	}

	@Override
	public Guard getGuardBycommunityIdAndName(Long communityId, String guardName) {
		DetachedCriteria criteria = this.criteriaReady();
		criteria.add(Restrictions.eq("isDel", 0));
        criteria.add(Restrictions.eq("communityId", communityId));
        criteria.add(Restrictions.eq("guardName", guardName));
        return this.findOne(criteria);
	}

	@Override
	public Integer hiddenGuard(Guard guard) {
		String sql="update guard set isDel=1 where id="+guard.getId();
		return updateBySql(sql);
	}

	@Override
	public Integer updateGuard(Guard guard) {
		String sql="update guard set lastUpdateDate="+System.currentTimeMillis();
		if(guard.getCommunityId()!=null){
			sql+=", communityId="+guard.getCommunityId();
		}
		if(guard.getGuardType()!=null){
			sql+=",guardType="+guard.getGuardType();
		}
		if(guard.getGuardName()!=null){
			sql+=",guardName='"+guard.getGuardName()+"'";
		}
		if(guard.getGuardNo()!=null){
			sql+=",guardNo='"+guard.getGuardNo()+"'";
		}
		sql+=" where id="+guard.getId();
		return updateBySql(sql);
	}
}

package cn.icrat.dao.impl;

import java.util.List;
import java.util.Map;

import cn.icrat.dao.SuggestDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Suggest;
import cn.icrat.dao.entity.Test;

import cn.icrat.util.wx.MapUtil;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository
public class SuggestDaoImpl extends BaseDAOImpl<Suggest> implements SuggestDao {

	@Override
	public List listSuggestByCommunityId(Long communityId) {
		 DetachedCriteria criteria = this.criteriaReady();
	        criteria.add(Restrictions.eq("communityId", communityId));
	        criteria.addOrder(Order.desc("id"));
	        return this.find(criteria);
	}

	@Override
	public List<Map<String, Object>> getMListByParam(ParamModel pm) {
		String sql="select t1.id as id,t1.createDate,t1.type,t1.communityId,t1.title, t1.info,t1.userId,t1.status,t1.note,t2.realName,t2.mobile,t2.nickName " +
				"from suggest t1 inner join user t2 on t1.userId=t2.id  where t1.id is not null ";
		if(pm.getType()!=null&&!pm.getType().equals( "" )){
			sql+="and t1.type="+pm.getType();
		}
		if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals( "" )){
			sql+=" and t1.communityId="+pm.getCommunityId();
		}
		if(pm.getStatus()!=null&&!pm.getStatus().equals( "" )){
			sql+=" and t1.status="+pm.getStatus();
		}
		List<Map<String,Object>> list=findMapListBySql( sql, pm );
		MapUtil.filterMapListNull( list );
		return list;
	}

	@Override
	public Integer getSizeByParam(ParamModel pm) {
		String sql="select count(*) from suggest where id is not null ";
		if(pm.getType()!=null&&!pm.getType().equals( "" )){
			sql+="and type="+pm.getType();
		}
		if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals( "" )){
			sql+=" and communityId="+pm.getCommunityId();
		}
		if(pm.getStatus()!=null&&!pm.getStatus().equals( "" )){
			sql+=" and status="+pm.getStatus();
		}
		return Integer.parseInt(getSigleColumnBySql( sql ).toString()  );
	}

	@Override
	public Integer updateStatus(Suggest suggest) {
		String sql="update suggest set status="+suggest.getStatus()+",note='"+suggest.getNote()+"' where id="+suggest.getId();
		return updateBySql( sql );
	}


}

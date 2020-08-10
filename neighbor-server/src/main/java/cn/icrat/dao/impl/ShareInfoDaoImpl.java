package cn.icrat.dao.impl;

import cn.icrat.dao.ShareInfoDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.ShareInfo;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;


@Repository
public class ShareInfoDaoImpl extends BaseDAOImpl<ShareInfo> implements ShareInfoDao {

    @Override
    public PaginationResult listShareInfo(Integer pageIndex, Long communityId, Integer type)
    {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("status", 1));
        if (communityId != null && communityId != 0)
            criteria.add(Restrictions.eq("communityId", communityId));
//        criteria.add(Restrictions.eq("type", type));
        criteria.addOrder(Order.desc("isTop")).addOrder(Order.desc("createDate"));
        return this.find(criteria, 10, pageIndex);
    }

	@Override
	public Integer updateShareTop(ShareInfo shareInfo) {
		String sql="update shareinfo set isTop="+shareInfo.getIsTop()+" where id="+shareInfo.getId();
		return updateBySql(sql);
	}

    @Override
    public Integer updateShareStatus(ShareInfo shareInfo) {
        String sql="update shareinfo set status="+shareInfo.getStatus()+" where id="+shareInfo.getId();
        return updateBySql(sql);
    }


}

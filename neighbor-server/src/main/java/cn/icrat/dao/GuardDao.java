package cn.icrat.dao;

import java.util.List;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Guard;

public interface GuardDao extends BaseDAO<Guard> {
	List<Guard>getAllActiveGuardList();
	Guard getGuardBycommunityIdAndName(Long communityId,String guardName);
	Integer hiddenGuard(Guard guard);
	Integer updateGuard(Guard guard);
	List<Guard>getGuardListGroupByCommunity();
}

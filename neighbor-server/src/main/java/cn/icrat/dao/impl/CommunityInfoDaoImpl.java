package cn.icrat.dao.impl;

import cn.icrat.dao.AccountDao;
import cn.icrat.dao.CommunityInfoDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public class CommunityInfoDaoImpl extends BaseDAOImpl<CommunityInfo> implements CommunityInfoDao {


    @Override
    public Integer hiddenEntity(CommunityInfo communityInfo) {
        String sql="update communityinfo set is_del=1 where id="+communityInfo.getId();
        return updateBySql(sql);
    }

    @Override
    public Integer updateEntity(CommunityInfo communityInfo) {
        String sql="update communityinfo set lastUpdateDate="+System.currentTimeMillis()+" ";
        if (communityInfo.getCommunityName() != null) {
            sql += ", community_name='" + communityInfo.getCommunityName() + "'";
        }
        if(communityInfo.getAdminGuard()!=null){
            sql+=",admin_guard='"+communityInfo.getAdminGuard()+"' ";
        }
        if(communityInfo.getOwnerGuard()!=null){
            sql+=",owner_guard='"+communityInfo.getOwnerGuard()+"' ";
        }
        sql+=" where id="+communityInfo.getId();
        return updateBySql(sql);
    }

    @Override
    public List<CommunityInfo> getListByParam(ParamModel pm) {
        String hql = "select * from communityinfo where is_del=0 ";
        if (pm.getCommunityName() != null && !pm.getCommunityName().equals("")) {
            hql += " and community_name like '" + pm.getCommunityName() + "%'";
        }
        hql += " order by " + pm.getSortname() + " " + pm.getSortorder();
        return findTListBySql(hql, pm);
    }

    @Override
    public BigInteger getSizeByParam(ParamModel pm) {
        String sql="select count(*) from communityinfo where is_del=0 ";
        if (pm.getCommunityName() != null && !pm.getCommunityName().equals("")) {
            sql += " and community_name like '" + pm.getCommunityName() + "%'";
        }
        return (BigInteger) getSigleColumnBySql(sql);
    }
}

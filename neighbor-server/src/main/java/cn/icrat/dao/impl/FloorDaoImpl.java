package cn.icrat.dao.impl;

import cn.icrat.dao.AccountDao;
import cn.icrat.dao.FloorDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Guard;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.MapUtil;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class FloorDaoImpl extends BaseDAOImpl<Floor> implements FloorDao {
    @Override
    public Floor getFloorByCodeAndCommunityId(Floor floor) {
        String sql="select * from floor where is_del=0 and floor_code='"+floor.getFloorCode()+"' and community_id="+floor.getCommunityId();
        return findTBySql(sql);
    }

    @Override
    public Long addEntity(Floor floor) {
        return (Long) saveRePk(floor);
    }

    @Override
    public Integer hiddenEntity(Floor floor) {
        String sql="update floor set is_del=1 where id="+floor.getId();
        return updateBySql(sql);
    }

    @Override
    public Integer updateEntity(Floor floor) {
        String sql="update floor set lastUpdateDate ="+System.currentTimeMillis()+" ";
        if (floor.getCommunityId() != null) {
            sql+=",community_id="+floor.getCommunityId();
        }
        if (floor.getFloorCode() != null) {
            sql+=",floor_code='"+floor.getFloorCode()+"' ";
        }
        if (floor.getFloorName() != null) {
            sql += ",floor_name='" + floor.getFloorName() + "'";
        }
        if (floor.getGuardNo() != null) {
            sql += ",guard_no='" + floor.getGuardNo() + "'";
        }
        sql += " where id=" + floor.getId();
        return updateBySql(sql);
    }

    @Override
    public List<Floor> getListByParam(ParamModel pm) {
        String sql="select * from floor where is_del=0 ";
        if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals("")){
            sql += " and community_id=" + pm.getCommunityId();
        }
        sql+=" order by " + pm.getSortname() + " " + pm.getSortorder();
        return findTListBySql(sql,pm);
    }

    @Override
    public List<Map<String, Object>> getMListByParam(ParamModel pm) {
        String sql="select t1.id as id, t1.community_id as communityId,t1.floor_code as floorCode," +
                "t1.floor_name as floorName,t1.guard_no as guardNo,t2.community_name as communityName" +
                " from floor t1 inner join communityinfo t2 on t1.community_id= t2.community_id " +
                "where t1.is_del=0 ";
        if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals("")){
            sql += " and t1.community_id=" + pm.getCommunityId();
        }
        List<Map<String,Object>>list=findMapListBySql(sql, pm);
        MapUtil.filterMapListNull(list);
        return list;
    }

    @Override
    public Integer getSizeByParam(ParamModel pm) {
        String sql="select count(*) from floor where is_del=0 ";
        if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals("")){
            sql += " and community_id=" + pm.getCommunityId();
        }
        return Integer.parseInt(getSigleColumnBySql(sql).toString());
    }

    @Override
    public Floor getFloorByCommunityIdAndCode(Long communityId, String floorCode) {
        String sql = "select * from floor where is_del=0 and community_id=" + communityId + " and floor_code='" + floorCode + "'";
        return findTBySql(sql);
    }

    public List<Floor>getFloorListByCommunityId(Long communityId){
        String sql = "select * from floor where is_del=0 and community_id=" + communityId+" order by floor_code";
        return findTListBySql( sql );
    }
    /**
     * 按分组来获取门禁内容
     * @return
     */
    public List<Floor>getFloorListGroupByCommunity(){
        String sql="select * from floor   where is_del=0 order by community_id, floor_code";
        return findTListBySql(sql);
    }

}

package cn.icrat.dao.impl;

import cn.icrat.dao.FloorDao;
import cn.icrat.dao.ParamDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Param;
import cn.icrat.util.wx.MapUtil;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ParamDaoImpl extends BaseDAOImpl<Param> implements ParamDao {
    @Override
    public Long addEntity(Param param) {
        return (Long) saveRePk( param );
    }

    @Override
    public Integer hiddenEntity(Param param) {
        String sql="update param set is_del=1 where id="+param.getId();
        return updateBySql( sql );
    }

    @Override
    public Integer updateEntity(Param param) {
        String sql="update param set lastUpdateDate="+System.currentTimeMillis()+",lock_time="+param.getLockTime()+" where" +
                " id="+param.getId();
        return updateBySql( sql );
    }

    @Override
    public List<Param> getListByParam(ParamModel pm) {
        String sql="select * from param where is_del=0 ";
        return findTListBySql(sql);
    }

    @Override
    public Integer getSizeByParam(ParamModel pm) {
        String sql="select count(*) from param where is_del=0";
        return Integer.parseInt(getSigleColumnBySql( sql ).toString());
    }

    @Override
    public Integer updateCarBanner(Param param) {
        String sql="update param set car_banner='"+param.getCarBanner()+"' where id="+param.getId();
        return updateBySql( sql );
    }

    @Override
    public Integer updateHouseBanner(Param param) {
        String sql="update param set house_banner='"+param.getHouseBanner()+"' where id="+param.getId();
        return updateBySql( sql );
    }

    @Override
    public Param getParam() {
        String sql="select * from param ";
        return findTBySql( sql );
    }
}

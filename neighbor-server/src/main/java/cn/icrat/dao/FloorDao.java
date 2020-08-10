package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Floor;
import cn.icrat.util.wx.ParamModel;

import java.util.List;
import java.util.Map;

public interface FloorDao extends BaseDAO<Floor> {

    public Floor getFloorByCodeAndCommunityId(Floor floor);


    public Long addEntity(Floor floor);

    public Integer hiddenEntity(Floor floor);


    public Integer updateEntity(Floor floor);

    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<Floor> getListByParam(ParamModel pm);

    public List<Map<String,Object>>getMListByParam(ParamModel pm);


    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public Integer getSizeByParam(ParamModel pm);

    public Floor getFloorByCommunityIdAndCode(Long communityId, String floorCode);

    public List<Floor>getFloorListByCommunityId(Long communityId);
    public List<Floor>getFloorListGroupByCommunity();
}

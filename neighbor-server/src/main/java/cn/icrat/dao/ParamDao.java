package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Param;
import cn.icrat.util.wx.ParamModel;

import java.util.List;
import java.util.Map;

public interface ParamDao extends BaseDAO<Param> {


    public Long addEntity(Param param);

    public Integer hiddenEntity(Param param);


    public Integer updateEntity(Param param);

    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<Param> getListByParam(ParamModel pm);


    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public Integer getSizeByParam(ParamModel pm);


    public Integer updateCarBanner(Param param);

    public Integer updateHouseBanner(Param param);

    public Param getParam();

}

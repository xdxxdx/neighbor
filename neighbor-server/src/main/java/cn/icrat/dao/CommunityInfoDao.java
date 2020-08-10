package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.util.wx.ParamModel;

import java.math.BigInteger;
import java.util.List;

public interface CommunityInfoDao extends BaseDAO<CommunityInfo> {


    public Integer hiddenEntity(CommunityInfo communityInfo);


    public Integer updateEntity(CommunityInfo communityInfo);



    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<CommunityInfo> getListByParam(ParamModel pm);


    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public BigInteger getSizeByParam(ParamModel pm);


}

package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.AmountDetail;
import cn.icrat.dao.entity.Param;
import cn.icrat.util.wx.ParamModel;

import java.util.List;
import java.util.Map;

public interface AmountDetailDao extends BaseDAO<AmountDetail> {

    PaginationResult listAmountDetailByUserId(Long userId, Integer pageIndex);
    public List<AmountDetail> getListByParam(ParamModel pm);
    public List<Map<String,Object>>getMListByPm(ParamModel pm);
    public Integer getSizeByParam(ParamModel pm);
}

package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.ShareInfo;


public interface ShareInfoDao extends BaseDAO<ShareInfo> {
    PaginationResult listShareInfo(Integer pageIndex, Long communityId, Integer type);
    Integer updateShareTop(ShareInfo shareInfo);
    Integer updateShareStatus(ShareInfo shareInfo);
}

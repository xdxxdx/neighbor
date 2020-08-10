package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Areas;
import cn.icrat.dao.entity.Community;
import cn.icrat.dao.entity.Test;

import java.util.List;

public interface CommunityDao extends BaseDAO<Community> {

    List findByArea(Areas area);
}

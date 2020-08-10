package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Areas;
import cn.icrat.dao.entity.Cities;

import java.util.List;

public interface AreasDao extends BaseDAO<Areas> {

    List findByCityId(String id);
}

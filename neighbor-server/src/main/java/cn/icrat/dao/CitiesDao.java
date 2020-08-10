package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Cities;
import cn.icrat.dao.entity.Test;

import java.util.List;

public interface CitiesDao extends BaseDAO<Cities> {

    List findByProvinceId(String id);
}

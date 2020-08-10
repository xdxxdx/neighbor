package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.CriteriaReady;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Carsharing;
import cn.icrat.dao.entity.Test;
import cn.icrat.dao.entity.User;

import java.util.List;

public interface CarsharingDao extends BaseDAO<Carsharing> {

    PaginationResult listCarsharing(Integer pageIndex, String search, Integer type);

    List listAllCarsharing();

    List<Carsharing> listCarsharingByUser( Long userId);

    public Integer deleteCarsharing(Long id);
}

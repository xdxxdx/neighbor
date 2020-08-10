package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Carsharing;
import cn.icrat.dao.entity.CarsharingOrders;
import cn.icrat.dao.entity.User;

import java.util.List;

public interface CarsharingOrdersDao extends BaseDAO<CarsharingOrders> {

    PaginationResult listOrderSeat(User user, Integer pageIndex);

    PaginationResult listPublishSeat(User user, Integer pageIndex);

    List<CarsharingOrders>getCarsharingOrderListByCarsharingId(Long carsharingId);
}

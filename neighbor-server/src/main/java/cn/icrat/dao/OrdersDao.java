package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Orders;
import cn.icrat.dao.entity.User;

import java.util.List;

public interface OrdersDao extends BaseDAO<Orders> {
    PaginationResult listOrdersByUser(User user, Integer pageIndex);

    PaginationResult listOrdersByItemUserId(Long userId, Integer pageIndex);
}

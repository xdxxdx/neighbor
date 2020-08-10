package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Item;

import java.util.List;

public interface ItemDao extends BaseDAO<Item> {

    PaginationResult listItem(Integer firstType, Integer secondType, Integer pageIndex, String search, Long communityId);

    PaginationResult listItemByUserId(long userId, Integer pageIndex, boolean onlyUp);

    Item findItemById(long id);


}

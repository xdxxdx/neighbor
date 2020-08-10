package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Message;
import cn.icrat.dao.entity.Test;

public interface MessageDao extends BaseDAO<Message> {

    PaginationResult listMessage(Long userId, Integer type, Integer pageIndex);
}

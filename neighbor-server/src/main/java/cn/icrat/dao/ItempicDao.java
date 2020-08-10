package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Itempic;

import java.util.List;

public interface ItempicDao extends BaseDAO<Itempic> {
    List findPicsByItemId(long id);
}

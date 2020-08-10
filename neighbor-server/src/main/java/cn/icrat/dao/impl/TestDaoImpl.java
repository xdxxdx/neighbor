package cn.icrat.dao.impl;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.entity.Test;
import cn.icrat.dao.base.BaseDAOImpl;
import org.springframework.stereotype.Repository;

@Repository
public class TestDaoImpl extends BaseDAOImpl<Test> implements TestDao {
}

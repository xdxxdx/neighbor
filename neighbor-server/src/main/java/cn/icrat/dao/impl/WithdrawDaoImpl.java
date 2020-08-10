package cn.icrat.dao.impl;

import cn.icrat.dao.TestDao;
import cn.icrat.dao.WithdrawDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Test;
import cn.icrat.dao.entity.Withdraw;
import org.springframework.stereotype.Repository;

@Repository
public class WithdrawDaoImpl extends BaseDAOImpl<Withdraw> implements WithdrawDao {
}

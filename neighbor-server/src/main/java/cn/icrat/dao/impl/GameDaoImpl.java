package cn.icrat.dao.impl;

import cn.icrat.dao.GameDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Game;
import cn.icrat.dao.entity.Test;
import org.springframework.stereotype.Repository;

@Repository
public class GameDaoImpl extends BaseDAOImpl<Game> implements GameDao {
}

package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Syslog;
import cn.icrat.util.wx.ParamModel;

import java.math.BigInteger;
import java.util.List;

public interface SyslogDao extends BaseDAO<Syslog> {
    public List<Syslog> getSyslogListByPm(ParamModel paramModel);

    public BigInteger getSysLogSizeByPm(ParamModel paramModel);

}

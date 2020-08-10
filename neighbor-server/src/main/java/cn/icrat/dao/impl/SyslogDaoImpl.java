package cn.icrat.dao.impl;

import cn.icrat.dao.SyslogDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Syslog;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public class SyslogDaoImpl extends BaseDAOImpl<Syslog> implements SyslogDao {


    @Override
    public List<Syslog> getSyslogListByPm(ParamModel paramModel) {
        String sql="select * from syslog where id is not null ";
        if (paramModel.getStatus() != null && !paramModel.getStatus().equals("")) {
            sql+=" and status="+ paramModel.getStatus();
        }
        if(paramModel.getModule()!=null&&!paramModel.getModule().equals("")){
            sql += " and module like '" + paramModel.getModule() + "%'";
        }
        return findTListBySql(sql,paramModel);
    }

    @Override
    public BigInteger getSysLogSizeByPm(ParamModel paramModel) {
        String sql="select count(*) from syslog where id is not null ";
        if (paramModel.getStatus() != null && !paramModel.getStatus().equals("")) {
            sql+=" and status="+ paramModel.getStatus();
        }
        if(paramModel.getModule()!=null&&!paramModel.getModule().equals("")){
            sql += " and module like '" + paramModel.getModule() + "%'";
        }
        return (BigInteger) getSigleColumnBySql(sql);
    }
}

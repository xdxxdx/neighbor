package cn.icrat.service;

import cn.icrat.dao.SyslogDao;
import cn.icrat.dao.entity.Syslog;
import cn.icrat.util.wx.ParamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SyslogService {
    @Autowired
    private SyslogDao syslogDao;

    public Long saveSyslog(Syslog syslog) {
        return (Long) syslogDao.saveRePk(syslog);
    }
    public Map<String,Object> getDataMapByPm(ParamModel pm){
        Map<String,Object>map=new HashMap<String, Object>();
        map.put("data", syslogDao.getSyslogListByPm(pm));
        map.put("count", syslogDao.getSysLogSizeByPm(pm));
        map.put("code", 0);
        map.put("msg", "");
        return map;
    }
}


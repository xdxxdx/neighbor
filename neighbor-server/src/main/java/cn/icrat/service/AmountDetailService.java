package cn.icrat.service;

import cn.icrat.dao.AmountDetailDao;
import cn.icrat.util.wx.ParamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AmountDetailService {
    @Autowired
    private AmountDetailDao amountDetailDao;

    public Map<String,Object> getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", amountDetailDao.getMListByPm(pm));
        maps.put("count", amountDetailDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }
}

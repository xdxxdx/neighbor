package cn.icrat.service;

import cn.icrat.dao.SuggestDao;
import cn.icrat.dao.entity.Suggest;
import cn.icrat.util.wx.ParamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SuggestService {
    @Autowired
    private SuggestDao suggestDao;

    public Map<String,Object> getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", suggestDao.getMListByParam(pm));
        maps.put("count", suggestDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }

    public Integer updateStatus(Suggest suggest){
        return suggestDao.updateStatus( suggest );
    }

}

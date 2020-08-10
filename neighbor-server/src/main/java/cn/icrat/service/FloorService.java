package cn.icrat.service;

import cn.icrat.anno.Syslog;
import cn.icrat.constant.Const;
import cn.icrat.dao.FloorDao;
import cn.icrat.dao.RoleDao;
import cn.icrat.dao.entity.*;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FloorService {
    @Autowired
    private FloorDao floorDao;
    @Autowired
    private CommunityInfoService communityInfoService;
    public Floor getEntityById(Long id){
        return floorDao.get(id);
    }
    @Syslog(module = "小区管理",methods = "楼栋新增/修改")
    public boolean saveEntity(int type,Floor floor){
        if(type==1){
            floorDao.saveRePk(floor);
        }else{
            floorDao.updateEntity(floor);
        }
        return true;
    }
    public Integer hiddenEntity(Floor floor){
       return  floorDao.hiddenEntity(floor);
    }
    public List<Floor>getListByPm(ParamModel pm){
        return floorDao.getListByParam(pm);
    }
    public Map<String,Object>getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", floorDao.getMListByParam(pm));
        maps.put("count", floorDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }
    public Floor getFloorByCommunityIdAndCode(Long communityId,String floorCode){
        return floorDao.getFloorByCommunityIdAndCode(communityId,floorCode);
    }
    public List<Floor>getFloorListByCommunityId(Long communityId){
        return floorDao.getFloorListByCommunityId( communityId );
    }

    /**
     * 根据小区获取门禁，并且在门禁前面显示小区名称
     * @return
     */
    public List<Floor>listFloorGroupBycommunity(String guardNo){
        List<CommunityInfo>CommunityList=communityInfoService.getAllCommunityList();
        List<Floor>list=floorDao.getFloorListGroupByCommunity();
        String guardArr[]=null;
        if(guardNo!=null&&!guardNo.equals("")){
            guardArr=guardNo.split(",");
        }
        for (Floor floor : list) {
            for(CommunityInfo communityInfo:CommunityList){
                if(floor.getCommunityId().equals( communityInfo.getCommunityId() )){
                    floor.setFloorName( communityInfo.getCommunityName()+"-"+floor.getFloorCode() );
                }
            }
            if(guardArr!=null&&guardArr.length>0){
                for (String s : guardArr) {
                    if(s.equals(floor.getFloorCode())){
                        floor.setIsChoiced(1);
                    }
                }
            }
        }
        return list;
    }
}

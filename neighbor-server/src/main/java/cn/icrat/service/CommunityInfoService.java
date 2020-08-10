package cn.icrat.service;

import cn.icrat.anno.Syslog;
import cn.icrat.dao.CommunityInfoDao;
import cn.icrat.dao.RoleDao;
import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Role;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommunityInfoService {
    @Autowired
    private CommunityInfoDao communityInfoDao;
    public CommunityInfo getEntityById(Long id){
        return communityInfoDao.get(id);
    }

    public CommunityInfo getCommunityByCommunityId(Long communityId) {
        return communityInfoDao.findByProperty("communityId",communityId);
    }
    public List<CommunityInfo> getAllCommunityList(){
        DetachedCriteria criteria = DetachedCriteria.forClass(CommunityInfo.class);
        criteria.add(Restrictions.eq("isDel", 0));
        return communityInfoDao.loadAll();
    }
    @Syslog(module = "小区管理",methods = "小区新增/修改")
    public boolean saveCommunityInfo(int type,CommunityInfo communityInfo){
        if(type==1){
            communityInfoDao.saveRePk(communityInfo);
        }else{
            communityInfoDao.updateEntity(communityInfo);
        }
        return true;
    }
    @Syslog(module = "小区管理",methods = "小区删除")
    public boolean hiddenEntity(CommunityInfo communityInfo){
        communityInfo.setIsDel(1);
        communityInfoDao.update(communityInfo);
        return true;
    }

    public Map<String,Object>getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", communityInfoDao.getListByParam(pm));
        maps.put("count", communityInfoDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }
}

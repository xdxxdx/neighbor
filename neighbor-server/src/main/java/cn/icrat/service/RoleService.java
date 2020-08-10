package cn.icrat.service;

import cn.icrat.anno.Syslog;
import cn.icrat.dao.RoleDao;
import cn.icrat.dao.entity.Role;
import cn.icrat.dao.entity.User;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleService {
    @Autowired
    private RoleDao roleDao;
    public Role getRoleById(Long id){
        return roleDao.get(id);
    }
    public List<Role> getAllRoleList(){
        return roleDao.loadAll();
    }
    @Syslog(module = "角色管理",methods = "角色新增/修改")
    public boolean saveRole(int type,Role role){
        if(type==1){
             roleDao.saveRePk(role);
        }else{
            roleDao.update(role);
        }
        return true;
    }
    public boolean hiddenRole(Role role){
        role.setIsDel(1);
        roleDao.update(role);
        return true;
    }
    public List<Role>getActiveRoleList(){
        DetachedCriteria criteria = DetachedCriteria.forClass(Role.class);
        criteria.add(Restrictions.eq("isDel", 0));
        List<Role>roleList= (List<Role>) roleDao.find(criteria);
        return roleList;
    }
    public Map<String,Object>getRoleMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", roleDao.getRoleListByParam(pm));
        maps.put("count", roleDao.getRoleSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }
    public Role getRoleByRoleName(String roleName){
        return roleDao.getRoleByRoleName(roleName);
    }
}

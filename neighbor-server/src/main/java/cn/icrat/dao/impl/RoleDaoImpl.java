package cn.icrat.dao.impl;

import cn.icrat.dao.AccountDao;
import cn.icrat.dao.RoleDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Role;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleDaoImpl extends BaseDAOImpl<Role> implements RoleDao {
    /**
     * 通过查询条件pm来获取角色list
     *
     * @param pm
     * @return
     */
    public List<Role> getRoleListByParam(ParamModel pm) {
        String hql = "select * from role where is_del=0 ";
        if (pm.getRoleName() != null && !pm.getRoleName().equals("")) {
            hql += " and role_name like'%" + pm.getRoleName() + "%'";
        }
        hql += " order by " + pm.getSortname() + " " + pm.getSortorder();
        return findTListBySql(hql, pm);
    }

    /**
     * 获取roleList
     *
     * @return
     */
    public List<Role> getRoleList() {
        String hql = "select * from role where is_del=0 ";
        return findTListBySql(hql);
    }

    /**
     * 通过查询条件获取满足条件的role记录数
     *
     * @param pm
     * @return
     */
    public Integer getRoleSizeByParam(ParamModel pm) {
        String hql = "select count(*) from role where is_del=0 ";
        if (pm.getRoleName() != null && !pm.getRoleName().equals("")) {
            hql += " and role_name like'%" + pm.getRoleName() + "%'";
        }
        return Integer.parseInt(getSigleColumnBySql(hql).toString());
    }
    public Role getRoleByRoleName(String roleName) {
        String hql = "select  * from Role where role_name='" + roleName + "'";
        return findTBySql(hql);
    }
}

package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Role;
import cn.icrat.util.wx.ParamModel;

import java.util.List;


public interface RoleDao extends BaseDAO<Role> {
    /**
     * 通过查询条件pm来获取角色list
     *
     * @param pm
     * @return
     */
    public List<Role> getRoleListByParam(ParamModel pm) ;

    /**
     * 获取roleList
     *
     * @return
     */
    public List<Role> getRoleList() ;


    /**
     * 通过查询条件获取满足条件的role记录数
     *
     * @param pm
     * @return
     */
    public Integer getRoleSizeByParam(ParamModel pm) ;
    /**
     * 根据roleName获取role实体
     *
     * @param roleName
     * @return
     */
    public Role getRoleByRoleName(String roleName);

}

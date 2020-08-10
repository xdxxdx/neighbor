package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Menu;
import cn.icrat.dao.entity.Role;

import java.util.List;


public interface MenuDao extends BaseDAO<Menu> {
    public List<Menu> getRootMenuListByRoleId(int roleId);
    public List<Menu>getMenuListByPMenuIdAndRoleId(int pMenuId,int roleId);
    public int updatePriority(Menu menu);
    public int updatePriority1ByPMenu(Menu pMenu);
    public int updateMenu(Menu menu);
}

package cn.icrat.service;


import cn.icrat.dao.MenuDao;
import cn.icrat.dao.entity.Menu;
import cn.icrat.dao.entity.Role;
import cn.icrat.util.wx.ParamModel;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class MenuService {
	@Autowired
	private MenuDao menuDao;


	public Menu getMenuById(Long id) {
		return menuDao.get(id);
	}

	public Menu getMenuByMenuName(String menuName) {
		return menuDao.findByProperty("menuName",menuName);
	}

	public List<Menu> getMenuList() {
		DetachedCriteria criteria = DetachedCriteria.forClass(Menu.class);
		criteria.add(Restrictions.eq("isDel", 0));
		return (List<Menu>) menuDao.find(criteria);
	}

	@Transactional
	public int saveMenu(int type, Menu menu) {
		int result = 0;
		if (type == 1) {
			// 新增
			if (menu.getMenuType() == 1) {
				// 主菜单
				menu.setMenuLevel(1);
				result = Integer.parseInt(menuDao.saveRePk(menu).toString());
				if (result > 0) {
					menu.setPriority1((int) menu.getId());
					menuDao.updatePriority(menu);
				}
			} else {
				menu.setrMenuId(menu.getpMenuId());
				menu.setMenuLevel(2);
				result = Integer.parseInt(menuDao.saveRePk(menu).toString());
				if (result > 0) {
					Menu pMenu = menuDao.get(menu.getpMenuId());
					menu.setPriority1(pMenu.getPriority1());
					menu.setPriority2((int) menu.getId());
					menuDao.updatePriority(menu);
				}
			}
		} else {
			// 修改
			// if(menu.getMenuType()==EMenuType.rootMenu.getValue()){
			result=menuDao.updateMenu(menu);
			// }
			// else{
			// menu.setRMenuId(menu.getpMenuId());
			// TMenu pMenu=menuDao.getMenuById(menu.getpMenuId());
			// menu.setPriority1(pMenu.getPriority1());
			// result=menuDao.updateMenu(menu);
			// }
		}
		return result;
	}

	public boolean deleteMenu(Menu menu) {
		int result = 0;
		DetachedCriteria criteria = DetachedCriteria.forClass(Menu.class);
		criteria.add(Restrictions.eq("pMenuId", menu.getId()));
		if (menuDao.find(criteria).isEmpty()) {
			menuDao.delete(menu);
			return true;
		}
		return false;
	}

	public List<Menu> getRootMenuList() {
		DetachedCriteria criteria = DetachedCriteria.forClass(Menu.class);
		criteria.add(Restrictions.eq("menuType", 1));
		return (List<Menu>) menuDao.find(criteria);
	}

	/**
	 * 根据roleId获取菜单的递归
	 * 
	 * @param roleId
	 * @return
	 */
	public List<Menu> getRootMenuListByRoleId(int roleId) {
		return menuDao.getRootMenuListByRoleId(roleId);
	}

	/**
	 * 根据父级菜单和所属的角色，获取其下级菜单
	 * 
	 * @param pMenuId
	 * @param roleId
	 * @return
	 */
	public List<Menu> getChildMenuListByPMenuIdAndRoleId(int pMenuId,
			int roleId) {
		ParamModel pm = new ParamModel();
		pm.setpMenuId(pMenuId);
		pm.setRoleId(roleId);
		return menuDao.getMenuListByPMenuIdAndRoleId(pMenuId, roleId);
	}

	public JSONArray getMenuByRole(Integer roleId) {
		List<Menu> menuTree = getRootMenuListByRoleId(roleId);
		for (Menu menu : menuTree) {
			List<Menu> child = getChildMenuListByPMenuIdAndRoleId(
					(int) menu.getId(), roleId);
			menu.setChild(child);
		}
		JSONArray jsonArray = JSONArray.fromObject(menuTree);
		// redisDao.del_add(roleId.toString(), jsonArray.toString());
		return jsonArray;
	}


	/**
	 * 修改优先级
	 * 
	 * @param menuId
	 * @param priority
	 * @return
	 */
	public Integer updatePriority(Long menuId, int priority) {
		Integer result = 0;
		Menu menu = getMenuById(menuId);
		if (menu.getMenuLevel() == 1) {
			menu.setPriority1(priority);
			// 先更改自己的优先级
			result = menuDao.updatePriority(menu);
			// 然后再更改其下级菜单的priority1
			menuDao.updatePriority1ByPMenu(menu);
		} else if (menu.getMenuLevel() == 2) {
			menu.setPriority2(priority);
			result = menuDao.updatePriority(menu);
		}
		return result;
	}

}

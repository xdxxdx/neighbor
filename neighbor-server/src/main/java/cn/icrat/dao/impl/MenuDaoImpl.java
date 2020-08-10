package cn.icrat.dao.impl;

import cn.icrat.dao.MenuDao;
import cn.icrat.dao.MessageDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Menu;
import cn.icrat.dao.entity.Message;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MenuDaoImpl extends BaseDAOImpl<Menu> implements MenuDao {
    public List<Menu> getRootMenuListByRoleId(int roleId){
        String sql="select * from menu where is_del=0 and menu_type=1"
                +" and id in(select menu_id from jurisdiction where role_id="+roleId+") order by priority1";
        return findTListBySql(sql);
    }
    public List<Menu>getMenuListByPMenuIdAndRoleId(int pMenuId,int roleId){
        String sql="select * from Menu where is_del=0 and p_menu_id="+pMenuId
                +" and id in(select menu_id from jurisdiction where role_id="+roleId+") order by priority1,priority2,priority3";
        return findTListBySql(sql);
    }
    public int updatePriority(Menu menu){
        String sql="update menu set lastUpdateDate=now() ";
        if(menu.getPriority1()!=null){
            sql+=",priority1="+menu.getPriority1();
        }
        if(menu.getPriority2()!=null){
            sql+=",priority2="+menu.getPriority2();
        }
        if(menu.getPriority3()!=null){
            sql+=",priority3="+menu.getPriority3();
        }
        sql+=" where id="+menu.getId();
        return updateBySql(sql);
    }
    public int updatePriority1ByPMenu(Menu pMenu){
        String sql="update menu set priority1="+pMenu.getPriority1()+" where p_menu_id="+pMenu.getId();
        return updateBySql(sql);
    }
    public int updateMenu(Menu menu){
        String sql="update menu set menu_name='"+menu.getMenuName()
                +"'";
        if(menu.getMenuType()!=null){
            sql+=",menu_type="+menu.getMenuType();
        }
        if(menu.getMenuLevel()!=null){
            sql+=",menu_level="+menu.getMenuLevel();
        }

        if(menu.getMenuSrc()!=null){
            sql+=",menu_src='"+menu.getMenuSrc()+"'";
        }
        if(menu.getrMenuId()!=null){
            sql+=",r_menu_id="+menu.getrMenuId();
        }
        if(menu.getpMenuId()!=null){
            sql+=",p_menu_id="+menu.getpMenuId();
        }
        if(menu.getMenuIntro()!=null){
            sql+=",menu_intro='"+menu.getMenuIntro()+"'";
        }
        if(menu.getPriority1()!=null){
            sql+=",priority1="+menu.getPriority1();
        }
        if(menu.getPriority2()!=null){
            sql+=",priority2="+menu.getPriority2();
        }
        if(menu.getPriority3()!=null){
            sql+=",priority3="+menu.getPriority3();
        }
        sql+=" where id="+menu.getId();
        return updateBySql(sql);
    }
}

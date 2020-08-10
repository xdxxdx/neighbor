package cn.icrat.dao.impl;

import cn.icrat.dao.ItempicDao;
import cn.icrat.dao.JurisdictionDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Itempic;
import cn.icrat.dao.entity.Jurisdiction;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class JurisdictionDaoImpl extends BaseDAOImpl<Jurisdiction> implements JurisdictionDao {
    public Jurisdiction getJurisdictionById(long id) {

        return get(id);
    }

    public int deleteJurisdiction(Jurisdiction jurisdiction) {
        return deleteT(jurisdiction);
    }

    public long addJurisdiction(Jurisdiction jurisdiction) {
        return addT(jurisdiction);
    }



    public List<Jurisdiction> getJurisdictionListByRoleId(int roleId) {
        String sql = "select * from jurisdiction where is_del=0 and role_id="
                + roleId;
        return findTListBySql(sql);
    }

    public List<Map<String, Object>> getJurisdictionMListByRoleId(int roleId) {
        String sql = "select t1.id as menuId, t1.p_menu_id as pMenuId,t1.menu_name as menuName,ifnull(t2.id,0) as jurisdictionId "
                + "from menu t1 left join (select id,menu_id from jurisdiction where role_id="
                + roleId
                + ") t2 on t1.id=t2.menu_id where t1.is_del=0 order by t1.priority1";
        return findMapListBySql(sql);

    }
    public int deleteJurisdictionByRoleId(int roleId){
        String sql="delete from jurisdiction where role_id="+roleId;
        return updateBySql(sql);
    }
}

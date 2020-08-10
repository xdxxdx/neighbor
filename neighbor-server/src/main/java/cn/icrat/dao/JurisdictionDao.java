package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Jurisdiction;

import java.util.List;
import java.util.Map;

public interface JurisdictionDao extends BaseDAO<Jurisdiction> {
    public Jurisdiction getJurisdictionById(long id) ;

    public int deleteJurisdiction(Jurisdiction jurisdiction);


    public long addJurisdiction(Jurisdiction jurisdiction);

    public List<Jurisdiction> getJurisdictionListByRoleId(int roleId) ;

    public List<Map<String, Object>> getJurisdictionMListByRoleId(int roleId);
    public int deleteJurisdictionByRoleId(int roleId);
}

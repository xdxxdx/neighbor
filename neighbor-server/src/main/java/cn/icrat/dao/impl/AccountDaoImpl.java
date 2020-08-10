package cn.icrat.dao.impl;

import cn.icrat.dao.AccountDao;
import cn.icrat.dao.TestDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Test;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AccountDaoImpl extends BaseDAOImpl<Account> implements AccountDao {

    public Account getAccountByName(String email) {
        String hql = "select * from account where is_del=0 and email='" + email
                + "'";
        return findTBySql(hql);
    }


    public Long addAccount(Account account) {
        return addT(account);
    }



    public Integer hiddenAccount(Account account){
        String sql="update account set is_del=1 where id="+account.getId();
        return updateBySql(sql);
    }


    public Integer updateAccount(Account account) {
        String hql = "update account set email='" + account.getEmail()
                + "'," + "true_name='" + account.getTrueName() + "',role_id="
                + account.getRoleId() + ",role_name='" + account.getRoleName()
                + "',communityId="+account.getCommunityId()+" where id=" + account.getId();
        return updateBySql(hql);
    }


    public Integer updateAccountPwd(Account account) {
        String hql = "update account set password='"
                + account.getPassword() + "' where id=" + account.getId();
        return updateBySql(hql);
    }

    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<Account> getAccountListByParam(ParamModel pm) {
        String hql = "select * from account where is_del=0 ";
        hql += " order by " + pm.getSortname() + " " + pm.getSortorder();
        return findTListBySql(hql, pm);
    }

    public List<Account>getAllAccountList(){
        String sql="select * from account where is_del=0";
        return findTListBySql(sql);
    }

    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public Integer getAccountSizeByParam(ParamModel pm) {
        String hql = "select count(*) from account where is_del=0 ";
        return Integer.parseInt(getSigleColumnBySql(hql).toString());
    }
}

package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Account;
import cn.icrat.dao.entity.Test;
import cn.icrat.util.wx.ParamModel;

import java.util.List;
import java.util.Map;

public interface AccountDao extends BaseDAO<Account> {

    public Account getAccountByName(String email);


    public Long addAccount(Account account);

    public Integer hiddenAccount(Account account);


    public Integer updateAccount(Account account);


    public Integer updateAccountPwd(Account account);

    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<Account> getAccountListByParam(ParamModel pm);

    public List<Account>getAllAccountList();

    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public Integer getAccountSizeByParam(ParamModel pm);
}

package cn.icrat.service;

import cn.icrat.anno.Syslog;
import cn.icrat.common.MD5Util;
import cn.icrat.dao.AccountDao;
import cn.icrat.dao.entity.Account;
import cn.icrat.util.wx.ParamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountService {
    @Autowired
    private AccountDao accountDao;
    public Account getAccountById(long id){
        return accountDao.get(id);
    }
    public List<Account> getAccountListByPm(ParamModel pm){
        return accountDao.getAccountListByParam(pm);
    }
    public List<Account>getAllAdminList(){
        return accountDao.getAllAccountList();
    }
    public int getAdminSizeByPm(ParamModel pm){
        return (Integer) accountDao.getAccountSizeByParam(pm);
    }
    public Map<String,Object>getAccountMapByPm(ParamModel pm){
        Map<String,Object>map=new HashMap<String, Object>();
        map.put("data", getAccountListByPm(pm));
        map.put("count", getAdminSizeByPm(pm));
        map.put("code", 0);
        map.put("msg", "");
        return map;
    }
    @Syslog(module = "用户管理",methods = "用户新增/修改")
    public Integer saveAccount(Integer type,Account account){
        if(type==1){
            account.setPassword(MD5Util.MD5(MD5Util.MD5(account.getEmail())+account.getPassword()));
            return accountDao.addAccount(account)>0?1:0;
        }else{
            return accountDao.updateAccount(account);
        }
    }
    public Integer hiddenAccount(Account account){
        return accountDao.hiddenAccount(account);
    }
    public Account getAccountByAccountName(String email){
        return accountDao.getAccountByName(email);
    }
    public Integer savePwdChange(Account account){
        return accountDao.updateAccountPwd(account);
    }
//	 public Integer saveAdminFaceAndInfo(HttpServletRequest req, MultipartFile upload, String uploadFile, TAdmin admin){
//	        Integer result = 0;
//	        String originalFileName =  upload.getOriginalFilename();
//	        String suffix =  IOUtil.getFileSuffix(originalFileName);
//	        String fileName =  RandomUtil.getTimeStampPlusRand() + "." + suffix;
//	        String realPath =  req.getServletContext().getRealPath(uploadFile);
//	        String fullPath = realPath + "/" + fileName;
//	        	if(upload!=null&&upload.getSize()>0){
//	        		String oldUserFace=admin.getUserFace();
//	        		  try {
//	    				upload.transferTo(new File(fullPath));
//	    				} catch (IllegalStateException e) {
//	    					e.printStackTrace();
//	    				} catch (IOException e) {
//	    					e.printStackTrace();
//	    				}
//	        		  admin.setUserFace(uploadFile + "/" + fileName);
//	        		  if(baseDao.updateT("TAdminMapper.updateFaceAndInfo", admin)>0){
//	        			  try {
//	        				  IOUtil.deleteFile(req, oldUserFace);
//	    				} catch (Exception e) {
//	    					e.printStackTrace();
//	    				}
//
//	        		  }
//	        		  result=1;
//	        	}else{
//	        		result=baseDao.updateT("TAdminMapper.updateFaceAndInfo", admin);
//	        	}
//	            return result;
//	    }
}

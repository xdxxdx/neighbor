package cn.icrat.service;


import cn.icrat.dao.JurisdictionDao;
import cn.icrat.dao.entity.Jurisdiction;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
public class JurisdictionService {
	@Autowired
	private JurisdictionDao jurisdictionDao;
	public List<Jurisdiction>getJurisdictionTListByRoleId(int roleId){
		return jurisdictionDao.getJurisdictionListByRoleId(roleId);
	}
	public List<Map<String,Object>>getJurisdictionMListByRoleId(int roleId){
		return jurisdictionDao.getJurisdictionMListByRoleId(roleId);
	}
	public JSONArray getJurisdictionJsonByRoleId(int roleId){
		List<Map<String,Object>>jurisdictionList=getJurisdictionMListByRoleId(roleId);
		for(Map<String,Object>map:jurisdictionList){
			map.put("checked", !map.get("jurisdictionId").toString().equals("0"));
			map.put("open", true);
			map.put("pMenuId", map.get("pMenuId")!=null?map.get("pMenuId").toString():"");
		}
		JSONArray jsonArray= JSONArray.fromObject(jurisdictionList);
		return jsonArray;
	}
	public int deleteJurisdictionByRoleId(int roleId){
		return jurisdictionDao.deleteJurisdictionByRoleId(roleId);
	}
	/**
	 * 保存权限
	 * @param roleId
	 * @param menuIds
	 * @return
	 */
	public Integer saveJurisdiction(int roleId,String menuIds){
		int result=0;
		try {
			deleteJurisdictionByRoleId(roleId);//首先删除所有的roleId下的权限
			String menuIdArr[]=menuIds.split(",");
			if(menuIdArr.length>1){
				for(int i=0;i<menuIdArr.length;i++){
					int menuId=Integer.parseInt(menuIdArr[i]);
					Jurisdiction jurisdiction=new Jurisdiction();
					jurisdiction.setRoleId(roleId);
					jurisdiction.setMenuId(menuId);
					jurisdictionDao.addJurisdiction(jurisdiction);
				}
			}
			result=1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	public static void main(String args[]){
		  ApplicationContext ctx = new ClassPathXmlApplicationContext(
	                "applicationContext.xml");
		JurisdictionService jurisdictionService=(JurisdictionService) ctx.getBean("jurisdictionService");
		System.out.println(jurisdictionService.getJurisdictionMListByRoleId(1));
	}
}

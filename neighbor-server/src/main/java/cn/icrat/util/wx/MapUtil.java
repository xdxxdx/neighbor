package cn.icrat.util.wx;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


public class MapUtil {
	/**
	 * 将Map<String,String[]>的参数转换成Map<String,String>参数
	 * 
	 * @param requestParams
	 * @return
	 */
	public static Map<String, String> getParamsByMap(HttpServletRequest req, Map requestParams) {
		Map<String, String> params = new HashMap<String, String>();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			params.put(name, valueStr);
		}
		return params;
	}
	
	/** 过滤maplist里含有的null值 */
	  public static List<Map<String, Object>> filterMapListNull(List<Map<String, Object>> list) {
	    for (Map<String, Object> map : list) {
	      List<String> keys = new ArrayList<String>();
	      for (String key : map.keySet()) {
	        if (map.get(key) == null) {
	          keys.add(key);
	        }
	      }
	      for (String key : keys) {
	        map.remove(key);
	      }
	    }
	    return list;
	  }
}

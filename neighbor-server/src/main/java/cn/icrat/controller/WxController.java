package cn.icrat.controller;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.icrat.util.wx.CommonUtil;
import cn.icrat.util.wx.Token;
import cn.icrat.util.wx.WXUtil;


@Controller
public class WxController {
	@RequestMapping("wxMsgSecCheckAjax")
	@ResponseBody
	public JSONObject wxMsgSecCheckAjax(String content){
		Token accessToken=CommonUtil.getToken(WXUtil.appid, WXUtil.secret);
		if(accessToken.getAccessToken()!=null){
			Map<String,String>map=new HashMap<String,String>();
			map.put("content", content);
			String check=CommonUtil.httpPostWithJSON("https://api.weixin.qq.com/wxa/msg_sec_check?access_token="+accessToken.getAccessToken(), map);
			JSONObject jsonObject=JSONObject.fromObject(check);
			return jsonObject;
		}
		return null;
		
	}

}

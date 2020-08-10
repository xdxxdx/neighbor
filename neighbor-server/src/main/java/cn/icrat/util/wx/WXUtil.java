package cn.icrat.util.wx;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import static cn.icrat.util.wx.CommonUtil.httpsRequest;


@Service
public class WXUtil {
    private static Logger log = LoggerFactory.getLogger(WXUtil.class);
    public final static String appid = "wx1e87d5a23d385aea";
    public final static  String secret = "0e671bff4291ec5bdd621abf4201f839";
    public final static  String pay_callback = "http://wx.icrat.cn/StoragePlatform/pay_callback";
    public final static String jscode_url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code";
	private long lastTokenTime = 0;
	private String accessToken = "";
	public WXUserInfo currentUser = null;
	public String currentOpenID = "";

    public static String jscode2session(String code) {
        String requestUrl = jscode_url.replace("APPID", appid).replace("SECRET", secret).replace("JSCODE", code);
        // 发起GET请求获取凭证
        JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);
        String openid = "";
        if (null != jsonObject && jsonObject.has("openid"))
            openid = jsonObject.getString("openid");
        else
            log.error("获取登录session失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"), jsonObject.getString("errmsg"));
        return openid;
    }

	/*
    public String processRequest(HttpServletRequest request) {
        Map<String, String> map = WechatMessageUtil.xmlToMap(request);
        //log.info(map);
        // 发送方帐号（一个OpenID）
        String fromUserName = map.get("FromUserName");
        System.out.println("fromUserName：" + fromUserName);
        // 开发者微信号
        String toUserName = map.get("ToUserName");
        System.out.println("toUserName：" + toUserName);
        // 消息类型
        String msgType = map.get("MsgType");
        System.out.println("msgType：" + msgType);
     // 消息内容
        String msgContent = map.get("Content");
        System.out.println("Content：" + msgContent);
        // 默认回复一个"success"
        String responseMessage = "success";
        // 对消息进行处理
        
        if (WechatMessageUtil.MESSAGE_TEXT.equals(msgType) && msgContent.toLowerCase().equals("oceanconnect")) {
        	GetToken();
        	getWXUserInfo(fromUserName);
        	String content = "申请成功，请开始体验虚拟驾驶";
        	//try {
        	//	content = new String(content.getBytes(), "iso8859-1");
        	//}catch (UnsupportedEncodingException e)
        	//{}
        	//String content = "测试";
        	//System.out.println(content);
        	TextMessage textMessage = new TextMessage();
            textMessage.setMsgType(WechatMessageUtil.MESSAGE_TEXT);
            textMessage.setToUserName(fromUserName);
            textMessage.setFromUserName(toUserName);
            textMessage.setCreateTime(System.currentTimeMillis());
            textMessage.setContent(content);
            
            String res = WechatMessageUtil.textMessageToXml(textMessage);
            //System.out.println(res);
            responseMessage = res;
        }

//        if (WechatMessageUtil.MESSAGE_TEXT.equals(msgType) && msgContent.toLowerCase().equals("racepic")) {
//        	GetToken();
//
//        	String mediaId = WechatMessageUtil.uploadPermanentMedia(accessToken, "D:/HWpic/" + fromUserName + ".png", fromUserName, fromUserName);
//        	String res = "<xml>\r\n" +
//        			"<ToUserName>" + fromUserName + "</ToUserName>\r\n" +
//        			"<FromUserName>" + toUserName + "</FromUserName>\r\n" +
//        			"<CreateTime>" + System.currentTimeMillis() + "</CreateTime>\r\n" +
//        			"<MsgType>" + WechatMessageUtil.MESSAtGE_IMAGE + "</MsgType>\r\n" +
//        			"<Image>\r\n" +
//        			"<MediaId>" + mediaId + "</MediaId>\r\n" +
//        			"</Image>\r\n" +
//        			"</xml>";
//            //System.out.println(res);
//            responseMessage = res;
//        	Timer timer = new Timer();
//        	timer.schedule(new TimerTask() {
//        	        public void run() {
//        	        	//System.out.println(mediaId);
//        	        	WechatMessageUtil.deletePermanentMedia(accessToken, mediaId);
//        	        }
//        	}, 5000);
//        }
        //log.info(responseMessage);
        return responseMessage;

    }
    */
    private void GetToken()
    {
    	long currentTime = System.currentTimeMillis();
    	if (currentTime - lastTokenTime > 7000)
    	{
    		accessToken = CommonUtil.getToken(appid, secret).getAccessToken();
    		lastTokenTime = currentTime;
    	}
    }
    
    private String getWXUserInfo(String openid)
    {
    	currentOpenID = openid;
    	currentUser = getWXUserInfoWithFollow(accessToken, openid);
    	SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=new Date(Long.parseLong(currentUser.getSubscribeTime()) * 1000L); 
        String[] state = {"未关注","已关注"};
        String[] sex = {"未知","男","女"};
        
    	return "OpenID：" + currentUser.getOpenId()
        + "\n关注状态：" + state[currentUser.getSubscribe()]
		+"\n关注时间：" + dateFormater.format(date)
		+"\n昵称：" + currentUser.getNickname()
		+"\n性别：" + sex[currentUser.getSex()]
		+"\n国家：" + currentUser.getCountry()
		+"\n省份：" + currentUser.getProvince()
		+"\n城市：" + currentUser.getCity()
		+"\n语言：" + currentUser.getLanguage()
		+"\n头像：" + currentUser.getHeadImgUrl();
    
    }
/*
    public void SendPic(String openid)
    {
    	if (openid.isEmpty())
    		return;
    	GetToken();
    	String mediaId = WechatMessageUtil.uploadPermanentMedia(accessToken, "D:/HWpic/" + openid + ".png", openid, openid);
    	WechatMessageUtil.SendCustomPic(accessToken, openid, mediaId);
    	Timer timer = new Timer();
    	timer.schedule(new TimerTask() {
    	        public void run() {
    	        	//System.out.println(mediaId);
    	        	WechatMessageUtil.deletePermanentMedia(accessToken, mediaId);
    	        }
    	}, 5000);
    }*/
    
    public WXUserInfo getWXUserInfoWithoutFollow(String accessToken, String openId) {
    	WXUserInfo WXUserInfo = null;
        // 拼接请求地址
        String requestUrl = "https://api.weixin.qq.com/sns/WXUserInfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
        requestUrl = requestUrl.replace("ACCESS_TOKEN", accessToken).replace("OPENID", openId);
        // 获取用户信息
        JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);

        if (null != jsonObject) {
            WXUserInfo = new WXUserInfo();
            // 用户的标识
            WXUserInfo.setOpenId(jsonObject.getString("openid"));
            // 昵称
            WXUserInfo.setNickname(jsonObject.getString("nickname"));
            // 用户的性别（1是男性，2是女性，0是未知）
            WXUserInfo.setSex(jsonObject.getInt("sex"));
            // 用户所在国家
            WXUserInfo.setCountry(jsonObject.getString("country"));
            // 用户所在省份
            WXUserInfo.setProvince(jsonObject.getString("province"));
            // 用户所在城市
            WXUserInfo.setCity(jsonObject.getString("city"));
            // 用户头像
            WXUserInfo.setHeadImgUrl(jsonObject.getString("headimgurl"));
        }
        return WXUserInfo;
    
    }
	
	public WXUserInfo getWXUserInfoWithFollow(String accessToken, String openId) {
        WXUserInfo WXUserInfo = null;
        // 拼接请求地址
        String requestUrl = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID";
        requestUrl = requestUrl.replace("ACCESS_TOKEN", accessToken).replace("OPENID", openId);
        // 获取用户信息
        JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);

        if (null != jsonObject) {
            try {
                WXUserInfo = new WXUserInfo();
                // 用户的标识
                WXUserInfo.setOpenId(jsonObject.getString("openid"));
                // 关注状态（1是关注，0是未关注），未关注时获取不到其余信息
                WXUserInfo.setSubscribe(jsonObject.getInt("subscribe"));
                // 用户关注时间
                WXUserInfo.setSubscribeTime(jsonObject.getString("subscribe_time"));
                // 昵称
                WXUserInfo.setNickname(jsonObject.getString("nickname"));
                // 用户的性别（1是男性，2是女性，0是未知）
                WXUserInfo.setSex(jsonObject.getInt("sex"));
                // 用户所在国家
                WXUserInfo.setCountry(jsonObject.getString("country"));
                // 用户所在省份
                WXUserInfo.setProvince(jsonObject.getString("province"));
                // 用户所在城市
                WXUserInfo.setCity(jsonObject.getString("city"));
                // 用户的语言，简体中文为zh_CN
                WXUserInfo.setLanguage(jsonObject.getString("language"));
                // 用户头像
                WXUserInfo.setHeadImgUrl(jsonObject.getString("headimgurl"));
            } catch (Exception e) {
                if (0 == WXUserInfo.getSubscribe()) {
                	System.err.println("用户" + WXUserInfo.getOpenId() + "已取消关注");
                } else {
                    int errorCode = jsonObject.getInt("errcode");
                    String errorMsg = jsonObject.getString("errmsg");
                	System.err.println("获取用户信息失败 errcode:" + errorCode + "errmsg:" + errorMsg);
                }
                e.printStackTrace();
                System.err.println("getWXUserInfo:" + e.getMessage());
            }
        }
        return WXUserInfo;
    }
}
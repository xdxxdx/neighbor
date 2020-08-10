package cn.icrat.util.wx.pay;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import cn.icrat.util.wx.WXUtil;
import cn.icrat.util.wx.pay.WXPayConstants.SignType;

public class PayMgr {

	private MyConfig config;
	private WXPay wxpay;
	public PayMgr()
	{
		try {
			setConfig(new MyConfig());
	    	wxpay = new WXPay(getConfig());
		} catch (Exception e) {
        	e.printStackTrace();
        }
		System.out.println("PayMgr Inited");
	}
	//oQxNg0xjrsuud8W4petZDL4Pqplo
	public String DoPay(String name, String itemId, String openid, int fee){
		try {
            Date d = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            
            HashMap<String, String> data = new HashMap<String, String>();
            //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
            data.put("body", "支付订单：" + name);
            data.put("device_info", "");
            data.put("fee_type", "CNY");
            data.put("spbill_create_ip", "123.12.12.123");
            data.put("notify_url", WXUtil.pay_callback);
            data.put("trade_type", "JSAPI");//JSAPI 公众号支付  NATIVE 扫码支付 APP APP支付
            data.put("attach", itemId);
            
            data.put("openid", openid);
            data.put("out_trade_no", sdf.format(d));
            data.put("total_fee", fee + "");
            //System.out.println(data);
            Map<String, String> r = wxpay.unifiedOrder(data);
            //System.out.println(r);
            
            HashMap<String, String> jsdata = new HashMap<String, String>();
            jsdata.put("appId", r.get("appid"));     //公众号名称，由商户传入
            jsdata.put("timeStamp", System.currentTimeMillis() + "");
            jsdata.put("nonceStr", r.get("nonce_str")); //随机串     
            jsdata.put("package", "prepay_id=" + r.get("prepay_id"));     
            jsdata.put("signType", "MD5");        //微信签名方式：     
            jsdata.put("paySign", WXPayUtil.generateSignature(jsdata, getConfig().getKey(), SignType.MD5));
            
            
            return "{\"appId\":\"" + jsdata.get("appId") 
            + "\", \"timeStamp\":\"" + jsdata.get("timeStamp") 
            + "\", \"nonceStr\":\"" + jsdata.get("nonceStr")
            + "\", \"package\":\"" + jsdata.get("package")
            + "\", \"signType\":\"" + jsdata.get("signType")
            + "\", \"paySign\":\"" + jsdata.get("paySign")
            + "\"}";
        } catch (Exception e) {
        	e.printStackTrace();
        	return "";
        }
    }
	public MyConfig getConfig() {
		return config;
	}
	public void setConfig(MyConfig config) {
		this.config = config;
	}
}

package cn.icrat.util.wx;
import org.apache.commons.codec.binary.Base64;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class DesECBUtil {
	  /** 
     * 加密数据 
     * @param encryptString   
     * @param encryptKey 
     * @return 
     * @throws Exception 
     */  
   public static String encryptDES(String encryptString, String encryptKey) throws Exception {  
         
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");  
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(getKey(encryptKey), "DES"));  
        byte[] encryptedData = cipher.doFinal(encryptString.getBytes("UTF-8"));  
        return Base64.encodeBase64String(encryptedData);
    } 
  
    /** 
     * key  不足8位补位
     * @param string  
     */  
    public static byte[] getKey(String keyRule) {  
        Key key = null;  
        byte[] keyByte = keyRule.getBytes();  
        // 创建一个空的八位数组,默认情况下为0  
        byte[] byteTemp = new byte[8];  
        // 将用户指定的规则转换成八位数组  
        for (int i = 0; i < byteTemp.length && i < keyByte.length; i++) {  
            byteTemp[i] = keyByte[i];  
        }  
        key = new SecretKeySpec(byteTemp, "DES");  
        return key.getEncoded();  
    }  
      
    /*** 
     * 解密数据 
     * @param decryptString 
     * @param decryptKey 
     * @return 
     * @throws Exception 
     */  
  
    public static String decryptDES(String decryptString, String decryptKey) throws Exception {  
        
        byte[] sourceBytes = Base64.decodeBase64(decryptString);    
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");   
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(getKey(decryptKey), "DES"));    
        byte[] decoded = cipher.doFinal(sourceBytes);    
        return new String(decoded, "UTF-8");  
        
    } 
   
    public static void main(String[] args) throws Exception {  
        String clearText = "010001191110111005001002000300040005"; 
        String key = "36363737";//密钥
        System.out.println("明文："+clearText+"\n密钥："+key);  
        String encryptText = encryptDES(clearText, key);  
        System.out.println("加密后："+encryptText);  
        String decryptText = decryptDES(encryptText, key);  
        System.out.println("解密后："+decryptText);  
    }  

}

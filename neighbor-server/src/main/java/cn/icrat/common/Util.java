package cn.icrat.common;

import cn.icrat.sensitivewd.WordFilter;
import cn.icrat.util.wx.WXUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;

public class Util {

    private static Logger log = LoggerFactory.getLogger(Util.class);
    public static Map<String,Object> convertBeanToMap(Object bean) {

        Class type = bean.getClass();
        Map<String, Object> returnMap = new HashMap<String, Object>();
        try {
            BeanInfo beanInfo = Introspector.getBeanInfo(type);
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
            for (int i = 0; i < propertyDescriptors.length; i++) {
                PropertyDescriptor descriptor = propertyDescriptors[i];
                String propertyName = descriptor.getName();
                if (!propertyName.equals("class")) {
                    Method readMethod = descriptor.getReadMethod();
                    Object result = readMethod.invoke(bean, new Object[0]);
                    if (result != null) {
                        returnMap.put(propertyName, result);
                    } else {
                        returnMap.put(propertyName, "");
                    }
                }
            }
        }catch (Exception e)
        {
            log.error(e.getMessage());
        }
        return returnMap;
    }

    /**
     * 获取当前日期是星期几<br>
     *
     * @param dt
     * @return 当前日期是星期几
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
    }

    public static String getWeekOfDate(String dateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdf.parse(dateString);
        return getWeekOfDate(date);

    }

    public static String getWeekOfDate(long timestamp) throws ParseException {
        String date = getDateString(timestamp);
        return getWeekOfDate(date);
    }

    /**
     * @param date      当前时间点
     * @param degree    1:分钟    2:小时    3:天   为单位
     * @param outDegree 超时时间
     * @param ifAfter   true:生成之后的时间   false:生成之前的时间
     * @return
     * @throws ParseException * 获取outDay天后的时间
     */
    public static Date generateOrdrTimeOut(Date date, int degree, int outDegree, boolean ifAfter) throws ParseException {
        Calendar cld = Calendar.getInstance();
        cld.setTime(date);
        if (ifAfter) {
            if (1 == degree) {
                int minute = cld.get(Calendar.MINUTE) + outDegree;
                cld.set(Calendar.MINUTE, minute);
            } else if (2 == degree) {
                int hour = cld.get(Calendar.HOUR) + outDegree;
                cld.set(Calendar.HOUR, hour);
            } else if (3 == degree) {
                int day = cld.get(Calendar.DATE) + outDegree;
                cld.set(Calendar.DATE, day);
            }
        } else {
            if (1 == degree) {
                int minute = cld.get(Calendar.MINUTE) - outDegree;
                cld.set(Calendar.MINUTE, minute);
            } else if (2 == degree) {
                int hour = cld.get(Calendar.HOUR) - outDegree;
                cld.set(Calendar.HOUR, hour);
            } else if (3 == degree) {
                int day = cld.get(Calendar.DATE) - outDegree;
                cld.set(Calendar.DATE, day);
            }
        }
        return cld.getTime();
    }

    /**
     * 生成随机字符串
     *
     * @param length 随机字符串长度
     * @param type   1:数字    2:字母   3及其他:数字和字符串类型
     * @return
     */
    public static String generateRandom(int length, int type) {
        if (1 == type) {
            Random r = new Random();
            int randNum = 0;
            while (randNum < 100000) {
                randNum = (int) r.nextInt(999999);
            }
            return randNum + "";
        }
        String base = null;
        if (2 == type) {
            base = "abcdefghijklmnopqrstuvwxyz";
        } else {
            base = "abcdefghijklmnopqrstuvwxyz0123456789";
        }
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }

    /**
     * 把long 类型的日期转换为 String
     *
     * @param time
     * @return
     */
    public static String getDateString(long time) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date(time));
    }

    /**
     * String 类型的日期转换为 Long
     *
     * @param time
     * @return
     */
    public static Long getDateLong(String time) {
        if (time == null)
            return 0L;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try
        {
            date = sdf.parse(time);
        }catch (ParseException e)
        {

        }
        return date.getTime();
    }


    /**
     * 把long 类型的日期转换为 String
     *
     * @param time
     * @return
     */
    public static String getMonthDay(long time) {
        SimpleDateFormat sdf = new SimpleDateFormat("MM.dd");
        Date date = new Date(time);
        return sdf.format(date);
    }

    /**
     * 把long 类型的日期转换为 String
     *
     * @param time
     * @return
     */
    public static String getDateString(long time, String param) {
        SimpleDateFormat sdf = new SimpleDateFormat(param);
        Date date = new Date(time);
        return sdf.format(date);
    }

    /**
     * 获取明天 0时0分0秒 时间
     *
     * @return
     */
    public static long getTomorrowLongTime() {
        long time = new Date().getTime();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String start = simpleDateFormat.format(time);
        ParsePosition pos = new ParsePosition(0);
        Date nowDate = simpleDateFormat.parse(start, pos);
        long tomorrowTime = nowDate.getTime() + 24 * 60 * 60 * 1000; //明天的0时0分0秒
        return tomorrowTime;
    }

    /**
     * 获取今天 0时0分0秒 时间
     *
     * @return
     */
    public static long getDayLongTime() {
        long time = new Date().getTime();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String start = simpleDateFormat.format(time);
        ParsePosition pos = new ParsePosition(0);
        Date nowDate = simpleDateFormat.parse(start, pos);
        long tomorrowTime = nowDate.getTime(); //今天的0时0分0秒
        return tomorrowTime;
    }

    public static String getCnEnStrByBitLen(String value, int lenght) {
        int valueLength = 0;
        String chinese = "[\u0391-\uFFE5]";
        int tc=1;
        int s =0;
        String str="";
        /* 获取字段值的长度，如果含中文字符，则每个中文字符长度为2，否则为1 */
        while(tc< lenght) {
            String temp = value.substring(s, s + 1);
            if (temp.matches(chinese)) { //如果是中文
                tc+=2;//计数+2
            }else{
                tc+=1;
            }
            s++;
            str=str+temp;
        }

        return str;
    }
}

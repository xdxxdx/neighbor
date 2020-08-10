package cn.icrat.aop;


import cn.icrat.anno.Syslog;
import cn.icrat.dao.entity.Account;
import cn.icrat.service.AccountService;
import cn.icrat.service.SyslogService;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 操作日志切面配置
 */
@Aspect
@Component("sysLogAspect")
public class OperateLogAspect {
    private Logger logger = LoggerFactory.getLogger(getClass());

    //注入持久化该日志信息的service
    @Autowired
    private SyslogService syslogService;
    //注入根据request获取登录用户信息的service
    @Autowired
    private AccountService accountService;

    //定义切点 @Pointcut
    //在注解的位置切入代码
    @Pointcut("@annotation( cn.icrat.anno.Syslog)")
    public void logPoinCut() {
    }

    @After(value = "logPoinCut()") //指定切点,使用after 让该切面在方法执行完成后切入
    public void after(JoinPoint point) throws Throwable {
        try {
            // 拦截的action方法上面的标记是否包含 MethodLog 的注解
            Map<String, Object> map = getMthodRemark(point);
            if (map.isEmpty()) {
                // 没有MethodLog 注解标记 ,无此配置,直接返回
                return;
            }
            //获取requestBody 参数信息,过滤掉 ServletRequest 和 ServletResponse 类型的参数
            Object object = Arrays.stream(point.getArgs()).filter(t ->!( t instanceof ServletRequest) && !( t instanceof ServletResponse) ).collect(Collectors.toList());
            //请求参数转成jsonString
            String requestBody = JSONArray.fromObject(object).toString();

            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            if (null == request) {
                logger.info("获取request失败.直接返回");
                return;
            }
            //根据request的session中获取管理员信息
            Account account = this.getAccount(request);
            if (account == null) {
                logger.error("未从request中获取到管理员信息,直接返回");
                return;
            }
            //获取用户数使用客户端信息
            String userAgent = request.getHeader("user-agent");
            //获取该方法的名称
            String requestMethod = request.getMethod();
            StringBuffer params = new StringBuffer();
            // action方法名称
            String actionName = point.getSignature().getName();
            String pms = requestBody;

            // 构建操作日志对象
            cn.icrat.dao.entity.Syslog log = new cn.icrat.dao.entity.Syslog();
            log.setAccountId(account.getId());
            log.setAccountName(account.getTrueName());
            log.setModule(null == map.get("module") ? "" : map.get("module").toString());
            log.setMethods(null == map.get("methods") ? "": map.get("methods").toString());
            log.setOperaParam(pms);//参数
            log.setIp(getIpAdrress(request));
            log.setActionName(actionName);
            syslogService.saveSyslog(log);
        }catch (JSONException je){
            je.printStackTrace();
        } catch (Exception e) {
           e.printStackTrace();
        }
        return;
    }

    /**
     * 计算两天是否同一天
     *
     * @param day1
     * @param day2
     * @return
     */
    public boolean isSameDay(Date day1, Date day2) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String ds1 = sdf.format(day1);
        String ds2 = sdf.format(day2);
        return ds1.equals(ds2) ? true : false;
    }

    /**
     * @param request
     * @return 当前登陆员工Id
     * @desc 获取当前登陆用户Id
     */
    protected Account getAccount(HttpServletRequest request) {
        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");
        return account;
    }

    /**
     * 是否相差time
     *
     * @param d1
     * @param d2
     * @param time
     * @return
     */
    public boolean isDifferTime(Date d1, Date d2, int time) {
        if ((d2.getTime() - d1.getTime()) / 1000 / 60 > time)
            return true;
        else
            return false;
    }

    /**
     * 获取Ip地址
     * @param request
     * @return
     */
    public static String getIpAdrress(HttpServletRequest request) {
        String Xip = request.getHeader("X-Real-IP");
        String XFor = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = XFor.indexOf(",");
            if(index != -1){
                return XFor.substring(0,index);
            }else{
                return XFor;
            }
        }
        XFor = Xip;
        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
            return XFor;
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_CLIENT_IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getRemoteAddr();
        }
        return XFor;
    }

    // 获取方法的中文备注____用于记录用户的操作日志描述
    @SuppressWarnings("rawtypes")
    public static Map<String, Object> getMthodRemark(JoinPoint joinPoint)
            throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();

        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        MethodSignature signature= (MethodSignature)joinPoint.getSignature();
        Method method = ( (MethodSignature)signature ).getMethod();
        //这个方法才是目标对象上有注解的方法
        Method realMethod = joinPoint.getTarget().getClass().getDeclaredMethod(signature.getName(), method.getParameterTypes());
        Map<String, Object> map = new HashMap<>();
//        Class targetClass = Class.forName(targetName);
//        Method[] method = targetClass.getMethods();
        String module = "";
//        for (Method m : method) {
//            if (m.getName().equals(methodName)) {
//                Class[] tmpCs = m.getParameterTypes();
//                if (tmpCs.length == arguments.length) {
                    Syslog syslog = realMethod.getAnnotation(Syslog.class);
//                    if (syslog != null) {
                        module = syslog.module();
                        String methods = syslog.methods();
                        map.put("module", module);
                        map.put("methods", methods);
//                    }
//                    break;
//                }
//            }
//        }
        return map;
    }

}

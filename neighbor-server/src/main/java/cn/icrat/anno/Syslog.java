package cn.icrat.anno;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Syslog {
    /**查询模块*/
    String module()  default "";

    /**查询模块方法名称*/
    String methods()  default "";




}

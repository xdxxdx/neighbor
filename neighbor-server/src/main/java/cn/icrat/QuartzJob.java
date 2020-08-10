package cn.icrat;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

//@Component
//@Configurable             //注入bean
//@EnableScheduling         //开启计划任务
//public class QuartzJob {
//    private int num=1;
//
//    @Scheduled(cron = "0/1 * * * * ?")
//    public void  Tick(){
//        System.out.println("now time is:"+
//                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
//        System.out.println(num);
//        num++;
//    }
//
//}

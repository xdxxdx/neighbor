package cn.icrat;

import cn.icrat.common.MD5Util;
import cn.icrat.common.Util;

import java.util.*;

public class TestMain {
//    public static class Test
//    {
//
//        int a = 1;
//        int b = 2;
//        int c = 3;
//
//        public int getA() {
//            return a;
//        }
//
//        public void setA(int a) {
//            this.a = a;
//        }
//
//        public int getB() {
//            return b;
//        }
//
//        public void setB(int b) {
//            this.b = b;
//        }
//
//        public int getC() {
//            return c;
//        }
//
//        public void setC(int c) {
//            this.c = c;
//        }
//    }
    public static void main(String args[]) {
//        System.out.println("Hello World!");
//
//        Test t = new Test();
//        try {
//            Map<String, Object> map = Util.convertBeanToMap(t);
//            System.out.println(map.get("a"));
//        }catch (Exception e)
//        {
//            System.out.println(e.getMessage());
//        }

//        String e = MD5Util.MD5("1803016008696");
//        //String pw = MD5Util.MD5(e + "123456");
//        System.out.println(e);
//
//        Random rand =new Random(System.currentTimeMillis());
//        int i = rand.nextInt(100);
//        System.out.println(i);

        //System.out.println(Util.getCnEnStrByBitLen("可爱\uD83C\uDF38一二三四五六七八九十", 17));
//        List list = new ArrayList();
//        list.add(6);
//        list.add(4);
//        list.add(5);
//        Collections.sort(list);
//        System.out.println(list);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Long today = calendar.getTimeInMillis();
        int day = calendar.get(Calendar.DATE);
        System.out.println(11111);

    }
}

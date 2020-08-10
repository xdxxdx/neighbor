package cn.icrat.util.wx;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	/**
	 * 比较两个时间的大小，时间均为string类型
	 * 
	 * @param DATE1
	 * @param DATE2
	 * @return
	 */
	public static int compare_date(String DATE1, String DATE2) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dt1 = df.parse(DATE1);
			Date dt2 = df.parse(DATE2);
			if (dt1.getTime() > dt2.getTime()) {
				System.out.println("dt1 在dt2前");
				return 1;
			} else if (dt1.getTime() < dt2.getTime()) {
				System.out.println("dt1在dt2后");
				return -1;
			} else {
				return 0;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return 0;
	}

	/**
	 * 比较两个时间大小的另外一种方法
	 * 
	 * @param DATE1
	 * @param DATE2
	 * @return
	 */
	public static int compare_date(String DATE1, Date DATE2) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dt1 = df.parse(DATE1);
			Date dt2 = df.parse(df.format(DATE2));
			if (dt1.getTime() > dt2.getTime()) {
				System.out.println("dt1 大于dt2");
				return 1;
			} else if (dt1.getTime() < dt2.getTime()) {
				System.out.println("dt1小于dt2");
				return -1;
			} else {
				return 0;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return 0;
	}

	/**
	 * 比较Timestamp类型的日期的大小
	 * 
	 * @param date1
	 * @param date2
	 * @return date1比date2晚则返回1
	 */
	public static int compare_timestamp(Timestamp date1, Timestamp date2) {
		// date1比date2要晚
		if (date1.after(date2)) {
			return 1;
		} else if (date2.after(date1)) {
			// date1比date2早
			return -1;
		} else {
			return 0;
		}
	}

	/**
	 * 将时间转换成一定的格式
	 * 
	 * @param date
	 * @return
	 */
	public static String getDateFormatFromDate(Date date) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = df.format(date);
		return dateStr;
	}
	public static String getDateFormatFromDate(Date date,String format){
		DateFormat df = new SimpleDateFormat(format);
		String dateStr = df.format(date);
		return dateStr;
	}

	/**
	 * 或cld过后days后的日期
	 * 
	 * @param cld
	 * @param days
	 * @return
	 */
	public static Calendar getCalendarAfterDays(Calendar cld, int days) {
		cld.add(Calendar.DATE, days);
		return cld;
	}
	public static Calendar getCalendarAfterMinutes(Calendar cld, int minutes) {
		cld.add(Calendar.MINUTE, minutes);
		return cld;
	}

	/**
	 * 将Calendar类型转换为Timestamp
	 * 
	 * @param cld
	 * @return
	 */
	public static Timestamp Calendar2Timestamp(Calendar cld) {
		Date date = cld.getTime();
		Timestamp tsp = new Timestamp(date.getTime());
		return tsp;
	}

	/**
	 * 获取当前时间的Timestamp
	 * 
	 * @return
	 */
	public static Timestamp currentTimestamp() {
		return new Timestamp(System.currentTimeMillis());
	}

}

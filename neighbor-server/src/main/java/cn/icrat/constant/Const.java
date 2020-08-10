package cn.icrat.constant;

import java.util.HashMap;
import java.util.Map;

public class Const {
	public static final long TRXC=7763;
	public static final long DLXC=7764;
	public static final long TRG=7765;
	public static Map<String,String> community=new HashMap<>();
	static {
		community.put("7763","陶然新村");
		community.put("7764","东篱新村");
		community.put("7765","陶然居");
	}
	public static final long ALLGUARD=9999;//开小区所有权限的编号，超级管理员只需要设定这个编号即可
	public static final long TRXC_ADMIN=1999;//陶然新村管理员的公用编号，能访问陶然新村所有的门
	public static final long TRG_ADMIN=2999;//陶然居管理员的公用编号，能访问陶然居所有的门
	public static final long DLXC_ADMIN=3999;//东篱新村管理员的公用编号，能访问东篱新村所有的门

	public static final long TRXC_OWNER=1000;//陶然新村业主的公用编号，能访问陶然新村所有的公共大门
	public static final long TRG_OWNER=2000;//陶然居业主的公用编号，能访问陶然居所有的公共大门
	public static final long DLXC_OWNER=3000;//东篱新村业主的公用编号，能访问东篱新村所有的公共大门
}

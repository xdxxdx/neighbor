package cn.icrat.service;

import cn.icrat.common.MD5Util;
import cn.icrat.common.Util;
import cn.icrat.constant.Const;
import cn.icrat.dao.*;
import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.RestResponse;
import cn.icrat.dao.entity.*;
import cn.icrat.service.BackendService;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BackendService {

	@Resource
	private AccountDao accountDao;

	@Resource
	private ShareInfoDao shareInfoDao;

	@Resource
	private WithdrawDao withdrawDao;

	@Resource
	private AmountDetailDao amountDetailDao;

	@Resource
	private SuggestDao suggestDao;

	@Resource
	private CommunityDao communityDao;
	@Resource
	private ProvincesDao provincesDao;

	@Resource
	private CitiesDao citiesDao;

	@Resource
	private AreasDao areasDao;

	@Resource
	private NoticeDao noticeDao;

	@Resource
	private CommentDao commentDao;

	@Resource
	private UserDao userDao;
	@Resource
	private MessageDao messageDao;

	@Resource
	private CarsharingDao carsharingDao;
	@Resource
	private GuardDao guardDao;

	public String login(String email, String password,HttpSession session) {
		Account account = accountDao.findByProperty("email", email);
		String e = MD5Util.MD5(email);
		String pw = MD5Util.MD5(e + password);
		if (account != null && account.getPassword().equals(pw)){
			session.setAttribute("account", account);
			return "index";
		}
		else
			return "redirect:login?errcode=1";
	}
	public static void main(String args[]){
//		String e= MD5Util.MD5("brand@icrat.cn");
//		String pw= MD5Util.MD5(e + "brand@julong");
//		String e= MD5Util.MD5("taoranxincun@icrat.cn");
//		String pw= MD5Util.MD5(e + "taoranxincun@julong");
//		String e= MD5Util.MD5("dongli@icrat.cn");
//		String pw= MD5Util.MD5(e + "dongli@julong");
		String e= MD5Util.MD5("taoranju@icrat.cn");
		String pw= MD5Util.MD5(e + "taoranju@julong");
		System.out.println(pw);
	}

	public List listShare() {
		return shareInfoDao.loadAll();
	}

	public boolean deleteShare(Long id) {
		ShareInfo sh = new ShareInfo();
		sh.setId(id);
		shareInfoDao.delete(sh);
		return true;
	}
	public Integer updateShareTop(ShareInfo shareInfo){
		return shareInfoDao.updateShareTop(shareInfo);
	}

	public Integer updateShareStatus(ShareInfo shareInfo){
		return shareInfoDao.updateShareStatus(shareInfo);
	}

	public List listWithdraw() {
		return withdrawDao.loadAll();
	}
	public boolean doWithdraw(Long id) {
		Withdraw wd = withdrawDao.findByProperty("id", id);
		wd.setState(1);
		withdrawDao.save(wd);

		AmountDetail ad = amountDetailDao
				.findByProperty("id", wd.getDetailId());
		ad.setFinishTime(System.currentTimeMillis());
		amountDetailDao.save(ad);
		return true;
	}

	public List listSuggest() {
		return suggestDao.loadAll();
	}
	public List listSuggestByCommunityId(Long communityId){
		return suggestDao.listSuggestByCommunityId(communityId);
	}

	public List listCommunity() {
		return communityDao.loadAll();
	}

	public boolean addCommunity(String name, Long provinceId, Long cityId,
			Long areaId) {
		Community community = new Community();
		community.setName(name);
		community.setProvince(provincesDao.findByProperty("id", provinceId));
		community.setCity(citiesDao.findByProperty("id", cityId));
		community.setArea(areasDao.findByProperty("id", areaId));
		communityDao.save(community);
		return true;
	}

	public boolean deleteCommunity(Long id) {
		Community community = communityDao.findByProperty("id", id);
		communityDao.delete(community);
		return true;
	}

	public List listAmountdetail() {
		return amountDetailDao.loadAll();
	}

	public List listNotice() {
		return noticeDao.loadAll();
	}

	public boolean addNotice(String title, String author, String info,
			Integer type, String picUrl) {
		Notice notice = new Notice();
		notice.setTitle(title);
		notice.setAuthor(author);
		notice.setInfo(info);
		notice.setType(type);
		notice.setImage(picUrl);
		noticeDao.save(notice);
		return true;
	}

	public boolean deleteNotice(Long id) {
		Notice notice = new Notice();
		notice.setId(id);
		noticeDao.delete(notice);
		return true;
	}
	public Integer updateNoticeStatus(Notice notice){
		return noticeDao.updateNoticeStatus(notice);
	}

	/*
	 * 评论
	 */

	public List listComment() {
		return commentDao.listComments();
	}

	public boolean deleteComment(Long id) {
		Comment comment = new Comment();
		comment.setId(id);
		commentDao.delete(comment);
		return true;
	}

	/*
	 * 系统消息
	 */
	public List listSystemMsg() {
		return messageDao.listMessage(null, 0, 1000).getItems();
	}

	public boolean deleteSystemMsg(Long id) {
		Message message = new Message();
		message.setId(id);
		messageDao.delete(message);
		return true;
	}

	/*
	 * 顺风车管理
	 */
	public List listCarSharing() {
		return carsharingDao.listAllCarsharing();
	}

	public boolean deleteCarSharing(Long id) {
		Carsharing carsharing = new Carsharing();
		carsharing.setId(id);
		carsharingDao.delete(carsharing);
		return true;
	}

	/*
	 * 门禁管理
	 */
	public List<Guard> listGuard() {
		return guardDao.getAllActiveGuardList();
	}

	/**
	 * 根据小区获取门禁，并且在门禁前面显示小区名称
	 * @return
	 */
	public List<Guard>listGuardGroupBycommunityId(String guardNo){
		List<Guard>list=guardDao.getGuardListGroupByCommunity();
		String guardArr[]=null;
		if(guardNo!=null&&!guardNo.equals("")){
			 guardArr=guardNo.split(",");
		}
		for (Guard guard : list) {
			if(guard.getCommunityId()== Const.TRXC){
				guard.setGuardName("陶然新村-"+guard.getGuardName());
			}else if(guard.getCommunityId()== Const.TRG){
				guard.setGuardName("陶然居-"+guard.getGuardName());
			}else if(guard.getCommunityId()== Const.DLXC){
				guard.setGuardName("东篱新村-"+guard.getGuardName());
			}
			if(guardArr!=null&&guardArr.length>0){
				for (String s : guardArr) {
					if(s.equals(guard.getId())){
						guard.setIsChoiced(1);
					}
				}
			}
		}
		return list;
	}
	public Guard getGuardById(long id){
		return guardDao.get(id);
	}
	 
	public Object saveGuard(Integer type,Guard guard){
		Object result=0;
		if(type==1){
			result=guardDao.saveRePk(guard);
		}else{
			result=guardDao.updateGuard(guard);
		}
		return result;
	}
	public Guard getGuardByCommunityIdAndName(Long communityId,String guardName){
		return guardDao.getGuardBycommunityIdAndName(communityId, guardName);
	}
	public Integer deleteGuard(Guard guard){
		return guardDao.hiddenGuard(guard);
	}

}

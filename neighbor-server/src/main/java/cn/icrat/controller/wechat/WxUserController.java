package cn.icrat.controller.wechat;

import cn.icrat.aop.OperateLogAspect;
import cn.icrat.constant.Const;
import cn.icrat.constant.ERole;
import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Guard;
import cn.icrat.dao.entity.User;
import cn.icrat.service.BackendService;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.FloorService;
import cn.icrat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/user")
public class WxUserController {

	@Autowired(required = true)
	private UserService userService;
	@Autowired
	private BackendService backendService;

	@Autowired
	private CommunityInfoService communityInfoService;

	@Autowired
	private FloorService floorService;

	@RequestMapping(value = "/getOpenIdByCode", method = RequestMethod.GET)
	@ResponseBody
	public String getOpenIdByCode(String code) {
		return userService.getOpenIdByCode(code);
	}

	@RequestMapping(value = "/findUserByOpenID", method = RequestMethod.GET)
	@ResponseBody
	public User findUserByOpenID(String openId) {
		return userService.findUserByOpenID(openId);
	}

	@RequestMapping(value = "/checkUserAccount", method = RequestMethod.GET)
	@ResponseBody
	public User checkUserAccount(String code, HttpServletRequest req) {
		String openId = userService.getOpenIdByCode(code);
		User user = userService.findUserByOpenID(openId);
//		User user=null;
		if (user == null) {
			user = new User();
			user.setId(0);
			user.setOpenId(openId);
		} else if (user.getState() != 0) {
			//state==0表示审核通过，-1是未审核，1冻结
			return null;
			// /user.setLv(999);
		}else{
			if(user.getState()==0){
				//记录最后登录时间和地址
				String ip= OperateLogAspect.getIpAdrress( req );
				user.setLastIp( ip );
				userService.lastLogin(user);
			}
		}
		return user;
	}
	@RequestMapping(value = "/userGuardPwd", method = RequestMethod.GET)
	@ResponseBody
	public DataResponse getGuardPwd(long id){
		User user = userService.findUserById(id);
		if(user.getRole().equals(ERole.propertyManager.toString())){
			user.setGuardPwd(String.valueOf(Const.ALLGUARD));
		}else if(user.getRole().equals(ERole.TrxcManager.toString())){
			user.setGuardPwd(String.valueOf(Const.TRXC_ADMIN));
		} else if (user.getRole().equals(ERole.TrgManager.toString())) {
			user.setGuardPwd(String.valueOf(Const.TRG_ADMIN));
		}else if(user.getRole().equals( ERole.DlxcManager.toString())){
			user.setGuardPwd(String.valueOf(Const.DLXC_ADMIN));
		}else{
			Set<String> guardPwdSet = new HashSet<>();
			//业主
			String guardPwd="";
			if(user.getGuardNo()!=null&&!user.getGuardNo().equals("")){
				String guardArr[] = user.getGuardNo().split(",");

				for (String s : guardArr) {
					Floor floor=floorService.getEntityById( Long.parseLong( s ) );
					if(floor!=null){
						CommunityInfo communityInfo = communityInfoService.getCommunityByCommunityId( floor.getCommunityId() );
						guardPwdSet.add( communityInfo.getOwnerGuard() );
						guardPwdSet.add( floor.getGuardNo() );
					}
				}
			}else{
				//直接用楼栋的编号作为
				CommunityInfo communityInfo = communityInfoService.getCommunityByCommunityId( user.getCommunityId() );
				guardPwdSet.add( communityInfo.getOwnerGuard() );
				Floor floor = floorService.getEntityById( user.getFloorId());
				if(floor!=null){
					guardPwdSet.add(floor.getGuardNo());
				}
			}
			guardPwd=String.join("",guardPwdSet);
			user.setGuardPwd(guardPwd);
		}
		return new DataResponse(user.getGuardPwd());
	}

	@RequestMapping(value = "/findNeighborsByOpenId", method = RequestMethod.GET)
	@ResponseBody
	public DataResponse findNeighborsByOpenId(String openId, Integer pageIndex) {
		User user = userService.findUserByOpenID(openId);
		if (user == null)
			return new DataResponse(1, "用户不存在");
		List users = userService.findNeighbors(user.getOpenId(),
				user.getCommunityId(), pageIndex);
		return new DataResponse(users);
	}

	@RequestMapping(value = "/findCountAndNeighbors", method = RequestMethod.GET)
	@ResponseBody
	public DataResponse findCountAndNeighbors(String openId) {
		User user = userService.findUserByOpenID(openId);
		if (user == null)
			return new DataResponse(1, "用户不存在");
		return new DataResponse(userService.findCountAndNeighbors(
				user.getOpenId(), user.getCommunityId()));
	}

	@RequestMapping(value = "/registerOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public DataResponse registerOrUpdate(String openId, String mobile,
			String address, Integer gender, String describe, String nickName,
			String avatarUrl, Long communityId, Long floorId,Long roomId,String education,
			String interest, Integer age,String realName,String cardNo) {
		return new DataResponse(userService.registerOrUpdate(openId, mobile,
				address, gender, describe, nickName, avatarUrl, communityId,floorId,roomId,
				education, interest, age,realName,cardNo));
	}



	@RequestMapping(value = "/changeRole", method = RequestMethod.POST)
	@ResponseBody
	public Integer changeRole(User user) {
		return userService.updateRole(user);
	}



}

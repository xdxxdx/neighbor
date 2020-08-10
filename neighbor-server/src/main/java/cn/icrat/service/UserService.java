package cn.icrat.service;

import cn.icrat.common.Util;
import cn.icrat.constant.Const;
import cn.icrat.dao.GuardDao;
import cn.icrat.dao.UserDao;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.*;

import cn.icrat.util.wx.ParamModel;
import cn.icrat.util.wx.WXUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Resource
    private UserDao userDao;
    @Autowired
    private GuardDao guardDao;

    @Autowired
    private CommunityInfoService communityInfoService;

    @Autowired
    private FloorService floorService;
    @Autowired
    private RoomService roomService;

    public String getOpenIdByCode(String code) {
        return WXUtil.jscode2session(code);

    }

    public User findUserByOpenID(String openId) {
        User user= userDao.findUserByOpenID(openId);
        if(user!=null){
            if(user.getCommunityId()!=null){
                CommunityInfo communityInfo=communityInfoService.getCommunityByCommunityId( user.getCommunityId() );
                user.setCommunityInfo( communityInfo );
            }
            if(user.getFloorId()!=null){
                Floor floor=floorService.getEntityById(user.getFloorId());
                user.setFloor( floor );
            }
            if(user.getRoomId()!=null){
                Room room = roomService.getEntityById( user.getRoomId() );
                user.setRoom( room );
            }
        }

        return user;
    }

    public User findUserById(long id) {
        User user= userDao.findUserByID(id);
        if(user!=null){
            if(user.getCommunityId()!=null){
                CommunityInfo communityInfo=communityInfoService.getCommunityByCommunityId( user.getCommunityId() );
                user.setCommunityInfo( communityInfo );
            }
            if(user.getFloorId()!=null){
                Floor floor=floorService.getEntityById(user.getFloorId());
                user.setFloor( floor );
            }
            if(user.getRoomId()!=null){
                Room room = roomService.getEntityById( user.getRoomId() );
                user.setRoom( room );
            }
        }
        return user;
    }

    public User registerOrUpdate(String openId, String mobile, String address, Integer gender,
                                 String summary, String nickName, String avatarUrl, Long communityId,Long floorId,Long roomId,
                                 String education, String interest, Integer age, String realName, String cardNo) {
        User user = userDao.findUserByOpenID(openId);
        if (user == null) {
            user = new User();
            user.setHeartPoint(50);
            user.setLv(1);
            user.setState(-1);
            user.setSigntime(0L);
            user.setSignnum(0);
            user.setRole("owner");
        }
        user.setOpenId(openId);
        user.setMobile(mobile);
        user.setCommunityId(communityId );
        user.setFloorId(floorId );
        user.setRoomId(roomId);
        CommunityInfo communityInfo=communityInfoService.getCommunityByCommunityId( communityId);
        if(communityInfo!=null){
            user.setAddress(communityInfo.getCommunityName()+" "+floorId);
        }
        user.setGender(gender);
        user.setSummary(summary);
        user.setNickName((nickName.length() < 8) ? nickName : Util.getCnEnStrByBitLen(nickName, (nickName.length() > 17) ? 17 : nickName.length()));
        user.setCommunityId(communityId);
        user.setEducation(education);
        user.setInterest(interest);
        user.setAge(age);
        user.setAvatarUrl(avatarUrl);
        user.setRealName(realName);
        user.setCardNo(cardNo);
        userDao.saveOrUpdate(user);
        return user;
    }


    public List findNeighbors(String openId, Long communityId, Integer pageIndex) {
        PaginationResult pr = userDao.findNeighbors(openId, communityId, pageIndex);
        return pr.getItems();
    }

    public Map findCountAndNeighbors(String openId, Long communityId) {
        Map data = new HashMap();
        Integer num = userDao.countNeighbor(communityId);
        data.put("count", num);
        PaginationResult pr = userDao.findNeighbors(openId, communityId, 1);
        data.put("data", pr.getItems());
        return data;
    }


    public List listUser() {
        List<User> list = userDao.loadAll();
        for (User user : list) {
            String guardNo = user.getGuardNo();
            String guardName = "";
            if (guardNo != null && !guardNo.equals("")) {
                String guardArr[] = guardNo.split(",");

                if (guardArr.length > 0) {
                    for (String s : guardArr) {
                        Guard guard = guardDao.get(Long.valueOf(s));
                        if (guard != null) {
                            guardName = guardName + "  " + Const.community.get(guard.getCommunityId().toString()) + guard.getGuardName();
                        }

                    }

                }

            }
            user.setGuardNo(guardName);
        }
        return list;
    }


    public boolean changeState(Long id, int state) {
        User user = userDao.findUserByID(id);
        user.setState(state);
        userDao.update(user);
        return true;
    }

    public Integer updateRole(User user) {
        return userDao.updateRole(user);
    }

    public Integer updateGuardNo(User user) {
        return userDao.updateGuardNo(user);
    }

    public Integer saveUser(User user) {
        Integer result = 0;
        result = userDao.updateUser(user);
        return result;
    }

    public List<User> listUserByCommunityId(Long commuintyId) {
        return userDao.listUserByCommunityId(commuintyId);
    }

    public List<User>getUserListByPm(ParamModel pm){
        List<User>userList=userDao.getListByPm( pm );
        for (User user : userList) {
            if(user.getCommunityId()!=null&&!user.getCommunityId().equals( 0 )){
                CommunityInfo communityInfo=communityInfoService.getCommunityByCommunityId( user.getCommunityId() );
                user.setCommunityInfo( communityInfo );
            }
            if(user.getFloorId()!=null&&!user.getFloorId().equals( 0 )){
                Floor floor=floorService.getEntityById(user.getFloorId());
                user.setFloor( floor );
            }
            if(user.getRoomId()!=null&&!user.getRoomId().equals( 0 )){
                Room room = roomService.getEntityById( user.getRoomId() );
                user.setRoom( room );
            }
            if(user.getGuardNo()!=null){
                String guardInfo="";
                String guardArr[] = user.getGuardNo().split(",");
                for (String s : guardArr) {
                    Floor floor=floorService.getEntityById( Long.parseLong( s ) );
                    if(floor!=null){
                        CommunityInfo communityInfo = communityInfoService.getCommunityByCommunityId( floor.getCommunityId() );
                        guardInfo+=communityInfo.getCommunityName()+" "+floor.getFloorCode()+",";
                    }
                }
                user.setGuardInfo(guardInfo);
            }

        }

    return userList;
    }

    public Map<String,Object>getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", getUserListByPm( pm ));
        maps.put("count", userDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }

    public Integer lastLogin(User user){
        return userDao.lastLogin( user );
    }
}

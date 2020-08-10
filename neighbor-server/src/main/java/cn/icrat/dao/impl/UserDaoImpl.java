package cn.icrat.dao.impl;

import cn.icrat.dao.UserDao;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.User;

import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.*;
import org.springframework.stereotype.Repository;

import cn.icrat.dao.base.BaseDAOImpl;

import java.util.List;

@Repository
public class UserDaoImpl extends BaseDAOImpl<User> implements UserDao {


    @Override
    public User findUserByID(long id) {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        criteria.add(Restrictions.eq("id", id));

        return this.findOne(criteria);
    }

    @Override
    public User findUserByOpenID(String openId) {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        criteria.add(Restrictions.eq("openId", openId));
        return this.findOne(criteria);
    }

    @Override
    public PaginationResult findNeighbors(String openId, Long communityId, Integer pageIndex)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        criteria.add(Restrictions.eq("communityId", communityId));
        criteria.add(Restrictions.ne("openId", openId));
        if (pageIndex == null)
            pageIndex = 1;
        return this.find(criteria, 10, pageIndex);
    }

    @Override
    public Integer countNeighbor(Long communityId)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        criteria.add(Restrictions.eq("communityId", communityId));
        return this.count(criteria);
    }

    @Override
    public Long countHeartPoint(Long communityId)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        criteria.add(Restrictions.eq("communityId", communityId));
        criteria.setProjection(Projections.sum("heartPoint"));
        List list = this.find(criteria);
        return (list.size() > 0 && list.get(0) != null) ? (Long)(list.get(0)) : 0L;
    }

    @Override
    public List listUserByRank(Long communityId, String search)
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
        if (communityId != null && communityId != 0)
            criteria.add(Restrictions.eq("communityId", communityId));
        if (search != null && search.length() > 0)
            criteria.add(Restrictions.like("nickName", search, MatchMode.ANYWHERE));
        criteria.addOrder(Order.desc("heartPoint"));
        return this.find(criteria);
    }

	@Override
	public Integer updateRole(User user) {
		String sql="update user set lastUpdateDate="+System.currentTimeMillis();
		if(user.getRole()!=null){
		    sql+=",role='"+user.getRole()+"'";
        }
		if(user.getIsStaff()!=null){
		    sql+=",isStaff="+user.getIsStaff();
        }
		sql+=" where id="+user.getId();
		return updateBySql(sql);
	}

	@Override
	public Integer updateGuardNo(User user) {
		String sql="update user set guardNo='"+user.getGuardNo()+"' where id="+user.getId();
		return updateBySql(sql);
	}

    @Override
    public Integer updateUser(User user) {
        String sql="update user set lastUpdateDate="+System.currentTimeMillis();
        if(user.getCommunityId()!=null){
            sql+=", communityId="+user.getCommunityId();
        }
        if(user.getRealName()!=null){
            sql+=",realName='"+user.getRealName()+"'";
        }
        if(user.getAddress()!=null){
            sql+=",address='"+user.getAddress()+"'";
        }
        if(user.getAge()!=null){
            sql+=",age="+user.getAge();
        }
        if(user.getCardNo()!=null){
            sql+=",cardNo='"+user.getCardNo()+"'";
        }
        if(user.getEducation()!=null){
            sql+=",education='"+user.getEducation()+"'";
        }
        if(user.getFloorId()!=null){
            sql+=",floorId="+user.getFloorId();
        }
        if(user.getRoomId()!=null){
            sql+=",roomId="+user.getRoomId();
        }
        if(user.getIsStaff()!=null){
            sql+=",isStaff="+user.getIsStaff();
        }
        sql+=" where id="+user.getId();
        return updateBySql(sql);
    }
    public List listUserByCommunityId(Long communityId) {
        DetachedCriteria criteria = this.criteriaReady();
        criteria.add(Restrictions.eq("communityId", communityId));
        criteria.addOrder(Order.desc("id"));
        return this.find(criteria);
    }

    @Override
    public List<User> getListByPm(ParamModel pm) {
        String sql="select * from user where id is not null ";
        if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals( "" )){
            sql+=" and communityId="+pm.getCommunityId();
        }
        if(pm.getUserName()!=null&&!pm.getUserName().equals( "" )){
            sql+=" and (nickName like '%"+pm.getUserName()+"%' or mobile like '%"+pm.getUserName()+"%' or realName like '%"+pm.getUserName()+"%')";
        }
        if (pm.getIsStaff() != null && !pm.getIsStaff().equals( "" )) {
            sql+=" and isStaff="+pm.getIsStaff();
        }
        if(pm.getState()!=null&&!pm.getState().equals( "" )){
            sql+=" and state="+pm.getState();
        }
        sql+=" order by id desc";
        return findTListBySql( sql, pm );
    }

    @Override
    public Integer getSizeByParam(ParamModel pm) {
        String sql="select count(*) from user where id is not null ";
        if(pm.getCommunityId()!=null&&!pm.getCommunityId().equals( "" )){
            sql+=" and communityId="+pm.getCommunityId();
        }
        if(pm.getUserName()!=null&&!pm.getUserName().equals( "" )){
            sql+=" and (nickName like '%"+pm.getUserName()+"%' or mobile like '%"+pm.getUserName()+"%' or realName like '%"+pm.getUserName()+"%')";
        }
        if (pm.getIsStaff() != null && !pm.getIsStaff().equals( "" )) {
            sql+=" and isStaff="+pm.getIsStaff();
        }
        if(pm.getState()!=null&&!pm.getState().equals( "" )){
            sql+=" and state="+pm.getState();
        }
        return Integer.parseInt(getSigleColumnBySql( sql ).toString());
    }

    @Override
    public Integer lastLogin(User user) {
        String sql="update user set lastUpdateDate="+System.currentTimeMillis()+", lastIp='"+user.getLastIp()+"' where id="+user.getId();
        return updateBySql( sql );

    }
}

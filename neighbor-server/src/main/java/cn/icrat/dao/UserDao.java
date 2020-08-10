package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.User;
import cn.icrat.util.wx.ParamModel;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public interface UserDao extends BaseDAO<User> {

    User findUserByID(long id);

    User findUserByOpenID(String openId);

    PaginationResult findNeighbors(String openId, Long communityId, Integer pageIndex);

    Integer countNeighbor(Long communityId);

    Long countHeartPoint(Long communityId);

    List listUserByRank(Long communityId, String search);
    Integer updateRole(User user);
    Integer updateGuardNo(User user);
    Integer updateUser(User user);
    List listUserByCommunityId(Long communityId);

    List<User>getListByPm(ParamModel pm);
    Integer getSizeByParam(ParamModel pm);

    Integer lastLogin(User user);

}

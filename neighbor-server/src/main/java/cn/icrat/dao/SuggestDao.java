package cn.icrat.dao;

import java.util.List;
import java.util.Map;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Suggest;
import cn.icrat.dao.entity.Test;
import cn.icrat.util.wx.ParamModel;

public interface SuggestDao extends BaseDAO<Suggest> {
	List listSuggestByCommunityId(Long communityId);
	public List<Map<String,Object>>getMListByParam(ParamModel pm);


	/**
	 * 获取管理员数目
	 *
	 * @param pm
	 * @return
	 */
	public Integer getSizeByParam(ParamModel pm);

	public Integer updateStatus(Suggest suggest);

}

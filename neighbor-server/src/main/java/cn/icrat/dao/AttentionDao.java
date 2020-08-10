package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Attention;

import java.util.List;

public interface AttentionDao extends BaseDAO<Attention> {

    PaginationResult listAttention(Long userId, Integer type, Integer pageIndex);

    Attention checkAttention(Long userId, Integer type, Long targetId);

    Integer countAttention(Integer type, Long targetId);

    PaginationResult findLikeUser(Integer type, Long targetId);

}

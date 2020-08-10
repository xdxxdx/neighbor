package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Comment;
import cn.icrat.dao.entity.Test;

import java.util.List;

public interface CommentDao extends BaseDAO<Comment> {
    List findComments(Integer type, Long targetId);

    List listComments();



}

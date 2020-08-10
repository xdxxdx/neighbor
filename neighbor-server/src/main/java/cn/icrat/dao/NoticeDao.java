package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Guard;
import cn.icrat.dao.entity.Notice;
import cn.icrat.dao.entity.Test;

import java.util.List;

public interface NoticeDao extends BaseDAO<Notice> {
    PaginationResult listNotices();

    PaginationResult listSwiper();
    Integer updateNoticeStatus(Notice notice);

}

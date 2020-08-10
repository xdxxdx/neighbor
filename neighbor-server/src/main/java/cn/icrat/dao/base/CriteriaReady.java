package cn.icrat.dao.base;

import org.hibernate.criterion.DetachedCriteria;

public interface CriteriaReady {
    boolean ready(DetachedCriteria var1);

    int getSize();

    int getPage();
}

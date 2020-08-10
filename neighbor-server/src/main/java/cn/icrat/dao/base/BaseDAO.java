package cn.icrat.dao.base;

import java.io.Serializable;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;

public interface BaseDAO<T extends BaseDomain> {
	void save(T var1);

	Object saveRePk(T entity);

	T get(Serializable var1);

	void delete(T var1);

	void saveOrUpdate(T var1);

	void update(T var1);

	List<T> loadAll();

	List<?> find(DetachedCriteria var1);

	T findOne(DetachedCriteria var1);

	T findByProperty(String var1, Object var2);

	int count();

	int count(DetachedCriteria var1);

	PaginationResult find(DetachedCriteria var1, int var2, int var3);

	PaginationResult find(DetachedCriteria var1, int var2, int var3, int var4);

	PaginationResult find(CriteriaReady var1);

	List<T> queryByCreateDateRange(Long var1, Long var2);

	Integer updateBySql(String sql);

	List<T> findTListBySql(String sql);
}

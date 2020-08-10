package cn.icrat.dao.base;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import cn.icrat.util.wx.ParamModel;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.RootEntityResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;

public class BaseDAOImpl<T extends BaseDomain> implements BaseDAO<T> {
    private Class<T> entityClass;
    @Autowired
    private HibernateTemplate hibernateTemplate;

    public BaseDAOImpl() {
        Type genType = this.getClass().getGenericSuperclass();
        if (genType instanceof ParameterizedType) {
            Type[] params = ((ParameterizedType)genType).getActualTypeArguments();
            this.entityClass = (Class)params[0];
        }

    }

    protected DetachedCriteria criteriaReady() {
        return DetachedCriteria.forClass(this.entityClass);
    }

    public void save(T entity) {
        hibernateTemplate.setCheckWriteOperations(false);
        this.getHibernateTemplate().save(entity);
        hibernateTemplate.flush();
    }
    public Object saveRePk(T entity){
    	 hibernateTemplate.setCheckWriteOperations(false);
    	 Object result= this.getHibernateTemplate().save(entity);
         hibernateTemplate.flush();
         return result;
    }

    public T get(Serializable id) {
        return this.getHibernateTemplate().get(this.entityClass, id);
    }

    public void delete(T entity) {
        hibernateTemplate.setCheckWriteOperations(false);
        this.getHibernateTemplate().delete(entity);
        hibernateTemplate.flush();
    }

    public void saveOrUpdate(T entity) {
        hibernateTemplate.setCheckWriteOperations(false);
        this.getHibernateTemplate().saveOrUpdate(entity);
        hibernateTemplate.flush();
    }

    public void update(T entity) {
        hibernateTemplate.setCheckWriteOperations(false);
        this.getHibernateTemplate().update(entity);
        hibernateTemplate.flush();
    }

    public List<T> loadAll() {
        return this.getHibernateTemplate().loadAll(this.entityClass);
    }

    public List<?> find(String hql, Object... params) {
        return this.getHibernateTemplate().find(hql, params);
    }

    public List find(DetachedCriteria criteria) {
        return this.getHibernateTemplate().findByCriteria(criteria);
    }

    public T findOne(DetachedCriteria criteria) {
        List rt = this.find(criteria);
        return rt != null && rt.size() > 0 ? (T)rt.get(0) : null;
    }

    public T findByProperty(String property, Object value) {
        DetachedCriteria criteria = DetachedCriteria.forClass(this.entityClass);
        criteria.add(Restrictions.eq(property, value));
        return this.findOne(criteria);
    }

    public int count() {
        DetachedCriteria criteria = DetachedCriteria.forClass(this.entityClass);
        criteria.setProjection(Projections.rowCount());
        return ((Long)this.hibernateTemplate.findByCriteria(criteria).get(0)).intValue();
    }

    public int count(DetachedCriteria criteria) {
        criteria.setProjection(Projections.rowCount());
        return ((Long)this.hibernateTemplate.findByCriteria(criteria).get(0)).intValue();
    }

    public PaginationResult find(DetachedCriteria detachedCriteria, int pageSize, int pageIndex) {
        detachedCriteria = detachedCriteria.setProjection(Projections.rowCount());
        int totalCount = ((Long)this.hibernateTemplate.findByCriteria(detachedCriteria).get(0)).intValue();
        detachedCriteria = detachedCriteria.setProjection((Projection)null);
        detachedCriteria.setResultTransformer(RootEntityResultTransformer.INSTANCE);
        int startIndex = this.getStartIndex(totalCount, pageSize, pageIndex);
        List items = this.hibernateTemplate.findByCriteria(detachedCriteria, startIndex, pageSize);
        return new PaginationResult(pageIndex, pageSize, totalCount, items);
    }

    public PaginationResult find(DetachedCriteria detachedCriteria, int pageSize, int pageIndex, int offset) {
        detachedCriteria = detachedCriteria.setProjection(Projections.rowCount());
        int totalCount = ((Long)this.hibernateTemplate.findByCriteria(detachedCriteria).get(0)).intValue();
        detachedCriteria = detachedCriteria.setProjection((Projection)null);
        detachedCriteria.setResultTransformer(RootEntityResultTransformer.INSTANCE);
        int startIndex = this.getStartIndex(totalCount, pageSize, pageIndex, offset);
        List items = this.hibernateTemplate.findByCriteria(detachedCriteria, startIndex, pageSize);
        return new PaginationResult(pageIndex, pageSize, totalCount, items);
    }

    public PaginationResult find(CriteriaReady params) {
        DetachedCriteria criteria = this.criteriaReady();
        return params.ready(criteria) ? this.find(criteria, params.getSize(), params.getPage()) : new PaginationResult();
    }

    public List<T> queryByCreateDateRange(Long from, Long to) {
        DetachedCriteria criteria = this.criteriaReady();
        if (from != null) {
            criteria.add(Restrictions.ge("createDate", from));
        }

        if (to != null) {
            criteria.add(Restrictions.lt("createDate", to));
        }

        return this.find(criteria);
    }

    private int getStartIndex(int totalCount, int pageSize, int pageIndex, int offset) {
        if (totalCount <= 0) {
            return 0;
        } else if (pageIndex == 1) {
            return 0;
        } else {
            int maxIndex = totalCount / pageSize;
            if (totalCount % pageSize > 0) {
                ++maxIndex;
            }

            return pageIndex >= maxIndex ? (maxIndex - 1) * pageSize + offset : (pageIndex - 1) * pageSize + offset;
        }
    }

    private int getStartIndex(int totalCount, int pageSize, int pageIndex) {
        if (totalCount <= 0) {
            return 0;
        } else {
            int maxIndex = totalCount / pageSize;
            if (totalCount % pageSize > 0) {
                ++maxIndex;
            }

            return pageIndex >= maxIndex ? (maxIndex - 1) * pageSize : (pageIndex - 1) * pageSize;
        }
    }

    public HibernateTemplate getHibernateTemplate() {
        return this.hibernateTemplate;
    }

    public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
        this.hibernateTemplate = hibernateTemplate;
    }
    /////////////////////xdx添加的用sql语句存取数据的方法///////////////////////////////////////

    public Integer updateBySql(String sql) {
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		int result = query.executeUpdate();
		return result;
	}
	/**
	 * 根据sql获取实体列表，不分页
	 * 
	 * @param sql
	 * @return
	 */
	public List<T> findTListBySql(String sql) {
		List<T> list = null;
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		query.addEntity(entityClass);
		list = query.list();
		return list;
	}
    public long addT(T t) {
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        long id = (long) session.save(t);
        return id;
    }

    /**
     * 删除实体
     *
     * @param t
     * @return
     */
    public Integer deleteT(T t) {
        int result = 0;
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        try {
            session.delete(t);
            result = 1;
        } catch (Exception e) {
            e.printStackTrace();
            result = 0;
        }
        return result;
    }

    /**
     * 根据sql获取map的列表
     *
     * @param sql
     * @return
     */
    public List<Map<String, Object>> findMapListBySql(String sql) {
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        SQLQuery query = session.createSQLQuery(sql);
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Map<String, Object>> list = query.list();
        return list;
    }
    public List<Map<String, Object>> findMapListBySql(String sql,
                                                      ParamModel paramModel) {
        List<Map<String, Object>> list = null;
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        SQLQuery query = session.createSQLQuery(sql);
        query.setFirstResult(paramModel.getLimit()
                * (paramModel.getPage() - 1));
        query.setMaxResults(paramModel.getLimit());
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        list = query.list();
        return list;
    }


    /**
     * 根据sql获取实体列表，并且分页
     *
     * @param sql
     * @return
     */
    public List<T> findTListBySql(String sql, ParamModel paramModel) {
        List<T> list = null;
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        SQLQuery query = session.createSQLQuery(sql);
        query.setFirstResult(paramModel.getLimit()
                * (paramModel.getPage() - 1));
        query.setMaxResults(paramModel.getLimit());
        query.addEntity(entityClass);
        list = query.list();
        return list;
    }

    /**
     * 获取单行单列数据
     *
     * @param sql
     * @return
     */
    public Object getSigleColumnBySql(String sql) {
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        SQLQuery query = session.createSQLQuery(sql);
        Object object = query.uniqueResult();
        return object;
    }
    /**
     * 根据sql获取实体
     *
     * @param sql
     * @return
     */
    public T findTBySql(String sql) {
        List<T> list = null;
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        System.out.println(session);
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(entityClass);
        list = query.list();
        if (!list.isEmpty()) {
            return list.get(0);
        }
        return null;
    }

}

package cn.icrat.dao.base;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseDomain implements Serializable {
    private long id;
    private long createDate;
    private long lastUpdateDate;

    public BaseDomain() {
        createDate = System.currentTimeMillis();
        lastUpdateDate = System.currentTimeMillis();
    }

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(long createDate) {
        this.createDate = createDate;
    }

    public long getLastUpdateDate() {
        return this.lastUpdateDate;
    }

    public void setLastUpdateDate(long lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}

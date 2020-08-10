package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;

@DynamicInsert(true)
@DynamicUpdate(true)
@Entity
public class Param extends BaseDomain {
    private Integer lockTime;
    private String carBanner;
    private String houseBanner;
    private Integer isDel;

    @Basic
    @Column(name = "lock_time")
    public Integer getLockTime() {
        return lockTime;
    }

    public void setLockTime(Integer lockTime) {
        this.lockTime = lockTime;
    }
    @Basic
    @Column(name = "is_del")
    public Integer getIsDel() {
        return isDel;
    }

    public void setIsDel(Integer isDel) {
        this.isDel = isDel;
    }
    @Basic
    @Column(name = "car_banner")
    public String getCarBanner() {
        return carBanner;
    }

    public void setCarBanner(String carBanner) {
        this.carBanner = carBanner;
    }
    @Basic
    @Column(name = "house_banner")
    public String getHouseBanner() {
        return houseBanner;
    }

    public void setHouseBanner(String houseBanner) {
        this.houseBanner = houseBanner;
    }
}

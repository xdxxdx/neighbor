package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;

@DynamicInsert(true)
@DynamicUpdate(true)
@Entity
public class Floor extends BaseDomain {
    private String floorCode;
    private String floorName;
    private Long communityId;
    private String guardNo;
    private Integer isDel;
    private Integer isChoiced=0;

    @Basic
    @Column(name = "floor_code")

    public String getFloorCode() {
        return floorCode;
    }

    public void setFloorCode(String floorCode) {
        this.floorCode = floorCode;
    }
    @Basic
    @Column(name = "floor_name")
    public String getFloorName() {
        return floorName;
    }

    public void setFloorName(String floorName) {
        this.floorName = floorName;
    }
    @Basic
    @Column(name = "community_id")
    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }
    @Basic
    @Column(name = "guard_no")
    public String getGuardNo() {
        return guardNo;
    }

    public void setGuardNo(String guardNo) {
        this.guardNo = guardNo;
    }

    @Basic
    @Column(name = "is_del")
    public Integer getIsDel() {
        return isDel;
    }

    public void setIsDel(Integer isDel) {
        this.isDel = isDel;
    }

    @Transient
    public Integer getIsChoiced() {
        return isChoiced;
    }

    public void setIsChoiced(Integer isChoiced) {
        this.isChoiced = isChoiced;
    }
}

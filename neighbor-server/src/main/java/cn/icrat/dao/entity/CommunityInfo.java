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
public class CommunityInfo extends BaseDomain {
    private Long communityId;
    private String adminGuard;
    private String ownerGuard;
    private String communityName;
    private Integer isDel;
    @Basic
    @Column(name = "community_id")
    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }
    @Basic
    @Column(name = "community_name")
    public String getCommunityName() {
        return communityName;
    }

    public void setCommunityName(String communityName) {
        this.communityName = communityName;
    }
    @Basic
    @Column(name = "admin_guard")
    public String getAdminGuard() {
        return adminGuard;
    }

    public void setAdminGuard(String adminGuard) {
        this.adminGuard = adminGuard;
    }
    @Basic
    @Column(name = "owner_guard")
    public String getOwnerGuard() {
        return ownerGuard;
    }

    public void setOwnerGuard(String ownerGuard) {
        this.ownerGuard = ownerGuard;
    }

    @Basic
    @Column(name = "is_del")
    public Integer getIsDel() {
        return isDel;
    }

    public void setIsDel(Integer isDel) {
        this.isDel = isDel;
    }
}

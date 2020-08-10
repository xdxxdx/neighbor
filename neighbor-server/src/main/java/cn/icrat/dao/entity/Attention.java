package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Objects;

@Entity
public class Attention extends BaseDomain {
    private Integer type;   //0 收藏内容  1 关注用户
    private Long userId;
    private Long targetId;

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "userId")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "targetId")
    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Attention attention = (Attention) o;
        return Objects.equals(type, attention.type) &&
                Objects.equals(userId, attention.userId) &&
                Objects.equals(targetId, attention.targetId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(type, userId, targetId);
    }
}

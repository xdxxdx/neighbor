package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@DynamicUpdate
public class Test extends BaseDomain {

    private String nickName;

    public Test()
    {
        super();
    }
    @Basic
    @Column(name = "nickName")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

}

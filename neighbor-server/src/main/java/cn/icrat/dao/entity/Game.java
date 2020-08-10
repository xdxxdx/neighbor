package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Objects;

@Entity
public class Game  extends BaseDomain {
    private String mobile;
    private int gstate;
    private String gkey;

    @Basic
    @Column(name = "mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "gstate")
    public int getGstate() {
        return gstate;
    }

    public void setGstate(int state) {
        this.gstate = state;
    }

    @Basic
    @Column(name = "gkey")
    public String getGkey() {
        return gkey;
    }

    public void setGkey(String key) {
        this.gkey = key;
    }


}

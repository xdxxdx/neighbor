package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class CarsharingOrders extends BaseDomain {
    private String orderNo;
    private User user;
    private Integer num;
    private Carsharing carsharing;

    @Basic
    @Column(name = "orderNo")
    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    @Basic
    @Column(name = "num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "carsharingId")
    public Carsharing getCarsharing() {
        return carsharing;
    }

    public void setCarsharing(Carsharing carsharing) {
        this.carsharing = carsharing;
    }


}

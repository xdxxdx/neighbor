package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Carsharing extends BaseDomain {
    private Long departTime;
    private String carnum;
    private String startpoint;
    private String destination;
    private Integer seat;
    private User user;
    private Integer carsharingType;
    private List<CarsharingOrders> carsharingOrdersList = new ArrayList<CarsharingOrders>();

    @Basic
    @Column(name = "departTime")
    public Long getDepartTime() {
        return departTime;
    }

    public void setDepartTime(Long departTime) {
        this.departTime = departTime;
    }

    @Basic
    @Column(name = "carnum")
    public String getCarnum() {
        return carnum;
    }

    public void setCarnum(String carnum) {
        this.carnum = carnum;
    }

    @Basic
    @Column(name = "startpoint")
    public String getStartpoint() {
        return startpoint;
    }

    public void setStartpoint(String startpoint) {
        this.startpoint = startpoint;
    }

    @Basic
    @Column(name = "destination")
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    @Basic
    @Column(name = "seat")
    public Integer getSeat() {
        return seat;
    }

    public void setSeat(Integer seat) {
        this.seat = seat;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Carsharing that = (Carsharing) o;
        return Objects.equals( departTime, that.departTime ) &&
                Objects.equals( carnum, that.carnum ) &&
                Objects.equals( startpoint, that.startpoint ) &&
                Objects.equals( destination, that.destination ) &&
                Objects.equals( seat, that.seat );
    }

    @Override
    public int hashCode() {

        return Objects.hash( departTime, carnum, startpoint, destination, seat );
    }

    public Integer getCarsharingType() {
        return carsharingType;
    }

    public void setCarsharingType(Integer carsharingType) {
        this.carsharingType = carsharingType;
    }

    @Transient
    public List<CarsharingOrders> getCarsharingOrdersList() {
        return carsharingOrdersList;
    }

    public void setCarsharingOrdersList(List<CarsharingOrders> carsharingOrdersList) {
        this.carsharingOrdersList = carsharingOrdersList;
    }
}

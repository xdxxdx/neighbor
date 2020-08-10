package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Community extends BaseDomain {
    private String name;
    private Areas area;
    private Provinces province;
    private Cities city;

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "areaId")
    public Areas getArea() {
        return area;
    }

    public void setArea(Areas area) {
        this.area = area;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provinceId")
    public Provinces getProvince() {
        return province;
    }

    public void setProvince(Provinces province) {
        this.province = province;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cityId")
    public Cities getCity() {
        return city;
    }

    public void setCity(Cities city) {
        this.city = city;
    }
}

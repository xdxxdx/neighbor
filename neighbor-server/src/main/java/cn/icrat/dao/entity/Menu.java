package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;
import java.util.List;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
public class Menu extends BaseDomain {
    private Integer menuType;
    private String menuName;
    private String menuSrc;
    private Integer menuLevel;
    private Long rMenuId;
    private Long pMenuId;
    private String menuIntro;
    private Integer priority1;
    private Integer priority2;
    private Integer priority3;
    private Integer isDel;

    private List<Menu> child;

    @Basic
    @Column(name = "menu_type")
    public Integer getMenuType() {
        return menuType;
    }

    public void setMenuType(Integer menuType) {
        this.menuType = menuType;
    }
    @Basic
    @Column(name = "menu_name")
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }
    @Basic
    @Column(name = "menu_level")
    public Integer getMenuLevel() {
        return menuLevel;
    }

    public void setMenuLevel(Integer menuLevel) {
        this.menuLevel = menuLevel;
    }
    @Basic
    @Column(name = "r_menu_id")
    public Long getrMenuId() {
        return rMenuId;
    }

    public void setrMenuId(Long rMenuId) {
        this.rMenuId = rMenuId;
    }
    @Basic
    @Column(name = "p_menu_id")
    public Long getpMenuId() {
        return pMenuId;
    }

    public void setpMenuId(Long pMenuId) {
        this.pMenuId = pMenuId;
    }
    @Basic
    @Column(name = "menu_intro")
    public String getMenuIntro() {
        return menuIntro;
    }

    public void setMenuIntro(String menuIntro) {
        this.menuIntro = menuIntro;
    }
    @Basic
    @Column(name = "priority1")
    public Integer getPriority1() {
        return priority1;
    }

    public void setPriority1(Integer priority1) {
        this.priority1 = priority1;
    }
    @Basic
    @Column(name = "priority2")
    public Integer getPriority2() {
        return priority2;
    }

    public void setPriority2(Integer priority2) {
        this.priority2 = priority2;
    }
    @Basic
    @Column(name = "priority3")
    public Integer getPriority3() {
        return priority3;
    }

    public void setPriority3(Integer priority3) {
        this.priority3 = priority3;
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
    @Column(name = "menu_src")
    public String getMenuSrc() {
        return menuSrc;
    }

    public void setMenuSrc(String menuSrc) {
        this.menuSrc = menuSrc;
    }

    @Transient
    public List<Menu> getChild() {
        return child;
    }

    public void setChild(List<Menu> child) {
        this.child = child;
    }
}

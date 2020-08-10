package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Objects;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
public class Notice extends BaseDomain {
    private String title;
    private String info;
    private String author;
    private Integer type;       //0:物业公告 1:街道办通知  2:首页宣传轮播
    private String image;
    private Integer status;//0.

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "info")
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Basic
    @Column(name = "author")
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

	public Integer getStatus() {
		return status;
	}

    @Basic
    @Column(name = "status")
	public void setStatus(Integer status) {
		this.status = status;
	}
    
}

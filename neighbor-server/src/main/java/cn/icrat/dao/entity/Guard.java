package cn.icrat.dao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import cn.icrat.dao.base.BaseDomain;

/**
 * Guard entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "guard", catalog = "neighbor")
@DynamicInsert(true)
@DynamicUpdate(true)
public class Guard extends BaseDomain implements java.io.Serializable {

	// Fields

	private Integer isDel;
	private Long communityId;
	private Integer guardType;
	private String guardName;
	private String guardNo;
	private Integer isChoiced=0;

	// Constructors

	/** default constructor */
	public Guard() {
	}

	@Column(name = "isDel")
	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	@Column(name = "communityId")
	public Long getCommunityId() {
		return this.communityId;
	}

	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
	}

	@Column(name = "guardType")
	public Integer getGuardType() {
		return this.guardType;
	}

	public void setGuardType(Integer guardType) {
		this.guardType = guardType;
	}

	@Column(name = "guardName", length = 200)
	public String getGuardName() {
		return this.guardName;
	}

	public void setGuardName(String guardName) {
		this.guardName = guardName;
	}

	@Column(name = "guardNo",length = 20)
	public String getGuardNo() {
		return this.guardNo;
	}

	public void setGuardNo(String guardNo) {
		this.guardNo = guardNo;
	}

	public Integer getIsChoiced() {
		return isChoiced;
	}

	public void setIsChoiced(Integer isChoiced) {
		this.isChoiced = isChoiced;
	}
}
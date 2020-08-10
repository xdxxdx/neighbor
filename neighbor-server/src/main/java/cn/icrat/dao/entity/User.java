package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Objects;


@Entity
public class User extends BaseDomain {

    private String openId;
    private String mobile;
    private String address;
    private Integer gender;
    private String summary;
    private Long communityId;
    private Long floorId;
    private Long roomId;
    private String education;
    private String interest;
    private String nickName;
    private Integer age;
    private String avatarUrl;
    private Integer heartPoint;
    private Integer state;
    private Integer lv;
    private Long signtime;
    private Integer signnum;
    private String role;
    private String guardNo;
    private String guardPwd;
    private String realName;
    private String cardNo;
    private CommunityInfo communityInfo=new CommunityInfo();
    private Floor floor=new Floor();
    private Room room=new Room();

    private String lastIp;

    private String guardInfo;

    private Integer isStaff;

    public User()
    {
        super();
    }

    @Basic
    @Column(name = "openId")
    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    @Basic
    @Column(name = "mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "gender")
    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    @Basic
    @Column(name = "summary")
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    @Basic
    @Column(name = "education")
    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    @Basic
    @Column(name = "interest")
    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }

    @Basic
    @Column(name = "nickName")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @Basic
    @Column(name = "age")
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Integer getHeartPoint() {
        return heartPoint;
    }

    public void setHeartPoint(Integer heartPoint) {
        this.heartPoint = heartPoint;
    }


    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getLv() {
        return lv;
    }

    public void setLv(Integer lv) {
        this.lv = lv;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }

    public Long getFloorId() {
        return floorId;
    }

    public void setFloorId(Long floorId) {
        this.floorId = floorId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getSigntime() {
        return signtime;
    }

    public void setSigntime(Long signtime) {
        this.signtime = signtime;
    }

    public Integer getSignnum() {
        return signnum;
    }

    public void setSignnum(Integer signnum) {
        this.signnum = signnum;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getGuardNo() {
		return guardNo;
	}

	public void setGuardNo(String guardNo) {
		this.guardNo = guardNo;
	}
    public String getGuardPwd() {
        return guardPwd;
    }

    public void setGuardPwd(String guardPwd) {
        this.guardPwd = guardPwd;
    }
    @Basic
    @Column(name = "realName")
    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }
    @Transient
    public CommunityInfo getCommunityInfo() {
        return communityInfo;
    }

    public void setCommunityInfo(CommunityInfo communityInfo) {
        this.communityInfo = communityInfo;
    }
    @Transient
    public Floor getFloor() {
        return floor;
    }

    public void setFloor(Floor floor) {
        this.floor = floor;
    }
    @Transient
    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getLastIp() {
        return lastIp;
    }

    public void setLastIp(String lastIp) {
        this.lastIp = lastIp;
    }

    @Transient
    public String getGuardInfo() {
        return guardInfo;
    }

    public void setGuardInfo(String guardInfo) {
        this.guardInfo = guardInfo;
    }
    @Basic
    @Column(name = "isStaff")
    public Integer getIsStaff() {
        return isStaff;
    }

    public void setIsStaff(Integer isStaff) {
        this.isStaff = isStaff;
    }
}

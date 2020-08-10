package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;

@DynamicInsert(true)
@DynamicUpdate(true)
@Entity
public class Room extends BaseDomain {
    private Long floorId;
    private String roomCode;
    private Long roomName;
    private Integer isDel;

    @Basic
    @Column(name = "floor_id")
    public Long getFloorId() {
        return floorId;
    }

    public void setFloorId(Long floorId) {
        this.floorId = floorId;
    }




    @Basic
    @Column(name = "room_code")
    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
    @Basic
    @Column(name = "room_name")
    public Long getRoomName() {
        return roomName;
    }

    public void setRoomName(Long roomName) {
        this.roomName = roomName;
    }
    @Basic
    @Column(name = "is_del")
    public Integer getIsDel() {
        return isDel;
    }

    public void setIsDel(Integer isDel) {
        this.isDel = isDel;
    }
}

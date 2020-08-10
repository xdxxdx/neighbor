package cn.icrat.dao;

import cn.icrat.dao.base.BaseDAO;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Room;
import cn.icrat.util.wx.ParamModel;

import java.util.List;
import java.util.Map;

public interface RoomDao extends BaseDAO<Room> {


    public Long addEntity(Room room);

    public Integer hiddenEntity(Room room);


    public Integer updateEntity(Room room);

    /**
     * 获取管理员列表
     *
     * @param pm
     * @return
     */
    public List<Room> getListByParam(ParamModel pm);



    /**
     * 获取管理员数目
     *
     * @param pm
     * @return
     */
    public Integer getSizeByParam(ParamModel pm);

    public Room getRoomByFloorIdAndRoomCode(Long floorCode, String roomCode);
    public List<Room>getRoomListByFloorId(Long floorId);



}

package cn.icrat.service;

import cn.icrat.dao.RoomDao;
import cn.icrat.dao.entity.Room;
import cn.icrat.util.wx.ParamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoomService {
    @Autowired
    private RoomDao roomDao;

    public Room getEntityById(Long id){
        return roomDao.get(id);
    }

    public Room getRoomByFloorIdAndRoomCode(Long floorId, String roomCode) {
        return roomDao.getRoomByFloorIdAndRoomCode(floorId, roomCode);
    }

    public Map<String,Object> getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", roomDao.getListByParam(pm));
        maps.put("count", roomDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }

    public Integer saveRoom(Room room) {
        Room tmp = getRoomByFloorIdAndRoomCode(room.getFloorId(), room.getRoomCode());
        if (tmp != null) {
            return -1;
        }else{
            return Integer.parseInt(roomDao.saveRePk(room).toString());
        }

    }

    public Integer hiddenRoom(Room room) {
        return roomDao.hiddenEntity(room);
    }
    public List<Room> getRoomListByFloorId(Long floorId){
        return roomDao.getRoomListByFloorId( floorId );
    }
}

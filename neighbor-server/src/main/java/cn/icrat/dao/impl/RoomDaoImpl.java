package cn.icrat.dao.impl;

import cn.icrat.dao.FloorDao;
import cn.icrat.dao.RoomDao;
import cn.icrat.dao.base.BaseDAOImpl;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Room;
import cn.icrat.util.wx.MapUtil;
import cn.icrat.util.wx.ParamModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RoomDaoImpl extends BaseDAOImpl<Room> implements RoomDao {

    @Override
    public Long addEntity(Room room) {
        return (Long) saveRePk(room);
    }

    @Override
    public Integer hiddenEntity(Room room) {
        String sql="update room set is_del=1 where id="+room.getId();
        return updateBySql(sql);
    }

    @Override
    public Integer updateEntity(Room room) {
        String sql="update room set lastUpdateDate='"+System.currentTimeMillis()+"'";
        if(room.getFloorId()!=null){
            sql+=",floor_id='"+room.getFloorId()+"'";
        }
        if (room.getRoomCode() != null) {
            sql += ",room_code='" + room.getRoomCode() + "'";
        }
        sql+=" where id="+room.getId();
        return updateBySql(sql);
    }

    @Override
    public List<Room> getListByParam(ParamModel pm) {
        String sql="select * from room where is_del=0 ";
        if (pm.getFloorId() != null) {
            sql+=" and floor_id="+pm.getFloorId();
        }
        sql+=" order by "+pm.getSortname()+ " "+pm.getSortorder();
        return findTListBySql(sql, pm);
    }

    @Override
    public Integer getSizeByParam(ParamModel pm) {
        String sql="select count(*) from room where is_del=0 ";
        if (pm.getFloorId() != null) {
            sql+=" and floor_id="+pm.getFloorId();
        }
        return Integer.parseInt(getSigleColumnBySql(sql).toString());
    }

    @Override
    public Room getRoomByFloorIdAndRoomCode(Long floorId, String roomCode) {
        String sql="select * from room where is_del=0 and floor_id='"+floorId+"' and room_code='"+roomCode+"'" ;
        return findTBySql(sql);
    }

    public List<Room>getRoomListByFloorId(Long floorId){
        String sql = "select * from room where is_del=0 and floor_id=" + floorId + " order by id";
        return findTListBySql( sql );
    }
}

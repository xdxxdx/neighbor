package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Room;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.FloorService;
import cn.icrat.service.RoomService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RoomController {
    @Autowired
    private CommunityInfoService communityInfoService;
    @Autowired
    private FloorService floorService;
    @Autowired
    private RoomService roomService;
    @RequestMapping("roomMgr")
    public ModelAndView roomMgr(Floor floor){
        ModelAndView mv=new ModelAndView("room/RoomList");
        floor = floorService.getEntityById(floor.getId());
        mv.addObject("floor", floor);
        CommunityInfo communityInfo = communityInfoService.getCommunityByCommunityId(floor.getCommunityId());
        mv.addObject("communityInfo",communityInfo);
        return mv;
    }

    @ResponseBody
    @RequestMapping("roomList")
    public JSONObject roomList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=roomService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("roomSave")
    public String roomSave(Room room){
        return roomService.saveRoom(room).toString();
    }
    @ResponseBody
    @RequestMapping("roomDel")
    public String floorDel(Room room){
        Integer result=roomService.hiddenRoom(room);
        return result.toString();
    }

    @RequestMapping("roomJsonByFloorId")
    @ResponseBody
    public JSONObject roomJsonByFloorId(Long floorId){
        List<Room>roomList=roomService.getRoomListByFloorId(floorId);
        JSONObject jsonObject=new JSONObject();
        for(Room room:roomList){
            jsonObject.put(room.getId(), room.getRoomCode());
        }
        return jsonObject;
    }
}

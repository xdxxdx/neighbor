package cn.icrat.controller.wechat;

import cn.icrat.dao.base.DataResponse;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.FloorService;
import cn.icrat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WxCommunityController {

    @Autowired
    private CommunityInfoService communityInfoService;

    @Autowired
    private FloorService floorService;

    @Autowired
    private RoomService roomService;

    @RequestMapping("wxCommunityList")
    public DataResponse wxCommunityList(){
        return new DataResponse(communityInfoService.getAllCommunityList());
    }
    @RequestMapping("wxFloorList")
    public DataResponse wxFloorList(Long communityId){
        return new DataResponse( floorService.getFloorListByCommunityId( communityId) );
    }
    @RequestMapping("wxRoomList")
    public DataResponse wxRoomList(Long floorId){
        return new DataResponse( roomService.getRoomListByFloorId(floorId));
    }

}

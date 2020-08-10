package cn.icrat.controller.wechat;

import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.entity.User;
import cn.icrat.service.BusinessService;
import cn.icrat.service.CarsharingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WxCarsharingController {

    @Autowired
    private BusinessService businessService;
    @Autowired
    private CarsharingService carsharingService;


    @RequestMapping(value = "/wxMyPublishSeat", method = RequestMethod.GET)
    public DataResponse wxMyPublishSeat(Long userId)
    {
        return new DataResponse( carsharingService.getCarsharingListByUserId( userId ) );
    }
    @RequestMapping(value = "/wxDeleteCarsharing")
    public Integer wxDeleteCarsharing(Long id){
        return carsharingService.deleteCarsharing( id );
    }


}

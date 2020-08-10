package cn.icrat.service;

import cn.icrat.dao.CarsharingDao;
import cn.icrat.dao.CarsharingOrdersDao;
import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.entity.Carsharing;
import cn.icrat.dao.entity.CarsharingOrders;
import cn.icrat.dao.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsharingService {
    @Autowired
    private CarsharingDao carsharingDao;
    @Autowired
    private CarsharingOrdersDao carsharingOrdersDao;

    public DataResponse getCarsharingListByUserId(Long userId){
        List <Carsharing>items = carsharingDao.listCarsharingByUser( userId );
        for (Carsharing element : items) {
            Long carsharingId=element.getId();
            List<CarsharingOrders> orderList = carsharingOrdersDao.getCarsharingOrderListByCarsharingId( carsharingId );
            element.setCarsharingOrdersList( orderList );
        }
        return new DataResponse( items );
    }

    public Integer deleteCarsharing(Long id){
        return carsharingDao.deleteCarsharing( id );
    }

}

package cn.icrat.service;


import java.util.List;

public interface ItemService {


    boolean saveOrUpdateItem(Long id, String name, Integer firstType, Integer secondType, Integer payType, Integer deliverIndex,
                     Integer num, String price, String info, String picUrl, Long userId, Integer stayTime, Long communityId);

    boolean downItem(Long id);

    List listItem();
}

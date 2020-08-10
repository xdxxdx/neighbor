package cn.icrat.service;

import cn.icrat.common.Util;
import cn.icrat.dao.*;
import cn.icrat.dao.base.DataResponse;
import cn.icrat.dao.base.PaginationResult;
import cn.icrat.dao.base.RestResponse;
import cn.icrat.dao.entity.*;
import cn.icrat.sensitivewd.WordFilter;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BusinessService {

    private static Integer HeartPointRate = 100;

    @Resource
    private UserDao userDao;
    @Resource
    private ItemDao itemDao;
    @Resource
    private ItempicDao itempicDao;
    @Resource
    private AmountDetailDao amountDetailDao;
    @Resource
    private OrdersDao ordersDao;

    @Resource
    private ShareInfoDao shareInfoDao;

    @Resource
    private WithdrawDao withdrawDao;

    @Resource
    private SuggestDao suggestDao;

    @Resource
    private ProvincesDao provincesDao;

    @Resource
    private CitiesDao citiesDao;

    @Resource
    private AreasDao areasDao;

    @Resource
    private CommunityDao communityDao;

    @Resource
    private AttentionDao attentionDao;

    @Resource
    private NoticeDao noticeDao;

    @Resource
    private CommentDao commentDao;

    @Resource
    private CarsharingDao carsharingDao;

    @Resource
    private CarsharingOrdersDao carsharingOrdersDao;

    @Resource
    private MessageDao messageDao;

    
    public Map<String, List> listItem(Long userId, Integer firstType, Integer secondType, Integer pageIndex, String search, Long communityId) {
        PaginationResult pr = itemDao.listItem(firstType, secondType, pageIndex, search, communityId);
        Map<String, List> listAll = new HashMap<>();
        List<Item> items = pr.getItems();
        listAll.put("items", items);
        List users = new ArrayList();
        items.forEach(item->{
            User user = userDao.findUserByID(item.getUserId());
            Map<String, Object> data = new HashMap<>();
            if(user!=null){
            	data.put("nickName", user.getNickName());
                data.put("avatarUrl", user.getAvatarUrl());
                Integer num = attentionDao.countAttention(3, item.getId());
                data.put("likeNum", num);
                Long likeId = checkAttention(userId, 3, item.getId());
                data.put("likeId", likeId);
            }
            users.add(data);

        });
        listAll.put("users", users);
        return listAll;

    }

    
    public PaginationResult listItemsByUserId(long id, Integer pageIndex, boolean onlyUp) {
        return itemDao.listItemByUserId(id, pageIndex, onlyUp);
    }

    
    public PaginationResult listOrdersByUser(User user, Integer pageIndex) {
        return ordersDao.listOrdersByUser(user, pageIndex);
    }

    
    public PaginationResult listOrdersByItemUserId(Long userId, Integer pageIndex) {
        return ordersDao.listOrdersByItemUserId(userId, pageIndex);
    }

    
    public PaginationResult listAmountDetailByUserId(Long userId, Integer pageIndex)
    {
        return amountDetailDao.listAmountDetailByUserId(userId, pageIndex);
    }

    
    public Map<String, Object> detailInfo(long id) {
        Item item = itemDao.findItemById(id);
        Map<String, Object> data = Util.convertBeanToMap(item);
        User user = userDao.findUserByID(item.getUserId());
        data.put("nickName", user.getNickName());
        data.put("avatarUrl", user.getAvatarUrl());
        data.put("mobile", user.getMobile());
        data.put("address", user.getAddress());
        data.put("openId", user.getOpenId());
        data.put("userId", user.getId());
        data.put("pics", itempicDao.findPicsByItemId(item.getId()));
        return data;
    }

    
    public Integer recharge(String openId, Integer amount)
    {
        int heartPoint = amount * HeartPointRate;
        if (heartPoint > 50000)
        {
            heartPoint += 80;
        }
        else if (heartPoint > 10000)
        {
            heartPoint += 15;
        }
        else if (heartPoint > 5000)
        {
            heartPoint += 6;
        }
        else if (heartPoint > 3000)
        {
            heartPoint += 3;
        }
        else if (heartPoint > 1000)
        {
            heartPoint += 1;
        }
        User user = userDao.findUserByOpenID(openId);
        user.setHeartPoint(user.getHeartPoint() + heartPoint);
        userDao.update(user);
        AmountDetail ad = new AmountDetail();
        ad.setAmount(amount);
        ad.setHeartPoint(heartPoint);
        ad.setType(0);
        ad.setFinishTime(System.currentTimeMillis());
        ad.setUserId(user.getId());
        ad.setBalance(user.getHeartPoint());
        amountDetailDao.save(ad);
        return user.getHeartPoint();

    }

    
    public Integer withDraw(String openId, Integer heartPoint, String bankcard, String bankname, String subbranch, String realName)
    {
        int amount = heartPoint / HeartPointRate;

        User user = userDao.findUserByOpenID(openId);
        user.setHeartPoint(user.getHeartPoint() - heartPoint);
        userDao.update(user);

        AmountDetail ad = new AmountDetail();
        ad.setAmount(amount);
        ad.setHeartPoint(heartPoint);
        ad.setType(1);
        ad.setUserId(user.getId());
        ad.setBalance(user.getHeartPoint());
        amountDetailDao.save(ad);

        Withdraw wd = new Withdraw();
        wd.setAmount(amount);
        wd.setHeartPoint(heartPoint);
        wd.setBankcard(bankcard);
        wd.setBankname(bankname);
        wd.setSubbranch(subbranch);
        wd.setRealName(realName);
        wd.setUser(user);
        wd.setState(0);
        wd.setDetailId(ad.getId());
        withdrawDao.save(wd);
        return user.getHeartPoint();

    }


    
    public RestResponse paymentFinish(String name, Long id, String openId, int fee, int num, boolean isHeartPoint)
    {
        Item item = itemDao.findItemById(id);
        if (item.getNum() < num)
            return new RestResponse(1, "数量不足，支付失败");
        int leftNum = item.getNum() - num;
        item.setNum(leftNum);
        itemDao.update(item);

        DataResponse res = new DataResponse();
        Map<String, Integer> data = new HashMap();

        User user = userDao.findUserByOpenID(openId);
        User sellUser = userDao.findUserByID(item.getUserId());
        if (isHeartPoint)
        {
            //买家
            int point = user.getHeartPoint() - fee;
            user.setHeartPoint(point);
            userDao.update(user);
            data.put("heartPoint", point);

            AmountDetail ad = new AmountDetail();
            ad.setAmount(0);
            ad.setHeartPoint(fee);
            ad.setType(4);
            ad.setUserId(user.getId());
            ad.setBalance(point);
            ad.setTargetId(sellUser.getId());
            ad.setItemId(item.getId());
            ad.setFinishTime(System.currentTimeMillis());
            amountDetailDao.save(ad);
            //卖家
            point = sellUser.getHeartPoint() + fee;
            sellUser.setHeartPoint(point);
            userDao.update(sellUser);

            ad = new AmountDetail();
            ad.setAmount(0);
            ad.setHeartPoint(fee);
            ad.setType(5);
            ad.setUserId(sellUser.getId());
            ad.setBalance(point);
            ad.setTargetId(user.getId());
            ad.setItemId(item.getId());
            ad.setFinishTime(System.currentTimeMillis());
            amountDetailDao.save(ad);
        }
        else {

            //买家
            AmountDetail ad = new AmountDetail();
            ad.setAmount(fee);
            ad.setHeartPoint(0);
            ad.setType(4);
            ad.setUserId(user.getId());
            ad.setBalance(user.getHeartPoint());
            ad.setTargetId(item.getUserId());
            ad.setItemId(item.getId());
            ad.setFinishTime(System.currentTimeMillis());
            amountDetailDao.save(ad);

            //卖家
            int point = sellUser.getHeartPoint() + fee * HeartPointRate;
            sellUser.setHeartPoint(point);
            userDao.update(sellUser);

            ad = new AmountDetail();
            ad.setAmount(0);
            ad.setHeartPoint(fee * HeartPointRate);
            ad.setType(5);
            ad.setUserId(sellUser.getId());
            ad.setBalance(point);
            ad.setTargetId(user.getId());
            ad.setItemId(item.getId());
            ad.setFinishTime(System.currentTimeMillis());
            amountDetailDao.save(ad);
        }

        Orders order = new Orders();
        order.setTitle(name);
        order.setFee(fee);
        order.setUser(user);
        order.setItem(item);
        order.setPayType((isHeartPoint) ? 0 : 1);
        order.setNum(num);
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        order.setOrderNo(sdf.format(d));
        ordersDao.save(order);
        data.put("leftNum", leftNum);
        res.setData(data);

        Message message = new Message();
        message.setUserId(sellUser.getId());
        String[] buyText = {"预订", "预订", "参加"};
        String[] buyNum = {"数量", "数量", "人数"};
        message.setTitle(user.getNickName() + buyText[item.getFirstType()] + "了您发布的" + item.getNum());
        message.setInfo(buyNum[item.getFirstType()] + ": " + num);
        message.setType(1);
        messageDao.save(message);
        return res;
    }

    public Integer sendHeartpoint(Long userId, Long targetId, Integer num) {
        User senderUser = userDao.findUserByID(userId);
        User targetUser = userDao.findUserByID(targetId);
        Integer leftPoint = 0;
        //赠送者
        Integer lastPoint = senderUser.getHeartPoint();
        Integer currentPoint = lastPoint - num;
        if (currentPoint < 0)
            return lastPoint;
        leftPoint = currentPoint;
        senderUser.setHeartPoint(currentPoint);
        AmountDetail ad = new AmountDetail();
        ad.setAmount(0);
        ad.setHeartPoint(num);
        ad.setType(2);
        ad.setUserId(userId);
        ad.setBalance(currentPoint);
        ad.setTargetId(targetId);
        ad.setItemId(0L);
        ad.setFinishTime(System.currentTimeMillis());
        amountDetailDao.save(ad);
        //接收者
        lastPoint = targetUser.getHeartPoint();
        currentPoint = lastPoint + num;
        targetUser.setHeartPoint(currentPoint);
        ad = new AmountDetail();
        ad.setAmount(0);
        ad.setHeartPoint(num);
        ad.setType(3);
        ad.setUserId(targetId);
        ad.setBalance(currentPoint);
        ad.setTargetId(userId);
        ad.setItemId(0L);
        ad.setFinishTime(System.currentTimeMillis());
        amountDetailDao.save(ad);

        return leftPoint;
    }

    
    public boolean addShare(String title, String info, String picUrl, Long userId, Long communityId, Integer type)
    {
        ShareInfo si = new ShareInfo();
        si.setTitle(WordFilter.doFilter(title));
        si.setInfo(WordFilter.doFilter(info));
        si.setImages(picUrl);
        si.setReader(0);
        si.setType(type);
        si.setCommunityId(communityId);
        User user = userDao.findUserByID(userId);
        si.setUser(user);
        shareInfoDao.save(si);
        return true;
    }

    
    public PaginationResult listShareInfo(Integer pageIndex, Long communityId, Integer type)
    {
        return shareInfoDao.listShareInfo(pageIndex, communityId, type);
    }



    
    public ShareInfo detailShareInfo(Long id) {
        ShareInfo si = shareInfoDao.findByProperty("id", id);
        si.setReader(si.getReader() + 1);
        shareInfoDao.save(si);
        return si;
    }

    
    public boolean addSuggest(String openId, String title, String info,Long communityId,Integer type)
    {
        User user = userDao.findUserByOpenID(openId);
        Suggest su = new Suggest();
        su.setTitle(title);
        su.setInfo(info);
        su.setUser(user);
        su.setCommunityId(communityId);
        su.setType(type);
        suggestDao.save(su);
        return true;
    }


    public List getProvinces()
    {
        return provincesDao.loadAll();
    }

    public List getCitiesByProvinceId(String id)
    {
        return citiesDao.findByProvinceId(id);
    }

    public List getAreasByCityId(String id)
    {
        return areasDao.findByCityId(id);
    }

    public List getCommunityByAreaId(Long id)
    {
        Areas area = areasDao.findByProperty("id", id);
        return communityDao.findByArea(area);
    }

    public Map getPlaceEditDataByCommunityId(Long id)
    {
        Map<String, Object> map = new HashMap();
        Community community = communityDao.findByProperty("id", id);
        List provinceData = getProvinces();
        map.put("provinceData", provinceData);
        map.put("province", community.getProvince().getId());
        List cityData = getCitiesByProvinceId(community.getProvince().getProvinceid());
        map.put("cityData", cityData);
        map.put("city", cityData.indexOf(community.getCity()) + 1);
        List areaData = getAreasByCityId(community.getCity().getCityid());
        map.put("areaData", areaData);
        map.put("area", areaData.indexOf(community.getArea()) + 1);
        List communityData = getCommunityByAreaId(community.getArea().getId());
        map.put("communityData", communityData);
        map.put("community", communityData.indexOf(community) + 1);
        return map;
    }


    public Long addAttention(Long userId, Integer type, Long targetId) {

        Attention attention = new Attention();
        attention.setType(type);
        attention.setTargetId(targetId);
        attention.setUserId(userId);
        attentionDao.save(attention);
        return attention.getId();
    }

    public boolean delAttention(Long id) {
        Attention attention = attentionDao.findByProperty("id", id);
        attentionDao.delete(attention);
        return true;
    }



    public Long checkAttention(Long userId, Integer type, Long targetId)
    {
        Attention attention = attentionDao.checkAttention(userId, type, targetId);
        return (attention == null) ? 0L : attention.getId();
    }

    public List listAttentionItem(Long userId, Integer pageIndex)
    {
        PaginationResult pr = attentionDao.listAttention(userId, 0, pageIndex);
        List<Attention> attentions = pr.getItems();
        List items = new ArrayList();
        attentions.forEach(attention->{
            Item itemObj = itemDao.findItemById(attention.getTargetId());
            items.add(itemObj);
        });
        return items;

    }

    public List listAttentionUser(Long userId, Integer pageIndex)
    {
        PaginationResult pr = attentionDao.listAttention(userId, 1, pageIndex);
        List<Attention> attentions = pr.getItems();
        List users = new ArrayList();
        attentions.forEach(attention->{
            User userObj = userDao.findUserByID(attention.getTargetId());
            users.add(userObj);
        });
        return users;
    }

    public List listLikeUser(Integer type, Long targetId)
    {
        PaginationResult pr= attentionDao.findLikeUser(type, targetId);
        List<Attention> attentions = pr.getItems();
        List users = new ArrayList();
        attentions.forEach(attention->{
            User userObj = userDao.findUserByID(attention.getUserId());
            users.add(userObj);
        });
        return users;
    }

    public List listNotices() {
        return noticeDao.listNotices().getItems();
    }

    public List listSwiper() {
        return noticeDao.listSwiper().getItems();
    }


    /*
     * 评论
     */
    public List listComment(Integer type, Long targetId)
    {
        return commentDao.findComments(type, targetId);
    }

    public boolean addComment(Long userId, Long targetId, Integer type, String info)
    {
        User user = userDao.findUserByID(userId);
        Comment comment = new Comment();
        comment.setInfo(WordFilter.doFilter(info));
        comment.setTargetId(targetId);
        comment.setUser(user);
        comment.setType(type);
        commentDao.save(comment);
        return true;
    }

    public boolean addCarsharing(Long userId, Long departTime, String carnum, String startpoint, String destination, Integer seat, Integer type)
    {
        Carsharing carsharing = new Carsharing();
        User user = userDao.findUserByID(userId);
        carsharing.setUser(user);
        carsharing.setCarnum(carnum);
        carsharing.setDepartTime(departTime);
        carsharing.setDestination(destination);
        carsharing.setSeat(seat);
        carsharing.setStartpoint(startpoint);
        carsharing.setCarsharingType(type);
        carsharingDao.save(carsharing);
        return true;
    }

    public PaginationResult listCarsharing(Integer pageIndex, String search, Integer type) {

        return carsharingDao.listCarsharing(pageIndex, search, type);
    }

    public Integer orderSeat(Long userId, Integer num, Long carsharingId)
    {
        User user = userDao.findUserByID(userId);
        CarsharingOrders order = new CarsharingOrders();
        order.setUser(user);
        order.setNum(num);
        Carsharing carsharing = carsharingDao.findByProperty("id", carsharingId);
        order.setCarsharing(carsharing);
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        order.setOrderNo(sdf.format(d));
        carsharingOrdersDao.save(order);
        Integer leftNum = carsharing.getSeat() - num;
        carsharing.setSeat(leftNum);
        carsharingDao.save(carsharing);

        Message message = new Message();
        message.setUserId(carsharing.getUser().getId());
        message.setTitle(user.getNickName() + "预约了您发布的顺风车");
        message.setInfo(carsharing.getStartpoint() + " - " + carsharing.getDestination());
        message.setType(1);
        messageDao.save(message);
        return leftNum;
    }

    public PaginationResult listOrderSeat(Long userId, Integer pageIndex)
    {
        User user = userDao.findUserByID(userId);
        return carsharingOrdersDao.listOrderSeat(user, pageIndex);
    }


    public PaginationResult listPublishSeat(Long userId, Integer pageIndex)
    {
        User user = userDao.findUserByID(userId);
        return carsharingOrdersDao.listPublishSeat(user, pageIndex);
//       return carsharingDao.listCarsharingByUser(user,pageIndex);
    }

    public List communityRank()
    {
        class RankData
        {
            String name;
            Long totalPoint;

            public RankData(String name, Long totalPoint)
            {
                this.name = name;
                this.totalPoint = totalPoint;
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public Long getTotalPoint() {
                return totalPoint;
            }

            public void setTotalPoint(Long totalPoint) {
                this.totalPoint = totalPoint;
            }
        }

        List<RankData> list = new ArrayList<RankData>(){
            {
                add(new RankData("陶然新村", userDao.countHeartPoint(7763L)));
                add(new RankData("东篱新村", userDao.countHeartPoint(7764L)));
                add(new RankData("陶然居", userDao.countHeartPoint(7765L)));
            }
        };
        list.sort(Comparator.comparing(RankData::getTotalPoint));//(RankData o1, RankData o2) -> o1.getTotalPoint().compareTo(o2.getTotalPoint()));
        return list;
    }


    public Map personalRank(Long communityId, Long userId, String search)
    {
        Map<String, Object> map = new HashMap<>();
        List<User> userList =  userDao.listUserByRank(communityId, search);
        map.put("rankList", userList);
        List attentionState = new ArrayList();
        for (int i = 0; i < userList.size(); i++)
        {
            User user = userList.get(i);
            Attention attention = attentionDao.checkAttention(userId, 1, user.getId());
            attentionState.add((attention == null) ? 0 : String.valueOf(attention.getId()));
        }
        map.put("attentionStates", attentionState);
        return map;
    }

    /*
     * 消息
     */
    public boolean addMessage(Long userId, String title, String info, Integer type)
    {
        Message message = new Message();
        message.setUserId(userId);
        message.setTitle(title);
        message.setInfo(info);
        message.setType(type);
        messageDao.save(message);
        return true;
    }

    public PaginationResult listMessage(Long userId, Integer type, Integer pageIndex)
    {
        return messageDao.listMessage(userId, type, pageIndex);
    }

    public Map daySign(Long userId)
    {
        Map<String, Object> result = new HashMap<>();
        result.put("newsign", false);
        User user = userDao.findUserByID(userId);
        //今天0点
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Long today = calendar.getTimeInMillis();


        if (today.compareTo(user.getSigntime()) != 0) {
            result.put("newsign", true);
            int num = (today - user.getSigntime() > 86400000 || calendar.get(Calendar.DATE) == 1) ? 1 : user.getSignnum() + 1;
            user.setSignnum(num);
//            int rewardPoint = 10;
//            if (num == 7)
//                rewardPoint = 30;
//            else if (num == 14)
//                rewardPoint = 50;
//            else if (num == 21)
//                rewardPoint = 80;
            int rewardPoint=1;
            user.setHeartPoint(user.getHeartPoint() + rewardPoint);
            user.setSigntime(today);
            userDao.update(user);
            AmountDetail ad = new AmountDetail();
            ad.setAmount(0);
            ad.setHeartPoint(rewardPoint);
            ad.setType(6);
            ad.setUserId(userId);
            ad.setBalance(user.getHeartPoint());
            ad.setTargetId(null);
            ad.setItemId(0L);
            ad.setFinishTime(System.currentTimeMillis());
            amountDetailDao.save(ad);
            result.put("point", rewardPoint);
            result.put("num", num);
        }
        return result;
    }

    public String uploadRes(HttpServletRequest request, HttpServletResponse response) {
        //获取文件需要上传到的路径
        String fileName = "";
        //String path = "D:/wx.icrat.cn/resources/neighbor/res/";
        String path = "D:/nginx-1.10.2/apache-tomcat-8.5.32/webapps/neighbor-res/res/";
        //String path = "D:/";
        try {
            request.setCharacterEncoding("utf-8");  //设置编码
            //获得磁盘文件条目工厂
            DiskFileItemFactory factory = new DiskFileItemFactory();

            //高水平的API文件上传处理
            ServletFileUpload upload = new ServletFileUpload(factory);

            List<FileItem> list = upload.parseRequest(request);
            FileItem picture = null;
            for (FileItem item : list) {
                //获取表单的属性名字
                String name = item.getFieldName();
                //如果获取的表单信息是普通的 文本 信息
                if (item.isFormField()) {
                    //获取用户具体输入的字符串
                    String value = item.getString();
                    request.setAttribute(name, value);
                } else {
                    picture = item;
                }
            }

            //自定义上传图片的名字为
            //String uuid = UUID.randomUUID().toString().replace("-", "").toLowerCase();
            String userId = (String)request.getAttribute("userId");
            String type = (String)request.getAttribute("type");
            String format = (String)request.getAttribute("format");
            fileName = ((type.equals("9") == false) ? System.currentTimeMillis() : ("swiper/" + (String)request.getAttribute("name"))) + "_"  + userId + "_" + type + "." + format;
            String destPath = path + fileName;

            //真正写到磁盘上
            File file = new File(destPath);
            OutputStream out = new FileOutputStream(file);
            InputStream in = picture.getInputStream();
            int length = 0;
            byte[] buf = new byte[1024];
            // in.read(buf) 每次读到的数据存放在buf 数组中
            while ((length = in.read(buf)) != -1) {
                //在buf数组中取出数据写到（输出流）磁盘上
                out.write(buf, 0, length);
            }
            in.close();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileName;
    }




}

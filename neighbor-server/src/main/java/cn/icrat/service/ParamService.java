package cn.icrat.service;

import cn.icrat.anno.Syslog;
import cn.icrat.dao.ParamDao;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Param;
import cn.icrat.util.wx.IOUtil;
import cn.icrat.util.wx.ParamModel;
import cn.icrat.util.wx.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ParamService {
    @Autowired
    private ParamDao paramDao;

    public Param getEntityById(Long id){
        return paramDao.get(id);
    }
//    @Syslog(module = "小区管理",methods = "参数修改")
    public boolean saveEntity(Integer type,Param param){
        if(type==1){
            paramDao.saveRePk(param);
        }else{
            paramDao.updateEntity(param);
        }
        return true;
    }
    public Integer hiddenEntity(Param param){
        return  paramDao.hiddenEntity(param);
    }
    public List<Param> getListByPm(ParamModel pm){
        return paramDao.getListByParam(pm);
    }
    public Map<String,Object> getMapByPm(ParamModel pm){
        Map<String,Object>maps=new HashMap<String, Object>();
        maps.put("data", paramDao.getListByParam(pm));
        maps.put("count", paramDao.getSizeByParam(pm));
        maps.put("code", 0);
        maps.put("msg", "");
        return maps;
    }

    public Integer saveCarBanner(HttpServletRequest req, MultipartFile upload,
                                String uploadFile, Param param) {
        Integer result = 0;
        String originalFileName = upload.getOriginalFilename();
        String suffix = IOUtil.getFileSuffix(originalFileName);
        String fileName = RandomUtil.getTimeStampPlusRand() + "." + suffix;
        String realPath = req.getServletContext().getRealPath(uploadFile);
        String fullPath = realPath + "/" + fileName;
        if (upload != null && upload.getSize() > 0) {
            String oldImg = param.getCarBanner();
            try {
                upload.transferTo(new File(fullPath));
                param.setCarBanner(uploadFile + "/" + fileName);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            result = paramDao.updateCarBanner( param );
            if (result > 0) {
                try {
                    IOUtil.deleteFile(req, oldImg);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            result = 1;
        }
        return result;

    }
    public Integer saveHouseBanner(HttpServletRequest req, MultipartFile upload,
                                 String uploadFile, Param param) {
        Integer result = 0;
        String originalFileName = upload.getOriginalFilename();
        String suffix = IOUtil.getFileSuffix(originalFileName);
        String fileName = RandomUtil.getTimeStampPlusRand() + "." + suffix;
        String realPath = req.getServletContext().getRealPath(uploadFile);
        String fullPath = realPath + "/" + fileName;
        if (upload != null && upload.getSize() > 0) {
            String oldImg = param.getHouseBanner();
            try {
                upload.transferTo(new File(fullPath));
                param.setHouseBanner(uploadFile + "/" + fileName);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            result = paramDao.updateHouseBanner( param );
            if (result > 0) {
                try {
                    IOUtil.deleteFile(req, oldImg);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            result = 1;
        }
        return result;

    }
    public Param getParam(){
        return paramDao.getParam();
    }


}

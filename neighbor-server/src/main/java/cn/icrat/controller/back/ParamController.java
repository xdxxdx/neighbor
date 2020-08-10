package cn.icrat.controller.back;

import cn.icrat.dao.entity.CommunityInfo;
import cn.icrat.dao.entity.Floor;
import cn.icrat.dao.entity.Param;
import cn.icrat.service.CommunityInfoService;
import cn.icrat.service.FloorService;
import cn.icrat.service.ParamService;
import cn.icrat.util.wx.JsonUtil;
import cn.icrat.util.wx.ParamModel;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ParamController {
    private static final String uploadFile = "uploadFiles/paramFile";
    @Autowired
    private ParamService paramService;
    @RequestMapping("paramMgr")
    public ModelAndView floorMgr(){
        ModelAndView mv=new ModelAndView("param/ParamList");
        return mv;
    }
    @RequestMapping("paramEdit")
    public ModelAndView paramEdit(Long id){
        Param param=paramService.getEntityById(id);
        ModelAndView mv=new ModelAndView("param/ParamEdit");
        mv.addObject("param1", param);
        return mv;
    }
    @ResponseBody
    @RequestMapping("paramList")
    public JSONObject paramList(ParamModel pm){
        pm=ParamModel.getSortedPm(pm);
        Map<String,Object> maps=paramService.getMapByPm(pm);
        JSONObject jsonObject= JsonUtil.mapToJsonObject(maps);
        return jsonObject;
    }

    public String paramSave(int type,Param param){
        Integer result=paramService.saveEntity(type,param)?1:0;
        return result.toString();
    }
    @ResponseBody
    @PostMapping("paramSave")
    public String paramSave(Integer type, Param param1, HttpServletRequest req){
        Integer result=paramService.saveEntity(type,param1)?1:0;
        if (result > 0) {
            MultipartFile carBanner = null;
            if (req instanceof MultipartHttpServletRequest) {
                carBanner = ((MultipartHttpServletRequest) req)
                        .getFile("upload1");
            }
            paramService.saveCarBanner(req,carBanner,uploadFile,param1);
            MultipartFile houseBanner = null;
            if (req instanceof MultipartHttpServletRequest) {
                houseBanner = ((MultipartHttpServletRequest) req)
                        .getFile("upload2");
            }
            paramService.saveHouseBanner(req, houseBanner, uploadFile, param1);
        }
        return result.toString();
    }
}

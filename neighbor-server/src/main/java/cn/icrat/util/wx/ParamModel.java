package cn.icrat.util.wx;

public class ParamModel {
	// 通用
	private int page=1;//当前页
//	private int pagesize=15;//每页条数
	private String sortname="id";
	private String sortorder="desc";
	private String sortRule;
	private Integer limit=20;//每页条数
	private int offset=0;//偏移量
	private int totalpage;//总页数
	private Integer type;
	private Integer isDel;
	// 用户管理
	private String adminName;
	private String password;
	private Integer roleId;
	//角色管理
	private String roleName;
	// 菜单
	private Integer menuType;
	private String menuName;
	private Integer pMenuId;
	//轮播管理
	private String carouselName;
	private Integer merchantId;
	private Integer showStatus;
	private Integer carouselPlace;
	private String note;
	//客户管理
	private String userName;
	private String phone;
	private String userNo;
	private String realName;
	private Integer userId;
	private String wxNickName;
	private String ownerStatus;
	private String partnerStatus;
	private String levelId;
	
	//房产管理
	private String cityId;
	private String projectCode;
	private String priceSpan;
	private String areaSpan;
	private String downPayRatioSpan;
	private String isRecommend;
	private String isIndex;
	private String projectName;
	private String status;
	private String proTypeId;
	private String houseType;
	private String searchWord;
	private String immType;
	//标签管理
	private String tagName;
	//国家城市管理
	private String countryName;
	private String countryId;
	private String cityName;
	//返佣
	private String levelName;
	private String isSend;
	private String startTime;
	private String endTime;
	private String startApplyTime;
	private String endApplyTime;
	private String startBackTime;
	private String endBackTime;
	//轮播
	private String showPlace;
	//商户
	private String merchantType;
	private String merchantName;
	private String applyType;
	//统计
	private String pageSrc;
	//广告
	private String advName;

	private String module;
	private String communityName;
	private Long communityId;

	private String floorCode;
	private String floorId;

	private String isStaff;
	private String state;
	

	public static ParamModel getPm() {
		return new ParamModel();
	}
	public static ParamModel getPm(ParamModel pm){
		pm.setOffset((pm.getPage()-1)*pm.getLimit());
		return pm;
	}
	public static ParamModel getSortedPm(ParamModel pm){
		pm.setSortname("id");
		pm.setSortorder("desc");
		return pm;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

//	public int getPagesize() {
//		return pagesize;
//	}
//
//	public void setPagesize(int pagesize) {
//		this.pagesize = pagesize;
//	}

	public String getSortname() {
		return sortname;
	}

	public void setSortname(String sortname) {
		this.sortname = sortname;
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		this.sortorder = sortorder;
	}
	
	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getTotalpage() {
		return totalpage;
	}

	public void setTotalpage(int totalpage) {
		this.totalpage = totalpage;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getMenuType() {
		return menuType;
	}
	public void setMenuType(Integer menuType) {
		this.menuType = menuType;
	}
	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getpMenuId() {
		return pMenuId;
	}
	public void setpMenuId(Integer pMenuId) {
		this.pMenuId = pMenuId;
	}
	public String getCarouselName() {
		return carouselName;
	}
	public void setCarouselName(String carouselName) {
		this.carouselName = carouselName;
	}
	public Integer getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}
	public Integer getShowStatus() {
		return showStatus;
	}
	public void setShowStatus(Integer showStatus) {
		this.showStatus = showStatus;
	}
	public Integer getCarouselPlace() {
		return carouselPlace;
	}
	public void setCarouselPlace(Integer carouselPlace) {
		this.carouselPlace = carouselPlace;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getSortRule() {
		return sortRule;
	}
	public void setSortRule(String sortRule) {
		this.sortRule = sortRule;
	}
	public String getWxNickName() {
		return wxNickName;
	}
	public void setWxNickName(String wxNickName) {
		this.wxNickName = wxNickName;
	}
	public String getOwnerStatus() {
		return ownerStatus;
	}
	public void setOwnerStatus(String ownerStatus) {
		this.ownerStatus = ownerStatus;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getPriceSpan() {
		return priceSpan;
	}
	public void setPriceSpan(String priceSpan) {
		this.priceSpan = priceSpan;
	}
	public String getAreaSpan() {
		return areaSpan;
	}
	public void setAreaSpan(String areaSpan) {
		this.areaSpan = areaSpan;
	}
	public String getDownPayRatioSpan() {
		return downPayRatioSpan;
	}
	public void setDownPayRatioSpan(String downPayRatioSpan) {
		this.downPayRatioSpan = downPayRatioSpan;
	}
	public String getIsRecommend() {
		return isRecommend;
	}
	public void setIsRecommend(String isRecommend) {
		this.isRecommend = isRecommend;
	}
	public String getIsIndex() {
		return isIndex;
	}
	public void setIsIndex(String isIndex) {
		this.isIndex = isIndex;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public String getCountryId() {
		return countryId;
	}
	public void setCountryId(String countryId) {
		this.countryId = countryId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	
	public String getLevelName() {
		return levelName;
	}
	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}
	public String getIsSend() {
		return isSend;
	}
	public void setIsSend(String isSend) {
		this.isSend = isSend;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getStartApplyTime() {
		return startApplyTime;
	}
	public void setStartApplyTime(String startApplyTime) {
		this.startApplyTime = startApplyTime;
	}
	public String getEndApplyTime() {
		return endApplyTime;
	}
	public void setEndApplyTime(String endApplyTime) {
		this.endApplyTime = endApplyTime;
	}
	public String getStartBackTime() {
		return startBackTime;
	}
	public void setStartBackTime(String startBackTime) {
		this.startBackTime = startBackTime;
	}
	public String getEndBackTime() {
		return endBackTime;
	}
	public void setEndBackTime(String endBackTime) {
		this.endBackTime = endBackTime;
	}
	public String getShowPlace() {
		return showPlace;
	}
	public void setShowPlace(String showPlace) {
		this.showPlace = showPlace;
	}
	public String getProTypeId() {
		return proTypeId;
	}
	public void setProTypeId(String proTypeId) {
		this.proTypeId = proTypeId;
	}
	public String getHouseType() {
		return houseType;
	}
	public void setHouseType(String houseType) {
		this.houseType = houseType;
	}
	public String getSearchWord() {
		return searchWord;
	}
	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}
	public String getMerchantType() {
		return merchantType;
	}
	public void setMerchantType(String merchantType) {
		this.merchantType = merchantType;
	}
	public String getMerchantName() {
		return merchantName;
	}
	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
	public String getApplyType() {
		return applyType;
	}
	public void setApplyType(String applyType) {
		this.applyType = applyType;
	}
	public String getPageSrc() {
		return pageSrc;
	}
	public void setPageSrc(String pageSrc) {
		this.pageSrc = pageSrc;
	}
	public String getAdvName() {
		return advName;
	}
	public void setAdvName(String advName) {
		this.advName = advName;
	}
	public String getPartnerStatus() {
		return partnerStatus;
	}
	public void setPartnerStatus(String partnerStatus) {
		this.partnerStatus = partnerStatus;
	}
	public String getLevelId() {
		return levelId;
	}
	public void setLevelId(String levelId) {
		this.levelId = levelId;
	}
	public String getImmType() {
		return immType;
	}
	public void setImmType(String immType) {
		this.immType = immType;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getCommunityName() {
		return communityName;
	}

	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}

	public Long getCommunityId() {
		return communityId;
	}

	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
	}

	public String getFloorCode() {
		return floorCode;
	}

	public void setFloorCode(String floorCode) {
		this.floorCode = floorCode;
	}

	public String getFloorId() {
		return floorId;
	}

	public void setFloorId(String floorId) {
		this.floorId = floorId;
	}

	public String getIsStaff() {
		return isStaff;
	}

	public void setIsStaff(String isStaff) {
		this.isStaff = isStaff;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}

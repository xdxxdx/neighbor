	$(function() {
   		$("#cityCode").remoteChained("#provinceCode", "/address/cityJsonByProvinceCode");
   		var cityCode=$("#cityCode").attr("city-code");
   		var city=$("#cityCode").attr("city");
   		var districtCode=$("#districtCode").attr("district-code");
   		var district=$("#districtCode").attr("district");
   		setTimeout(function(){
   			if(cityCode!=null&&cityCode!=''&&cityCode!='undefined'){
   				$("#cityCode").prepend("<option value="+cityCode+">"+city+"</option>");
   				$("#cityCode").val(cityCode);
   			}
   			//开始初始化区级
   			$("#districtCode").remoteChained("#cityCode", "/address/districtJsonByCityCode");
			if(districtCode!=null&&districtCode!=''&&districtCode!='undefined'){
				setTimeout(function(){
   				$("#districtCode").prepend("<option value="+districtCode+">"+district+"</option>");
   				$("#districtCode").val(districtCode);
   			},500);
			}
   		}, 1000);

     //删除
     $("body").on("click",".deleteimg",function(){
    	 var _this=$(this);
    	 var albumId=_this.attr("photoid");
	 	$.ajax({
			type : 'get',
			url : '/master/albumDelete?albumId=' + albumId,
			dataType : 'json',
			success : function(data) {
				alert("删除成功")
				_this.parent(".up_portrait").remove();
				return true;
			}
		})
    })
     //表单验证
     var validForm={
		message : 'This value is not valid',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			realName : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			phone : {
				message : '表单校验失败',
				validators : {
					    regexp: {
                                regexp: /^1[345678]\d{9}$/,
                                message: '不是合法的电话号码'
                            }
				}
			},
		}
	}
	$('#thisForm').formValidation(validForm);
		var type=$("input[name='type']").val();
		$("#submit1")
				.click(
						function() {
								var $form = $("#thisForm");
								var bv = $form.data('formValidation');
								bv.validate();
								if (bv.isValid()) {
								var checkArr = []; //选中的数组
								var checkStr; //选中的数组的字符串形式，用逗号隔开
								$("input[type='checkbox']:checked").each(function() {
									var _this = $(this);
									console.log(_this.val());
									checkArr.push(_this.val());
								});
								checkStr = checkArr.join(",");
								console.log(checkStr);
								$("#repairClassList").val(checkStr);//可接单师傅类型	
								$.ajax({
									type : 'post',
									url : './save',
									cache : false,
									data : new FormData($('#thisForm')[0]),
									processData : false,
									contentType : false,
									dataType : 'html',
									success : function(data) {
										if (data > 0) {
											alert("成功");
											if(type==1){
												location.href="/master/home";
											}else{
												window.location.reload();
											}
											
										} else {
											alert("失败，请联系技术人员");
										}
									}
								});

							}
						});
		
	});
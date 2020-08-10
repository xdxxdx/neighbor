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
   			},1000);
			}
   		}, 1000);
   		
   		//计算经纬度
   		$("#calc").click(function(){
   			calcCoordinate();
   		})
   		$("#provinceCode").change(function(){
   			calcCoordinate();
   		})
   		$("#cityCode").change(function(){
   			calcCoordinate();
   		})
   		$("#districtCode").change(function(){
   			calcCoordinate();
   		})
   		$("#address").change(function(){
   			calcCoordinate();
   		})
   		function calcCoordinate(){
   			var address=$("#provinceCode").find("option:selected").text()+$("#cityCode").find("option:selected").text()+$("#districtCode").find("option:selected").text()+$("#address").val();
			$.ajax({
				type : 'get',
				url : '/address/qqmapAddress2Coordinate?address=' + address,
				dataType : 'json',
				success : function(data) {
					console.log(data)
					if(data.message=='query ok'){
						var lng=data.result.location.lng;
						var lat=data.result.location.lat;
						$("#lng").val(lng);
						$("#lat").val(lat);
					}
				}
			})
   		}
   		var selected_arr=[];
		 $(".selected-master-ul li").each(function() {
			var _that = $(this);
			selected_arr.push(_that.attr("master-id"));
		});
   		//指定接单师傅类型
   	$('#masterId').autocomplete({
        serviceUrl: '/master/masterJson',
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
          console.log(suggestion.data.masterId);
           $('[name="masterId"]').val('');
          for (x in selected_arr){
			  	if(selected_arr[x]==suggestion.data.masterId){
			  		return false;
			  	}
			}
          var li='<li class="selected-master-li" master-id="'+suggestion.data.masterId+'"><span class="remove-master">x</span>'+suggestion.value+'</li>';
          $(".selected-master-ul").append(li);
          selected_arr.push(suggestion.data.masterId);
        },
        //- onHint: function (hint) {
        //-   $('#autocomplete-ajax-x').val(hint);
        //- },
        onInvalidateSelection: function() {
//        $('#selection-ajax1').html('若无则不选择');
        }
    });
    //删除已选定的接单师傅
     $("body").on("click",".remove-master",function(){
    	 var _this=$(this);
    	 var li=_this.parent();
    	 li.remove();
    	 selected_arr=[];
    	 $(".selected-master-ul li").each(function() {
			var _that = $(this);
			selected_arr.push(_that.attr("master-id"));
		});
    })
     //删除
     $("body").on("click",".deleteimg",function(){
    	 var _this=$(this);
    	 var albumId=_this.attr("photoid");
	 	$.ajax({
			type : 'get',
			url : '/repair/albumDelete?albumId=' + albumId,
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
			customerName : {
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
			address : {
				message : '表单校验失败',
				validators : {
					notEmpty : {
						message : '不能为空'
					},
				}
			},
			maxNum : {
				message : '表单校验失败',
					validators : {
						notEmpty : {
						message : '不能为空'
					},
					    regexp: {
                                regexp: /^([0-9][0-9]*)$/,
                                message: '必须为整数'
                            }
					}
			},
			price : {
				message : '表单校验失败',
					validators : {
						notEmpty : {
						message : '不能为空'
					},
					      greaterThan: {
		                        value: 0,
		                        inclusive: false,
		                        message: '请填写数字'
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
								//指定可接单师傅
								var selectStr=selected_arr.join(",");
								$("#masterList").val(selectStr);
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
												location.href="/repair/home";
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
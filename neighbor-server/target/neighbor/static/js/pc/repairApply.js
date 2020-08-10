
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d4f4f8f1b869f305168bf0f2e2b1d3df";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
$(function(){
	var city = $.getCookie("city");
	if(city == null || city == '') {
		city = '厦门'
	}
	$(".current-city").text(city);
	$('body').on('click', '#submit1', function() {
			if($('#thisForm').find('input.must').val() != ''){
				if($.isPoneAvailable($("#phone").val())){
					 $.ajax({
		            type : 'post',
		            url : 'repairSave',
		            data : $('#thisForm').serialize(),
		            dataType : 'html',
		            success : function(data) {
		                if (data > 0) {            
		                   alert('申请成功,后续会有工作人员联系您');
		                  $("#thisForm")[0].reset();
		                } else {
		                    alert('申请失败，手机号码为必填项','房屋小哥')
		                }
		            }
		        });
				}else{
					 mui.alert('请输入正确的电话号码','房屋小哥')
				}
				 
			}else{
				 mui.alert('请完整填写信息','房屋小哥')
			}
		});
		//显示客服
		setTimeout(function(){
   				$(".float400-wrap").show();
   			},2000);
})
$(".wx").mouseover(function() {
			$(".nav-code").show();
		})
$(".wx").mouseout(function() {
	$(".nav-code").hide();
})
$("body").on("click",".close",function(){
	$(".bottom-adv").hide();
})
$("body").on("click",".float400-close",function(){
	$(".float400-wrap").hide();
})

$("body").on("click", ".ahref", function() {
			var _this = $(this);
			var url = _this.data("url");
			var param = {};
			$.open_page(url, param);
		})
$("body").on("click", ".search", function() {
		var _this = $(this);
		var keyWord=_this.parent().find("input").val();
		if(keyWord==null||keyWord==''){
			alert("请输入查询条件")
		}else{
			var url="/search/"+keyWord+"/p1/new";
			var param = {};
			$.open_page(url, param);
		}
	})

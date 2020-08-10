mui.init();
mui('.mui-scroll-wrapper').scroll();

$('.NutrientBackgroundSearch_inputBtn').click(function(){
	var food = $('.NutrientBackgroundSearch_input').val();
	if(food == ''){
		$('.NutrientTip').show();
		$('.NutrientSearchResult').hide();
		$('.NutrientSearchResult').html('');
	}else{
		$('.NutrientTip').hide();
		$('.NutrientSearchResult').html('');
		window.location.hash = '#hasResult';
		$.ajax({
		    type : 'get',
		    url : '/wxNutrientSearch?name=' + food + '&pagesize=0',
		    dataType : 'json',
		    success : function(json) {
		    	$('.NutrientBackgroundSearch_input').val('');
		    	var num = json.nutrientList.length;
		    	var resultNum = '<h5>查询到与“<em>' +  food + '</em>”的食品共<em>' + num + '</em>条</h5><span class="openNutrientPopover">查看全部营养成分介绍<i class="iconfont" style="font-size: 10px; margin-left: 3px;">&#xe64f;</i></span>';
		    	$('.NutrientSearchResult').html('').append(resultNum);
		    	for(var ni in json.nutrientList){
		    		var nutrientItem = json.nutrientList[ni];
		    		$('.NutrientSearchResult').append(NutrientHtml(nutrientItem));
		    	}
		    }
		})
	}
})
$('#NutrientBackground_select').change(function(){
	var sortnameArray = $('#NutrientBackground_select').val().split(',');
	if(sortnameArray[0] == ''){
		$('.RubbishBackgroundContent').text('选择营养成分名称');
		location.hash = '';
		return false;
	}
	$('.RubbishBackgroundContent').text(sortnameArray[1]);
	$('.NutrientTip').hide();
	$('.NutrientSearchResult').html('');
	window.location.hash = '#hasResult';
	$.ajax({
	    type : 'get',
	    url : '/wxNutrientContentSearch?sortname=' + sortnameArray[0] + '&pagesize=0',
	    dataType : 'json',
	    success : function(json) {
	    	var num = json.nutrientList.length;
	    	var resultNum = '<h5>查询到包含“<em>' +  sortnameArray[1] + '</em>”的食品共<em>' + num + '</em>条</h5><span class="openNutrientPopover">查看全部营养成分介绍<i class="iconfont" style="font-size: 10px; margin-left: 3px;">&#xe64f;</i></span>';
	    	$('.NutrientSearchResult').html('').append(resultNum);
	    	for(var ni in json.nutrientList){
	    		var nutrientItem = json.nutrientList[ni];
	    		$('.NutrientSearchResult').append(NutrientHtml(nutrientItem));
	    	}
	    }
	})
})

$('body').on('tap','.click_nutrient',function(){
	var nutrientArr = $(this).attr('nutrient').split(',');
	$('.RubbishBackgroundContent').text(nutrientArr[1]);
	$('.NutrientTip').hide();
	$('.NutrientSearchResult').html('');
	window.location.hash = '#hasResult';
	$.ajax({
	    type : 'get',
	    url : '/wxNutrientContentSearch?sortname=' + nutrientArr[0] + '&pagesize=0',
	    dataType : 'json',
	    success : function(json) {
	    	var num = json.nutrientList.length;
	    	var resultNum = '<h5>查询到包含“<em>' +  nutrientArr[1] + '</em>”的食品共<em>' + num + '</em>条</h5><span class="openNutrientPopover">查看全部营养成分介绍<i class="iconfont" style="font-size: 10px; margin-left: 5px;">&#xe64f;</i></span>';
	    	$('.NutrientSearchResult').html('').append(resultNum);
	    	for(var ni in json.nutrientList){
	    		var nutrientItem = json.nutrientList[ni];
	    		$('.NutrientSearchResult').append(NutrientHtml(nutrientItem));
	    	}
	    }
	})
	
})

$('body').on('tap','#closeNutrientPopover',function(){
	mui('#nutrient-popover').popover('toggle');
})

$('body').on('tap','.openNutrientPopover',function(){
	mui('#nutrient-popover').popover('toggle');
})

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})

$(window).bind('hashchange', function() {
	var hash = window.location.hash;
	if(hash == ''){
		$('.NutrientTip').show();
		$('.NutrientSearchResult').hide();
		$('.NutrientSearchResult').html('');
	}else{
		$('.NutrientTip').hide();
		$('.NutrientSearchResult').show();
	}
});

function NutrientHtml(nutrientItem){
	var nutrientHtml = '<div class="NutrientSearchResultCard"><div class="NutrientSearchResultTitle">' + nutrientItem.name;
	nutrientHtml += '<em>注:每百克中营养成分含量</em></div><div class="NutrientSearchResultTable"><table><thead><tr><th width="45%">营养成分</th><th width="55%">含量</th></tr></thead><tbody><tr class="click_nutrient" nutrient="vitamin_B1,维生素B1"><td>维生素B1（毫克）</td><td>' + nutrientItem.vitaminB1;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="vitamin_B2,维生素B2"><td>维生素B2（毫克）</td><td>' + nutrientItem.vitaminB2;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="vitamin_C,维生素C"><td>维生素C（毫克）</td><td>' + nutrientItem.vitaminC;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="vitamin_E,维生素E"><td>维生素E（毫克）</td><td>' + nutrientItem.vitaminE;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="protein,蛋白质"><td>蛋白质（克）</td><td>' + nutrientItem.protein;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="vitamin_A,维生素A"><td>维生素A（毫克）</td><td>' + nutrientItem.vitaminA;
	nutrientHtml += '</td></tr><tr class="click_nutrient" nutrient="carbohydrate,碳水化物"><td>碳水化物（克）</td><td>' + nutrientItem.carbohydrate;
	nutrientHtml += '</td></tr></tbody></table></div></div>';
	return nutrientHtml;
}
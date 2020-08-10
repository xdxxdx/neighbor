mui.init();
mui('.order-preview-scroll-wrapper').scroll();
mui('body').on('tap', '.customized_info,.ch_wechat_group_item', function() {
	location.href = '/wechatRealCommodityDetail?realCommodityId=' + $(this).attr('cid');
});
var xhr = '';
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
var popoverStatus = 1;
var commodityObj = {};
var shopStatus = 'open';

var storageCoffeeJson =localStorage.coffeeJson;
var needRefresh = sessionStorage.getItem("need-refresh");
if(needRefresh){
   sessionStorage.removeItem('need-refresh');
   location.reload();
}

setInterval(function() {
	shopStatus = disableBuy()
}, 300000)


var storeId = $('body').attr('storeId');
if (storeId == undefined || storeId == null || storeId == '') {
	storeId = 0
} 
initMenuList(Number(storeId));
// 切换门店 - 这里用Vue实现
var storeVm = new Vue({
    el: "#popover",
    data: {
        storeList: [],
    },
    mounted() {
        this.requestStoreList();
    },
    methods: {
        requestStoreList:  function ( ) {
            var _this = this;
            $.getJSON("./ypStoreList", function (result) {
				_this.storeList = result.storeList;
				for (var i=0; i < _this.storeList.length; i++) {
					var store = _this.storeList[i];
					if (store.storeId == storeId) {
						$("#yipin-store-title").text(store.storeName);
						break;
					}
				}
            })
        },
        switchStore: function (id) {
			storeId = id;
            //请求该店的商品数据
             html = [];
            initMenuList(id);
            mui('#popover').popover('hide');
            //切换店名
            for (var i = 0; i < this.storeList.length; i++) {
                var store = this.storeList[i]
                if (store.storeId == id) {
                    $("#yipin-store-title").html(store.storeName);
                    break;
                }
            }
            //清空购物车
            cleanShoppingCart();
            //切换店铺的状态：例如营业时间
            shopStatus = disableBuy();
        }
    }
})

// 配料弹出框操作START
$('body').on('tap', '.ingredients-popover-close', function() {
	commodityObj = {};
	initIngredientsSelect();
	mui('#ingredientsPopover').popover('hide');
})

$('body').on('tap', '.take-out-popover-radio li', function() {
	var _this = $(this);
	var ingredientsInfo = calculateIngredientsInfo();
	_this.addClass('ingredients-checked');
	_this.siblings().removeClass('ingredients-checked');
	var commodityPrice = ingredientsInfo.total + commodityObj.specPrice;
	$('.take-out-popover-foot-price').text(commodityPrice);
})

$('body').on('tap', '.take-out-popover-multiselect li', function() {
	var _this = $(this);
	if (_this.hasClass('ingredients-checked')) {
		_this.removeClass('ingredients-checked');
	} else {
		_this.addClass('ingredients-checked');
	}
	var ingredientsInfo = calculateIngredientsInfo();
	var commodityPrice = ingredientsInfo.total + commodityObj.specPrice;
	$('.take-out-popover-foot-price').text(commodityPrice);
})

$('body').on('tap', '.take-out-popover-foot-ok', function() {
	if (popoverStatus != 1) {
		return false;
	}
	popoverStatus = 0;

	var ingredientsInfo = calculateIngredientsInfo();
	var commodityPrice = ingredientsInfo.total + commodityObj.specPrice;
	$('.take-out-popover-foot-price').text(commodityPrice);

	var shopingCartHtml = spellShopingCartHtml(ingredientsInfo, commodityPrice);
	var liHtml = hasCommodityWidthIngredients(shopingCartHtml);
	if ($(liHtml).length > 0) {
		var tempNum = $(liHtml).data('commodityNum');
		var newNum = parseInt(tempNum) + 1;
		$(liHtml).data('commodityNum', newNum);
		$(liHtml).find('em.order-preview-numbox-num').text(newNum);

	} else {
		$('.order-preview-ul').append(shopingCartHtml);
	}

	var orderPopoverPm = orderPopoverFun();
	mui('#ingredientsPopover').popover('hide');
	var orderJson = spellOrderJson();
	localStorage.coffeeJson = JSON.stringify(orderJson);
})

$('body').on('hidden', '#ingredientsPopover', function(e) {
	commodityObj = {};
	initIngredientsSelect();
	popoverStatus = 1;
});

// 配料弹出框操作END
// 点击商品弹出配料框START
$('body').on('tap', '.take-out-product-push', function() {
	//暂时先不判断时间，任何时段均可以点餐
//	if (shopStatus == 'close') {
//		mui.alert('现在已过营业时间 \n●﹏●', '不好意思');
//		return false;
//	}
	var popoverHeight = $('#ingredientsPopover').height();
	$('#ingredientsPopover').css('top', 'calc((100vh - 47px - ' + popoverHeight + 'px) / 2)');
	var _this = $(this);
	var _dom = _this.parents('.mui-table-view-cell');
	var realcommodityName = _dom.data('realcommodityName');
	var specPrice = _dom.data('specPrice');
	commodityObj.tapLog = _dom.data('tapLog');
	commodityObj.realcommodityName = realcommodityName;
	commodityObj.columnPicture = _dom.data('columnPicture');
	commodityObj.specPrice = specPrice;
	commodityObj.specId = _dom.data('specId');
	commodityObj.readcommodityId = _dom.data('readcommodityId');
	commodityObj.commodityType = _dom.data('commodityType');
	if (commodityObj.commodityType != 3) {
		var shopingCartHtml = spellShopingCartHtml(calculateNoIngredientsInfo(), commodityObj.specPrice);
		$('.order-preview-ul').append(shopingCartHtml);
		var orderPopoverPm = orderPopoverFun();
		var orderJson = spellOrderJson();
		localStorage.coffeeJson = JSON.stringify(orderJson);
		return false;
	}
	$('.take-out-popover-title').text(realcommodityName);
	$('.take-out-popover-foot-price').text(specPrice);
	mui('#ingredientsPopover').popover('show');
	
})

// 点击商品弹出配料框END
$('body').on('tap', '.take-out-home-shopingcart', function() {
	if ($('.order-preview-product-name').length > 0) {
		mui('#orderPreviewPopover').popover('toggle');
	}
})

$('body').on('tap', '.order-preview-popover-head-delete', function() {
	cleanShoppingCart();
})

function cleanShoppingCart() {
    localStorage.removeItem('coffeeJson');
    $('.order-preview-ul').find('li').remove();
    $('.order-preview-scroll-wrapper').css('height', '0');
    $('.order-preview-popover').css('height', '0');
    $('.take-out-home-order-has-price span').text(0);
    $('.take-out-home-order-has-price em').text(0);
    $('.take-out-home-order-has').hide();
    $('.take-out-home-order-no').show();
    mui('#orderPreviewPopover').popover('hide');
    $('.take-out-home-pay').removeClass('take-out-home-canpay');
}

$('body').on('tap', '.take-out-home-canpay', function() {
	var orderJson = spellOrderJson();
	var orderJsonStr = JSON.stringify(orderJson);
	localStorage.coffeeJson = orderJsonStr;
	$('#orderJson').val(orderJsonStr);
	if(orderJsonStr != '' && orderJsonStr!= null &&  orderJsonStr!= undefined){
		$('#lifeCenterComfirm').submit();
	}
	
	return false;
});

$('body').on('tap', '.order-preview-numbox-symbol-plus', function() {
	var _this = $(this);
	var _parents = _this.parents('li.mui-table-view-cell');
	var _num = _parents.find('em.order-preview-numbox-num');
	var tempNum = _num.text();
	var num = parseInt(tempNum) + 1;
	_parents.data('commodityNum', num);
	_num.text(num);
	var orderPopoverPm = orderPopoverFun();
	var orderJson = spellOrderJson();
	localStorage.coffeeJson = JSON.stringify(orderJson);
})

$('body').on('tap', '.order-preview-numbox-symbol-minus', function() {
	var _this = $(this);
	var _parents = _this.parents('li.mui-table-view-cell');
	var _num = _parents.find('em.order-preview-numbox-num');
	var tempNum = _num.text();
	var num = parseInt(tempNum) - 1;
	if (num < 1) {
		_parents.remove();
	} else {
		_num.text(num);
		_parents.data('commodityNum', num);
	}
	var orderPopoverPm = orderPopoverFun();
	var orderJson = spellOrderJson();
	localStorage.coffeeJson = JSON.stringify(orderJson);
})

$('body').on('tap', '.take-out-toback', function() {
	location.href = '/wxYipinIndex';
})

$('body').on('tap', '.take-out-shop-search', function() {
	$('#takeOutSearchInput').val('');
	$('.take-out-search-content li').remove();
	$('.take-out-search').show();
	setTimeout(function() {
		$('.take-out-search').css('transform', 'scale(1)');
	}, 100);
})

$('.take-out-search').on('tap', '.take-out-search-close', function() {
	$('.take-out-search').css('transform', 'scale(0)');
	setTimeout(function() {
		$('.take-out-search').hide();
		$('#takeOutSearchInput').blur();
	}, 500);
})

$('#takeOutSearchInput').bind('input propertychange', function() {
	var _this = $(this);
	var keyWord = $.trim(_this.val());

	if (keyWord == '' || keyWord == null) {
		return false;
	}
	if (xhr != '') {
		xhr.abort();
	}

	var url = '/lifeCenterByKeyword?keyWord=' + keyWord;
	if (storeId != undefined || storeId != null || storeId != "") {
		url += "&storeId=" + storeId;
	}
	xhr = $.ajax({
		type : 'GET',
		url : url,
		dataType : 'json',
		success : function(json) {
			if (json.commodityList.length > 0) {
				$('.take-out-search-content li').remove();
				for ( var si in json.commodityList) {
					var commodity = json.commodityList[si];
					var specPrice = commodity.specList[0].promotionPrice;
					var specId = commodity.specList[0].specId;
					var pushHtml = '<li class="mui-table-view-cell" data-tap-log="search' + commodity.realCommodityId;
					pushHtml += '" data-column-picture="/' + commodity.columnPicture;
					pushHtml += '" data-realCommodity-name="' + commodity.realCommodityName;
					pushHtml += '" data-spec-id="' + specId;
					pushHtml += '" data-readcommodity-id="' + commodity.realCommodityId;
					pushHtml += '" data-spec-price="' + specPrice;
					pushHtml += '" data-commodity-type="' + commodity.commodityType;
					pushHtml += '"><div class="take-out-product-img"><img src="/' + commodity.columnPicture.replace('.','M.');
					pushHtml += '"/></div><div class="take-out-product-intro"><div class="take-out-product-name mui-ellipsis-2">' + commodity.realCommodityName;
					pushHtml += '</div><div class="take-out-product-des mui-ellipsis">' + commodity.briesIntro;
					pushHtml += '</div><div class="take-out-product-other">销量:' + (commodity.saleVolume + commodity.increment);
					pushHtml += '份</div><div class="take-out-product-bottom"><div class="take-out-product-price">' + specPrice;
					pushHtml += '</div><div class="take-out-product-push"><div class="mui-icon mui-icon-plusempty"></div>'
					pushHtml += '</div></div></div></li>';
					$('.take-out-search-content ul').append(pushHtml);
				}
			}
		}
	})
})

// 返回配料字符串+配料总价
function calculateIngredientsInfo() {
	var obj = {};
	obj.total = 0;
	obj.ingredients = '';
	$('.take-out-popover-radio li.ingredients-checked').each(function() {
		var ingredientsName = $(this).data('ingredientsName');
		obj.ingredients = obj.ingredients + ingredientsName + '/'
	})
	obj.temperature = obj.ingredients.split('/')[0];
	obj.sweetness = obj.ingredients.split('/')[1];
	var realcommodityArray = [];
	obj.ingredientSpecArray = [];
	obj.ingredientNameArray = [];
	$('.take-out-popover-multiselect li.ingredients-checked').each(function() {
		var price = $(this).data('specPrice');
		var realcommodityName = $(this).data('realcommodityName');
		obj.ingredientSpecArray.push($(this).data('specId'))
		obj.ingredientNameArray.push(realcommodityName)
		realcommodityArray.push(realcommodityName);
		obj.total += price;
	})
	obj.ingredients = obj.ingredients + realcommodityArray;
	if (realcommodityArray.length == 0) {
		obj.ingredients = obj.ingredients + '无配料';
	}
	return obj;
}

function calculateNoIngredientsInfo() {
	var obj = {};
	obj.total = 0;
	obj.ingredients = '';
	obj.ingredientSpecArray = [ '' ];
	obj.ingredientNameArray = [ '' ];
	obj.temperature = '';
	obj.sweetness = '';
	return obj;
}

// 返回总价和json字符串
function calculateAll() {
	var obj = {};
	obj.total = 0;
	obj.commodityNum = 0;
	$('.order-preview-ul').find('li').each(function() {
		obj.commodityNum = obj.commodityNum + parseInt($(this).data('commodityNum'));
		obj.total = obj.total + $(this).data('commodityNum') * $(this).data('commodityPrice')
	});
	return obj;
}

// 初始化配料弹出框
function initIngredientsSelect() {
	$('.take-out-popover-radio li').removeClass('ingredients-checked');
	$('.take-out-popover-radio').each(function() {
		$(this).find('li').eq(0).addClass('ingredients-checked');
	});
	$('.take-out-popover-multiselect li').removeClass('ingredients-checked');
}
// 处理订单预览框事件
function orderPopoverFun() {
	var orderNum = $('.order-preview-product-name').length;
	var allOrderInfo = calculateAll();
	if (orderNum > 0) {
		$('.take-out-home-order-no').hide();
		$('.take-out-home-order-has').show();
		$('.take-out-home-pay').addClass('take-out-home-canpay');
	} else {
		$('.take-out-home-order-has').hide();
		$('.take-out-home-order-no').show();
		$('.take-out-home-pay').removeClass('take-out-home-canpay');
		mui('#orderPreviewPopover').popover('hide');
	}
	$('.order-preview-scroll-wrapper').css('height', 'calc(67px * ' + orderNum + ')');
	$('.order-preview-popover').css('height', 'calc(67px * ' + orderNum + ' + 65px)');
	allOrderInfo.orderNum = orderNum;
	$('.take-out-home-order-has-price span').text(calculateAll().total);
	$('.take-out-home-order-has-price em').text(calculateAll().commodityNum);
	$.extend(allOrderInfo, calculateAll());

	var tapLogId = commodityObj.tapLog;
	var _dom = $('li.mui-table-view-cell[data-tap-log="' + tapLogId + '"]');
	var tapImgSrc = _dom.data('columnPicture');
	var _tapImg = _dom.find('.take-out-product-img');
	if(_tapImg.length != 0){
		var tapImgTop = _tapImg.offset().top;
		var tapImgLeft = _tapImg.offset().left;
		var toTop = $('.take-out-home-orderimg').offset().top + 20;
		var toLeft = $('.take-out-home-orderimg').offset().left + 25;
		var imgTempHtml = '<div class="take-out-img-temp" style="top:' + tapImgTop + 'px;left:' + tapImgLeft + 'px"><img src="' + tapImgSrc + '">';
		$('body').append(imgTempHtml);
		setTimeout(function() {
			$('.take-out-img-temp').css('top', toTop).css('left', toLeft).css('width', '10px').css('height', '10px').css('opacity', '.5');
		}, 100);
		setTimeout(function() {
			$('.take-out-img-temp').remove();
		}, 730);
	}
	

	return allOrderInfo;
}

function spellOrderJson(){
	var orderJson = [];
	$('.order-preview-ul').find('li').each(function() {
		var _this = $(this);
		var orderJsonObj = {};
		orderJsonObj.realCommodityId = _this.data('readcommodityId');
		orderJsonObj.realCommodityName = _this.data('realcommodityName');
		orderJsonObj.specId = _this.data('specId');
		orderJsonObj.tempPrice = _this.data('commodityPrice');
		orderJsonObj.commodityNum = _this.data('commodityNum');
		orderJsonObj.ingredientSpec = _this.data('ingredientSpec');
		orderJsonObj.ingredientName = _this.data('ingredientName');
		orderJsonObj.temperature = _this.data('temperature');
		orderJsonObj.sweetness = _this.data('sweetness');
		orderJson.push(orderJsonObj);
	})
	return orderJson;
}

function spellShopingCartHtml(i, c) {
	var shopingCartHtml = '<li class="mui-table-view-cell" data-commodity-price="' + c;
	shopingCartHtml += '" data-readcommodity-id="' + commodityObj.readcommodityId;
	shopingCartHtml += '" data-spec-id="' + commodityObj.specId;
	shopingCartHtml += '" data-ingredient-spec="' + i.ingredientSpecArray;
	shopingCartHtml += '" data-ingredient-name="' + i.ingredientNameArray;
	shopingCartHtml += '" data-commodity-num="' + '1';
	shopingCartHtml += '" data-temperature="' + i.temperature;
	shopingCartHtml += '" data-sweetness="' + i.sweetness;
	shopingCartHtml += '" data-realcommodity-name="' + commodityObj.realcommodityName;
	shopingCartHtml += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-7 order-preview-product-name"><h4 class="mui-ellipsis-2">' + commodityObj.realcommodityName;
	shopingCartHtml += '</h4><h5>' + i.ingredients;
	shopingCartHtml += '</h5></div><div class="mui-col-xs-2 mui-text-right order-preview-product-price"><div class="order-preview-price"><em>' + c;
	shopingCartHtml += '</em></div></div><div class="mui-col-xs-3 mui-text-right order-preview-product-number"><div class="order-preview-numbox clearfix" data-numbox-min="1"><div class="order-preview-numbox-symbol order-preview-numbox-symbol-plus"><i class="iconfont"></i></div><em class="order-preview-numbox-num">1</em><div class="order-preview-numbox-symbol order-preview-numbox-symbol-minus"><i class="iconfont"></i></div></div></div></div></li>';
	return shopingCartHtml;
}

function spellOrderListHtml(obj){
	var orderListHtml = '<li class="mui-table-view-cell" data-commodity-price="' + obj.tempPrice*obj.commodityNum;
	orderListHtml += '" data-readcommodity-id="' + obj.realCommodityId;
	orderListHtml += '" data-spec-id="' + obj.specId;
	orderListHtml += '" data-ingredient-spec="' + obj.ingredientSpec;
	orderListHtml += '" data-ingredient-name="' + obj.ingredientName;
	orderListHtml += '" data-commodity-num="' + obj.commodityNum;
	orderListHtml += '" data-temperature="' + obj.temperature;
	orderListHtml += '" data-sweetness="' + obj.sweetness;
	orderListHtml += '" data-realcommodity-name="' + obj.realCommodityName;
	orderListHtml += '"><div class="mui-table"><div class="mui-table-cell mui-col-xs-7 order-preview-product-name"><h4 class="mui-ellipsis-2">' + obj.realCommodityName;
	orderListHtml += '</h4><h5>' + (obj.temperature  == '' ? '' : obj.temperature);
	orderListHtml += (obj.sweetness == '' ?  '' :  '/' + obj.sweetness);
	orderListHtml += obj.ingredientName == '' ? '' : '/' + obj.ingredientName;
	orderListHtml += '</h5></div><div class="mui-col-xs-2 mui-text-right order-preview-product-price"><div class="order-preview-price"><em>' + obj.tempPrice*obj.commodityNum;
	orderListHtml += '</em></div></div><div class="mui-col-xs-3 mui-text-right order-preview-product-number"><div class="order-preview-numbox clearfix" data-numbox-min="1"><div class="order-preview-numbox-symbol order-preview-numbox-symbol-plus"><i class="iconfont"></i></div><em class="order-preview-numbox-num">'+obj.commodityNum;
	orderListHtml += '</em><div class="order-preview-numbox-symbol order-preview-numbox-symbol-minus"><i class="iconfont"></i></div></div></div></div></li>';
	return orderListHtml;
}

function hasCommodityWidthIngredients(h) {
	var _dom = $(h);
	var domSelect = '.order-preview-ul li.mui-table-view-cell[data-spec-id="' + _dom.data('specId');
	domSelect += '"][data-ingredient-spec="' + _dom.data('ingredientSpec');
	domSelect += '"][data-temperature="' + _dom.data('temperature');
	domSelect += '"][data-sweetness="' + _dom.data('sweetness');
	domSelect += '"]';
	return domSelect;
}

function disableBuy() {
	var osTime = 9 * 60 + 29 * 1; //早上9点半
	var oeTime = 17 * 60 + 59 * 1; // 晚上6点
    var halfPastTime = 22*60 + 29 * 1;  //晚上9点半
    var eight = 7*60 + 59*1; // 早上八点
    var sevenPm = 18*60 + 59*1; //下午七点
	var myDate = new Date();
	var h = myDate.getHours();
	var m = myDate.getMinutes();
	var d = myDate.getDay();
	var hm = h * 60 + m * 1;

    if (storeId == 5 ) { //松柏店
        $("#businessHours").text("营业时间·9:30~21:30 (周一到周日)");
        if (hm > osTime && hm < halfPastTime) { //松柏店的营业时间为早上9点半到晚上9点半
            //ajaxDisableBuy();
        } else {
            $('#takeOutPay').removeClass('take-out-home-pay').addClass('take-out-home-notime');
            return 'close';
        }
    } else  { //其他店面营业时间暂时都为 早上8到下午7点
        $("#businessHours").text("营业时间·8:00~19:00 (周一到周五)");
        if (hm > eight && hm < sevenPm) {
           // ajaxDisableBuy();
        } else {
            $('#takeOutPay').removeClass('take-out-home-pay').addClass('take-out-home-notime');
            return 'close';
        }
    }

}

function ajaxDisableBuy() {
	$.ajax({
		type : 'GET',
		timeout : 1800, 
		url : '/json/life_on_off.txt?timestamp=' + Date.parse(new Date()),
		dataType : 'html',
		success : function(data) {
			if (data == 1) {
				$('#takeOutPay').removeClass('take-out-home-notime').addClass('take-out-home-pay');
				$('.take-out-product-push').css('background','');
				return 'open';
			} else {
				$('#takeOutPay').removeClass('take-out-home-pay').removeClass('take-out-home-canpay').addClass('take-out-home-notime');
				$('.take-out-product-push').css('background','#999');
				return 'close';
			}
		}
	})
}

function coffeeOrderInit(obj){
	if(obj == ''){
		return false;
	}
	for(var cj in obj){
		var coffeeOrder = obj[cj];
		var liHtml = spellOrderListHtml(coffeeOrder);
		$('.order-preview-ul').append(liHtml);
		console.log(obj[cj]);
	}
	orderPopoverFun()
	mui('#orderPreviewPopover').popover('toggle');
}

function initMenuList(storeId) {
    var url = '/json/lifeMenu' + storeId + ".json";
    $.ajax({
        type : 'GET',
        url : url,
        dataType : 'json',
        statusCode: {
            404: function() {
				mui.toast('该门店还没有菜单哦',{ duration:'long', type:'div' });
				initMenuList(-1);
            }
        },
        success : function(json) {
            var menuList = json.menuList;
            var i = 1, j = 1;
            var m = menuList.length + 1;
            n = 21;

            for ( var ci in menuList) {
                html.push('<a class="mui-control-item" data-index="' + ci + '" href="#takeOut' + menuList[ci].menuId + '">' + menuList[ci].menuName + '</a>');
                controls.innerHTML = html.join('');
            }
            html = [];
            for ( var ct in menuList) {
                html.push('<div id="takeOut' + menuList[ct].menuId + '" class="mui-control-content"><div class="take-out-class-name">' + menuList[ct].menuName + '</div><ul class="mui-table-view">');
                for ( var cii in menuList[ct].commodityList) {
                    var commodity = menuList[ct].commodityList[cii];
                    if(commodity.specList.length >0){
                        var specPrice = commodity.specList[0].promotionPrice;
                        var specId = '' + commodity.specList[0].specId;
                        var columnPicture = (commodity.columnPicture == null ? 'WechatImages/Q200dimg.jpg' : commodity.columnPicture.replace('.', 'M.'));
                        var pushHtml = '<li class="mui-table-view-cell" data-tap-log="m' + menuList[ct].menuId + 'to' + commodity.realCommodityId;
                        pushHtml += '" data-column-picture="/' + columnPicture;
                        pushHtml += '" data-realCommodity-name="' + commodity.realCommodityName;
                        pushHtml += '" data-spec-id="' + specId;
                        pushHtml += '" data-readcommodity-id="' + commodity.realCommodityId;
                        pushHtml += '" data-spec-price="' + specPrice;
                        pushHtml += '" data-commodity-type="' + commodity.commodityType;
                        pushHtml += '"><div class="take-out-product-img"><img src="/' + columnPicture;
                        pushHtml += '"/></div><div class="take-out-product-intro"><div class="take-out-product-name mui-ellipsis-2">' + commodity.realCommodityName;
                        pushHtml += '</div><div class="take-out-product-des mui-ellipsis">' + commodity.briesIntro;
                        pushHtml += '</div><div class="take-out-product-other">销量:' + (commodity.saleVolume + commodity.increment);
                        pushHtml += '份</div><div class="take-out-product-bottom"><div class="take-out-product-price">' + specPrice;
                        pushHtml += '</div><div class="take-out-product-push"><div class="mui-icon mui-icon-plusempty"></div>'
                        pushHtml += '</div></div></div></li>';
                        html.push(pushHtml);
                    }

                }
                html.push('</ul></div>');
            }
            contents.innerHTML = html.join('');
            controls.querySelector('.mui-control-item').classList.add('mui-active');

            for ( var ii1 in json.ingredientList1) {
                var ingredientHtml = '<li data-spec-price="' + json.ingredientList1[ii1].specList[0].promotionPrice;
                ingredientHtml += '" data-spec-id="' + json.ingredientList1[ii1].specList[0].specId;
                ingredientHtml += '" data-realCommodity-name="' + json.ingredientList1[ii1].realCommodityName;
                ingredientHtml += '" data-realCommodity-id="' + json.ingredientList1[ii1].realCommodityId;
                ingredientHtml += '">' + json.ingredientList1[ii1].realCommodityName + '</li>';
                $('#RMB1ingredients').append(ingredientHtml);
            }

            for ( var ii2 in json.ingredientList2) {
                var ingredientHtml = '<li data-spec-price="' + json.ingredientList2[ii2].specList[0].promotionPrice;
                ingredientHtml += '" data-spec-id="' + json.ingredientList2[ii2].specList[0].specId;
                ingredientHtml += '" data-realCommodity-name="' + json.ingredientList2[ii2].realCommodityName;
                ingredientHtml += '" data-realCommodity-id="' + json.ingredientList2[ii2].realCommodityId;
                ingredientHtml += '">' + json.ingredientList2[ii2].realCommodityName + '</li>';
                $('#RMB2ingredients').append(ingredientHtml);
            }

            $(".take-out-toback-mall").remove();
            $("#segmentedControls").before('<a class="take-out-toback-mall" href="#" onclick="location.href = \'/wxYipinIndex\';" >' + '返回商城' + '</a>');
            var controlsElem = document.getElementById("segmentedControls");
            var contentsElem = document.getElementById("segmentedControlContents");
            var controlListElem = controlsElem.querySelectorAll('.mui-control-item');
            var contentListElem = contentsElem.querySelectorAll('.mui-control-content');
            var controlWrapperElem = controlsElem.parentNode;
            var controlWrapperHeight = controlWrapperElem.offsetHeight;
            var controlMaxScroll = controlWrapperElem.scrollHeight - controlWrapperHeight; // 左侧类别最大可滚动高度
            var maxScroll = contentsElem.scrollHeight - contentsElem.offsetHeight; // 右侧内容最大可滚动高度
            var controlHeight = controlListElem[0].offsetHeight; // 左侧类别每一项的高度
            var controlTops = []; // 存储control的scrollTop值
            var contentTops = [ 0 ]; // 存储content的scrollTop值
            var length = contentListElem.length;
            for (var i = 0; i < length; i++) {
                controlTops.push(controlListElem[i].offsetTop + controlHeight);
            }
            for (var i = 1; i < length; i++) {
                var offsetTop = contentListElem[i].offsetTop;
                if (offsetTop + 100 >= maxScroll) {
                    var height = Math.max(offsetTop + 100 - maxScroll, 100);
                    var totalHeight = 0;
                    var heights = [];
                    for (var j = i; j < length; j++) {
                        var offsetHeight = contentListElem[j].offsetHeight;
                        totalHeight += offsetHeight;
                        heights.push(totalHeight);
                    }
                    for (var m = 0, len = heights.length; m < len; m++) {
                        contentTops.push(parseInt(maxScroll - (height - heights[m] / totalHeight * height)));
                    }
                    break;
                } else {
                    contentTops.push(parseInt(offsetTop));
                }
            }
            contentsElem.addEventListener('scroll', function() {
                var scrollTop = contentsElem.scrollTop;
                for (var i = 0; i < length; i++) {
                    var offsetTop = contentTops[i];
                    var offset = Math.abs(offsetTop - scrollTop);
                    if (scrollTop < offsetTop) {
                        if (scrollTop >= maxScroll) {
                            onScroll(length - 1);
                        } else {
                            onScroll(i - 1);
                        }
                        break;
                    } else if (offset < 20) {
                        onScroll(i);
                        break;
                    } else if (scrollTop >= maxScroll) {
                        onScroll(length - 1);
                        break;
                    }
                }
            });
            var lastIndex = 0;
            // 监听content滚动
            var onScroll = function(index) {
                if (lastIndex !== index) {
                    lastIndex = index;
                    var lastActiveElem = controlsElem.querySelector('.mui-active');
                    lastActiveElem && (lastActiveElem.classList.remove('mui-active'));
                    var currentElem = controlsElem.querySelector('.mui-control-item:nth-child(' + (index + 1) + ')');
                    currentElem.classList.add('mui-active');
                    // 简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
                    var controlScrollTop = controlWrapperElem.scrollTop;
                    if (controlScrollTop + controlWrapperHeight < controlTops[index]) {
                        controlWrapperElem.scrollTop = controlMaxScroll;
                    } else if (controlScrollTop > controlTops[index] - controlHeight) {
                        controlWrapperElem.scrollTop = 0;
                    }
                }
            };
            // 滚动到指定content
            var scrollTo = function(index) {
                contentsElem.scrollTop = contentTops[index];
            };
            mui(controlsElem).on('tap', '.mui-control-item', function(e) {
                scrollTo(this.getAttribute('data-index'));
                return false;
            });

            if(storageCoffeeJson){
                coffeeOrderInit(JSON.parse(storageCoffeeJson));
            }

        },
        error : function() {
        }
    })
}



const jsUrl = $('#shareAjax').attr('src');

String.prototype.getQueryString = function(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = jsUrl.split('?')[1].match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

let shareTitle = jsUrl.getQueryString('shareTitle');
let shareDesc = jsUrl.getQueryString('shareDesc');
let shareImgUrl = jsUrl.getQueryString('shareImgUrl') ? jsUrl.getQueryString('shareImgUrl') : 'http://www.wonyen.com/WechatImages/yipin.png';
let shareLink = jsUrl.getQueryString('shareLink') ? jsUrl.getQueryString('shareLink') : window.location.href;
const auto = jsUrl.getQueryString('auto');
const dt = jsUrl.getQueryString('dt');

document.write('<script language="javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js?dt= ' + dt + '" > </script>');

const href = window.location.href;

const shareInit = function() {
	$.ajax({
		type : 'POST',
		url : '/wxShare?url=' + encodeURIComponent(href),
		datatype : 'json',
		success : function(json) {
			const cipherText = JSON.parse(json);
			wx.config({
				appId : 'wxc034ddcd6d10e418', // 必填，公众号的唯一标识
				timestamp : cipherText.timestamp, // 必填，生成签名的时间戳
				nonceStr : cipherText.noncestr, // 必填，生成签名的随机串
				signature : cipherText.signature,// 必填，签名，见附录1
				jsApiList : [ 'scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getLocation' ]
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function() {
				// 分享到朋友圈
				wx.onMenuShareTimeline({
					title : shareTitle,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {

					},
					cancel : function() {

					}
				});
				// 分享给朋友
				wx.onMenuShareAppMessage({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					type : 'link',
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到QQ
				wx.onMenuShareQQ({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到腾讯微博
				wx.onMenuShareWeibo({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 分享到QQ空间
				wx.onMenuShareQZone({
					title : shareTitle,
					desc : shareDesc,
					link : shareLink,
					imgUrl : shareImgUrl,
					success : function() {
						$('.share_tips').hide();
					},
					cancel : function() {

					}
				});
				// 获取地理位置
				wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function (res) {
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						var params = "?location=" + res.latitude + "," + res.longitude + "&key=3IYBZ-W5RK2-536UC-CM6LH-RHQM7-4VFWW";
						$.ajax({
							type : 'get',
							url : 'http://apis.map.qq.com/ws/geocoder/v1',
							dataType:'jsonp',
							data : {
								key:"3IYBZ-W5RK2-536UC-CM6LH-RHQM7-4VFWW",//开发密钥
								location:res.latitude + "," + res.longitude,//位置坐标
								get_poi:"1",//是否返回周边POI列表：1.返回；0不返回(默认)
								coord_type:"1",//输入的locations的坐标类型,1 GPS坐标
								parameter:{"scene_type":"tohome","poi_num":20},//附加控制功能
								output:"jsonp"
								},                 
							success : function(data, textStatus) {            
								if(data.status == 0){
									var address = data.result.formatted_addresses.recommend;
									console.log(address);
									if(address.indexOf("海沧") != -1) {
										storeVm.switchStore(0);
									} else {
										storeVm.switchStore(5);
									}
								}else {
									// alert("系统错误，请联系管理员！")
								}
							},
							error : function() {
								// alert("系统错误，请联系管理员！")
							}
						});
		
						
					}
				});
			});

			wx.error(function(res) {
				console.log("错误信息 === ");
				console.log(res);
			});
		},
		errer : function(e) {
		}
	})
}

if(auto != 'none'){
	shareInit();
}






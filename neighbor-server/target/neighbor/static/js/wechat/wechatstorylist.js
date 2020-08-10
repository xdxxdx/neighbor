mui.init();
var hash = window.location.hash;
hashShowTab(hash);
//阻尼系数
var deceleration = mui.os.ios ? 0.003 : 0.0009;
mui('.mui-scroll-wrapper').scroll({
    bounce : false, 
    indicators : false, 
    deceleration : deceleration 
});

mui('body').on('tap','#yipin_scroll_slider a.mui-control-item',function(){
	var tag = $(this).attr('tag');
	location.hash = tag;
});

//循环初始化所有下拉刷新，上拉加载。
mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) 
{
    mui(pullRefreshEl).pullToRefresh(
    {
        down : 
        {
            callback : function () 
            {
            	var self = this;
                var indexItem = $('.mui-slider-item.mui-control-content').eq(index);
                var listAppend = indexItem.find('.yipin_news_list_append');
                $.ajax(
                {
                    type : 'get', 
                    url : '/getNews?tag=' + indexItem.attr('tag') + '&page=1', 
                    dataType : 'json',
                    success : function (json) 
                    {
                    	 listAppend.find('div').remove();
                        for (var ii in json.news)
                        {
                            var newItem = json.news[ii];
                            listAppend.append(splitHtml(newItem));
                        }
                        self.endPullDownToRefresh();
                        mui('.mui-scroll-wrapper').pullRefresh();
                        indexItem.attr('page', 1);
                    }
                }) 
            }
        },
        up : 
        {
            auto : true,
			contentdown: '上拉显示更多资讯',
			contentrefresh: '正在加载资讯...',
			contentnomore: '没有更多资讯了',
            callback : function () 
            {
                var self = this;
                var indexItem = $('.mui-slider-item.mui-control-content').eq(index);
                var listAppend = indexItem.find('.yipin_news_list_append');
                $.ajax(
                {
                    type : 'get', 
                    url : '/getNews?tag=' + indexItem.attr('tag') + '&page=' + indexItem.attr('page'), 
                    dataType : 'json',
                    success : function (json) 
                    {
                        for (var ii in json.news)
                        {
                            var newItem = json.news[ii];
                            listAppend.append(splitHtml(newItem,indexItem.attr('tag')));
                        }
                        json.news.length  == 10 ? self.endPullUpToRefresh() : self.endPullUpToRefresh(true);
                        
                        mui('.mui-scroll-wrapper').pullRefresh();
                        indexItem.attr('page', parseInt(indexItem.attr('page')) + 1);
                    }
                }) 
            }
        }
    });
});
mui('body').on('tap', '.yipin_news_card', function ()
{
    location.href = '/wechatStoryDetails?generalId=' + $(this).attr('gid');
});

function splitHtml(n,t){
	 var childItem = '<div class="mui-card yipin_news_card" gid="' + n.generalId;
     childItem += '"><div class="mui-card-header mui-card-media" style="height: 40vw; background-image: url(http://www.ifncn.com/UploadFiles/' + n.picUrl;
     childItem += ')"></div><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color: #333;font-size:16px;font-weight:700;">' + n.title;
     childItem += '</p><p>逸品生活-' + n.author;
     childItem += '&nbsp;' + n.updateTime;
     childItem += '</p></div></div></div>';
     return childItem;
}

mui('#yipin_slider_group').slider(function(){
	console.log(1)
});

function hashShowTab(h){
	h = h.replace('#','');
	var index = $('#yipin_scroll_slider').find('a.mui-control-item[tag="' + h + '"]').index(); 
	var gallery = mui('#slider');
	gallery.slider().gotoItem(index);
}

document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
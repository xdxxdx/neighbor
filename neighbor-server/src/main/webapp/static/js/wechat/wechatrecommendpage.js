mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005,
});
mui('body').on('tap','.rectitle_gomall',function(){
	location.href = '/wechatRealCommodityColumn';
});
mui('body').on('tap','.rectitle_gobind',function(){
	location.href = '/wechatGoBind';
});
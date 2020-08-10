mui.init();

mui('.mui-scroll-wrapper').scroll();

mui('.mui-bar-transparent').transparent({
			top : 0,
			offset : 150,
			duration : 16,
			scrollby : document.querySelector('.mui-scroll-wrapper')
		})
		
document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
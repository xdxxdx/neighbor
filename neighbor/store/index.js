import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: { 
		requestUrl: 'https://wx.xmblyc.com/neighbor/',
		// imageUrl: 'https://wx.xmblyc.com/resources/neighbor/res/',
		imageUrl: 'https://wx.xmblyc.com/neighbor-res/res/',
		uiUrl: 'https://wx.xmblyc.com/neighbor-res/ui/',
		
		//requestUrl: 'https://wx.icrat.cn/icratneighbor/',
		//imageUrl: 'https://wx.icrat.cn/resources/icratneighbor/res/',
		//uiUrl: 'https://wx.icrat.cn/resources/icratneighbor/ui/',
		
		//requestUrl: 'http://localhost:8080/neighbor/',
		//requestUrl: 'http://192.168.0.104:8080/neighbor/',

		userInfo: {},
		
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			
		}
	},
})

export default store

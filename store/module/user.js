export default {
  state: {
      nickName: '',
      avatarUrl: '',
	  code: ''
  },
  mutations: {
    SET_NAME (state, name) {
      state.nickName = name
    },
	SET_AVATAR (state, url) {
		state.avatarUrl = url
	},
	SET_CODE (state, code) {
		state.code = code
	}
  },
  actions: {
    login ({ commit }) {
		return new Promise((resolve, reject)=>{
			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					commit('SET_CODE', loginRes.code);
					// 获取用户信息
					uni.getUserInfo({  
					  provider: 'weixin',
					  success: (infoRes) => {
						  commit('SET_NAME', infoRes.userInfo.nickName)
						  commit('SET_AVATAR', infoRes.userInfo.avatarUrl)
						  resolve(loginRes.code);
					  }
					 });
				}
			});		
		})
    }
  }
}

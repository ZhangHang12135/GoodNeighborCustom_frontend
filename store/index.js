import Vue from 'vue'
import Vuex from 'vuex'
import cart from './module/cart'
import user from './module/user'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    cart,
	user
  }
})
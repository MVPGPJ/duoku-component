import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import cart from './modules/cart'

Vue.use(Vuex)

const state = {
  userInfo: {
    uid: -1
  }
}

export default function createStore () {
  return new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    modules: {mycart: cart}
  })
}

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 1
  },
  mutations: {
    setCurrentPage (state, page) {
      state.currentPage = page
    }
  },
  getters: {
    getCurrentPage: state => {
      return state.currentPage
    }
  },
  actions: {
    setCurrentPage (context, pageNum) {
      context.commit('setCurrentPage', pageNum)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

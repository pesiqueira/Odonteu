import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDate: new Date(),
  },
  mutations: {
    setCurrentDate: (state,payload) => { state.currentDate = new Date(payload);}
  },
  getters:{
    getCurrentDate:(state)=> state.currentDate,
  },
  actions: {
  },
  modules: {
  }
})

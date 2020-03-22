import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import categories from './categories'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`https://free.currconv.com/api/v7/convert?apiKey=${key}&q=USD_UAH,EUR_UAH`)
      const resJson = await res.json()
        return resJson
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, categories, record
  }
})

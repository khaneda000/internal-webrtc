import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'
import Skyway from '../class/skyway'
import { SKYWAY_API_KEY } from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState()
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  // strict: false,
  getters: {
    skyway: () => {
      return new Skyway(SKYWAY_API_KEY)
    }
  }
})

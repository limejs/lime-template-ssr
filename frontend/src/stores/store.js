// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import mixinStore from './utils/mixin-store';

Vue.use(Vuex)

export function createStore () {
  let store = new Vuex.Store({
    state: {
    },
    actions: {
    },
    mutations: {
    }
  })
  mixinStore(store)
  return store
}

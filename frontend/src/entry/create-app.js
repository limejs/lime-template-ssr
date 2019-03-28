import Vue from 'vue'
import App from '@views/App'
import { sync } from 'vuex-router-sync'
import { createRouter } from '@router/create-router'
import { createStore } from '@stores/store'
import VueMeta from 'vue-meta'

export function createApp() {
  const router = createRouter()
  const store = createStore()

  // 同步路由状态 route state 到 store
  sync(store, router)

  // 注册通用插件
  Vue.use(VueMeta)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}

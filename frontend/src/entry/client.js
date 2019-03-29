import Vue from 'vue'
import { createApp } from './create-app'
import { beforeRouteUpdate, beforeResolve } from '@libs/mixins/datafetch'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  beforeRouteUpdate
})
// 全局路由钩子: 在每次完全切换页面时触发获取 asyncData 数据
router.beforeResolve(beforeResolve(router, store))

router.onReady(() => {
  // 每次路由组件复用时， 触发获取 asyncData 数据

  // 如果是异步版，需主动获取一下数据
  if (!window.__INITIAL_STATE__) {
    const matchedComponents = router.getMatchedComponents()
    Promise.all(matchedComponents.map(Component => {
      if (Component.asyncData) {
        return Component.asyncData({
          store: store.registerAllModules(Component),
          route: router.currentRoute
        })
      }
    }))
  }
  app.$mount('#app')
})

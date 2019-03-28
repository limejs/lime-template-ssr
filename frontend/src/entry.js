import './assets/css/global'
import Vue from 'vue'
import router from './router'
import App from './App'


new Vue({
  router,
  components: {
      App
  },
  render(h) {
      return h(App)
  }
}).$mount('#app')

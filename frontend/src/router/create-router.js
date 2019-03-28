import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export function createRouter() {
  let route = new Router(routes);
  return route
}


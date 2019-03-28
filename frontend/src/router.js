import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './home';
import Todo from './todo'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/todo',
    component: Todo
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})

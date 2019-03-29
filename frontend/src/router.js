/**
 * 路由配置
 * 
 */
import Home from '@pages/Home/Index'
import Todo from '@pages/Todo/Index'
import NoPage from '@pages/404/Index'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '*',
      component: NoPage
    }
  ]
}

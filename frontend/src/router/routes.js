/**
 * 路由配置
 * 
 */
import Home from '@views/pages/home'
import List from '@views/pages/list'
import Detail from '@views/pages/detail'
import NoPage from '@views/pages/404'
import IeUpdate from '@views/pages/ie'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/ie',
      name: 'ie',
      component: IeUpdate
    },
    {
      path: '*',
      component: NoPage
    }
  ]
}

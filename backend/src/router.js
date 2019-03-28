/* 
* @file 路由配置
*/

module.exports = (router) => {
  router.get('/api/logout', 'api@logout')
  router.get('/*', 'home@ssr')
}

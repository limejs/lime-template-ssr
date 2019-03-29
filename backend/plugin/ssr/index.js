let prodSSR = null
let devSSR = null

module.exports = function(app, options){
  // 在中间件注册阶段，先初始化相关 renderer (尤其是热更新需要初始化webpack编译及其中间件)
  if (app.config.env.isDev) {
    devSSR = require('./dev-ssr')
    devSSR.createRenderer(app) // 开发环境初始化renderer，其内部会随着webpack编译自动重新初始化renderer.
  }
  else {
    console.log('come here')
    prodSSR = require('./prod-ssr')
    prodSSR.createRenderer()
  }

  app.controller({
    vuessr: async function() {
      if (app.config.env.isDev) {
        // 开发环境 ssr 热更新
        return devSSR.dossr(this.ctx)
      }
      else {
        // 生产环境 ssr
        return prodSSR.dossr(this.ctx)
      }
    }
  })
}

// 一个把自己额外添加的 站点自定义配置信息挂载到ctx上的中间件
let prodSSR = null
let devSSR = null

const env = process.env.NODE_ENV
const utils = require('./utils')

module.exports = {
    // 中间件：用来注册在每个请求生命周期的路由之前 在日志、session中间件之后调用
    middleware(app) {
      // 在中间件注册阶段，先初始化相关 renderer (尤其是热更新需要初始化webpack编译及其中间件)
      if (env === 'development') {
        devSSR = require('./dev-ssr')
        devSSR.createRenderer(app) // 开发环境初始化renderer，其内部会随着webpack编译自动重新初始化renderer.
      }
      else {
        prodSSR = require('./prod-ssr')
        prodSSR.createRenderer()
      }
    },
    view(proto) {
        // 视图插件
        proto.ssr = async (ctx, next) => {
          if (env === 'development') {
            // 开发环境 ssr 热更新
            return devSSR.dossr(ctx, next)
          }
          else {
            // 生产环境 ssr
            return prodSSR.dossr(ctx, next)
          }
        }
    }
}

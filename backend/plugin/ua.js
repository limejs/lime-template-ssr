const userAgent = require('koa2-useragent')

module.exports = {
    // 中间件：用来注册在每个请求生命周期的路由之前 在日志、session中间件之后调用
    middleware(app) {
      app.use(userAgent())
    }
}

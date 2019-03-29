const userAgent = require('koa2-useragent')

module.exports = function(app, options){
  // 中间件：用来注册在每个请求生命周期的路由之前 在日志、session中间件之后调用
  app.middleware(userAgent())

  // 挂载到 controller 和 service 上
  app.controller({
    ua() {
      return this.ctx.userAgent
    }
  })
  app.service({
    ua() {
      return this.ctx.userAgent
    }
  })
}

/*
 * @file 静态资源托管中间件
 * @author: yongjiancui(yongjiancui@tencent.com)
 * @date: 2019-02-25
 */
const serve = require('koa-static')
const path = require('path')

module.exports = {
  middleware(app) {
    app.use(serve(path.resolve(__dirname, '../public'), {
      maxage: 365 * 24 * 3600 * 1000,
    }))
  }
}

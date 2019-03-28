const serve = require('koa-static')
const path = require('path')

module.exports = {
  middleware(app) {
    app.use(serve(path.resolve(__dirname, '../public'), {
      maxage: 365 * 24 * 3600 * 1000
    }))
  }
}

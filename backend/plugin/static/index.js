const serve = require('koa-static')
const path = require('path')

module.exports = function(app, options){
  app.middleware(serve(path.resolve(__dirname, '../public'), {
    maxage: 365 * 24 * 3600 * 1000
  }))
}

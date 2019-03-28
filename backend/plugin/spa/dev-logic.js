
// const webpackMiddleware = require("koa-webpack-dev-middleware");

const webpack = require('webpack')
const path = require('path')
const globalConfig = require('../../../config')
const webpackConfig = require((globalConfig.webpackConfigFile))
const koaWebpack = require('koa-webpack')



// devMiddleware = webpackMiddleware(webpack(webpackConfig), {
//   stats: webpackConfig.stats
// })

if (!webpackConfig.output.publicPath) {
  webpackConfig.output.publicPath = '/'
}
let devMiddleware = null

module.exports = async(ctx, next) => {
  if (!devMiddleware) {
    devMiddleware = await koaWebpack({
      compiler: webpack(webpackConfig),
      devMiddleware: webpackConfig.devServer
    })
  }
  await devMiddleware(ctx, async function() {
      // history 模式
      ctx.type = 'html'
      ctx.body = (devMiddleware.devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html')))
  })
}

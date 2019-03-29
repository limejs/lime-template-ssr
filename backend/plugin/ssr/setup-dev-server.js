const fs = require('fs')
const path = require('path')
// memory-fs可以使webpack将文件写入到内存中，而不是写入到磁盘。
const MFS = require('memory-fs')
const webpack = require('webpack')
// 监听文件变化，兼容性更好(比fs.watch、fs.watchFile、fsevents)
const chokidar = require('chokidar')

// webpack热加载需要
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
// 配合热加载实现模块热替换
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const feBuildPath = path.resolve(__dirname, '../../../frontend/build')
const clientConfig = require(path.join(feBuildPath, 'webpack.client.conf.js'))
const serverConfig = require(path.join(feBuildPath, 'webpack.server.conf.js'))


// 读取vue-ssr-webpack-plugin生成的文件
const readFile = (fs, curpath, file) => {
  try {
    return fs.readFileSync(path.join(curpath, file), 'utf-8')
  } catch (e) {
    console.log('读取文件错误：', e)
  }
}

module.exports = function setupDevServer(app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  let devMiddleware
  const readyPromise = new Promise(r => { ready = r})
  // 监听改变后更新函数
  const update = () => {
    if (bundle && clientManifest) {
      ready(devMiddleware)
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // 监听html模板改变、需手动刷新
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // 修改webpack入口配合模块热替换使用
  clientConfig.entry.app = Array.isArray(clientConfig.entry.app) ? [ 'webpack-hot-middleware/client', ...clientConfig.entry.app ] : ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  // 编译clinetWebpack 插入Koa中间件
  const clientCompiler = webpack(clientConfig)
  devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(async (ctx, next) => {
    if (ctx.path === '/' || ctx.path === '/index.html') {
      // 不让 DevMiddleware 接管, 避免返回异步版 index.html
      return next()
    }
    await devMiddleware(ctx, next)
  })

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      clientConfig.output.path,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // 插入Koa中间件(模块热替换)
  app.use(webpackHotMiddleware(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    //  vue-ssr-webpack-plugin 生成的bundle
    bundle = JSON.parse(readFile(mfs, serverConfig.output.path, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise

}

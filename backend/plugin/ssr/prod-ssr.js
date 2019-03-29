const serve = require('koa-static')
const sfbConfig = require('../../../config')
const config = require('../../config/ssr')
const path = require('path')
const compose = require('koa-compose')
const clientOutputPath = path.join(sfbConfig.distPath, 'client')
const serverOutputPath = path.join(sfbConfig.distPath, 'server')
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const debug = require('debug')('lime:ssr')
const { renderToClient } = require('./utils')

let renderer = null
exports.createRenderer = function() {
  const serverBundle = require(path.join(serverOutputPath, 'vue-ssr-server-bundle.json'))
  renderer = createBundleRenderer(serverBundle, {
    clientManifest: require(path.join(clientOutputPath, 'vue-ssr-client-manifest.json')),
    template: fs.readFileSync(path.join(__dirname, './index.template.html'), 'utf-8'),
    runInNewContext: false,
  })
  return renderer
}

exports.dossr = function(ctx, next) {
  let groups = [ serveStaticFile, serveHtmlFile ]
  let fn = compose(groups)
  return fn(ctx, next)
}


async function serveStaticFile(ctx, next) {
  // 静态资源加缓存
  const staticServeMiddleware = serve(clientOutputPath, {
    maxage: 365 * 24 * 3600 * 1000,
  })
  if (!/^(\/|\/index\.html)$/.test(ctx.path)) {
    // 不是 index.html 的话 吐出请求的静态资源
    debug('serveStaticFile')
    return staticServeMiddleware(ctx, next)
  }
  await next()
}

async function serveHtmlFile(ctx, next) {
  const ssrMode = ctx.query._mode ? ctx.query._mode : config.default
  if (ssrMode === 'static') {
    debug('renderPureHtml')
    return renderPureHtml(ctx)
  }
  else {
    debug('renderSSRHtml')
    return renderSSRHtml(ctx)
  }
}

async function renderPureHtml(ctx) {
  ctx.type = 'html'
  const clientHtmlPath = path.join(clientOutputPath, 'index.html')
  return ctx.body = fs.createReadStream(clientHtmlPath)
}

async function renderSSRHtml(ctx) {
  ctx.set('ssr', `lime-ssr/${require('../../package.json').version}`)
  try {
    return renderToClient(ctx, renderer)
  }
  catch(err) {
    debug('rederSSR failed, transform to renderPureHtml...', err)
    console.log('SSR失败，退化为异步版； 失败原因: ', err)
    ctx.set('ssr', `lime-async/${require('../../package.json').version}`)
    return renderPureHtml(ctx)
  }
}

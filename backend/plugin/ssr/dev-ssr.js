
const setDevServer = require('./setup-dev-server')
const path = require('path')
const globalConfig = require('../../../config')
const config = require('../../config/ssr')
const serverTemplatePath = path.resolve(__dirname, './index.template.html')
const { createBundleRenderer } = require('vue-server-renderer')
const webpackClientConfig = require(path.join(globalConfig.buildPath, 'webpack.client.conf.js'))
const debug = require('debug')('lime:ssr')
const { renderToClient } = require('./utils')

let renderer = null
let devMiddleware = null
let readyPromise = null

exports.createRenderer = function (app) {
  readyPromise = setDevServer(app, serverTemplatePath, (bundle, { clientManifest, template}) => {
    renderer = createBundleRenderer(bundle, {
      clientManifest,
      template,
      runInNewContext: false,
    })
  })
}


exports.dossr = async function (ctx, next) {
  const ssrMode = ctx.query._mode ? ctx.query._mode : config.default

  if (ssrMode === 'ssr') {
    debug('renderSSRHtml')
    devMiddleware = await readyPromise
    return renderSSRHtml(ctx)
  }
  else if(ssrMode) {
    debug('renderPureHtml')
    devMiddleware = await readyPromise
    return renderPureHtml(ctx)
  }
}

async function renderSSRHtml(ctx) {
  try {
    await renderToClient(ctx, renderer)
  }
  catch(err) {
    debug('rederSSR failed, transform to renderPureHtml...', err)
    console.log('SSR失败，退化为异步版； 失败原因: ', err)
    return renderPureHtml(ctx)
  }
}

async function renderPureHtml(ctx) {
  const clientHtmlPath = path.join(webpackClientConfig.output.path, 'index.html')
  ctx.type = 'html'
  ctx.body = devMiddleware.fileSystem.createReadStream(clientHtmlPath)
}

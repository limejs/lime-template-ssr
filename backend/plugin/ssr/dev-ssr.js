
const setDevServer = require('./setup-dev-server')
const path = require('path')
const serverTemplatePath = path.resolve(__dirname, '../../../frontend/src/templates/index.ssr.html')
const { createBundleRenderer } = require('vue-server-renderer')

const debug = require('debug')('lime:ssr')
const { renderToClient } = require('./utils')

let renderer = null
let devMiddleware = null
let readyPromise = null

const feBuildPath = path.resolve(__dirname, '../../../frontend/build')
const webpackClientConfig = require(path.join(feBuildPath, 'webpack.client.conf.js'))

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
  const ssrMode = ctx.query._mode ? ctx.query._mode : 'static'

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
    logger.warn('SSR失败，退化为异步版； 失败原因: ', err)
    return renderPureHtml(ctx)
  }
}

async function renderPureHtml(ctx) {
  const clientHtmlPath = path.join(webpackClientConfig.output.path, 'index.html')
  ctx.type = 'html'
  ctx.body = devMiddleware.fileSystem.createReadStream(clientHtmlPath)
}

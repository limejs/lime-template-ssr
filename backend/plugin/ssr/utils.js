const domain = require('domain')
const PassThrough = require('stream').PassThrough

exports.getContext = function(ctx) {
  const context = {
    url: ctx.url,
    title: 'bodoo',
    request: {
      url: ctx.url,
      headers: ctx.headers,
      protocol: ctx.protocol || 'http',
      hostname: ctx.hostname,
      method: ctx.method
    }
  }
  return context
}


exports.renderToClient = async function (ctx, renderer) {
  let isIE = +(ctx.get('user-agent').match(/MSIE (\d+)/) && RegExp.$1);
  console.log('IE浏览器', isIE)
  if (isIE && Number(isIE) && Number(isIE) <= 8 && ctx.path != '/ie') {
    // ie8 以下访问pc端，跳到ie升级
    return ctx.redirect('/ie')
  }
  // ssr 逻辑
  let context = exports.getContext(ctx)
  let d = domain.create()
  d.add(ctx.request)
  d.add(ctx.response)
  d.__VUE_SSR_CONTEXT__ = context // 注入 process.domain.__VUE_SSR_CONTEXT
  d.on('error', (err) => {
    console.log('domain error: ', err.message, err)
    throw err
  })
  return d.run(async () => {
    ctx.type = 'html'
    let renderResult = renderer.renderToStream(context)
    ctx.body = renderResult.on('beforeStart', function() {
      console.log('renderToStream beforeStart')
    }).on('error', function (err) {
      console.error(err)
      ctx.onerror(err)
    }).on('finish', () => {}).pipe(PassThrough())
    // ctx.body = renderResult
  })
}

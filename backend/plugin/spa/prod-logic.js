
const serve = require('koa-static')
const fs = require('fs')
const path = require('path')
const globalConfig = require('../../../config')
const feDist = globalConfig

module.exports = async(ctx, next) => {
  // 先检查 feDist 是否有该资源，没有则突出 index.html
  const serveFunc = serve(feDist, {
    maxage: 365 * 24 * 3600 * 1000
  })
  await serveFunc(ctx, async(ctx, next) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream(path.join(feDist, 'index.html'))
  })
}

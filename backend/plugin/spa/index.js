
const devLogic = require('./dev-logic')
const prodLogic = require('./prod-logic')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  middleware(app) {
    app.use(async(ctx, next) => {
      console.log('ctx.path', ctx.path)
      await next()
    })
  },
  view(proto) {
    proto.spa = async(ctx, next) => {
      if (isDev) {
        await devLogic(ctx, next)
      }
      else {
        await prodLogic(ctx, next)
      }
    }
  }
}

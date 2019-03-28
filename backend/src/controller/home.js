
const HomeController = {
  async ssr(ctx, next) {
    // 移动端
    if (ctx.userAgent.isMobile) {
      // ...
    }
    // SSR
    return this.view.ssr(ctx, next)
  }
}

module.exports = HomeController

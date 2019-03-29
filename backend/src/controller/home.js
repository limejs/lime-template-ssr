
const HomeController = {
  async ssr(ctx, next) {
    // SSR
    return this.vuessr()
  }
}

module.exports = HomeController

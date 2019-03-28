module.exports = {
  async main(ctx, next) {
    await this.view.spa(ctx, next)
  }
}

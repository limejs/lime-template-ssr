module.exports = function(options) {
  return {
    view(proto) {
      proto.ssr = function() {
        this.config.env
      }
    }
  }
}

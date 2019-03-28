const path = require('path')

module.exports = {
  webpackConfigFile: resolve('./frontend/webpack.config.js'), // webpack编译配置
  feDist: resolve('./dist/vue-server-bundle')
}

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath)
}

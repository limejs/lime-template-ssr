

const merge = require('webpack-merge')
const { resolvePathByRoot } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackBaseConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = require('../../config')
const env = process.env.NODE_ENV || 'production'

const webpackConfig = merge(webpackBaseConfig, {
  entry: {
    app: ['./src/entry/client.js']
  },
  module: {
    rules: [
    ]
  },
  devtool: env === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  optimization: {
    minimize: false,
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    runtimeChunk: {
      name: 'mainfest'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test(module) {
            // a module is extracted into the vendor chunk if...
            return (
              // it's inside node_modules
              /node_modules/.test(module.context) &&
              // and not a CSS file (due to extract-text-webpack-plugin limitation)
              !/\.css$/.test(module.request)
            )
          },
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env || 'production'),
      'process.env.VUE_ENV': '"client"'
    }),
    // 额外编译一个 client 的 html，用于线上异常时优雅降级为纯异步 https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(config.distPath, 'client/index.html'),
      template: resolvePathByRoot('src/views/index.html'),
      inject: true,
      minify: {
        removeComments: env === 'development' ? false :  true,
        collapseWhitespace: env === 'development' ? false :  true,
        removeAttributeQuotes: env === 'development' ? false :  true
      }
    }),
    new VueSSRClientPlugin(),
    // 拷贝 static 目录内容到 dist
    new CopyWebpackPlugin([
      {
        from: resolvePathByRoot('src/static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
  ]
})

module.exports = webpackConfig



const merge = require('webpack-merge')
const { resolvePathByRoot } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackBaseConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const config = require('./getconfig')

const webpackConfig = merge(webpackBaseConfig, {
  entry: {
    app: ['./src/entry/client.js']
  },
  module: {
    rules: [
    ]
  },
  devtool: config.env.isDev ? 'cheap-module-eval-source-map' : 'source-map',
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
      'process.env.NODE_ENV': JSON.stringify(config.env.name || 'production'),
      'process.env.VUE_ENV': '"client"'
    }),
    // 额外编译一个 client 的 html，用于线上异常时优雅降级为纯异步 https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(config.dist, 'client/index.html'),
      template: resolvePathByRoot('src/templates/index.spa.html'),
      inject: true,
      minify: {
        removeComments: config.env.isDev ? false :  true,
        collapseWhitespace: config.env.isDev ? false :  true,
        removeAttributeQuotes: config.env.isDev ? false :  true
      }
    }),
    new VueSSRClientPlugin(),
    // 拷贝 static 目录内容到 dist
    new CopyWebpackPlugin([
      {
        from: resolvePathByRoot('static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
  ]
})

module.exports = webpackConfig

const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')
const config = require('./getconfig')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const env = process.env.NODE_ENV || 'production'

module.exports = merge(webpackBaseConfig, {
  entry: {
    app: './src/entry/server.js'
  },
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(config.dist, 'server'),
    libraryTarget: 'commonjs2'
  },
  // node_modules下所有模块都不打包（css除外）
  externals: nodeExternals({
    modulesDir: path.resolve(__dirname, '../../node_modules'),
    whitelist: /\.(css|sass|scss)$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env || 'production'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})

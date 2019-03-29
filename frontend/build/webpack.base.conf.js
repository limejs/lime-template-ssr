/*
 * @file webpack 编译基础配置
 * @author: yongjiancui(yongjiancui@tencent.com)
 * @date: 2019-01-18
 */
 
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolvePathByRoot, getSassVueLoaders, getStyleLoader, createNotifierCallback } = require('./utils')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')

const config = require("./getconfig")

const webpackConfig = {
  mode: 'none',
  performance: {
    maxEntrypointSize: 300000
  },
  context: resolvePathByRoot('.'),
  output: {
    path: path.resolve(config.dist, 'client'),
    filename: config.env.isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:7].js',
    chunkFilename: config.env.isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:7].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json', '.styl', '.stylus', '.css', '.sass', 'scss', '.less'], // 这些扩展名文件在加载时可以省略模块文件名
    // 别名
    alias: {
      '@src': resolvePathByRoot('src'),
      '@assets': resolvePathByRoot('src/assets'),
      '@components': resolvePathByRoot('src/components'),
      '@stores': resolvePathByRoot('src/stores'),
      '@pages': resolvePathByRoot('src/pages'),
      '@apis': resolvePathByRoot('src/apis'),
      '@libs': resolvePathByRoot('src/libs'),
      '@router': resolvePathByRoot('src/router'),
    }
  },
  module: {
    noParse: [/es6-promise\.js$/, /lodash|jquery/],
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|swiper\.js)/,
        options: {
          rootMode: "upward",
        }
      },
      {
        test: /\.jsx$/,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          config.env.isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/img',
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/media',
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/fonts',
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

if (config.env.isProd) {
  webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin()), // es语法作用域提升的优化
  // 服务端编译有必要抽离 css 吗 (貌似有必要，因为不抽离的话，服务端就会在渲染的html里塞入style样式，可能会跟客户端注入的独立css 重叠)
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/css/[name].[chunkhash].css',
    // chunkFilename: '[id].[chunkhash].css'
  }))
  webpackConfig.plugins.push(new TerserPlugin({
    parallel: true,
    sourceMap: true
  }))
}
if (config.env.isDev) {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`开发环境启动成功`]
    },
    onErrors: createNotifierCallback()
  }))
  // webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin()) // HMR shows correct file names in console on update.
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
  webpackConfig.devServer = {
    disableHostCheck: true,
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/index.html') },
      ],
    },
    hot: true, // 热加载
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    open: true,
    overlay: { warnings: true, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true, // 使用 FriendlyErrorsPlugin 插件来显示错误
    watchOptions: {
      poll: false // webpack-dev-server watch 选项，我们不使用轮询方式检查文件变动
    }
  }
}

module.exports = webpackConfig

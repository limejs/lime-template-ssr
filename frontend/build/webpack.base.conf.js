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

const globalConfig = require("../../config")
const env = process.env.NODE_ENV || 'production'

const webpackConfig = {
  // mode: config.env === 'development' ? 'development' : 'production',
  mode: 'none',
  performance: {
    maxEntrypointSize: 300000
  },
  context: resolvePathByRoot('.'),
  output: {
    path: path.resolve(globalConfig.distPath, 'client'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 这些扩展名文件在加载时可以省略模块文件名
    // 别名
    alias: {
      '@src': resolvePathByRoot('src'),
      '@entry': resolvePathByRoot('src/entry'),
      '@apis': resolvePathByRoot('src/apis'),
      '@mixins': resolvePathByRoot('src/mixins'),
      '@directives': resolvePathByRoot('src/directives'),
      '@filters': resolvePathByRoot('src/filters'),
      '@libs': resolvePathByRoot('src/libs'),
      '@plugins': resolvePathByRoot('src/plugins'),
      '@stores': resolvePathByRoot('src/stores'),
      '@router': resolvePathByRoot('src/router'),
      '@views': resolvePathByRoot('src/views'),
      '@assets': resolvePathByRoot('src/views/assets'),
      '@components':resolvePathByRoot('src/views/components'),
      '@biz': resolvePathByRoot('src/views/components/biz'),
      '@ui': resolvePathByRoot('src/views/components/portal-ui')
    }
  },
  module: {
    noParse: [/es6-promise\.js$/, /lodash|jquery/],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: getSassVueLoaders(),
          cssSourceMap: env === 'production' ? true: false,
          preserveWhitespace: false, // 不保留模板中的空格符
          // 让模板编译时相关资源转换为 require 调用 https://vue-loader-v14.vuejs.org/zh-cn/options.html#transformtorequire
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|swiper\.js)/,
        options: {
          rootMode: "upward",
        }
        // include: [resolvePathByRoot('src')], // 让 babel 只处理 src 目录下的 JavaScript 代码
      },
      getStyleLoader('css'),
      getStyleLoader('sass'),
      getStyleLoader('scss'),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

if (env === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin()), // es语法作用域提升的优化
  // 服务端编译有必要抽离 css 吗 (貌似有必要，因为不抽离的话，服务端就会在渲染的html里塞入style样式，可能会跟客户端注入的独立css 重叠)
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/css/[name].[chunkhash].css',
    // chunkFilename: '[id].[chunkhash].css'
  }))
  // 服务端编译时有必要压缩吗 (其实也需要，比如在生产编译时，就让 server bundler 小一点，虽然是在node层运行的大小无关，但可能有点效果)
  // webpackConfig.plugins.push(new UglifyJSPlugin({
  //   sourceMap: config.needSourceMap,
  //   parallel: true,
  //   uglifyOptions: {
  //     compress: {
  //       warnings: true,
  //       drop_console: true
  //     }
  //   }
  // }))
  webpackConfig.plugins.push(new TerserPlugin({
    parallel: true,
    sourceMap: true
  }))
}
if (env === 'development') {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`开发环境启动成功，项目运行在: http://${globalConfig.host}:${globalConfig.port}`]
    },
    onErrors: createNotifierCallback()
  }))
  // webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin()) // HMR shows correct file names in console on update.
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
  // these devServer options should be customized in /config/index.js
  const HOST = process.env.HOST || '127.0.0.1'
  const PORT = process.env.PORT && Number(process.env.PORT) || globalConfig.port
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
    host: HOST,
    port: PORT,
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

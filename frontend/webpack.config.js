const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const globalConfig = require('../config')

const isDev = process.env.NODE_ENV === 'development'

let conf = {
  stats: {
    assets: true,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  mode: process.env.NODE_ENV || 'development',
  entry: ['@babel/polyfill', path.join(__dirname, './src/entry.js')],
  devtool: isDev ? 'eval' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.stylus', '.css', '.vue']
  },
  output: {
    filename: isDev ? 'static/js/app.js' : 'static/js/app.[chunkhash:8].js',
    path: path.join(globalConfig.feDist)
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }]
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
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            outputPath: 'static/img',
            name: '[name].[hash:6].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[hash:8].css',
      chunkFilename: isDev ? 'static/css/[id].css' : 'static/css/[id].[hash:8].css',
    })
  ],
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      // 注意: 这里配置不当会出现sourcemap文件丢失的情况。这里需要告诉css压缩插件: css处理器的sourcemap规则，从而知道如何处理souremap.
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          }
        }
      })
    ]
  }
}

if (isDev) {
  conf.devServer = {
    stats: "errors-only",
    // contentBase: './src',
    host: '0.0.0.0', // 监听所有网卡，从而不止通过回环地址来访问，还可让局域网设备访问 
    overlay: {
      errors: true
    }, // 在页面中展示错误层
    // open: true, // 启动后自动用浏览器打开地址和端口
    hot: true,
    historyApiFallback: true, // history路由模式的支持
  }
  conf.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin() // 服务器的热替换需要这里配置前端插件来支持前端事件接收. (不过vue的热替换已经有vue-loade支持了)
  )
}

module.exports = conf

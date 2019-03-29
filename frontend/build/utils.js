/*
 * @file 工具函数
 * @author: sheldoncui
 * @date: 2019-01-07 01:19
 */

const path = require('path')
const packageJson = require('../../package.json')
const chalk = require('chalk')
const semver = require('semver')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const webpackDevConf = require('./webpack.dev.conf')
// const webpackTestConf = require('./webpack.test.conf')
// const webpackProdConf = require('./webpack.prod.conf')

const env = process.env.NODE_ENV || 'production'
const isProd = env === 'production'

module.exports = {
  resolvePathByRoot(filepath) {
    return path.resolve(__dirname, '..', filepath)
  },
  checkVersion() {
    const moduleRequirement = [
      {
        mod: 'node',
        curVersion: process.version,
        requirement: packageJson.engines.node
      }
    ]
    const warnings = []
    moduleRequirement.forEach(item => {
      if (!semver.satisfies(item.curVersion, item.requirement)) {
        warnings.push(`* ${item.mod} 的版本必须为 ${item.requirement} [当前版本: ${item.curVersion}]`)
      }
    })
    if (warnings.length) {
      console.log(chalk.yellow('\n> 本机环境 node 或 npm 版本不符合要求:\n'))
      for (let i = 0; i < warnings.length; i++) {
        const warning = warnings[i]
        console.log('  ' + warning)
      }
      console.log()
      // 退出程序
      process.exit(0)
    }
  },

  createNotifierCallback() {
    const notifier = require('node-notifier')

    return (severity, errors) => {
      if (severity !== 'error') return

      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()

      notifier.notify({
        title: packageJson.name,
        message: severity + ': ' + error.name,
        subtitle: filename || ''
      })
    }
  }
}

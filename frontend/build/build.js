/*
 * @file 编译脚本入口，根据 NODE_ENV 变量来支持 development、testing、production 三种配置编译
 * @author: sheldoncui
 * @date: 2019-01-07 01:26
 */

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const util = require('util')
const config = require('../../config')
const webpackServerConf = require('./webpack.server.conf')
const webpackClientConf = require('./webpack.client.conf')
const { checkVersion } = require('./utils')

// 检查本机环境 node 是否符合项目要求
checkVersion()

const target = process.env.BUILD_TARGET

const env = process.env.NODE_ENV || 'production'

const webpackConfig = (target === 'server' ? webpackServerConf : webpackClientConf)

async function startBuild() {
  const spinner = ora(`building for ${env}...`)
  spinner.start()
  
  try {
    if (target !== 'server') {
      await fs.remove(path.join(config.distPath, 'client/static'))
    }
    const pwebpack = util.promisify(webpack)
    let stats = await pwebpack(webpackConfig)
    spinner.stop()
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  编译出错.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan(`  编译完成[NODE_ENV=${env} TARGET=${target}].\n`))
  }
  catch(err) {
    spinner.stop()
    throw err
  }
}

startBuild()

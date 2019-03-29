// 外部规范是使用 development test production
const env = process.env.NODE_ENV || 'production'

const fileMap = {
  'prod': 'prod',
  'production': 'prod',
  'dev': 'dev',
  'development': 'dev',
  'test': 'test',
  'testing': 'test'
}

const nameMap = {
  'prod': 'production',
  'dev': 'development',
  'test': 'test',
}

const keyword = fileMap[env]

const envConfig = require(`../config/${keyword}.js`)
const commonConfig = require('../config/common')

const result = Object.assign(commonConfig, envConfig)
result.env = {
  isDev: keyword === 'dev',
  isTest: keyword === 'test',
  isProd: keyword === 'prod',
  name: nameMap[keyword]
}

module.exports = result

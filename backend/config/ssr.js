/*
 * @file 各个模式的 ssr 配置 
 * @author: yongjiancui(yongjiancui@tencent.com)
 * @date: 2019-02-18
 */

let isProd = process.env.NODE_ENV === 'production'

// （开发模式默认纯前端渲染 static，生产模式默认 ssr）; 除了这里配置之外，在任何环境下也可以支持在 url 上加 _static=1 强制异步模式
let defaultMode = isProd ? 'ssr' : 'static'
let envMode = process.env.MODE

module.exports = {
  // 模式名称 static 表示异步版 ssr表示直出版
  default: envMode || defaultMode,
  // 注意：ssr 模式在开发环境是需要配 proxy 的。请通过 PROXY=127.0.0.1:8080 的环境变量进行设置
}

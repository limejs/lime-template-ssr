/*
* @file frontend 配置入口; 根据传入的 env 参数返回不同环境的配置(development, testing, production)
 * @author: yongjiancui(yongjiancui@tencent.com)
 * @date: 2019-01-22
*/

const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)

module.exports = {
  buildPath: resolve('frontend/build'), // 前端build脚本位置
  distPath: resolve('backend/fe-dist'), // 前端编译结果目录
  port: process.env.PORT || 3000, // 手工指定 backend 监听端口，可用 PORT 环境变量覆盖
  host: process.env.HOST || '127.0.0.1'
}

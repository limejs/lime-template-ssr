/* 
* @file 站点配置
*/

const path = require('path')

module.exports = {
  // 跨域CORS配置
  cors: {
    "origin": "https://*.example.com", // 不填则默认使用请求里的origin
    "allowMethods": "GET, POST"
  },
  // 域名和代理配置
  proxy: false,
  subdomainOffset: 2,
  domain: 'https://www.example.com', // 域名
  publicPath: '/blog',
  // cookie配置
  cookieKeys: ['abc', 'def'],
  // 额外的信息（不被内核支持的）
  siteAuthor: '{{author}}',
}

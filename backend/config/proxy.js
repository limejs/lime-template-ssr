// dev:proxy开发模式，从npm命令带入代理配置参数
let sProxy = process.env['PROXY'];
let config = null
if (sProxy) {
  let arr = sProxy.split(':');

  if (arr.length == 2) {
    // 必须要有IP和Port
    config = {
      ip: arr[0],
      port: Number(arr[1]) || 8899
    }
  }
}

export default config

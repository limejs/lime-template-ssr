const axios = require('axios')

export default function (params) {
  // 发送请求并返回
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 0,
        data: {
          header: ['姓名', '年龄'],
          body: [
            ['sheldon', 27],
            ['cating', 28]
          ]
        }
      })
    }, 1000)
  })
}

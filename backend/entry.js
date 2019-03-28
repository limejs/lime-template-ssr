const Lime = require('@limejs/core')
const globalConfig = require('../config')

const app = new Lime({
  root: __dirname
})

app.listen(globalConfig.port)

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})

const chalk = require('chalk')

module.exports = function(app, options) {
  if (!global.logger) {
    global.logger = makeLogger()
  }
}


function makeLogger() {
  const ok = (...msg) => {
    console.log(chalk.green(`[ OK ]`), '[', ...msg, ']')
  }
  
  return {
    ok(...msg) {
      ok(...msg)
    },
    success(...msg) {
      ok(...msg)
    },
    info(...msg) {
      console.log(chalk.cyan(`[INFO]`), '[', ...msg, ']')
    },
    warn(...msg) {
      console.log(chalk.yellow(`[WARN]`), '[', ...msg, ']')
    },
    error(...msg) {
      console.log(chalk.red(`[ERROR]`), '[', ...msg, ']')
    }
  }
}


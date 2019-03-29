
const open = require('opn')

module.exports = {
  command: 'doc',
  description: '查看 lime-tpl-standard 框架帮助文档',
  action() {
    open('https://www.example.com')
    process.exit(0)
  }
}

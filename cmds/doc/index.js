
const open = require('open')

module.exports = {
  command: 'doc',
  description: '查看帮助文档',
  async action() {
    open('https://github.com/limejs/lime')
  }
}

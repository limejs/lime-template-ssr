module.exports = function(config) {
  return [
    'ua',
    'global-logger',
    'static',
    {
      name: 'ssr',
      options: {}
    }
  ]
}

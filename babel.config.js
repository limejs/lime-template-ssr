module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', {
      'corejs': false,
      'helpers': true,
      'regenerator': false,
      'useEsModules': false
    }]
  ],
  babelrcRoots: ['./frontend', './backend']
}

module.exports = {
  exclude: //node
}

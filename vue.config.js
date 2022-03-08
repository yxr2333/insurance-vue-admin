const path = require('path')
const proxyObj = {}

function resolve(dir) {
  return path.join(__dirname, dir)
}
proxyObj['/'] = {
  ws: true,
  target: 'https://ins-spring-boot-1618793-1309615625.ap-shanghai.run.tcloudbase.com/',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: proxyObj
  },
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.plugin('html').tap(args => {
      args[0].title = '后台管理系统'
      return args
    })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

const express = require('express');

const app = express();
const {createProxyMiddleware}= require('http-proxy-middleware');//引入反向代理的插件

app.use(express.static(__dirname+"/dist"));
app.use(
  "/"
  ,createProxyMiddleware(
    {
      ws: true,
      target: 'https://ins-spring-boot-1618793-1309615625.ap-shanghai.run.tcloudbase.com/',
      changeOrigin: true,
      pathReWrite: {
        '^/': '/'
      }
    }
  )
);

app.listen(8080);

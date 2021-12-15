const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8002',  //﻿ 노드 서버가 5000 번이므로 target 도 같게한다.
      changeOrigin: true,
    })
  );
};
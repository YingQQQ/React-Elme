module.exports = {
  dev: {
    port: 8001,
    context: [
      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus',
      '/payapi',
      '/img',
    ],
    proxypath: 'http://cangdu.org:8001',
  }
};

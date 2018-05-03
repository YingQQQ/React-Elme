module.exports = {
  dev: {
    port: 8039,
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
      'restapi'
    ],
    proxypath: 'http://cangdu.org:8001'
  }
};

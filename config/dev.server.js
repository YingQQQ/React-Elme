import Koa from 'koa';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import logger from 'koa-logger';
import historyFallback from 'koa2-history-api-fallback';
import proxy from 'koa2-simple-proxy';
// import proxy from 'koa-proxies';
import config from '../webpack.config';
import portSetting from './port-help';

const app = new Koa();
const compiler = webpack(config);

const hotPort = portSetting.dev.port || 8080;

const dev = {
  noInfo: false,
  quiet: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: {
    colors: true
  }
};
// const proxyGuessOptions = {
//   target: 'https://restapi.ele.me/',
//   changeOrigin: true,
// };
const options = {
  target: portSetting.dev.proxypath,
  changeOrigin: true,
};

app.use(historyFallback());
// app.use(proxy('/shopping/v1/cities/guess', proxyGuessOptions));
app.use(proxy(portSetting.dev.context, options));
app.use(logger());
app.use(middleware({
  compiler,
  dev
}));


app.listen(hotPort, () => {
  console.info(`==> 🌎 Listening on port ${hotPort}. Open up http://localhost:${hotPort}/home in your browser.`);
});

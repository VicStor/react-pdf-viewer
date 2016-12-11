import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';

const app = express();
const port = 4040;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,
  {
    publicPath: config.output.publicPath,
    noInfo: true
  }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 👍 http://localhost:%s/', port);
  }
});

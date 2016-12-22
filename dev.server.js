import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';
const port = process.env.PORT || 4040;
const devIndex = path.resolve(__dirname, 'public/dev.index.html');

const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,
  {
    publicPath: config.output.publicPath,
    noInfo: true
  }));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(devIndex);
});

app.use(express.static('public'));


app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 👍 http://localhost:%s/', port);
  }
});

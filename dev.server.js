import express from 'express';
import path from 'path';
import colors from 'colors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import graphQLHTTP from 'express-graphql';
import schema from './server/graphql/schema';

import config from './webpack.config';
import appConfig from './server/config';


const index = path.resolve(__dirname, 'public/index.html');

/* GraphQL Server */
const gqlServer = express();

gqlServer.use('/api', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true
}));

gqlServer.listen(appConfig.gqlPort, (error) => {
  if (error) {
    console.error('Error in GraphQL server \n%s'.bold.red, error);
  } else {
    console.info(` 👍 GraphQL server runs on http://localhost:${appConfig.gqlPort}/api`.green);
  }
});
/* GraphQL Server */

const appServer = express();
const compiler = webpack(config);
appServer.use(webpackDevMiddleware(compiler,
  {
    hot: true,
    historyApiFallback: true,
    // contentBase: config.devServer.contentBase,
    proxy: { '/api': `http://localhost:${appConfig.gqlPort}` },
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
appServer.use(webpackHotMiddleware(compiler));

appServer.use(express.static('public'));

appServer.get('*', (req, res) => {
  res.sendFile(index);
});

appServer.listen(appConfig.appPort, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(' 👍 App server runs on http://localhost:%s/'.green, appConfig.appPort);
  }
});

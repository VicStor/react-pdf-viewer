import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import appConfig from './server/settings';

const BUILD_DIR = path.resolve(__dirname, appConfig.publicFolder);
const APP_DIR = path.resolve(__dirname, appConfig.appFolder);

const devServer = {
  contentBase: APP_DIR,
  outputPath: BUILD_DIR,
  colors: true,
  quiet: false,
  noInfo: false,
  publicPath: '',
  historyApiFallback: false,
  host: '127.0.0.1',
  proxy: {
    '/api': {
      target: `http://localhost:${appConfig.gqlPort}`
    }
  },
  port: appConfig.appPort,
  hot: true
};

export default {
  devtool: 'eval-source-map',
  debug: true,
  devServer,
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      `${APP_DIR}/index.js`,
      `${APP_DIR}/scss/main.scss`
    ],
    vendor: [
      'babel-polyfill',
      'react'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: APP_DIR,
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('css!autoprefixer!sass'),
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  // eslint: {
  //   configFile: path.resolve(BUILD_DIR, '.eslintrc.yml'),
  //   quiet: true
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'js/vendor.js',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new ExtractTextPlugin('css/styles.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
};

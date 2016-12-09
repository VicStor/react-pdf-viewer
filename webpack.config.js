import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const BUILD_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(__dirname, 'src/');

export default {
  devtool: 'cheap-eval-source-map',
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
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
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
  eslint: {
    configFile: path.resolve(BUILD_DIR, '.eslintrc.yml'),
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'vendor.js',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
};

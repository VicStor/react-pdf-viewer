const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {
  devtool: 'hidden-source-map',
  entry: {
    app: [
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
    configFile: path.resolve(__dirname, '.eslintrc.yml'),
    quiet: true
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(
      {
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false,
        mangle: true,
        minimize: true
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'js/vendor.js',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new ExtractTextPlugin('css/styles.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
};

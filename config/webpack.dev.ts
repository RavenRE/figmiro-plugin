const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

import {dist, PORT} from './config';

const src = path.resolve('./app');

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['react-hot-loader/patch', path.join(src, 'index.tsx')],
  devServer: {
    hot: true,
    contentBase: dist,
    open: false,
    port: PORT,
    liveReload: false
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});

/* tslint:disable: no-require-imports no-var-requires*/
import webpack from 'webpack';
import merge from 'webpack-merge';
const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
});

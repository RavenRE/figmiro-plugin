/* tslint:disable: no-require-imports no-var-requires*/
import merge from 'webpack-merge';
const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'production',
  devtool: false
});

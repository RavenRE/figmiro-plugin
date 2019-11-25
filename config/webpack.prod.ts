const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'production',
  devtool: false
});

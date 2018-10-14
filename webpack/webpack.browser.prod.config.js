const webpack = require('webpack');
const _ = require('lodash');

const webpackConfig = _.cloneDeep(require('./webpack.browser.base.config'));

webpackConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
);
webpackConfig.mode = 'production';
module.exports = webpackConfig;

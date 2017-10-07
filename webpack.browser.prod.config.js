const
  webpackDevConfig = require('./webpack.browser.dev.config'),
  _ = require('lodash'),
  webpack = require('webpack');

const webpackConfig = _.cloneDeep(webpackDevConfig);
delete webpackConfig.devtool;
webpackConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      drop_debugger: true,
    },
  })
);
module.exports = webpackConfig;

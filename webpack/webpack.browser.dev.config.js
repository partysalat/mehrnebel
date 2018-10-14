const webpackBaseConfig = require('./webpack.browser.base.config');
const path = require('path');

const webpackConfig = Object.assign({}, webpackBaseConfig, {
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:2999',
    },
    contentBase: path.join(__dirname, '../target/assets'),
    port: 9000,
  },
});
module.exports = webpackConfig;

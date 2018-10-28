const webpack = require('webpack');
const _ = require('lodash');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const webpackConfig = _.cloneDeep(require('./webpack.browser.base.config'));

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new ExtractCssChunks({
    filename: 'assets/[name]-[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  })].concat(webpackConfig.plugins);
webpackConfig.mode = 'production';

webpackConfig.module.rules.push({
  test: /\.styl/,
  use: [
    ExtractCssChunks.loader,
    // 'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins() {
          return [
            require('cssnano')({
              zindex: false,
              autoprefixer: {
                browsers: [
                  '> 2%',
                  'Android 4',
                  'last 5 Safari versions',
                  'last 3 iOS versions',
                  'last 5 Chrome versions',
                  'last 5 ChromeAndroid versions',
                  'last 2 ExplorerMobile versions',
                  'last 2 FirefoxAndroid versions',
                ],
                add: true,
              },
            }),
          ];
        },
      },
    },
    {
      loader: 'stylus-loader',
    },
  ],
});

module.exports = webpackConfig;

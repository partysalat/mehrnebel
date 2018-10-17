const webpackBaseConfig = require('./webpack.browser.base.config');
const path = require('path');
const bootstrap = require('bootstrap-styl');
const jeet = require('jeet');


const webpackConfig = Object.assign({}, webpackBaseConfig, {
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    proxy: {
      // simulating cloudfront reverse proxy
      '/api': 'http://localhost:2999',
    },
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../target/assets'),
    port: 9000,
  },

});

webpackConfig.module.rules.push({
  test: /\.styl/,
  use: [
    'style-loader',
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
      options: {
        use: [bootstrap(), jeet()],
      },
    },
  ],
});
module.exports = webpackConfig;

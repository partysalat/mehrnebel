const path = require('path');
const mkdirp = require('mkdirp');
const bootstrap = require('bootstrap-styl');
const jeet = require('jeet');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: {
    mehrnebel: './lib/browser/main.jsx',
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname,'../target/assets'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // new ExtractCssChunks({
    //   filename: 'mehrnebel-[hash].css',
    // }),
    function () {
      this.plugin('done', (stats) => {
        mkdirp.sync(path.join(__dirname, '../target'));
        require('fs').writeFileSync(
          path.join(__dirname, '../target', 'rev-manifest.json'),
          JSON.stringify(stats.toJson().assetsByChunkName),
        );
      });
    },

  ],
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          // ExtractCssChunks.loader,
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
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

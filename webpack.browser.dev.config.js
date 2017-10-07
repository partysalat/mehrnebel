const
  path = require('path'),
  webpack = require('webpack'),
  mkdirp = require('mkdirp'),
  bootstrap = require('bootstrap-styl'),
  jeet = require('jeet'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/browser/main.jsx',
  },
  output: {
    filename: 'flunkimat-[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('flunkimat-[hash].css'),
    function () {
      this.plugin('done', (stats) => {
        mkdirp.sync(path.join(__dirname, 'target'));
        require('fs').writeFileSync(
          path.join(__dirname, 'target', 'rev-manifest.json'),
          JSON.stringify(stats.toJson().assetsByChunkName));
      });
    },

  ],
  // stylus: {
  //   use: [bootstrap(), jeet()],
  // },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
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
        }),
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

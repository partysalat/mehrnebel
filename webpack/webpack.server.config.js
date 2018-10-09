let
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    indexHandler: './lib/server/handlers/indexHandler.js',
    pushHandler: './lib/server/handlers/pushHandler.js',
  },
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/.webpack`,
    filename: './lib/server/handlers/[name].js',
  },
  // output: provided by serverless
  target: 'node',
  externals: [
    'aws-sdk',
    // './../../../target/rev-manifest.json',
    nodeExternals(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl/,
        loader: 'ignore-loader',
      },
    ],
  },
};

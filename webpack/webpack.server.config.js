const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    statsHandler: './lib/server/handlers/statsHandler.js',
    pushHandler: './lib/server/handlers/pushHandler.js',
    iotCredentialsHandler: './lib/server/handlers/iotCredentialsHandler.js',
  },
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/../.webpack`,
    filename: './lib/server/handlers/[name].js',
  },
  target: 'node',
  externals: [
    'aws-sdk',
    nodeExternals(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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

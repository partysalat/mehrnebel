const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    mehrnebel: './lib/browser/main.jsx',
  },
  output: {
    filename: 'assets/[name]-[hash].js',
    path: path.resolve(__dirname, '../target'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    ws: 'window.WebSocket',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      filename: 'index.html',
      template: path.resolve(__dirname, './../lib/browser/index.html'),
    }),
  ],
  module: {
    rules: [
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
  node: {
    fs: 'empty',
    tls: 'empty',
  },
};

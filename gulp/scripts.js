

const
  gulp = require('gulp'),
  bs = require('browser-sync'),
  webpack = require('webpack'),
  _ = require('lodash'),
  gulpWebpack = require('webpack-stream');

const
  webpackDevConfig = require('./../webpack.browser.dev.config'),
  webpackProdConfig = require('./../webpack.browser.prod.config.js');

gulp.task('_scripts:watch', () => {
  const webpackConfig = _.assign({}, webpackDevConfig, {
    watch: true,
  });
  compile(webpackConfig, bs.reload);
});

gulp.task('_scripts:dev', () => compile(webpackDevConfig));

gulp.task('_scripts', () => compile(webpackProdConfig));

function compile(webpackConfig, callback) {
  return gulp.src('I_DOnT_EXisST')
    .pipe(gulpWebpack(webpackConfig, webpack, callback || _.noop))
    .on('error', console.error)
    .pipe(gulp.dest('target/assets'));
}

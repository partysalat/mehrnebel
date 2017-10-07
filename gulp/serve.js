let gulp = require('gulp'),
  serve = require('gulp-serve');

gulp.task('_serve', serve({
  root: ['./target/assets'],
  port: 9211,
}));


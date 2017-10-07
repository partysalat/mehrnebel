const
  gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('serve', ['_serve']);
gulp.task('watch', ['_watch']);
gulp.task('build:client', ['_scripts']);
gulp.task('deploy:assets', ['_aws:deploy']);

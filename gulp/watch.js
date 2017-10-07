const gulp = require('gulp');
const path = require('path');
const bs = require('browser-sync');

gulp.task('_watch', ['_start:bs', '_scripts:watch'], () => {
  gulp.watch(path.resolve(`${__dirname}/../lib/server/**/*`), ['_reload']);
});

gulp.task('_reload', () => {
  console.log('Reload browser-sync');
  bs.reload();
});

gulp.task('_start:bs', () => {
  bs({
    proxy: 'http://localhost:2999',
    open: false,
  });
});

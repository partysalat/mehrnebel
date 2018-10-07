const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const yaml = require('js-yaml');
const fs = require('fs');

const cfnConfig = yaml.safeLoad(fs.readFileSync(`${__dirname}/../cfn/application-resources-stack.yaml`, 'utf8'));

gulp.task('_aws:deploy:page', () => {
  const publisher = awspublish.create({
    region: cfnConfig.region,
    params: {
      Bucket: cfnConfig.stacks['dutrinkst-page'].parameters.bucketName,
      ACL: 'public-read',
    },
  }, {
    cacheFileName: './deploy-cache',
  });
  const headers = {
    'Cache-Control': 'max-age=0, no-transform, public',
  };

  return gulp.src('./target/page/**/*')
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});


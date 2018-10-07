const
  gulp = require('gulp'),
  awspublish = require('gulp-awspublish'),
  yaml = require('js-yaml'),
  rename = require('gulp-rename');
const fs = require('fs');

const cfnConfig = yaml.safeLoad(fs.readFileSync(`${__dirname}/../cfn/application-resources-stack.yaml`, 'utf8'));

gulp.task('_aws:deploy', () => {
  const publisher = awspublish.create({
    region: cfnConfig.region,
    params: {
      Bucket: cfnConfig.stacks['mehrnebel-assets'].parameters.assetsBucketName,
      ACL: 'public-read',
    },
  }, {
    cacheFileName: './deploy-cache',
  });
  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public',
  };

  return gulp.src('./target/assets/**/*')
    .pipe(rename((path) => {
      path.dirname += cfnConfig.stacks['mehrnebel-assets'].parameters.originPath;
    }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});


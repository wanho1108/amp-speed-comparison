var gulp = require('gulp');
var fs = require('fs');
var fn = require('gulp-fn');
var htmlReplace = require('gulp-html-replace');
var purifyCss = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');

gulp.task('amp-custom', function (done) {
  var css = gulp.src('src/assets/*.css');
  gulp.src('src/amp/**/*.html')
      .pipe(fn(function (file) {
        console.log(file.path);
        gulp.src(file.path)
          .pipe(htmlReplace({
            'ampStyleInline': {
              'src': css
                .pipe(purifyCss([file.path]))
                .pipe(cleanCSS()),
              'tpl': '<style amp-custom>%s</style>'
            }
          }))
          .pipe(gulp.dest('dist'));
      }));
  done();
});

// gulp.task('amp-custom:watch', function () {
//   // return gulp.watch(
//   //   ['src/amp/**/*.html', 'src/assets/*.css'],
//   //   ['amp-custom']
//   // );
// });

gulp.task('default', gulp.series('amp-custom', function (done) {
  done();
}));
// gulp.task('default', ['amp-custom', 'amp-custom:watch']);
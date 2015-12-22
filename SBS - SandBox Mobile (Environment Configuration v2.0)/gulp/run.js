/**
 * Created by wchavarria-as on 21/12/2015.
 */
var gulp = require('gulp');
var sh = require('shelljs');

/*Run Web*/
gulp.task('web', function (done) {
  sh.exec('ionic serve');
  done();
});

/*Run Android*/
gulp.task('android', function (done) {
  sh.exec('ionic run android --livereload');
  done();
});

gulp.task('androidMobile', function (done) {
  sh.exec('ionic run android');
  done();
});

/*Run IOS*/
gulp.task('ios', function (done) {
  sh.exec('ionic run ios -l --livereload');
  done();
});


/**
 * Created by wchavarria-as on 21/12/2015.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var sh = require('shelljs');
var runSequence = require('run-sequence');


var paths = {
  sassFilesSrc: ['./src/scss/**/*.scss'],
  jsFilesSrc: ['./src/app/**/*.js'],
  cssFilesDest: './www/css/',
  indexFile: './www/index.html',
  injectFilesSrc: ['./www/app/**/*.js','./www/css/**/*.css'],
  injectFilesDest: './www/',
  htmlFilesSrc : ['./src/app/**/*.html'],
  appDest : './www/app/',
  htmlIndexSrc : ['./src/index.html'],
  htmlIndexDest : './www/',
  //lib Folder
  libFolderSrc : ['./src/lib/**/*'],
  libFolderDest: './www/lib'
};

/*General*/
gulp.task('copyIndex', function () {
  return gulp.src(paths.htmlIndexSrc)
    .pipe(gulp.dest(paths.htmlIndexDest));
});

gulp.task('copyIndexFiles', function() {
  return gulp.src(paths.htmlFilesSrc)
    .pipe(gulp.dest(paths.appDest));
});

gulp.task('copyJSFiles', function() {
  return gulp.src(paths.jsFilesSrc)
    .pipe(gulp.dest(paths.appDest));
});

gulp.task('copyLibFolder', function () {
  return gulp.src(paths.libFolderSrc)
    .pipe(gulp.dest(paths.libFolderDest));
});

gulp.task('inject', function () {
  var target = gulp.src(paths.indexFile)
  var sources = gulp.src(paths.injectFilesSrc, {read:false}, {relative: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest(paths.injectFilesDest));
});

gulp.task('watch', function() {
  var files = paths.sassFilesSrc.concat(paths.htmlFilesSrc).concat(paths.htmlIndexSrc);
  gulp.watch(files, ['depends']);
});


/*Development*/

gulp.task('sass', function (done) {
  gulp.src(paths.sassFilesSrc)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.cssFilesDest))
    .on('end', done);
});

gulp.task('default', function (callback) {
  runSequence (['copyIndex', 'copyIndexFiles', 'copyJSFiles', 'copyLibFolder', 'sass']);/*, 'sass'],'inject', 'watch');*/
});

gulp.task('depends', function (callback) {
  runSequence (['copyIndex', 'copyIndexFiles', 'copyJSFiles', 'copyLibFolder', 'sass'],'inject');
});










/*Deploy*/
gulp.task('deploy', ['sassMinify', 'inject', 'android']);

gulp.task('sassMinify', function (done) {
  gulp.src(paths.sassFilesSrc)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.cssFilesDest))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.cssFilesDest))
    .on('end', done);
});

gulp.task('concatJS', function (){
  gulp.src(paths.jsFilesSrc)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js/'));
});

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

gulp.task('androidDeploy', function (done) {
  sh.exec('cordova build --release android');  //check /platforms/android/build/outputs/apk
  done();
});

/*Run IOS*/
gulp.task('ios', function (done) {
  sh.exec('ionic run ios -l --livereload');
  done();
});

gulp.task('iosDeploy', function (done) {
  done();
});

/*Default Config*/

/*
 gulp.task('watch', function() {
 gulp.watch(paths.sassFilesSrc, ['sass']);
 });

 gulp.task('sass', function(done) {
 gulp.src('./scss/testingWalter.scss')
 .pipe(sass())
 .on('error', sass.logError)
 .pipe(gulp.dest('./www/css/'))
 .pipe(minifyCss({
 keepSpecialComments: 0
 }))
 .pipe(rename({ extname: '.min.css' }))
 .pipe(gulp.dest('./www/css/'))
 .on('end', done);
 });


 gulp.task('install', ['git-check'], function() {
 return bower.commands.install()
 .on('log', function(data) {
 gutil.log('bower', gutil.colors.cyan(data.id), data.message);
 });
 });

 gulp.task('git-check', function(done) {
 if (!sh.which('git')) {
 console.log(
 '  ' + gutil.colors.red('Git is not installed.'),
 '\n  Git, the version control system, is required to download Ionic.',
 '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
 '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
 );
 process.exit(1);
 }
 done();
 });
 */

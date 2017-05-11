// gulp
var gulp = require('gulp');

// plugins
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var bowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var TestServer = require('karma').Server;
var s3 = require("gulp-s3");
var s3Credentials = require('./aws-keys.json');

gulp.task('clean', function(cb) {
  rimraf('./dist/**/*', cb);
});

gulp.task('copy-scripts', function() {
  gulp.src('./app/scripts/**').pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy-images', function() {
  gulp.src('./app/images/**').pipe(gulp.dest('./dist/images'));
});

gulp.task('copy-public', function() {
	  gulp.src('./app/public/**').pipe(gulp.dest('./dist/public'));
});

// note that this task ignores _*.scss files
gulp.task('minify-sass', function () {
    gulp.src('./app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS({comments:true,spare:true}))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('minify-bower-css', function () {
    gulp.src(bowerFiles('**/*.css'))
        .pipe(concat('styles/vendor.css'))
        .pipe(minifyCSS({comments:true,spare:true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-bower-components-js', function () {
    gulp.src(bowerFiles('**/*.js'))
        .pipe(concat('scripts/vendor.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('semantic-assets', function() {
    gulp.src('bower_components/semantic/dist/**')
      .pipe(gulp.dest('dist/semantic'))
});

gulp.task('copy-html-files', function() {
    gulp.src('./app/**/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('copy-json-files', function() {
    gulp.src('./app/**/*.json')
      .pipe(gulp.dest('dist/'));
});

gulp.task('copy-html-and-json-files', ['copy-html-files', 'copy-json-files']);

gulp.task('copy-env-config-file', function() {
  var env = process.env.NODENV || 'dev';
  var configFile = './app/configs/' + env + '.js';
  gulp.src(configFile)
    .pipe(rename("config.js"))
    .pipe(gulp.dest("./dist"));
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9000
  });
});

gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['copy-scripts', 'copy-images','copy-public', 'minify-js', 'semantic-assets', 'copy-html-and-json-files', 'copy-bower-components-js', 'minify-bower-css', 'minify-sass', 'copy-env-config-file']
  );
});

gulp.task('test', function (done) {
  var testServer = new TestServer({configFile: __dirname + '/test/karma.conf.js', singleRun: true}, done)
  testServer.start();
});

gulp.task('watch',function(){
  gulp.watch('./app/**/*', ['build']);
});

gulp.task('serve', function() {
  runSequence(['build', 'watch', 'connectDist']);
});

gulp.task('deploy', function() {
  gulp.src('./dist/**').pipe(s3(s3Credentials));
});

// default task
gulp.task('default', ['serve']);

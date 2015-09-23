var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var merge = require('merge-stream');

// Bower install 
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components/'))
});

// Gulp Sass Task 
gulp.task('sass', ['bower'], function() {
  var sassStream,
      cssStream;

  cssStream = gulp.src('./bower_components/normalize-css/normalize.css');
  sassStream = gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sass({
      errLogToConsole: true
    }));

  return merge(cssStream, sassStream)
	.pipe(concat('styles.css'))
    	.pipe(cssMin({compatibility: 'ie8'}))
	.pipe(gulp.dest('./css'));
});


gulp.task('init', ['bower', 'sass'])
gulp.task('default', ['sass']);
gulp.task('watch', function () {
  return gulp.watch('./scss/**/*.scss', ['sass']);
});

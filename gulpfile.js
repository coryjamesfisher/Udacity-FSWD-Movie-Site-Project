var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var cssMin = require('gulp-minify-css');

// Bower install 
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components/'))
});

// Gulp Sass Task 
gulp.task('sass', ['bower'], function() {
  return gulp.src('./scss/{,*/}*.{scss,sass}')
//    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
//    .pipe(sourcemaps.write())
    .pipe(cssMin({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'));
});


gulp.task('init', ['bower', 'sass'])
gulp.task('default', ['sass']);
gulp.task('watch', function () {
  return gulp.watch('./scss/**/*.scss', ['sass']);
});

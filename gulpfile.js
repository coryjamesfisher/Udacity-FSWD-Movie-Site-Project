var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');

// Gulp Sass Task 
gulp.task('sass', ['bower'], function() {
  return gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
})

 
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components/'))
});

gulp.task('init', ['bower', 'sass'])
gulp.task('default', ['sass']);

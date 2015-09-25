var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var streamqueue = require('streamqueue');
var modernizr = require('gulp-modernizr');
var react = require('gulp-react');

// Bower install 
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components/'))
});

// Gulp Sass Task 
gulp.task('sass', ['bower'], function() {
  var resetCSS,
      coreCSS,
      addOnCSS;

  resetCSS = gulp.src('./bower_components/normalize-css/normalize.css');
  coreCSS = gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sass({
      errLogToConsole: true
    }));

  addOnCSS = gulp.src(['./bower_components/remodal/dist/remodal.css', './bower_components/remodal/dist/remodal.css']);
  return streamqueue({ objectMode: true },
            resetCSS,
            coreCSS,
            addOnCSS
        )
	.pipe(concat('styles.css'))
    	.pipe(cssMin({compatibility: 'ie8'}))
	.pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
  gulp.src('./node_modules/modernizr/src/*.js')
	.pipe(modernizr({
          "minify": true,
          "options": [
            "domPrefixes",
            "prefixes",
            "addTest",
            "hasEvent",
            "mq",
            "prefixed",
            "testAllProps",
            "testProp",
            "testStyles",
            "html5shiv",
            "setClasses"
          ],
          "feature-detects": [
            "test/applicationcache",
            "test/audio",
            "test/canvas",
            "test/canvastext",
            "test/geolocation",
            "test/hashchange",
            "test/history",
            "test/indexeddb",
            "test/input",
            "test/inputtypes",
            "test/postmessage",
            "test/svg",
            "test/video",
            "test/webgl",
            "test/websockets",
            "test/css/animations",
            "test/css/backgroundsize",
            "test/css/borderimage",
            "test/css/borderradius",
            "test/css/boxshadow",
            "test/css/columns",
            "test/css/flexbox",
            "test/css/fontface",
            "test/css/generatedcontent",
            "test/css/gradients",
            "test/css/hsla",
            "test/css/multiplebgs",
            "test/css/opacity",
            "test/css/reflections",
            "test/css/rgba",
            "test/css/textshadow",
            "test/css/transforms",
            "test/css/transforms3d",
            "test/css/transitions",
            "test/storage/localstorage",
            "test/storage/sessionstorage",
            "test/storage/websqldatabase",
            "test/svg/clippaths",
            "test/svg/inline",
            "test/svg/smil",
            "test/workers/webworkers"
          ]
	}))
	.pipe(gulp.dest('./js/'));

	gulp.src('./bower_components/remodal/dist/remodal.min.js')
	.pipe(gulp.dest('./js/'));

	return gulp.src('./js/movies.jsx')
		.pipe(react())
		.pipe(gulp.dest('./js/'));
});


gulp.task('init', ['bower', 'sass', 'js'])
gulp.task('default', ['sass']);
gulp.task('watch', function () {
  return gulp.watch('./scss/**/*.scss', ['sass']);
});

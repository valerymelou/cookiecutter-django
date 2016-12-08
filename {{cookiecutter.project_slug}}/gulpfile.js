
////////////////////////////////
		//Setup//
////////////////////////////////

// Plugins
var gulp = require('gulp'),
      pjson = require('./package.json'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      del = require('del'),
      plumber = require('gulp-plumber'),
      pixrem = require('gulp-pixrem'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      exec = require('child_process').exec,
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload;


// Relative paths function
var pathsConfig = function (appName) {
  this.app = "./" + (appName || pjson.name);

  return {
    app: this.app,
    templates: this.app + '/templates/**/*.html',
    css: this.app + '/static/css/**/*.css',
    sass: this.app + '/static/sass/**/*.scss',
    fonts: this.app + '/static/fonts',
    images: this.app + '/static/images/**/*',
    js: this.app + '/static/js/**/*.js',
    dist: this.app + '/static',
  }
};

var paths = pathsConfig();

////////////////////////////////
		//Tasks//
////////////////////////////////

// Styles autoprefixing and minification
gulp.task('styles', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber()) // Checks for errors
    .pipe(autoprefixer({browsers: ['last 2 version']})) // Adds vendor prefixes
    .pipe(pixrem())  // add fallbacks for rem units
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano()) // Minifies the result
    .pipe(gulp.dest(paths.dist + '/css'));
});

// Javascript minification
gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe(plumber()) // Checks for errors
    .pipe(uglify()) // Minifies the js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist + '/js'));
});

// Image compression
gulp.task('imgCompression', function(){
  return gulp.src(paths.images)
    .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
    .pipe(gulp.dest(paths.dist + '/images'))
});

// Run django server
gulp.task('runServer', function() {
  exec('python manage.py runserver', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

// Browser sync server for live reload
gulp.task('browserSync', function() {
    browserSync.init(
      [paths.css, paths.js, paths.templates], {
        proxy:  "localhost:8000"
    });
});

// Default task
gulp.task('default', function() {
    runSequence(['styles', 'scripts', 'imgCompression'], 'runServer', 'browserSync');
});

////////////////////////////////
		//Watch//
////////////////////////////////

// Watch
gulp.task('watch', ['default'], function() {

  gulp.watch(paths.sass, ['styles']);
  gulp.watch(paths.js, ['scripts']).on("change", reload);
  gulp.watch(paths.images, ['imgCompression']);
  gulp.watch(paths.templates).on("change", reload);

});

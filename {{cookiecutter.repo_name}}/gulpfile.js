'use strict';

// Include gulp and tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var exec = require('child_process').exec;
var notifier = require('node-notifier');

// Configuration used within this gulpfile
var app = '{{ cookiecutter.repo_name }}';
var dist = 'build';
var config = {
    css: app + '/static/css/**/*.css',
    scss: app + '/static/scss/**/*.scss',
    js: app + '/static/js/**/*.js',
    images: app + '/static/images/**/*',
    html: app + '/templates/**/*.html'
};

// Autoprefixers
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

function getRelativePath(absPath) {
    absPath = absPath.replace(/\\/g, '/');
    var curDir = __dirname.replace(/\\/g, '/');
    return absPath.replace(curDir, '');
}

function logUglifyError(error) {
    this.emit('end');
    var file = getRelativePath(error.fileName);
    $.util.log($.util.colors.bgRed('Uglify Error:'))
    $.util.log($.util.colors.bgMagenta('file: ') + $.util.colors.inverse(file));
    $.util.log($.util.colors.bgMagenta('line: '+error.lineNumber));
    //remove path from error message
    var message = error.message.substr(error.message.indexOf(' ')+1);
    $.util.log($.util.colors.bgRed(message));
    notifier.notify({ title: 'Gulp message', message: 'Uglify error!' });
}


function logSASSError(error) {
    var file = getRelativePath(error.file);
    $.util.log($.util.colors.bgRed('Sass Error:'))
    $.util.log($.util.colors.bgMagenta('file: ') + $.util.colors.inverse(file));
    $.util.log($.util.colors.bgMagenta('line: '+error.line+', column: '+error.column));
    $.util.log($.util.colors.bgRed(error.message));
    notifier.notify({ title: 'Gulp message', message: 'SASS Error!' });
}


// Compile, concat, minify and automatically prefix stylesheets
gulp.task('styles', function() {
    return gulp.src([config.css, config.scss])
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', logSASSError))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.concat('styles.css'))
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dist + '/css'))
        .pipe($.size({title: 'styles'}));
});


// Concat and minify scripts
gulp.task('scripts', function() {
    return gulp.src(config.js)
        .pipe($.sourcemaps.init())
        .pipe($.concat('scripts.js'))
        .pipe($.uglify()).on('error', logUglifyError)
        .pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dist + '/js'))
        .pipe($.size({title: 'scripts'}));
});


// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src(config.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});


// Optimize images
gulp.task('images', function() {
    return gulp.src(config.images)
        .pipe($.cache($.imagemin({progressive: true, interlaced: true})))
        .pipe(gulp.dest(dist + '/images'))
        .pipe($.size({title: 'images'}));
});


// Clear the cache
gulp.task('clear-cache', function() {
    // Clear all cached files
    $.cache.clearAll();
});


// Delete all generated files
gulp.task('clean', del.bind(null, [
    dist + '/css',
    dist + '/js',
    dist + '/images',
]));


// Optimize files and save the output to the dist folder
gulp.task('dist', ['clean'], function(cb) {
    runSequence('styles', ['jshint', 'scripts', 'images'], cb);
});


// Run Django server
gulp.task('runserver', function() {
    var proc = exec('python manage.py runserver');
});


// Optimize files, watch for changes & reload, the default task
gulp.task('default', ['dist', 'runserver'], function() {
    browserSync({
        notify: false,
        proxy: 'localhost:8000'
    });
    gulp.watch([config.html], reload);
    gulp.watch([config.css, config.scss], ['styles', reload]);
    gulp.watch([config.js], ['scripts', reload]);
    gulp.watch([config.images], ['images', reload]);
});

//GENERAL
var gulp = require('gulp');
var config = require('./../gulpConfig');
var less = require('gulp-less');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');

var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;
var lessFilter = filter('**/*.less');
var sassFilter = filter(['**/*.sass', '**/*.scss']);
var cssFilter = filter('**/*.css');

/*BUILD*/
gulp.task('build:css', ['clean:build_css'], function() {
    return gulp
        .src(mainBowerFiles().concat(['./src/**/*.css', './src/**/*.less', './src/**/*.scss', './src/**/*.sass']))
        .pipe(lessFilter)
        .pipe(less())
        .pipe(lessFilter.restore())
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(sassFilter.restore())
        .pipe(cssFilter)
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(concat(currVersion + '.css'))
        .pipe(gulp.dest(config.build + 'assets'))
        .pipe(browserSync.stream());
});

gulp.task('clean:build_css', function() {
    return gulp.src(config.build + 'assets/**/*.css', {read:false})
        .pipe(clean());
});

/*COMPILE*/
gulp.task('compile:css', ['clean:compile_css', 'build:css'], function() {
    return gulp.src(config.build + 'assets/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest(config.compile + 'assets/'));
});

gulp.task('clean:compile_css', function() {
    return gulp
        .src(config.compile + '**/*.css', {read:false})
        .pipe(clean());
});
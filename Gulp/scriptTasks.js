var gulp = require('gulp');
var config = require('./../gulpConfig');
var header = require('gulp-header');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var wrap = require('gulp-wrapper');
var html2js = require('gulp-html2js');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');


var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;
var appJS = config.app_files.js;


gulp.task('build:js_bower', ['clean:js_bower'], function() {
    return gulp
        .src(mainBowerFiles())
        .pipe(filter('**/*.js'))
        .pipe(gulp.dest(config.build + 'vendor'));
});

gulp.task('clean:js_bower', function() {
    return gulp
        .src(config.build + 'vendor', {read:false})
        .pipe(clean());
});

gulp.task('build:copy_js', ['clean:copy_js'], function() {
    return gulp
        .src('./src/**/*.js')
        .pipe(ngAnnotate())
        .pipe(wrap({
            header: "(function ( window, angular, undefined ) {\n 'use strict';\n",
            footer: "})( window, window.angular );\n"
        }))
        .pipe(gulp.dest(config.build + 'src'));
});

gulp.task('clean:copy_js', function() {
    return gulp
        .src(config.build + 'src', {read:false})
        .pipe(clean());
});

gulp.task('build:templateCache', ['clean:templateCache'], function() {
    return gulp
        .src('./src/app/**/*.tpl.html')
        .pipe(html2js({
            base: 'src/app',
            outputModuleName: 'templates-app',
            useStrict: true }))
        .pipe(concat('template-app.js'))
        .pipe(gulp.dest(config.build + 'src/'));
});

gulp.task('clean:templateCache', function() {
    return gulp
        .src(config.build + 'src/template-app.js', {read:false})
        .pipe(clean());
});

gulp.task('compile:js', ['clean:compile_js', 'build:js_bower', 'build:copy_js', 'build:templateCache'], function() {
    return gulp
        .src([config.build + 'vendor/angular.js', config.build + 'vendor/**/*.js', config.build + 'src/**/*.js'])
        //TODO: Name concated file?
        .pipe(concat('app.js'))
        /*.pipe(uglify({mangle:false}))*/
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.compile + 'assets'));
});

gulp.task('clean:compile_js', function(){
    return gulp.src(config.compile + '**/*.js', {read:false})
        .pipe(clean());
});
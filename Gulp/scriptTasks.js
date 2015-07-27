var gulp = require('gulp');
var header = require('gulp-header');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var wrap = require('gulp-wrapper');
var templatecache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');


var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;
var appJS = config.app_files.js;



gulp.task('b_m:js_bower', function() {
    return gulp
        .src(mainBowerFiles())
        .pipe(filter('**/*.js'))
        .pipe(gulp.dest(config.build + 'vendor'));
});

gulp.task('b_c:js_bower', function() {
    return gulp
        .src(config.build + 'vendor', {read:false})
        .pipe(clean());
});

gulp.task('b_m:js', function() {
    return gulp
        .src('./src/**/*.js')
        .pipe(ngAnnotate())
        .pipe(wrap({
            header: "(function ( window, angular, undefined ) {\n 'use strict';\n",
            footer: "})( window, window.angular );\n"
        }))
        .pipe(gulp.dest(config.build + 'src'));
});

gulp.task('b_c:js', function() {
    return gulp
        .src(config.build + 'src', {read:false})
        .pipe(clean());
});

gulp.task('b_m:templateCache', function() {
    return gulp
        .src('./src/app/**/*.tpl.html')
        .pipe(templatecache('templates-app.js',{
            standalone: true,
            module: 'templates-app',
            moduleSystem: 'IIFE'}))
        .pipe(gulp.dest(config.build + 'src/'));
});

gulp.task('b_c:templateCache', function() {
    return gulp
        .src(config.build + 'src/template-app.js', {read:false})
        .pipe(clean());
});

gulp.task('c_m:js', function() {
    return gulp
        .src([config.build + 'vendor/angular.js', config.build + 'vendor/**/*.js', config.build + 'src/templates-app.js', config.build + 'src/app/app.js', config.build + 'src/**/*.js', '!' + config.build + 'src/**/*.spec.js'])
        //TODO: Name concated file?
        .pipe(concat('app.js'))
        .pipe(uglify({}))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.compile + 'assets'));
});

gulp.task('c_c:js', function(){
    return gulp.src(config.compile + '**/*.js', {read:false})
        .pipe(clean());
});



//Master Script Build Tasks
gulp.task('build:js', gulp.series('b_c:js', 'b_m:js'));
gulp.task('build:js_bower', gulp.series('b_c:js_bower', 'b_m:js_bower'));
gulp.task('build:templateCache', gulp.series('b_c:templateCache', 'b_m:templateCache'));

//Master Script Compile Tasks
gulp.task('compile:js', gulp.series(gulp.parallel('c_c:js', 'build:js_bower', 'build:js', 'build:templateCache'), 'c_m:js'));

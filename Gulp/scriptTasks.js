var header = require('gulp-header');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var wrap = require('gulp-wrapper');
var html2js = require('gulp-html2js');
var clean = require('gulp-clean');

var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;
var appJS = config.app_files.js;


gulp.task('build:js_bower', ['clean:js_bower'], function() {
    return gulp.src('./vendor/**/*.js')
        .pipe(gulp.dest(config.build + 'vendor'));
});

gulp.task('clean:js_bower', function() {
    return gulp.src(config.build + 'vendor', {read:false})
        .pipe(clean({force: true}));
});

gulp.task('build:copy_js', ['clean:copy_js'], function() {
    return gulp.src(appJS)
        .pipe(wrap({
            header: "(function ( window, angular, undefined ) {\n 'use strict';\n",
            footer: "})( window, window.angular );\n"
        }))
        .pipe(gulp.dest(config.build + 'src'));
});

gulp.task('clean:copy_js', function() {
    return gulp.src(config.build + 'src', {read:false})
        .pipe(clean({force: true}));
});

gulp.task('build:templateCache', ['clean:templateCache'], function() {
    return gulp.src(config.app_files.atpl)
        .pipe(html2js({
            base: 'src/app',
            outputModuleName: 'templates-app',
            useStrict: true }))
        .pipe(concat('template-app.js'))
        .pipe(gulp.dest(config.build));
});

gulp.task('clean:templateCache', function() {
    return gulp.src(config.build + 'template-app.js', {read:false})
        .pipe(clean({force: true}));
});

gulp.task('compile:js', ['clean:compile_js'], function() {
    return gulp.src(config.build + '**/*.js')
        .pipe(concat())
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.compile));
});

gulp.task('clean:compile_js', function(){
    return gulp.src(config.compile + '**/*.js', {read:false})
        .pipe(clean({force: true}));
});
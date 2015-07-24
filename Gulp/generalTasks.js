var gulp = require('gulp');
var config = require('./../gulpConfig');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sequence = require('gulp-sequence');
var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;
var util = require('gulp-util');

var ignoreOption = function(configLoc) {
    return config[configLoc].replace(".", "");
};


gulp.task('build', ['build:inject'], function() {

});

gulp.task('build:inject', ['build:js_bower', 'build:copy_js', 'build:templateCache', 'build:css'], function() {
    return gulp
        .src(config.source + 'index.html')
        .pipe(inject(gulp.src(config.build + 'vendor/**/*.js', {read:false}), {name: 'bower', ignorePath: config.build.replace('.', ''), addRootSlash: false}))
        .pipe(inject(gulp.src([config.build + 'src/**/*.js', config.build + 'assets/**/*.css'], {read:false}), {ignorePath: config.build.replace('.', ''), addRootSlash: false}))
        .pipe(gulp.dest(config.build));
});

gulp.task('compile:inject', function() {
    return gulp
        .src(config.source + 'index.html')
        .pipe(inject(gulp.src([
            config.compile + "**/*.js",
            config.compile + '/assets/' + currVersion + '.css'], {read: false}), {}))
        .pipe(gulp.dest(config.compile));
});

gulp.task('masterClean', function() {
    return gulp
        .src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
});

//gulp.task('lint', function() {
//    gulp.src()
//});
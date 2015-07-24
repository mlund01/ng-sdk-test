var gulp = require('gulp');
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


gulp.task('build', sequence('build:js_bower', 'build:copy_js', ['build:css', 'build:templateCache'], 'build:inject'));

gulp.task('build:inject', function() {
    gulp.src(config.source + 'index.html')
        .pipe(wiredep({ignorePath: '../'})) //inject bower components
        .pipe(inject(gulp.src([  //inject app assets & js
            config.build + "**/*.js",
            config.build + '/**/*.css',
            '!' + config.build + '/vendor/**/*'], {relative: true},{read: false})))
        .pipe(gulp.dest('./', {cwd: config.build}))
})

gulp.task('compile:inject', function() {
    gulp.src(config.source + 'index.html')
        .pipe(inject(gulp.src([
            config.compile + "**/*.js",
            config.compile + '/assets/' + currVersion + '.css'], {read: false}), {}))
        .pipe(gulp.dest(config.compile))
});

gulp.task('masterClean', function() {
    return gulp.src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
});

gulp.task('lint', function() {
    gulp.src()
});
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var clean = require('gulp-clean');

var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;

var ignoreOption = function(configLoc) {
    return config[configLoc].replace(".", "");
};

gulp.task('build:inject', ['build:css', 'build:js'], function() {
    gulp.src(config.source + 'index.html')
        .pipe(wiredep()) //inject bower components
        .pipe(inject(gulp.src([  //inject app assets & js
            config.build + "**/*.js",
            config.build + '/assets/**/*'], {read: false}), {ignorePath: ignoreOption('build')}))
        .pipe(gulp.dest(config.build))
});

gulp.task('compile:inject', function() {
    gulp.src(config.source + 'index.html')
        .pipe(inject(gulp.src([
            config.compile + "**/*.js",
            config.compile + '/assets/' + currVersion + '.css'], {read: false}), {ignorePath: ignoreOption('compile')}))
        .pipe(gulp.dest(config.compile))
});

gulp.task('clean', function() {
    return gulp.src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
});
var gulp = require('gulp');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sequence = require('gulp-sequence');
var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;


gulp.task('compile', ['compile:js', 'compile:assets', 'compile:css'], function() {
    return gulp.src(config.source + 'index.html')
        .pipe(inject(gulp.src(config.compile + '/**/*', {read:false}), {ignorePath: config.compile.replace('.', ''), addRootSlash: false}))
        .pipe(gulp.dest(config.compile));

});

gulp.task('build', ['build:js_bower', 'build:copy_js', 'build:templateCache', 'build:css', 'build:assets'], function() {
    //task injects dep into index.html
    return gulp
        .src(config.source + 'index.html')
        .pipe(inject(gulp.src([config.build + 'vendor/**/angular.js', config.build + 'vendor/**/*.js'], {read:false}), {name: 'bower', ignorePath: config.build.replace('.', ''), addRootSlash: false}))
        .pipe(inject(gulp.src([
            config.build + '**/*.js',
            config.build + 'assets/**/*.css',
            "!" + config.build + 'src/**/*.spec.js',
            '!' + config.build + 'vendor/**/*'], {read:false}), {ignorePath: config.build.replace('.', ''), addRootSlash: false}))
        .pipe(gulp.dest(config.build));
});


gulp.task('masterClean', function() {
    return gulp
        .src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
});
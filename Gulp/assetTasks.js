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
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;
/*var lessFilter = filter('**!/!*.less');
var sassFilter = filter(['**!/!*.sass', '**!/!*.scss']);
var cssFilter = filter('**!/!*.css');*/

/*BUILD*/
gulp.task('build:css', ['clean:css'], function() {
    var lessFilter = filter('**/*.less');
    var sassFilter = filter(['**/*.sass', '**/*.scss']);

    return gulp
        .src(mainBowerFiles({filter: ['**/*.css', '**/*.less', '**/*.scss', '**/*.sass']})
            .concat([config.source + '**/*.css', config.source + '**/*.less', config.source + '**/*.scss', config.source + '**/*.sass']))
        .pipe(plumber())
        .pipe(lessFilter)
        .pipe(less())
        .pipe(lessFilter.restore())
        .pipe(sassFilter)
        .pipe(sassFilter.restore())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(concat(currVersion + '.css'))
        .pipe(gulp.dest(config.build + 'assets'))
        .pipe(browserSync.stream())

});

gulp.task('clean:css', function() {
    return gulp.src(config.build + 'assets/**/*.css', {read:false})
        .pipe(clean());
});

gulp.task('build:assets', ['clean:assets'], function() {
    return gulp.src([
        config.source + 'assets/**/*',
        '!' + config.source + '**/*.css',
        '!' + config.source + '**/*.less',
        '!' + config.source + '**/*.scss',
        '!' + config.source + '**/*.sass'])
        .pipe(gulp.dest(config.build + 'assets'))
});

gulp.task('clean:assets', function() {
    return gulp.src([
        config.build + 'assets/**/*',
        '!' + config.build + '**/*.css',
        '!' + config.build + '**/*.less',
        '!' + config.build + '**/*.scss',
        '!' + config.build + '**/*.sass'], {read:false})
        .pipe(clean())
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

gulp.task('compile:assets', ['clean:compile_css', 'build:assets'], function() {
    return gulp.src([
        config.build + 'assets/**/*',
        '!' + config.build + '**/*.css',
        '!' + config.build + '**/*.less',
        '!' + config.build + '**/*.scss',
        '!' + config.build + '**/*.sass'])
        .pipe(gulp.dest(config.compile + 'assets'))
});

gulp.task('clean:compile_css', function() {
    return gulp
        .src([config.compile + 'assets/**/*', '!' + config.compile + 'assets/**/*.css'], {read:false})
        .pipe(clean());
});